import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { normalizar } from '../utils/format';

const CACHE_KEY = 'santuario:playbacks-cache-v4';

// Cache leve: guarda SÓ o índice (chunks já vistos + total), nunca a lista.
// A lista (1,6 MB) era parseada do sessionStorage a cada carregamento,
// bloqueando a thread principal e arriscando estourar a cota de 5 MB.
// Os chunks voltam rápido do HTTP cache do navegador na revisita.
function loadCacheMeta() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data?.v !== 4 || !Array.isArray(data?.chunks)) return null;
    return data;
  } catch {
    return null;
  }
}

function saveCacheMeta(chunkKeys, total) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ v: 4, ts: Date.now(), chunks: chunkKeys, total }));
  } catch {
    // quota exceeded — ignora (a lista segue em memória)
  }
}

export function usePlaybacks() {
  const [playbacks, setPlaybacks] = useState([]);
  const [adicionados, setAdicionados] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('igreja:adicionados') || '[]');
    } catch {
      return [];
    }
  });
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [chunksCarregados, setChunksCarregados] = useState(0);
  const [totalChunks, setTotalChunks] = useState(null);

  const idsRef = useRef(new Set());
  const listaRef = useRef([]);
  const manifestRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('igreja:adicionados', JSON.stringify(adicionados));
    } catch {}
  }, [adicionados]);

  const ensureChunksForQuery = useCallback((q) => {
    if (!q || !manifestRef.current) return;
    const norm = normalizar(q).trim().toUpperCase();
    const ch = norm[0] || '';
    const key = /[A-Z]/.test(ch) ? ch : '_hash';
    if (manifestRef.current.chunks[key] && !idsRef.current.has(`__chunk_${key}`)) {
      fetch(`/playbacks/${encodeURIComponent(key)}.json`)
        .then((r) => (r.ok ? r.json() : []))
        .then((arr) => {
          if (!arr.length) return;
          const novos = arr.filter((p) => !idsRef.current.has(p.id));
          if (!novos.length) {
            idsRef.current.add(`__chunk_${key}`);
            return;
          }
          for (const p of novos) idsRef.current.add(p.id);
          idsRef.current.add(`__chunk_${key}`);
          listaRef.current = [...listaRef.current, ...novos];
          setPlaybacks(listaRef.current);
          setChunksCarregados((c) => c + 1);
          if (manifestRef.current) saveCacheMeta([...idsRef.current], Object.keys(manifestRef.current.chunks).length);
        })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    let cancel = false;

    const carregar = async () => {
      try {
        const manifestRes = await fetch('/playbacks/manifest.json');
        if (!manifestRes.ok) throw new Error('manifest missing');
        const manifest = await manifestRes.json();
        manifestRef.current = manifest;
        const chaves = Object.keys(manifest.chunks || {});
        setTotalChunks(chaves.length);
        if (chaves.length === 0) throw new Error('manifest vazio');

        // Revisita: chunks já vistos vêm em paralelo do HTTP cache;
        // chunks novos seguem sequenciais para não saturar a rede
        const meta = loadCacheMeta();
        const vistos = new Set(meta?.chunks || []);
        const conhecidos = chaves.filter((k) => vistos.has(`__chunk_${k}`));
        const novos = chaves.filter((k) => !vistos.has(`__chunk_${k}`));

        const absorver = (k, arr) => {
          const itens = arr.filter((p) => !idsRef.current.has(p.id));
          for (const p of itens) idsRef.current.add(p.id);
          idsRef.current.add(`__chunk_${k}`);
          if (itens.length) {
            listaRef.current = [...listaRef.current, ...itens];
            setPlaybacks(listaRef.current);
          }
        };

        let carregados = 0;
        await Promise.all(
          conhecidos.map(async (k) => {
            if (cancel) return;
            if (idsRef.current.has(`__chunk_${k}`)) return;
            try {
              const r = await fetch(`/playbacks/${encodeURIComponent(k)}.json`);
              if (!r.ok) return;
              absorver(k, await r.json());
            } catch {}
          })
        );
        if (cancel) return;
        carregados = conhecidos.length;
        setChunksCarregados(carregados);
        if (conhecidos.length) saveCacheMeta([...idsRef.current], chaves.length);

        for (const k of novos) {
          if (cancel) return;
          if (idsRef.current.has(`__chunk_${k}`)) {
            carregados++;
            setChunksCarregados(carregados);
            continue;
          }
          try {
            const url = `/playbacks/${encodeURIComponent(k)}.json`;
            const r = await fetch(url);
            if (!r.ok) throw new Error(`chunk ${k} falhou ${r.status}`);
            const arr = await r.json();
            if (cancel) return;
            const novos = arr.filter((p) => !idsRef.current.has(p.id));
            for (const p of novos) idsRef.current.add(p.id);
            idsRef.current.add(`__chunk_${k}`);
            if (novos.length) {
              listaRef.current = [...listaRef.current, ...novos];
              setPlaybacks(listaRef.current);
              saveCacheMeta([...idsRef.current], chaves.length);
            }
            carregados++;
            setChunksCarregados(carregados);
          } catch (e) {
            console.warn(`[playbacks] chunk ${k} erro:`, e.message);
            carregados++;
            setChunksCarregados(carregados);
          }
          // Pausa pequena para não saturar a rede
          if (!cancel) await new Promise((res) => setTimeout(res, 25));
        }
        if (!cancel) setCarregando(false);
      } catch (e) {
        if (!cancel) {
          setErro(e.message || 'Falha ao carregar manifest');
          setCarregando(false);
        }
      }
    };
    carregar();
    return () => {
      cancel = true;
    };
  }, []);

  const handleAdicionar = useCallback((novo) => {
    setAdicionados((prev) => [novo, ...prev]);
  }, []);

  const handleRemover = useCallback((id) => {
    setAdicionados((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Carrega TODOS os chunks restantes em background (para listas completas:
  // artistas, tons, contagens). Guarda com ref para não repetir downloads.
  const carregandoTodosRef = useRef(false);
  const carregarTodos = useCallback(async () => {
    if (carregandoTodosRef.current || !manifestRef.current) return;
    const chaves = Object.keys(manifestRef.current.chunks || {});
    const faltantes = chaves.filter((k) => !idsRef.current.has(`__chunk_${k}`));
    if (faltantes.length === 0) return;
    carregandoTodosRef.current = true;
    for (const k of faltantes) {
      if (idsRef.current.has(`__chunk_${k}`)) continue;
      try {
        const url = `/playbacks/${encodeURIComponent(k)}.json`;
        const r = await fetch(url);
        if (!r.ok) continue;
        const arr = await r.json();
        const novos = arr.filter((p) => !idsRef.current.has(p.id));
        for (const p of novos) idsRef.current.add(p.id);
        idsRef.current.add(`__chunk_${k}`);
        if (novos.length) {
          listaRef.current = [...listaRef.current, ...novos];
          setPlaybacks(listaRef.current);
          saveCacheMeta([...idsRef.current], chaves.length);
        }
        setChunksCarregados((c) => c + 1);
      } catch {
        // chunk isolado falhou — segue para os demais
      }
      await new Promise((res) => setTimeout(res, 25));
    }
    carregandoTodosRef.current = false;
  }, []);

  const listaCompleta = useMemo(() => [...adicionados, ...playbacks], [adicionados, playbacks]);
  const idsAdicionados = useMemo(() => new Set(adicionados.map((p) => p.id)), [adicionados]);

  return {
    playbacks,
    adicionados,
    listaCompleta,
    idsAdicionados,
    carregando,
    erro,
    chunksCarregados,
    totalChunks,
    ensureChunksForQuery,
    carregarTodos,
    handleAdicionar,
    handleRemover,
  };
}

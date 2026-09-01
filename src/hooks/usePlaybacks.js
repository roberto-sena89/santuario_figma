import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { normalizar } from '../utils/format';

const CACHE_KEY = 'santuario:playbacks-cache-v3';

function loadCachedChunks() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data?.v !== 3) return null;
    return data;
  } catch {
    return null;
  }
}

function saveCachedChunks(playbacks, total) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ v: 3, ts: Date.now(), playbacks, total }));
  } catch {
    // quota exceeded — ignora
  }
}

export function usePlaybacks() {
  const [playbacks, setPlaybacks] = useState(() => {
    const cached = loadCachedChunks();
    return cached?.playbacks || [];
  });
  const [adicionados, setAdicionados] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('igreja:adicionados') || '[]');
    } catch {
      return [];
    }
  });
  const [carregando, setCarregando] = useState(() => !loadCachedChunks());
  const [erro, setErro] = useState(null);
  const [chunksCarregados, setChunksCarregados] = useState(0);
  const [totalChunks, setTotalChunks] = useState(() => {
    const cached = loadCachedChunks();
    return cached?.total || null;
  });

  const idsRef = useRef(new Set());
  const listaRef = useRef([]);
  const manifestRef = useRef(null);

  // Inicializa refs com cache
  useEffect(() => {
    const cached = loadCachedChunks();
    if (cached) {
      idsRef.current = new Set(cached.playbacks.map((p) => p.id));
      listaRef.current = [...cached.playbacks];
    }
  }, []);

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
          if (manifestRef.current) saveCachedChunks(listaRef.current, Object.keys(manifestRef.current.chunks).length);
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

        // Se cache já tem tudo, não refaz fetch
        const cached = loadCachedChunks();
        if (cached && cached.playbacks.length >= manifest.total) {
          setChunksCarregados(chaves.length);
          setCarregando(false);
          return;
        }

        let carregados = 0;
        for (const k of chaves) {
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
              saveCachedChunks(listaRef.current, chaves.length);
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
    handleAdicionar,
    handleRemover,
  };
}

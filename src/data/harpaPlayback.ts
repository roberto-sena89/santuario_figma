/**
 * HINÁRIO CANTADO — liga cada hino da Harpa aos playbacks correspondentes.
 * Busca só o chunk da letra inicial (/playbacks/<LETRA>.json) e compara
 * títulos normalizados (bidirecional, para tolerar " - Playback" e
 * variações de artista). Cache por letra durante a sessão.
 */

import { normalizar } from "../utils/format";

export interface PlaybackMatch {
  id: string; // youtubeId
  titulo: string;
  artista: string;
}

const cacheLetra = new Map<string, PlaybackMatch[] | null>();

function letraDe(titulo: string): string {
  const n = normalizar(titulo).trim().toUpperCase();
  const ch = n[0] || "";
  return /[A-Z]/.test(ch) ? ch : "_hash";
}

async function carregarChunk(letra: string): Promise<PlaybackMatch[] | null> {
  if (cacheLetra.has(letra)) return cacheLetra.get(letra) ?? null;
  try {
    const r = await fetch(`/playbacks/${encodeURIComponent(letra)}.json`);
    if (!r.ok) {
      cacheLetra.set(letra, null);
      return null;
    }
    const arr = await r.json();
    const lista = (Array.isArray(arr) ? arr : []).map((p) => ({
      id: String(p.id ?? ""),
      titulo: String(p.titulo ?? ""),
      artista: String(p.artista ?? ""),
    }));
    cacheLetra.set(letra, lista);
    return lista;
  } catch {
    cacheLetra.set(letra, null);
    return null;
  }
}

/**
 * Encontra até 3 playbacks cujo título casa com o título do hino.
 * Retorna [] quando o chunk falha ou não há correspondência.
 */
export async function buscarPlaybacksDoHino(
  tituloHino: string
): Promise<PlaybackMatch[]> {
  const hino = normalizar(tituloHino).trim();
  if (hino.length < 4) return [];
  const lista = await carregarChunk(letraDe(tituloHino));
  if (!lista) return [];
  const casas = lista.filter((p) => {
    const t = normalizar(p.titulo).trim();
    if (!t || !p.id) return false;
    return t.includes(hino) || hino.includes(t);
  });
  // Exatos primeiro (título igual após normalizar), depois ordem alfabética
  casas.sort((a, b) => {
    const ae = normalizar(a.titulo).trim() === hino ? 0 : 1;
    const be = normalizar(b.titulo).trim() === hino ? 0 : 1;
    return ae - be || a.titulo.localeCompare(b.titulo);
  });
  return casas.slice(0, 3);
}

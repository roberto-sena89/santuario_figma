/**
 * Cliente HTTP para a API harpa-api (https://github.com/ronisdev/harpa-api).
 *
 * A API expõe os hinos em um formato diferente do HarpaHymn local:
 *   - number, title, author
 *   - verses: [{ sequence, lyrics, chorus }]
 *
 * Este módulo normaliza para HarpaHymn e faz fallback automático para os
 * dados estáticos locais quando a API está indisponível (offline / offline-first).
 */
import {
  HARPA_HYMNS,
  type HarpaHymn,
} from "./harpa";

const DEFAULT_BASE_URL =
  (import.meta.env?.VITE_HARPA_API_URL as string | undefined) ||
  "http://localhost:3000";

export const HARPA_API_BASE_URL = DEFAULT_BASE_URL;

type ApiVerse = { sequence: number; lyrics: string; chorus: boolean };
type ApiHymn = {
  number: number;
  title: string;
  author?: string;
  verses: ApiVerse[];
};

type ListResponse = {
  totalHymns: number;
  totalPages: number;
  currentPage: number;
  prevPage: number | null;
  nextPage: number | null;
  hymns: ApiHymn[];
};

type DetailsResponse = {
  hymn: ApiHymn;
  prevHymn: Pick<ApiHymn, "number" | "title"> | null;
  nextHymn: Pick<ApiHymn, "number" | "title"> | null;
};

/** Converte um hino do formato da API para o HarpaHymn local. */
function normalize(hymn: ApiHymn): HarpaHymn {
  const versesOnly: string[] = [];
  let chorus: string | undefined;
  for (const v of hymn.verses ?? []) {
    if (v.chorus) {
      chorus = v.lyrics;
    } else {
      versesOnly.push(v.lyrics);
    }
  }
  return {
    number: hymn.number,
    title: hymn.title,
    author: hymn.author || "Desconhecido",
    category: "Outros",
    verses: versesOnly,
    chorus,
  };
}

async function safeFetch<T>(url: string, signal?: AbortSignal): Promise<T | null> {
  try {
    const res = await fetch(url, { signal });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/**
 * Lista hinos paginados. Retorna array vazio em caso de falha.
 */
export async function fetchHymns(
  page = 1,
  limit = 50
): Promise<{ hymns: HarpaHymn[]; totalHymns: number; fromApi: boolean }> {
  const url = `${HARPA_API_BASE_URL}/hymns?page=${page}&limit=${limit}`;
  const data = await safeFetch<ListResponse>(url);
  if (!data || !Array.isArray(data.hymns)) {
    return { hymns: [], totalHymns: 0, fromApi: false };
  }
  return {
    hymns: data.hymns.map(normalize),
    totalHymns: data.totalHymns,
    fromApi: true,
  };
}

/**
 * Busca os detalhes completos de um hino pelo número.
 */
export async function fetchHymnByNumber(
  number: number
): Promise<{ hymn: HarpaHymn | null; fromApi: boolean }> {
  const url = `${HARPA_API_BASE_URL}/hymns/${number}`;
  const data = await safeFetch<DetailsResponse>(url);
  if (!data?.hymn) return { hymn: null, fromApi: false };
  return { hymn: normalize(data.hymn), fromApi: true };
}

/**
 * Busca hinos por título. Retorna array vazio se a API falhar.
 */
export async function fetchHymnsByTitle(
  query: string,
  page = 1,
  limit = 50
): Promise<{ hymns: HarpaHymn[]; fromApi: boolean }> {
  const url = `${HARPA_API_BASE_URL}/hymns/search/title/${encodeURIComponent(
    query
  )}?page=${page}&limit=${limit}`;
  const data = await safeFetch<ListResponse>(url);
  if (!data?.hymns) return { hymns: [], fromApi: false };
  return { hymns: data.hymns.map(normalize), fromApi: true };
}

/**
 * Hino aleatório.
 */
export async function fetchRandomHymn(): Promise<{
  hymn: HarpaHymn | null;
  fromApi: boolean;
}> {
  const url = `${HARPA_API_BASE_URL}/hymns/random`;
  const data = await safeFetch<DetailsResponse>(url);
  if (!data?.hymn) return { hymn: null, fromApi: false };
  return { hymn: normalize(data.hymn), fromApi: true };
}

/**
 * Verifica se a API está respondendo. Útil para UI exibir status online/offline.
 */
export async function pingApi(): Promise<boolean> {
  const data = await safeFetch<ListResponse>(
    `${HARPA_API_BASE_URL}/hymns?page=1&limit=1`
  );
  return data !== null;
}

/**
 * Catálogo unificado: tenta a API; em caso de falha usa o fallback local.
 * Garante que a página nunca fica vazia.
 */
export async function getCatalog(): Promise<{
  hymns: HarpaHymn[];
  source: "api" | "local";
}> {
  const result = await fetchHymns(1, 50);
  if (result.hymns.length > 0 && result.fromApi) {
    return { hymns: result.hymns, source: "api" };
  }
  return { hymns: HARPA_HYMNS, source: "local" };
}

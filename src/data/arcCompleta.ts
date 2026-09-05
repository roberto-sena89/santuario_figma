/**
 * Bíblia completa ARC (Almeida Revista e Corrigida) — offline.
 *
 * O JSON fica em `public/ARC.json` (4 MB) e é baixado lazily na primeira
 * vez que o usuário abre a página Bíblia. Depois fica em memória (cache
 * do módulo) para navegações subsequentes sem novo fetch.
 *
 * Estrutura do JSON: array com 66 livros:
 *   [{ abbrev: "Gn", chapters: [[v1, v2, ...], [v1, ...], ...] }, ...]
 */

import { BIBLE_BOOKS } from "./bibleBooks";

export interface ArcBook {
  abbrev: string;
  chapters: string[][];
}

export type ArcBible = ArcBook[];

let cache: ArcBible | null = null;
let inflight: Promise<ArcBible> | null = null;

/** Carrega a Bíblia ARC uma única vez (memoizado em cache do módulo). */
export async function loadArcBible(): Promise<ArcBible> {
  if (cache) return cache;
  if (inflight) return inflight;
  inflight = fetch("/ARC.json")
    .then((res) => {
      if (!res.ok) throw new Error(`Falha ao carregar ARC.json (HTTP ${res.status})`);
      return res.json() as Promise<ArcBible>;
    })
    .then((data) => {
      cache = data;
      inflight = null;
      return data;
    })
    .catch((err) => {
      inflight = null;
      throw err;
    });
  return inflight;
}

/**
 * Retorna o texto de um versículo. Aceita o `id` (1..66) do `BIBLE_BOOKS`
 * e número do capítulo (1-based).
 */
export function getChapterVerses(
  bible: ArcBible,
  bookId: number,
  chapter: number
): string[] {
  const book = bible[bookId - 1];
  if (!book) return [];
  return book.chapters[chapter - 1] ?? [];
}

/** Total de livros disponíveis no JSON. */
export const ARC_TOTAL_BOOKS = 66;

/** Tradução exibida na UI. */
export const ARC_TRANSLATION = "ARC";
export const ARC_FULL_NAME = "Almeida Revista e Corrigida";

/** Re-export pra conveniência. */
export { BIBLE_BOOKS };

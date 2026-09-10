/**
 * Bíblia completa ARC (Almeida Revista e Corrigida) — offline.
 *
 * O texto fica fatiado por livro em `public/arc/<id>.json` (1..66) e cada
 * livro é baixado lazily quando exibido pela primeira vez. Depois fica em
 * memória (cache do módulo) para navegações subsequentes sem novo fetch.
 * Gerado a partir do JSON completo — para regenerar, fatie o array de
 * 66 livros `[{abbrev, name, chapters}]` em um arquivo por índice.
 *
 * Formato por livro: { abbrev: "Gn", chapters: [[v1, v2, ...], ...] }
 */

import { BIBLE_BOOKS } from "./bibleBooks";

export interface ArcBook {
  abbrev: string;
  name?: string;
  chapters: string[][];
}

export type ArcBible = ArcBook[];

const bookCache = new Map<number, ArcBook>();
const bookInflight = new Map<number, Promise<ArcBook>>();

/** Carrega um livro ARC sob demanda (memoizado em cache do módulo). */
export async function loadArcBook(bookId: number): Promise<ArcBook> {
  const hit = bookCache.get(bookId);
  if (hit) return hit;
  const ongoing = bookInflight.get(bookId);
  if (ongoing) return ongoing;
  const p = fetch(`/arc/${bookId}.json`)
    .then((res) => {
      if (!res.ok) throw new Error(`Falha ao carregar livro ${bookId} (HTTP ${res.status})`);
      return res.json() as Promise<ArcBook>;
    })
    .then((data) => {
      bookCache.set(bookId, data);
      bookInflight.delete(bookId);
      return data;
    })
    .catch((err) => {
      bookInflight.delete(bookId);
      throw err;
    });
  bookInflight.set(bookId, p);
  return p;
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

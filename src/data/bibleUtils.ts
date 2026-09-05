/**
 * Utilitários para navegação, busca e estado da Bíblia.
 * - Normalização de texto para busca (acentos, caixa, variações comuns)
 * - Hash routing para permitir compartilhamento e back/forward do navegador
 * - Reexporta o hook useDebounce
 */

import type { BibleBook } from "./bibleBooks";
import type { ArcBook } from "./arcCompleta";

/**
 * Normaliza uma string de busca para comparação fuzzy:
 * - Remove acentos
 * - Converte para minúsculas
 * - Substitui variações comuns de livros (inglês → português, abreviações)
 */
export function normalizeSearchText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\bsalmo\b/g, "salmos")
    .replace(/\bprov\b/g, "provérbios")
    .replace(/\becc\b/g, "eclesiastes")
    .replace(/\bis\b/g, "isaías")
    .replace(/\bjer\b/g, "jeremias")
    .replace(/\bdaniel\b/g, "daniel")
    .replace(/\bmatt\b/g, "mateus")
    .replace(/\bmark\b/g, "marcos")
    .replace(/\bluke\b/g, "lucas")
    .replace(/\bjohn\b/g, "joão")
    .replace(/\bacts\b/g, "atos")
    .replace(/\brom\b/g, "romanos")
    .replace(/\bcor\b/g, "coríntios")
    .replace(/\bgal\b/g, "gálatas")
    .replace(/\beph\b/g, "efésios")
    .replace(/\bphil\b/g, "filipenses")
    .replace(/\bcol\b/g, "colossenses")
    .replace(/\bthess\b/g, "tessalonicenses")
    .replace(/\btim\b/g, "timóteo")
    .replace(/\btitus\b/g, "tito")
    .replace(/\bhebr\b/g, "hebreus")
    .replace(/\bjames\b/g, "tiago")
    .replace(/\bpet\b/g, "pedro")
    .replace(/\brev\b/g, "apocalipse");
}

/**
 * Verifica se o texto normalizado do livro bate com a query normalizada.
 * Faz match por substring.
 */
export function matchesQuery(book: BibleBook, normalizedQuery: string): boolean {
  if (!normalizedQuery) return true;
  const haystack = [
    book.pt,
    book.abbr,
    book.en.replace(/\+/g, " "),
  ]
    .map(normalizeSearchText)
    .join(" ");
  return haystack.includes(normalizedQuery);
}

/**
 * Converte um estado em string de hash para URL.
 * Formato: #/testament:at/book:19/chapter:23
 *         #/collection:biblia-da-mulher
 */
export function encodeBibleHash(
  collectionId: string | null,
  testament: "AT" | "NT" | null,
  bookId: number | null,
  chapter: number | null
): string {
  if (collectionId) return `#/collection:${collectionId}`;
  const parts: string[] = [];
  if (testament) parts.push(`testament:${testament}`);
  if (bookId !== null) parts.push(`book:${bookId}`);
  if (chapter !== null) parts.push(`chapter:${chapter}`);
  return parts.length ? `#/${parts.join("/")}` : "#/";
}

/**
 * Parsa uma string de hash e retorna o estado da Bíblia.
 */
export interface BibleHashState {
  collectionId: string | null;
  testament: "AT" | "NT" | null;
  bookId: number | null;
  chapter: number | null;
  /** Slug do subtema (ex: "fe-e-coragem") quando o formato é #/mulher/fe-e-coragem. */
  subtemaSlug: string | null;
}

export function decodeBibleHash(hash: string): BibleHashState {
  const clean = hash.replace(/^#\/?/, "").split("?")[0];
  const empty: BibleHashState = {
    collectionId: null,
    testament: null,
    bookId: null,
    chapter: null,
    subtemaSlug: null,
  };
  if (!clean) return empty;

  const result: BibleHashState = { ...empty };

  // Formato #/collection:<id>  (legado)
  for (const part of clean.split("/")) {
    const [key, value] = part.split(":");
    switch (key) {
      case "collection":
        result.collectionId = value || null;
        break;
      case "testament":
        if (value === "AT" || value === "NT") result.testament = value;
        break;
      case "book":
        const bn = parseInt(value, 10);
        if (!isNaN(bn)) result.bookId = bn;
        break;
      case "chapter":
        const cn = parseInt(value, 10);
        if (!isNaN(cn)) result.chapter = cn;
        break;
    }
  }

  // Formato #/<slug>/<subtema>  (novo, mais limpo)
  if (!result.collectionId) {
    const slugMatch = clean.match(/^([^/]+)\/([^/]+)/);
    if (slugMatch) {
      const slug = slugMatch[1];
      const sub = slugMatch[2];
      // Só interpretar como coleção se o slug bater em um slug conhecido
      if (["mulher", "homem", "jovens", "familia", "consolo-e-esperanca"].includes(slug)) {
        result.collectionId = slug;
        result.subtemaSlug = sub;
      }
    } else {
      // Apenas slug da coleção (sem subtema): #/mulher
      const slugOnly = clean.split("/")[0];
      if (["mulher", "homem", "jovens", "familia", "consolo-e-esperanca"].includes(slugOnly)) {
        result.collectionId = slugOnly;
      }
    }
  }
  return result;
}

/** Reexporta o hook de debounce. */
export { useDebounce } from "../hooks/useDebounce";

/** Tipo do modo de visualização. */
export type BibleViewMode = "collection" | "complete";

/** Tipo do id de coleção (incluindo "complete" pra Bíblia Completa). */
export type BibleCollectionId = string;

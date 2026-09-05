/**
 * Nível 3 (parte 1): Grid de livros do testamento selecionado.
 * Inclui busca em tempo real (com debounce no caller).
 */

import { useMemo } from "react";
import { BIBLE_BOOKS, type BibleBook } from "../../data/bibleBooks";
import { matchesQuery, normalizeSearchText } from "../../data/bibleUtils";

interface BookGridProps {
  testament: "AT" | "NT";
  selectedBookId: number;
  onSelect: (book: BibleBook) => void;
  query: string;
  emptyMessage?: string;
}

export default function BookGrid({
  testament,
  selectedBookId,
  onSelect,
  query,
  emptyMessage = "Nenhum livro encontrado",
}: BookGridProps) {
  const books = useMemo(
    () => BIBLE_BOOKS.filter((b) => b.testament === testament),
    [testament]
  );

  const filtered = useMemo(() => {
    const nq = normalizeSearchText(query);
    if (!nq) return books;
    return books.filter((b) => matchesQuery(b, nq));
  }, [books, query]);

  return (
    <div className="w-full">
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Tente outro termo ou apague a busca.
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-4 gap-1.5"
          role="listbox"
          aria-label="Livros"
        >
          {filtered.map((book) => {
            const isActive = book.id === selectedBookId;
            return (
              <button
                key={book.id}
                onClick={() => onSelect(book)}
                role="option"
                aria-selected={isActive}
                title={`${book.pt} · ${book.chapters} ${
                  book.chapters === 1 ? "capítulo" : "capítulos"
                }`}
                aria-label={`${book.pt} — ${book.chapters} ${
                  book.chapters === 1 ? "capítulo" : "capítulos"
                }`}
                className={`
                  group relative aspect-square w-full rounded-xl p-1.5
                  flex flex-col items-center justify-center gap-1
                  border transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
                  focus-visible:ring-offset-2 focus-visible:ring-offset-background
                  ${
                    isActive
                      ? "border-[#D4A24C]/45 bg-gradient-to-b from-[#D4A24C]/20 to-[#C4933C]/12 shadow-md shadow-black/20"
                      : "border-border bg-card text-foreground hover:border-[#D4A24C]/40 hover:bg-muted/60 hover:-translate-y-0.5"
                  }
                `}
              >
                {/* Abreviação — elemento principal do tile */}
                <span
                  className={`font-display text-lg font-semibold leading-none tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-[#D4A24C]"
                      : "text-foreground/90 group-hover:text-[#D4A24C]"
                  }`}
                >
                  {book.abbr}
                </span>

                {/* Indicador de seleção */}
                <span
                  aria-hidden="true"
                  className={`h-0.5 w-4 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-[#D4A24C]"
                      : "bg-border group-hover:bg-[#D4A24C]/40"
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

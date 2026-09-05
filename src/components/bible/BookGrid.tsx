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
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Tente outro termo ou apague a busca.
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2"
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
                className={`
                  group flex flex-col items-start gap-0.5 rounded-lg p-3 text-left
                  border transition-all duration-200 min-h-[64px]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
                  focus-visible:ring-offset-2 focus-visible:ring-offset-background
                  ${
                    isActive
                      ? "bg-accent/15 border-accent text-accent"
                      : "bg-card border-border text-foreground hover:border-accent/40 hover:bg-muted/50"
                  }
                `}
              >
                <span className="text-sm font-semibold leading-tight">
                  {book.pt}
                </span>
                <span className="text-[11px] text-muted-foreground leading-tight">
                  {book.chapters} {book.chapters === 1 ? "capítulo" : "capítulos"}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

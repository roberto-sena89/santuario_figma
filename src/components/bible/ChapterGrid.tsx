/**
 * Nível 3 (parte 2): Grade de capítulos do livro selecionado.
 */

interface ChapterGridProps {
  total: number;
  selected: number;
  onSelect: (n: number) => void;
  bookLabel?: string;
}

export default function ChapterGrid({
  total,
  selected,
  onSelect,
  bookLabel,
}: ChapterGridProps) {
  const chapters = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div>
      {bookLabel && (
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Capítulo — {bookLabel}
        </p>
      )}
      <div
        className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5 max-h-48 overflow-y-auto pr-1"
        role="listbox"
        aria-label="Capítulos"
      >
        {chapters.map((n) => {
          const isActive = n === selected;
          return (
            <button
              key={n}
              onClick={() => onSelect(n)}
              role="option"
              aria-selected={isActive}
              aria-label={`Capítulo ${n}`}
              className={`
                aspect-square flex items-center justify-center text-sm rounded
                transition-colors min-h-[36px] focus:outline-none focus-visible:ring-2
                focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background
                ${
                  isActive
                    ? "bg-accent text-accent-foreground font-bold"
                    : "bg-card text-foreground hover:bg-muted border border-border"
                }
              `}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

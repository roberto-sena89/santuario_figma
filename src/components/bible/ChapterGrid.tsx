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
        <p className="text-[10.5px] font-semibold text-muted-foreground uppercase tracking-[0.22em] mb-3">
          Capítulos — {bookLabel}
        </p>
      )}
      <div
        className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5"
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
              title={`Capítulo ${n}`}
              className={`
                group aspect-square min-h-[36px] rounded-lg p-1
                flex flex-col items-center justify-center gap-0.5
                border transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
                focus-visible:ring-offset-1 focus-visible:ring-offset-background
                ${
                  isActive
                    ? "border-gold/45 bg-gradient-to-b from-gold/20 to-gold-hover/12 shadow-md shadow-black/20"
                    : "border-border bg-card text-foreground hover:border-gold/40 hover:bg-muted/60 hover:-translate-y-0.5"
                }
              `}
            >
              {/* Numeral serif — elemento principal */}
              <span
                className={`font-display text-sm font-semibold leading-none transition-colors duration-200 ${
                  isActive
                    ? "text-gold"
                    : "text-foreground/90 group-hover:text-gold"
                }`}
              >
                {n}
              </span>

              {/* Indicador de seleção */}
              <span
                aria-hidden="true"
                className={`h-0.5 w-3 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-gold"
                    : "bg-transparent group-hover:bg-gold/40"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}


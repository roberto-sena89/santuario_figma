/**
 * Visualização de uma coleção temática ou de um tema.
 * Agrupa versículos por subtema e renderiza cards de versículos curados.
 */

import type { CuratedVerse, CuratedCollection } from "../../data/bibleCollections";
import { BIBLE_BOOKS } from "../../data/bibleBooks";

interface CollectionViewProps {
  intro: string;
  curator: string;
  verses: CuratedVerse[];
  onCopy?: (text: string) => Promise<void> | void;
  copyFeedback?: number | null;
  title: string;
  subtitle?: string;
  onNavigateToBook?: (bookId: number, chapter: number, verse: number) => void;
}

function groupByTheme(verses: CuratedVerse[]) {
  const map = new Map<string, CuratedVerse[]>();
  for (const v of verses) {
    const key = v.theme || "Versículos";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(v);
  }
  return Array.from(map.entries());
}

export default function CollectionView({
  intro,
  curator,
  verses,
  title,
  subtitle,
  onNavigateToBook,
  onCopy,
  copyFeedback,
}: CollectionViewProps) {
  const groups = groupByTheme(verses);

  return (
    <article className="space-y-8">
      {/* Intro */}
      <header className="border-b border-border pb-6">
        <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
        <p className="text-foreground/80 mt-4 leading-relaxed max-w-2xl">
          {intro}
        </p>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-3">
          {curator}
        </p>
      </header>

      {/* Grupos por subtema */}
      <div className="space-y-8">
        {groups.map(([theme, items]) => (
          <section key={theme}>
            <h3 className="font-display text-base font-semibold text-accent uppercase tracking-wider mb-4">
              {theme}
            </h3>
            <ul className="space-y-4">
              {items.map((cv, idx) => {
                const book = BIBLE_BOOKS[cv.book - 1];
                if (!book) return null;
                const ref = `${book.pt} ${cv.chapter}:${cv.verse}`;
                const copyText = `"${ref}"`;
                return (
                  <li
                    key={`${cv.book}-${cv.chapter}-${cv.verse}-${idx}`}
                    className="group bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-accent/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <button
                        onClick={() => onNavigateToBook?.(cv.book, cv.chapter, cv.verse)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        aria-label={`Abrir ${ref} na Bíblia`}
                      >
                        {ref}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      {onCopy && (
                        <button
                          onClick={() => onCopy(copyText)}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:underline"
                          aria-label="Copiar referência"
                        >
                          {copyFeedback === idx ? "Copiado!" : "Copiar"}
                        </button>
                      )}
                    </div>
                    <p className="font-bible text-lg sm:text-xl italic leading-[1.7] text-foreground/90">
                      <span className="text-accent/70 not-italic font-serif">“</span>
                      {versePlaceholder(cv)}
                      <span className="text-accent/70 not-italic font-serif">”</span>
                    </p>
                    <p className="text-[11px] text-muted-foreground/70 mt-3">
                      Texto completo disponível em {book.pt} {cv.chapter}:{cv.verse}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}

/**
 * Placeholder: como o JSON é grande e não foi pré-baixado aqui,
 * mostramos a referência e indicamos onde abrir o texto completo.
 * (O Bible.tsx principal carrega o JSON e pode expor a função real.)
 */
function versePlaceholder(cv: CuratedVerse): string {
  return "Toque na referência acima para abrir o versículo completo na Bíblia.";
}

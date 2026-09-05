/**
 * Chips de temas/emoções — busca rápida por sentimento.
 */

import { THEME_MAP } from "../../data/bibleCollections";
import type { CuratedVerse } from "../../data/bibleCollections";

interface ThemeChipsProps {
  onSelect: (verses: CuratedVerse[], label: string) => void;
}

export default function ThemeChips({ onSelect }: ThemeChipsProps) {
  return (
    <div className="w-full">
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-2">
        Ou encontre por sentimento
      </p>
      <div className="flex flex-wrap gap-2">
        {THEME_MAP.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onSelect(theme.verses, theme.label)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:border-accent/50 hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`Ver versículos sobre ${theme.label}`}
          >
            <span aria-hidden="true" className="text-sm leading-none">
              {theme.emoji}
            </span>
            <span>{theme.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

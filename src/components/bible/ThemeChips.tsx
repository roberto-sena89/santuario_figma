/**
 * Chips de temas/emoções — busca rápida por sentimento.
 * Estilo editorial: eyebrow + chips com underline decorativo no hover.
 */

import { THEME_MAP } from "../../data/bibleCollections";
import type { CuratedVerse } from "../../data/bibleCollections";

interface ThemeChipsProps {
  onSelect: (verses: CuratedVerse[], label: string) => void;
}

export default function ThemeChips({ onSelect }: ThemeChipsProps) {
  return (
    <div className="w-full">
      <div className="mb-3 flex items-center gap-3">
        <span
          className="block h-px w-8 bg-gradient-to-r from-transparent to-accent/60"
          aria-hidden="true"
        />
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-muted-foreground leading-none">
          Ou encontre por sentimento
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {THEME_MAP.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onSelect(theme.verses, theme.label)}
            className="
              group relative inline-flex items-center rounded-full
              border border-border bg-card/70 backdrop-blur-sm
              px-4 py-1.5 text-[12.5px] font-semibold tracking-[0.04em] uppercase
              text-foreground/80
              transition-all duration-200
              hover:border-accent/50 hover:text-accent hover:bg-accent/5
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
              focus-visible:ring-offset-2 focus-visible:ring-offset-background
            "
            aria-label={`Ver versículos sobre ${theme.label}`}
          >
            <span>{theme.label}</span>
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-80"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Navegação por subtemas da coleção temática.
 * Mobile: chips horizontais com scroll.
 * Desktop: lista vertical na sidebar.
 */

import type { Subtema, CollectionStyle } from "../../data/bibleCollections";

interface SubtemaTabsProps {
  subtemas: Subtema[];
  active: string | null;
  onChange: (id: string) => void;
  style: CollectionStyle;
  variant?: "horizontal" | "sidebar";
}

const styleAccent: Record<CollectionStyle, string> = {
  mulher: "from-colecao-mulher/30 to-colecao-ouro/20 ring-colecao-mulher/30",
  homem: "from-colecao-homem-deep/30 to-colecao-oliva/20 ring-colecao-homem-deep/30",
  generico: "from-accent/20 to-accent/5 ring-accent/30",
};

const styleActive: Record<CollectionStyle, string> = {
  mulher: "bg-gradient-to-br from-colecao-mulher/20 to-colecao-ouro/10 border-colecao-mulher text-colecao-mulher",
  homem: "bg-gradient-to-br from-colecao-homem-deep/25 to-colecao-oliva/10 border-colecao-homem-deep text-colecao-homem",
  generico: "bg-accent/15 border-accent text-accent",
};

const styleInactive: Record<CollectionStyle, string> = {
  mulher: "bg-card/60 border-border text-foreground hover:border-colecao-mulher/40 hover:bg-colecao-mulher/5",
  homem: "bg-card/60 border-border text-foreground hover:border-colecao-homem-deep/40 hover:bg-colecao-homem-deep/5",
  generico: "bg-card/60 border-border text-foreground hover:border-accent/40 hover:bg-accent/5",
};

const styleBadgeActive: Record<CollectionStyle, string> = {
  mulher: "bg-colecao-mulher/20 text-colecao-mulher ring-1 ring-colecao-mulher/25",
  homem: "bg-colecao-homem-deep/25 text-colecao-homem ring-1 ring-colecao-homem-deep/30",
  generico: "bg-accent/15 text-accent ring-1 ring-accent/25",
};

const styleBadgeInactive: Record<CollectionStyle, string> = {
  mulher: "bg-muted/70 text-muted-foreground group-hover:bg-colecao-mulher/10 group-hover:text-colecao-mulher",
  homem: "bg-muted/70 text-muted-foreground group-hover:bg-colecao-homem-deep/10 group-hover:text-colecao-homem",
  generico: "bg-muted/70 text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent",
};

const styleDotActive: Record<CollectionStyle, string> = {
  mulher: "bg-colecao-mulher",
  homem: "bg-colecao-homem",
  generico: "bg-accent",
};

const styleDotInactive: Record<CollectionStyle, string> = {
  mulher: "bg-border group-hover:bg-colecao-mulher/50",
  homem: "bg-border group-hover:bg-colecao-homem/50",
  generico: "bg-border group-hover:bg-accent/50",
};

export default function SubtemaTabs({
  subtemas,
  active,
  onChange,
  style,
  variant = "horizontal",
}: SubtemaTabsProps) {
  if (subtemas.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-muted-foreground">
        Em breve novos versículos serão adicionados aqui.
      </div>
    );
  }

  if (variant === "sidebar") {
    return (
      <nav
        className="space-y-1.5"
        role="tablist"
        aria-label="Subtemas"
        aria-orientation="vertical"
      >
        {subtemas.map((s, idx) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              onClick={() => onChange(s.id)}
              role="tab"
              aria-selected={isActive}
              className={`
                group relative flex w-full items-center gap-3 rounded-xl p-2.5 text-left
                border transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
                ${isActive ? styleActive[style] : styleInactive[style]}
              `}
            >
              {/* Badge da numeração — âncora de alinhamento */}
              <span
                aria-hidden="true"
                className={`
                  grid h-7 w-7 shrink-0 place-items-center rounded-lg
                  text-[10px] font-bold tabular-nums transition-colors duration-200
                  ${isActive ? styleBadgeActive[style] : styleBadgeInactive[style]}
                `}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>

              {/* Título + descrição em coluna fixa */}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold leading-snug">
                  {s.titulo}
                </span>
                {s.descricao && (
                  <span className="mt-0.5 block line-clamp-1 text-[11px] leading-snug text-muted-foreground/80">
                    {s.descricao}
                  </span>
                )}
              </span>

              {/* Indicador de seleção */}
              <span
                aria-hidden="true"
                className={`
                  h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-200
                  ${isActive ? styleDotActive[style] : styleDotInactive[style]}
                `}
              />
            </button>
          );
        })}
      </nav>
    );
  }

  // horizontal: chips com scroll
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible no-scrollbar"
      role="tablist"
      aria-label="Subtemas"
    >
      {subtemas.map((s, idx) => {
        const isActive = s.id === active;
        return (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            role="tab"
            aria-selected={isActive}
            className={`
              group inline-flex items-center gap-2 whitespace-nowrap rounded-full
              px-4 py-2 text-sm font-medium transition-all duration-200 border
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
              focus-visible:ring-offset-2 focus-visible:ring-offset-background
              ${
                isActive
                  ? styleActive[style] + " shadow-sm"
                  : styleInactive[style]
              }
            `}
          >
            <span className="text-[10px] font-bold text-muted-foreground">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span>{s.titulo}</span>
          </button>
        );
      })}
    </div>
  );
}


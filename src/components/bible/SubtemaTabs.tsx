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
  mulher: "from-[#E8B4B8]/30 to-[#C9A84C]/20 ring-[#E8B4B8]/30",
  homem: "from-[#2C5F7A]/30 to-[#8B7D3C]/20 ring-[#2C5F7A]/30",
  generico: "from-accent/20 to-accent/5 ring-accent/30",
};

const styleActive: Record<CollectionStyle, string> = {
  mulher: "bg-gradient-to-br from-[#E8B4B8]/20 to-[#C9A84C]/10 border-[#E8B4B8] text-[#E8B4B8]",
  homem: "bg-gradient-to-br from-[#2C5F7A]/25 to-[#8B7D3C]/10 border-[#2C5F7A] text-[#A8C5DD]",
  generico: "bg-accent/15 border-accent text-accent",
};

const styleInactive: Record<CollectionStyle, string> = {
  mulher: "bg-card/60 border-border text-foreground hover:border-[#E8B4B8]/40 hover:bg-[#E8B4B8]/5",
  homem: "bg-card/60 border-border text-foreground hover:border-[#2C5F7A]/40 hover:bg-[#2C5F7A]/5",
  generico: "bg-card/60 border-border text-foreground hover:border-accent/40 hover:bg-accent/5",
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
        className="space-y-1"
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
                w-full text-left rounded-lg p-3 border transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
                ${isActive ? styleActive[style] : styleInactive[style]}
              `}
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-muted-foreground w-5">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold leading-tight">
                  {s.titulo}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    );
  }

  // horizontal: chips com scroll
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible"
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

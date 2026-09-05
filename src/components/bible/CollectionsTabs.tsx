/**
 * Nível 1: Coleções Temáticas (chips no topo).
 * Inclui "Bíblia Completa" + coleções curadas.
 * Estilo editorial: linha degradê + caps tracked (eyebrow).
 */

import { CURATED_COLLECTIONS } from "../../data/bibleCollections";

interface CollectionsTabsProps {
  active: string; // "complete" ou id da coleção
  onChange: (id: string) => void;
}

export default function CollectionsTabs({ active, onChange }: CollectionsTabsProps) {
  const items = [
    { id: "complete", label: "Bíblia Completa" },
    ...CURATED_COLLECTIONS.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible no-scrollbar"
      role="tablist"
      aria-label="Coleções bíblicas"
    >
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            role="tab"
            aria-selected={isActive}
            aria-pressed={isActive}
            className={`
              group relative whitespace-nowrap rounded-full
              px-4 py-2 text-[12.5px] font-semibold tracking-[0.04em] uppercase
              transition-all duration-200 border
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
              focus-visible:ring-offset-2 focus-visible:ring-offset-background
              ${
                isActive
                  ? "border-[#D4A24C]/45 bg-gradient-to-r from-[#D4A24C]/20 to-[#C4933C]/12 text-[#D4A24C] shadow-md shadow-black/20"
                  : "bg-card/70 text-foreground/80 border-border hover:border-accent/50 hover:text-accent hover:bg-accent/5"
              }
            `}
          >
            {item.label}
            {isActive && (
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-[#D4A24C]"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

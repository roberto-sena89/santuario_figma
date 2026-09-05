/**
 * Nível 1: Coleções Temáticas (chips no topo).
 * Inclui "Bíblia Completa" + coleções curadas.
 */

import { CURATED_COLLECTIONS } from "../../data/bibleCollections";

interface CollectionsTabsProps {
  active: string; // "complete" ou id da coleção
  onChange: (id: string) => void;
}

export default function CollectionsTabs({ active, onChange }: CollectionsTabsProps) {
  const items = [
    { id: "complete", label: "Bíblia Completa", emoji: "📖" },
    ...CURATED_COLLECTIONS.map((c) => ({ id: c.id, label: c.label, emoji: c.emoji })),
  ];

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible"
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
              group inline-flex items-center gap-2 whitespace-nowrap rounded-full
              px-4 py-2 text-sm font-medium transition-all duration-200
              border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent
              focus-visible:ring-offset-2 focus-visible:ring-offset-background
              ${
                isActive
                  ? "bg-accent text-accent-foreground border-accent shadow-md shadow-accent/20"
                  : "bg-card text-foreground border-border hover:border-accent/50 hover:text-accent"
              }
            `}
          >
            <span aria-hidden="true" className="text-base leading-none">
              {item.emoji}
            </span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

import { type Page } from "./Navigation";
import { HandCoins, ChevronRight } from "lucide-react";

interface SupportButtonProps {
  onNavigate: (page: Page) => void;
}

export default function SupportButton({ onNavigate }: SupportButtonProps) {
  return (
    <button
      onClick={() => onNavigate("contribuicoes")}
      className="group relative inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gradient-to-r from-gold/15 to-gold-hover/10 pl-2.5 pr-4 py-2 text-gold backdrop-blur-md shadow-lg shadow-black/20 transition-all duration-300 hover:bg-gold/25 hover:border-gold/45 hover:shadow-xl hover:shadow-gold/20 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Apoie a obra - contribuições"
    >
      {/* Pulse sutil (menos intenso que o PrayerButton) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-gold/20 animate-ping"
        style={{ animationDuration: "4s" }}
      />

      {/* Ícone com container glass */}
      <span className="relative grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-white/20 shadow-inner transition-transform duration-300 group-hover:scale-110">
        <span className="text-base leading-none drop-shadow-sm" aria-hidden="true">
          <HandCoins className="h-4 w-4 text-gold" aria-hidden="true" />
        </span>
      </span>

      {/* Texto */}
      <span className="relative flex flex-col leading-tight">
        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-gold/70">
          Apoie
        </span>
        <span className="text-xs font-semibold tracking-tight">
          a Obra
        </span>
      </span>

      {/* Seta sutil no hover */}
      <svg
        aria-hidden="true"
        className="relative h-3 w-3 flex-shrink-0 opacity-0 -ml-1 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 text-gold"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}

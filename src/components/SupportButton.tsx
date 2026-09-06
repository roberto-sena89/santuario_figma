import { type Page } from "./Navigation";

interface SupportButtonProps {
  onNavigate: (page: Page) => void;
}

export default function SupportButton({ onNavigate }: SupportButtonProps) {
  return (
    <button
      onClick={() => onNavigate("contribuicoes")}
      className="group relative inline-flex flex-col items-center justify-center rounded-2xl border border-[#D4A24C]/20 bg-white px-6 py-4 text-center shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4A24C]/30 hover:shadow-xl hover:shadow-black/15 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Apoie a obra - contribuições"
    >
      {/* Texto centralizado — sem ícone, alinhamento impecável */}
      <span className="flex flex-col items-center gap-1 leading-none">
        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#B8860B]/60">
          Com gratidão
        </span>
        <span className="font-serif text-[14px] font-semibold tracking-tight text-gray-900">
          Apoie a Obra
        </span>
        <span className="mt-1 text-[11px] font-medium leading-relaxed text-gray-500">
          Sua semente frutifica
        </span>
      </span>
    </button>
  );
}
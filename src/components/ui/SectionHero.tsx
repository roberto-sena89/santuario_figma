import type { ReactNode } from "react";

/**
 * SectionHero — shell canônico dos heros com imagem de fundo.
 *
 * Unifica a casca repetida em ~8 páginas (section + img + overlay +
 * brilho dourado + container). O conteúdo interno (badge, h1, apoio)
 * continua por conta da página via `children`, com as classes originais
 * — a migração é pixel-equivalente por construção.
 *
 * Regra: hero novo usa SectionHero; não copiar a casca de outra página.
 * Exceções deliberadas: Home (hero landing 68vh) e páginas PageTitle
 * sem imagem (Quiz, Plano, Momento, Orações).
 */
interface SectionHeroProps {
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Posição do object-cover (ex.: "center 30%"). Padrão: "object-center". */
  imagePosition?: string;
  /** Classes extras na <img> (ex.: "opacity-70 saturate-[0.5]"). */
  imageClassName?: string;
  /** Overlay escuro: "br" (diagonal, padrão) ou "b" (vertical). */
  overlay?: "br" | "b";
  /** Container interno. Padrão: "relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16". */
  containerClassName?: string;
  /** Variante "compact": altura fixa (h-72 sm:h-96), conteúdo ao fundo. */
  variant?: "standard" | "compact";
  /** Opacidade do brilho dourado (0.28 padrão; Devocional usa 0.35). */
  glowOpacity?: number;
  label?: string;
  children: ReactNode;
}

const OVERLAYS = {
  br: "absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/70",
  b: "absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80",
} as const;

export default function SectionHero({
  image,
  imageWidth,
  imageHeight,
  imagePosition = "object-center",
  imageClassName = "",
  overlay = "br",
  containerClassName = "relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16",
  variant = "standard",
  glowOpacity = 0.28,
  label,
  children,
}: SectionHeroProps) {
  if (variant === "compact") {
    return (
      <section className="relative h-72 sm:h-96 overflow-hidden" aria-label={label}>
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={image}
            alt=""
            className={`w-full h-full object-cover ${imagePosition} ${imageClassName}`}
            loading="lazy"
            width={imageWidth}
            height={imageHeight}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-end pb-12 text-center px-4">
          {children}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden" aria-label={label}>
      <img
        src={image}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover ${imagePosition} ${imageClassName}`}
        loading="eager"
        width={imageWidth}
        height={imageHeight}
        aria-hidden="true"
      />
      <div className={OVERLAYS[overlay]} aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-20"
        aria-hidden="true"
        style={{ background: `radial-gradient(ellipse at center top, rgba(212,162,76,${glowOpacity}), transparent 70%)` }}
      />
      <div className={containerClassName}>{children}</div>
    </section>
  );
}

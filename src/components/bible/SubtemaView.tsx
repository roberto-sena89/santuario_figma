/**
 * Visualização imersiva de um subtema da coleção.
 * Inclui: hero verse, cards expansíveis, reflexão, oração e ações.
 */

import { useState, useRef, useEffect } from "react";
import type { Subtema, CollectionStyle } from "../../data/bibleCollections";
import { generateShareImage, shareImage } from "./ShareImage";

const FAV_KEY = "iegv_bible_collection_favs";

function readFavs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
  } catch {
    return [];
  }
}

interface SubtemaViewProps {
  subtema: Subtema;
  collectionLabel: string;
  collectionEmoji: string;
  collectionCurator: string;
  style: CollectionStyle;
  onNavigateToBook?: (book: number, chapter: number, verse: number) => void;
  /** Notifica o pai quando o usuário leu o subtema (após tempo mínimo de leitura). */
  onRead?: (id: string) => void;
}

const styleAccents: Record<CollectionStyle, {
  hero: string;
  heroBorder: string;
  card: string;
  cardBorder: string;
  cardHover: string;
  reflexao: string;
  oracao: string;
  deco: string;
}> = {
  mulher: {
    hero: "bg-gradient-to-br from-[#E8B4B8]/15 via-[#C9A84C]/10 to-transparent",
    heroBorder: "border-[#E8B4B8]/30",
    card: "bg-gradient-to-br from-card to-[#E8B4B8]/5",
    cardBorder: "border-[#E8B4B8]/20",
    cardHover: "hover:border-[#E8B4B8]/60 hover:shadow-lg hover:shadow-[#E8B4B8]/10",
    reflexao: "from-[#E8B4B8]/10 to-transparent border-[#E8B4B8]/30",
    oracao: "from-[#C9A84C]/10 to-transparent border-[#C9A84C]/30",
    deco: "🌸",
  },
  homem: {
    hero: "bg-gradient-to-br from-[#2C5F7A]/15 via-[#8B7D3C]/10 to-transparent",
    heroBorder: "border-[#2C5F7A]/30",
    card: "bg-gradient-to-br from-card to-[#2C5F7A]/5",
    cardBorder: "border-[#2C5F7A]/20",
    cardHover: "hover:border-[#2C5F7A]/60 hover:shadow-lg hover:shadow-[#2C5F7A]/10",
    reflexao: "from-[#2C5F7A]/10 to-transparent border-[#2C5F7A]/30",
    oracao: "from-[#8B7D3C]/10 to-transparent border-[#8B7D3C]/30",
    deco: "⚔️",
  },
  generico: {
    hero: "bg-gradient-to-br from-accent/15 to-transparent",
    heroBorder: "border-accent/30",
    card: "bg-card",
    cardBorder: "border-border",
    cardHover: "hover:border-accent/40 hover:shadow-md",
    reflexao: "from-accent/10 to-transparent border-accent/30",
    oracao: "from-accent/10 to-transparent border-accent/30",
    deco: "✨",
  },
};

export default function SubtemaView({
  subtema,
  collectionLabel,
  collectionEmoji,
  collectionCurator,
  style,
  onNavigateToBook,
  onRead,
}: SubtemaViewProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const c = styleAccents[style];

  // Marca o subtema como lido após 5s de leitura (tempo mínimo pra ler hero + reflexão)
  useEffect(() => {
    if (!onRead) return;
    const t = setTimeout(() => onRead(subtema.id), 5000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtema.id]);

  // Favoritos: sincroniza com localStorage toda vez que o subtema muda
  const [favorited, setFavorited] = useState<boolean>(false);
  useEffect(() => {
    setFavorited(readFavs().includes(subtema.id));
  }, [subtema.id]);

  const isFav = favorited;

  const toggleFavorite = () => {
    const ids = readFavs();
    const next = ids.includes(subtema.id)
      ? ids.filter((x: string) => x !== subtema.id)
      : [...ids, subtema.id];
    localStorage.setItem(FAV_KEY, JSON.stringify(next));
    setFavorited(!ids.includes(subtema.id));
  };

  const copyAll = async () => {
    const lines = [
      `${collectionEmoji} ${collectionLabel} — ${subtema.titulo}`,
      "",
      `✦ Versículo em destaque`,
      `"${subtema.versiculoDestaque.texto}"`,
      `— ${subtema.versiculoDestaque.referencia}`,
      "",
      `✦ Versículos complementares`,
      ...subtema.versiculos.map(
        (v) => `"${v.texto}" — ${v.referencia}`
      ),
      "",
      `📖 Reflexão`,
      subtema.reflexao,
      "",
      `🙏 Oração`,
      subtema.oracao,
      "",
      `— ${collectionCurator}`,
    ].join("\n\n");
    try {
      await navigator.clipboard.writeText(lines);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  };

  const handleShare = async () => {
    if (sharing) return;
    setSharing(true);
    setShareFeedback(null);
    try {
      const blob = await generateShareImage({
        collectionLabel,
        collectionEmoji,
        subtema,
        curator: collectionCurator,
        style,
      });
      const result = await shareImage(blob, `${subtema.titulo}.png`);
      if (result === "copied") {
        setShareFeedback("Link copiado!");
      } else if (result === "downloaded") {
        setShareFeedback("Imagem baixada!");
      } else {
        setShareFeedback("Compartilhar aberto!");
      }
      setTimeout(() => setShareFeedback(null), 3000);
    } catch (err) {
      setShareFeedback("Erro ao compartilhar");
      setTimeout(() => setShareFeedback(null), 3000);
    } finally {
      setSharing(false);
    }
  };

  return (
    <article
      aria-live="polite"
      className="space-y-8 animate-in fade-in duration-500"
    >
      {/* Hero Verse */}
      <header
        className={`
          relative overflow-hidden rounded-2xl border p-8 sm:p-12
          ${c.hero} ${c.heroBorder}
        `}
      >
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 text-4xl opacity-20"
        >
          {c.deco}
        </span>
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-4">
          Versículo em destaque
        </p>
        <blockquote className="font-bible text-2xl sm:text-3xl lg:text-4xl italic leading-[1.4] text-foreground text-balance">
          <span className="text-accent/70 not-italic font-serif">“</span>
          {subtema.versiculoDestaque.texto}
          <span className="text-accent/70 not-italic font-serif">”</span>
        </blockquote>
        <p className="mt-4 text-sm font-semibold text-accent tracking-wide">
          — {subtema.versiculoDestaque.referencia}
        </p>
      </header>

      {/* Versículos complementares (cards expansíveis) */}
      <section aria-labelledby="versiculos-complementares">
        <h2
          id="versiculos-complementares"
          className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-muted-foreground mb-4"
        >
          Versículos complementares
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {subtema.versiculos.map((v, idx) => {
            const isExpanded = expandedCard === idx;
            return (
              <div
                key={idx}
                ref={(el) => { cardRefs.current[idx] = el; }}
                className={`
                  rounded-2xl border p-5 sm:p-6 transition-all duration-300
                  ${c.card} ${c.cardBorder} ${c.cardHover}
                `}
              >
                <p
                  className={`font-bible text-base sm:text-lg leading-[1.6] text-foreground/90 ${
                    isExpanded ? "" : "line-clamp-3"
                  }`}
                >
                  <span className="text-accent/60 not-italic font-serif">“</span>
                  {v.texto}
                  <span className="text-accent/60 not-italic font-serif">”</span>
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs font-semibold text-accent">
                    — {v.referencia}
                  </p>
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : idx)}
                    className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:underline"
                    aria-expanded={isExpanded}
                    aria-label={isExpanded ? "Recolher versículo" : "Ver versículo completo"}
                  >
                    {isExpanded ? "Recolher ▲" : "Ver mais ▸"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Reflexão */}
      <section
        className={`
          relative overflow-hidden rounded-2xl border p-6 sm:p-8
          bg-gradient-to-r ${c.reflexao}
        `}
        aria-labelledby="reflexao-titulo"
      >
        <h2
          id="reflexao-titulo"
          className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-foreground/80 mb-3 flex items-center gap-2"
        >
          <span aria-hidden="true">📖</span> Reflexão
        </h2>
        <p className="text-foreground/90 leading-relaxed text-[15px] sm:text-base">
          {subtema.reflexao}
        </p>
      </section>

      {/* Oração */}
      <section
        className={`
          relative overflow-hidden rounded-2xl border p-6 sm:p-8
          bg-gradient-to-r ${c.oracao}
        `}
        aria-labelledby="oracao-titulo"
      >
        <h2
          id="oracao-titulo"
          className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-foreground/80 mb-3 flex items-center gap-2"
        >
          <span aria-hidden="true">🙏</span> Oração
        </h2>
        <p className="font-bible text-[17px] sm:text-lg italic leading-[1.7] text-foreground/90">
          {subtema.oracao}
        </p>
      </section>

      {/* Ações */}
      <section
        className="sticky bottom-4 z-10 flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-card/80 border border-border backdrop-blur-md shadow-lg shadow-black/20"
        aria-label="Ações do subtema"
      >
        <button
          onClick={handleShare}
          disabled={sharing}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-[#D4A24C]/45 bg-gradient-to-r from-[#D4A24C]/20 to-[#C4933C]/12 px-4 text-[12px] font-semibold tracking-[0.02em] text-[#D4A24C] shadow-sm shadow-black/20 transition-all duration-200 hover:border-[#D4A24C]/60 hover:from-[#D4A24C]/25 hover:to-[#C4933C]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Compartilhar imagem do subtema"
        >
          {sharing ? (
            <>
              <span
                className="inline-block w-3 h-3 border-2 border-[#D4A24C] border-t-transparent rounded-full animate-spin"
                aria-hidden="true"
              />
              Gerando...
            </>
          ) : shareFeedback ? (
            <>✓ {shareFeedback}</>
          ) : (
            <>Compartilhar</>
          )}
        </button>
        <button
          onClick={toggleFavorite}
          className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-full border px-4 text-[12px] font-semibold tracking-[0.02em] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            isFav
              ? "border-[#D4A24C]/45 bg-gradient-to-r from-[#D4A24C]/20 to-[#C4933C]/12 text-[#D4A24C] shadow-sm shadow-black/20"
              : "border-border bg-card text-foreground hover:border-[#D4A24C]/40 hover:text-[#D4A24C]"
          }`}
          aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          aria-pressed={isFav}
        >
          {isFav ? "Favoritado" : "Favoritar"}
        </button>
        <button
          onClick={copyAll}
          className="inline-flex h-9 items-center justify-center rounded-full border border-border bg-card px-4 text-[12px] font-semibold tracking-[0.02em] text-foreground transition-all duration-200 hover:border-[#D4A24C]/40 hover:text-[#D4A24C] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Copiar todo o conteúdo do subtema"
        >
          {copied ? <>✓ Copiado!</> : <>Copiar tudo</>}
        </button>
      </section>
    </article>
  );
}

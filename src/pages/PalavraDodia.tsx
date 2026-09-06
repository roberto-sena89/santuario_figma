import { useState } from "react";
import {
  getPalavraDoDia,
  getVersiculosDoTema,
} from "../data/palavraDoDia";
import type { Page } from "../components/Navigation";

interface Props {
  onNavigate: (page: Page) => void;
}

export default function PalavraDodia({ onNavigate }: Props) {
  const todayVerse = getPalavraDoDia();
  const related = getVersiculosDoTema(todayVerse.theme, 4, todayVerse.ref);
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const text = `"${todayVerse.text}" — ${todayVerse.ref}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Palavra do Dia", text });
      } catch {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        /* ignore */
      }
    }
  };

  const copyVerse = async () => {
    try {
      await navigator.clipboard.writeText(
        `"${todayVerse.text}" — ${todayVerse.ref}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  };

  const dateStr = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      {/* Hero card */}
      <section
        className="relative py-12 sm:py-14 overflow-hidden"
        aria-label="Versículo do dia"
      >
        <img
          src="/fotos/palavra%20do%20dia/2.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <p className="inline-flex items-center justify-center rounded-full border border-[#D4A24C]/25 bg-gradient-to-r from-[#D4A24C]/15 to-[#C4933C]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4A24C] mb-3 shadow-md shadow-black/20 backdrop-blur-sm">
            Palavra do Dia
          </p>
          <div className="mt-1 flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-white/20" />
            <time
              className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/70"
              dateTime={new Date().toISOString().split("T")[0]}
            >
              {dateStr}
            </time>
            <span aria-hidden="true" className="h-px w-8 bg-white/20" />
          </div>

          <blockquote className="mt-5 mb-4">
            <p className="font-display text-xl sm:text-2xl lg:text-3xl font-normal text-white leading-relaxed italic [text-shadow:0_2px_14px_rgba(0,0,0,0.85)]">
              "{todayVerse.text}"
            </p>
          </blockquote>

          <cite className="not-italic block text-white font-semibold text-base tracking-[0.06em] [text-shadow:0_1px_8px_rgba(0,0,0,0.85)]">
            {todayVerse.ref}
          </cite>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <button
              onClick={copyVerse}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D4A24C]/25 bg-gradient-to-r from-[#D4A24C]/15 to-[#C4933C]/10 px-5 text-sm font-semibold text-[#D4A24C] shadow-md shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:border-[#D4A24C]/45 hover:from-[#D4A24C]/25 hover:to-[#C4933C]/20 hover:shadow-lg hover:shadow-[#D4A24C]/20 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copiado!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copiar versículo
                </>
              )}
            </button>
            <button
              onClick={share}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/15 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Compartilhar
            </button>
          </div>
        </div>
      </section>

      {/* Versículos relacionados — mesmo tema do dia */}
      <section className="py-16 bg-background" aria-label="Versículos relacionados">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-accent mb-2">
            Mesmo tema
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-2">
            Mais sobre {todayVerse.theme.toLowerCase()}
          </h2>
          <p className="text-muted-foreground text-sm mb-10">
            Continue medindo o coração pela Palavra — outros versículos que falam sobre o tema de hoje.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {related.map((verse, i) => (
              <article
                key={`${verse.ref}-${i}`}
                className="group rounded-xl border border-border bg-background/40 p-5 transition-colors duration-200 hover:border-[#D4A24C]/35"
              >
                <p className="bible-verse-text mb-3">{verse.text}</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold tracking-wide text-[#D4A24C]">
                    {verse.ref}
                  </span>
                  <span className="text-[10.5px] font-semibold text-[#D4A24C]/70">
                    #{verse.theme}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

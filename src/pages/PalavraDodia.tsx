import { useState } from "react";
import { DAILY_VERSES, getDailyVerse } from "../data/verses";
import type { Page } from "../components/Navigation";

interface Props {
  onNavigate: (page: Page) => void;
}

export default function PalavraDodia({ onNavigate }: Props) {
  const todayVerse = getDailyVerse();
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const text = `"${todayVerse.text}" — ${todayVerse.reference}`;
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
        `"${todayVerse.text}" — ${todayVerse.reference}`
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
      <section className="bg-primary py-20" aria-label="Versículo do dia">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-accent/40 px-4 py-1.5 text-accent text-xs font-semibold uppercase tracking-[0.18em] mb-3 backdrop-blur-sm">
                                <span aria-hidden="true">📖</span>
                                Palavra do Dia
                              </p>
          <time
            className="text-primary-foreground/50 text-sm capitalize"
            dateTime={new Date().toISOString().split("T")[0]}
          >
            {dateStr}
          </time>

          <blockquote className="mt-8 mb-6">
            <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-primary-foreground leading-relaxed italic">
              "{todayVerse.text}"
            </p>
          </blockquote>

          <cite className="not-italic text-accent font-semibold text-lg">
            {todayVerse.reference}
          </cite>

          <div className="inline-block bg-accent/20 border border-accent/30 text-accent text-xs font-medium px-3 py-1 rounded-full mt-3 ml-3">
            {todayVerse.theme}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <button
              onClick={copyVerse}
              className="flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
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
              className="flex items-center justify-center gap-2 border border-primary-foreground/20 hover:border-primary-foreground/40 text-primary-foreground font-medium px-6 py-3 rounded-lg text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Compartilhar
            </button>
            <button
              onClick={() => onNavigate("biblia")}
              className="flex items-center justify-center gap-2 border border-primary-foreground/20 hover:border-primary-foreground/40 text-primary-foreground font-medium px-6 py-3 rounded-lg text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Ver no contexto bíblico
            </button>
          </div>
        </div>
      </section>

      {/* Other verses */}
      <section className="py-16 bg-background" aria-label="Mais versículos">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-2">
            Versículos para reflexão
          </h2>
          <p className="text-muted-foreground text-sm mb-10">
            Um acervo de versículos que renovam a fé e fortalecem o coração.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {DAILY_VERSES.filter((v) => v.reference !== todayVerse.reference)
              .slice(0, 8)
              .map((verse, i) => (
                <blockquote
                  key={i}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-md hover:border-accent/30 transition-all"
                >
                  <div className="inline-block bg-accent/10 text-accent text-xs font-medium px-2.5 py-0.5 rounded-full mb-3">
                    {verse.theme}
                  </div>
                  <p className="font-display text-foreground text-base italic leading-relaxed mb-4">
                    "{verse.text}"
                  </p>
                  <cite className="not-italic text-muted-foreground text-sm font-medium">
                    — {verse.reference}
                  </cite>
                </blockquote>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}

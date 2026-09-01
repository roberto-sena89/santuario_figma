import { useState } from "react";
import { getDailyDevotional, getAllDevotionals } from "../data/devotionals";
import PageTitle from "../components/ui/PageTitle";

export default function Devocional() {
  const today = getDailyDevotional();
  const all = getAllDevotionals();
  const [selected, setSelected] = useState<number>(new Date().getDay());
  const [copied, setCopied] = useState(false);

  const current = all[selected];

  const share = async () => {
    const text = `${current.title}\n\n"${current.verse}" — ${current.verseRef}\n\n${current.body.slice(0, 200)}...`;
    if (navigator.share) {
      try {
        await navigator.share({ title: current.title, text });
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

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageTitle
                  eyebrow="Devocional Diario"
                  eyebrowIcon="🕊️"
                  title="Momento com Deus"
                  subtitle="Reflexoes diarias para edificacao espiritual e aproximacao com Deus."
                  subtitleIcon="☀️"
                  align="left"
                />

        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Day selector */}
          <aside>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-4 border-b border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Selecionar Dia
                </p>
              </div>
              <div className="divide-y divide-border">
                {all.map((d, i) => {
                  const isToday = i === new Date().getDay();
                  return (
                    <button
                      key={i}
                      onClick={() => setSelected(i)}
                      className={`w-full text-left px-4 py-3.5 flex items-center justify-between text-sm transition-colors ${
                        selected === i
                          ? "bg-accent/10 text-accent font-semibold"
                          : "text-foreground hover:bg-muted"
                      }`}
                      aria-current={selected === i ? "true" : undefined}
                    >
                      <span>{d.date}</span>
                      {isToday && (
                        <span className="text-xs bg-accent text-white px-1.5 py-0.5 rounded font-medium">
                          Hoje
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Content */}
          <article className="min-w-0">
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-primary px-8 py-10">
                <div className="inline-block bg-accent/20 border border-accent/30 text-accent text-xs font-medium px-3 py-1 rounded-full mb-4">
                  {current.theme}
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-light text-primary-foreground mb-6">
                  {current.title}
                </h2>
                <blockquote className="border-l-2 border-accent pl-5">
                  <p className="font-display text-lg italic text-primary-foreground/90 leading-relaxed mb-2">
                    "{current.verse}"
                  </p>
                  <cite className="not-italic text-accent font-medium text-sm">
                    {current.verseRef}
                  </cite>
                </blockquote>
              </div>

              {/* Body */}
              <div className="px-8 py-10">
                <div className="prose max-w-none">
                  {current.body.split("\n\n").map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-foreground text-base leading-relaxed mb-5 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Prayer */}
                <div className="mt-10 bg-accent/5 border border-accent/20 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="font-semibold text-foreground text-sm uppercase tracking-wide">
                      Oração do Dia
                    </span>
                  </div>
                  <p className="text-foreground/80 text-sm italic leading-relaxed">
                    {current.prayer}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-8">
                  <button
                    onClick={share}
                    className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors"
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Compartilhar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Day navigation */}
            <div className="flex gap-3 mt-4">
              {selected > 0 && (
                <button
                  onClick={() => setSelected((s) => s - 1)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {all[selected - 1]?.date}
                </button>
              )}
              {selected < all.length - 1 && (
                <button
                  onClick={() => setSelected((s) => s + 1)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors ml-auto"
                >
                  {all[selected + 1]?.date}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}

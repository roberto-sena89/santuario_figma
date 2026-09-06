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

        <article className="min-w-0">
            {/* Header */}
            <h2 className="font-display text-2xl sm:text-3xl font-light text-primary-foreground mb-6">
              {current.title}
            </h2>
            <blockquote className="border-l-2 border-accent pl-5">
              <p className="font-display text-lg italic text-primary-foreground/90 leading-relaxed mb-2">
                "{current.verse}"
              </p>
              <cite className="not-italic text-accent font-medium text-sm">
                {current.venueRef}
              </cite>
            </blockquote>
          </article>
      </div>
    </main>
  );
}

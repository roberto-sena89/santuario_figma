import { MINISTERIOS, type Ministry } from "../data/ministerios";
import PageTitle from "../components/ui/PageTitle";
import type { Page } from "../components/Navigation";

interface MinisteriosProps {
  onNavigate: (page: Page) => void;
}

export default function Ministerios({ onNavigate }: MinisteriosProps) {
  // Card abre a página dedicada de cada ministério
  const handleCardClick = (m: Ministry) => {
    if (m.id === "evangelismo") {
      onNavigate("missoes");
      return;
    }
    onNavigate("ministerios");
    window.location.hash = `#/ministerios/${m.id}`;
  };

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
                <PageTitle
                  eyebrow="Comunidade"
                  title="Nossos Ministerios"
                  subtitle="Cada ministerio e um braco do corpo de Cristo em acao. Conheca como voce pode contribuir e encontrar seu lugar na nossa familia."
                  align="left"
                />

        {/* Ministry grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {MINISTERIOS.map((m) => (
            <article key={m.id} id={`ministry-card-${m.id}`} className="scroll-mt-24" aria-labelledby={`ministry-${m.id}-nome`}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card/80 p-6 transition-all duration-300 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-0.5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 ring-1 ring-black/5"
                  style={{
                    backgroundColor: `${m.color}18`,
                    color: m.color,
                    boxShadow: `0 4px 14px -6px ${m.color}50`,
                  }}
                  aria-hidden="true"
                >
                  <m.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 id={`ministry-${m.id}-nome`} className="font-display font-semibold text-foreground text-lg mb-2">
                  {m.name}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {m.description}
                </p>
                <button
                  onClick={() => handleCardClick(m)}
                  aria-label={`Conhecer o ministério de ${m.name}`}
                  className="mt-auto inline-flex items-center gap-2 self-start rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold-light transition-all duration-200 hover:bg-gold/20 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                >
                  Conhecer ministério
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}




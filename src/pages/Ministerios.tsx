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
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
                <PageTitle
                  eyebrow="Comunidade"
                  eyebrowIcon="🤝"
                  title="Nossos Ministerios"
                  subtitle="Cada ministerio e um braco do corpo de Cristo em acao. Conheca como voce pode contribuir e encontrar seu lugar na nossa familia."
                  subtitleIcon="👥"
                  align="left"
                />

        {/* Ministry grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {MINISTERIOS.map((m) => (
            <article key={m.id} id={`ministry-card-${m.id}`} className="scroll-mt-24">
              <button
                              onClick={() => handleCardClick(m)}
                              className="group w-full text-left bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 transition-all duration-300 hover:border-[#D4A24C]/40 hover:shadow-lg hover:shadow-[#D4A24C]/10 hover:-translate-y-0.5"
                            >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${m.color}18`,
                    color: m.color,
                    boxShadow: `0 4px 14px -6px ${m.color}50`,
                  }}
                  aria-hidden="true"
                >
                  {m.icon}
                </div>
                <h2 className="font-display font-semibold text-foreground text-lg mb-2">
                  {m.name}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {m.description}
                </p>
                <div
                                  className="mt-4 flex items-center gap-2 text-sm font-medium transition-colors duration-200 group-hover:translate-x-0.5"
                                  style={{ color: m.color }}
                                >
                                  Conhecer ministério
                                  <svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </button>
                            </article>
                          ))}
                        </div>
                      </div>
                    </main>
                  );
                }

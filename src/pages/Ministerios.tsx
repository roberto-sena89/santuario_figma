import { useState } from "react";
import { MINISTERIOS, type Ministry } from "../data/ministerios";
import { CHURCH } from "../data/church";
import PageTitle from "../components/ui/PageTitle";

export default function Ministerios() {
  const [selected, setSelected] = useState<Ministry | null>(null);

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
            <article key={m.id}>
              <button
                onClick={() => setSelected(selected?.id === m.id ? null : m)}
                className={`group w-full text-left bg-card/80 backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 ${
                  selected?.id === m.id
                    ? "border-[#D4A24C]/60 shadow-lg shadow-[#D4A24C]/10"
                    : "border-border hover:border-[#D4A24C]/40 hover:shadow-lg hover:shadow-[#D4A24C]/10 hover:-translate-y-0.5"
                }`}
                aria-expanded={selected?.id === m.id}
                aria-controls={`ministry-${m.id}-detail`}
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
                  className="mt-4 flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                  style={{ color: m.color }}
                >
                  {selected?.id === m.id ? "Ver menos" : "Saiba mais"}
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      selected?.id === m.id
                        ? "rotate-180"
                        : "group-hover:translate-x-0.5"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            </article>
          ))}
        </div>

        {/* Detail panel */}
                {selected && (
                  <div
                    id={`ministry-${selected.id}-detail`}
                    className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl overflow-hidden shadow-lg shadow-black/5"
                    role="region"
                    aria-label={`Detalhes: ${selected.name}`}
                  >
                    <div className="p-2" style={{ backgroundColor: `${selected.color}15` }}>
                      <div className="flex items-center gap-4 p-4">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ring-1 ring-black/5 shadow-sm"
                          style={{ backgroundColor: `${selected.color}25`, color: selected.color }}
                          aria-hidden="true"
                        >
                          {selected.icon}
                        </div>
                        <div>
                          <h2 className="font-display text-2xl font-semibold text-foreground">
                            {selected.name}
                          </h2>
                          <p className="text-muted-foreground text-sm">
                            Líder: {selected.leader}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelected(null)}
                          className="ml-auto w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
                          aria-label="Fechar detalhes"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 grid sm:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold text-foreground mb-3">Sobre o ministério</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {selected.description}
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <svg className="w-4 h-4 text-[#D4A24C] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Reunião</p>
                            <p className="text-foreground text-sm">
                              {selected.meetingDay} às {selected.meetingTime}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-4 h-4 text-[#D4A24C] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Liderança</p>
                            <p className="text-foreground text-sm">{selected.leader}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-4 h-4 text-[#D4A24C] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Contato</p>
                            <a
                              href={`mailto:${selected.contact}`}
                              className="text-[#D4A24C] hover:underline text-sm"
                            >
                              {selected.contact}
                            </a>
                          </div>
                        </div>
                        <a
                          href={`https://wa.me/${CHURCH.whatsapp}?text=${encodeURIComponent(
                            `Olá! Tenho interesse no ${selected.name}. Poderia me informar mais?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition-colors mt-2"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.099 1.523 5.82L0 24l6.334-1.5C8.024 23.427 9.979 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.983 0-3.847-.535-5.455-1.47l-.393-.228-4.003.949.964-3.87-.253-.407A9.776 9.776 0 012.182 12C2.182 6.59 6.59 2.182 12 2.182 17.41 2.182 21.818 6.59 21.818 12c0 5.41-4.408 9.818-9.818 9.818z" />
                          </svg>
                          Entrar em contato
                        </a>
                      </div>
                    </div>
                  </div>
                )}
      </div>
    </main>
  );
}

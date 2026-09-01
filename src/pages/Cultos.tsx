import PageTitle from "../components/ui/PageTitle";
import { getEscala, formatSemana, isoWeek, PAPEIS_POR_DIA, papelParaLista, EMOJI_DIA } from "../data/escala";

export default function Cultos() {
  const semanaAtual = isoWeek(new Date());
  const escala = getEscala(semanaAtual);

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
                <PageTitle
                  eyebrow="Programacao"
                  eyebrowIcon="📅"
                  title="Agenda Semanal"
                  subtitle="Nossa programacao semanal e os proximos eventos especiais. Venha fazer parte desta comunidade!"
                  subtitleIcon="🕐"
                  align="left"
                />

        {/* Escala da semana atual */}
        <section aria-label="Escala da semana" className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-[#D4A24C]/15 text-xl shadow-sm shadow-[#D4A24C]/20 ring-1 ring-[#D4A24C]/20">
              📋
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Escala da Semana
              </h2>
              <p className="text-sm text-muted-foreground">
                {formatSemana(semanaAtual)}
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {escala.dias
              .filter((dia) => {
                const papeis = PAPEIS_POR_DIA[dia.key] ?? [];
                return papeis.some((p) => papelParaLista(dia.papeis[p.key]).length > 0);
              })
              .map((dia) => {
              const papeis = PAPEIS_POR_DIA[dia.key] ?? [];
              return (
                <div
                  key={dia.key}
                  className="overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#D4A24C]/10 hover:border-[#D4A24C]/30"
                >
                  <div className="flex items-center gap-3 px-5 py-4 border-b border-border/60 bg-gradient-to-r from-[#D4A24C]/10 via-transparent to-transparent">
                                      <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-[#D4A24C]/15 text-lg shadow-sm shadow-[#D4A24C]/20 ring-1 ring-[#D4A24C]/25" aria-hidden="true">
                                        {EMOJI_DIA[dia.key] ?? "📅"}
                                      </span>
                                      <div className="min-w-0">
                                        <h3 className="font-display text-lg font-semibold leading-tight tracking-tight text-foreground">
                                          {dia.titulo}
                                        </h3>
                                        <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                                          <span className="text-[#B8860B] dark:text-[#E8B35E]" aria-hidden="true">🕐</span>
                                          {dia.dia} às {dia.horario}
                                        </div>
                                      </div>
                                      </div>

                  <div className="px-5 py-4">
                    {papeis.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Sem escala nesta semana.
                      </p>
                    ) : (
                      <ul className="space-y-2.5">
                                              {papeis
                                                .filter((papel) => papelParaLista(dia.papeis[papel.key]).length > 0)
                                                .map((papel) => {
                                                                        const nomes = papelParaLista(dia.papeis[papel.key]);
                                                                        return (
                                                                          <li
                                                                            key={papel.key}
                                                                            className="flex items-center justify-between gap-3"
                                                                          >
                                                                            <span className="text-xs font-medium text-muted-foreground">
                                                                              {papel.label}
                                                                            </span>
                                                                            <span className="flex flex-wrap justify-end gap-1">
                                                                                {nomes.map((nome) => (
                                                                                  <span
                                                                                    key={nome}
                                                                                    className="inline-flex items-center gap-1 rounded-full bg-[#D4A24C]/10 px-3 py-1 text-xs font-medium text-[#B8860B] ring-1 ring-[#D4A24C]/25 dark:text-[#E8B35E]"
                                                                                  >
                                                                                    <span
                                                                                      className="h-1.5 w-1.5 rounded-full bg-[#D4A24C]"
                                                                                      aria-hidden="true"
                                                                                    />
                                                                                    {nome}
                                                                                  </span>
                                                                                ))}
                                                                              </span>
                                                                          </li>
                                                                        );
                                                                      })}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

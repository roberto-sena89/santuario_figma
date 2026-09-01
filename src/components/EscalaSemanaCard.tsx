import { getEscala, formatSemana, isoWeek, PAPEIS_POR_DIA, papelParaLista, EMOJI_DIA } from "../data/escala";

/**
 * Card compacto "Escala da Semana" — mostra os papéis definidos no painel
 * admin para a semana atual. Usado na Home ao lado da Bíblia.
 */
export default function EscalaSemanaCard() {
  const semana = isoWeek(new Date());
  const escala = getEscala(semana);

  return (
    <section aria-label="Escala da semana" className="mb-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl bg-[#D4A24C]/15 text-lg shadow-sm shadow-[#D4A24C]/20 ring-1 ring-[#D4A24C]/20" aria-hidden="true">
          📋
        </span>
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Escala da Semana
          </h2>
          <p className="text-sm text-muted-foreground">
            {formatSemana(semana)}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-1">
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
                  <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    <span className="text-[#B8860B] dark:text-[#E8B35E]" aria-hidden="true">🕐</span>
                    {dia.dia} às {dia.horario}
                  </div>
                </div>
              </div>

              <div className="px-5 py-4">
                {papeis.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Sem escala nesta semana.</p>
                ) : (
                  <ul className="space-y-3">
                    {papeis
                      .filter((papel) => papelParaLista(dia.papeis[papel.key]).length > 0)
                      .map((papel) => {
                        const nomes = papelParaLista(dia.papeis[papel.key]);
                        return (
                          <li key={papel.key} className="flex items-center justify-between gap-3">
                            <span className="text-[13px] font-semibold text-foreground/70">
                              {papel.label}
                            </span>
                            <span className="flex flex-wrap justify-end gap-1.5">
                              {nomes.map((nome) => (
                                <span
                                  key={nome}
                                  className="inline-flex items-center gap-1.5 rounded-full bg-[#D4A24C]/12 px-3.5 py-1.5 text-[13px] font-medium text-[#C4933C] ring-1 ring-[#D4A24C]/30 dark:text-[#E8B35E]"
                                >
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4A24C]" aria-hidden="true" />
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
  );
}

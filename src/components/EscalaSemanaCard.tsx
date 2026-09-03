import { useState, useEffect } from "react";
import { getEscala, formatSemana, isoWeek, PAPEIS_POR_DIA, papelParaLista, EMOJI_DIA, ORDEM_DIAS, DIAS_SEMANA_OPCOES } from "../data/escala";

/**
 * Card compacto "Escala da Semana" — mostra os papéis definidos no painel
 * admin para a semana atual. Usado na Home ao lado da Bíblia.
 */
export default function EscalaSemanaCard() {
  const [semana, setSemana] = useState(() => isoWeek(new Date()));
  const [escala, setEscala] = useState(() => getEscala(isoWeek(new Date())));
  useEffect(() => {
    const refresh = () => {
      const s = isoWeek(new Date());
      setSemana(s);
      setEscala(getEscala(s));
    };
    const onStorage = (e: StorageEvent) => {
      if (!e.key || e.key.includes("santuario")) refresh();
    };
    window.addEventListener("santuario:escala-updated", refresh as EventListener);
    window.addEventListener("storage", onStorage);
    // também atualiza ao voltar para a aba
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") refresh(); });
    return () => {
      window.removeEventListener("santuario:escala-updated", refresh as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

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
        {(() => {
          // todos os eventos da semana — mesmo sem escala preenchida
          const ordemPorDia: Record<string, number> = {};
          DIAS_SEMANA_OPCOES.forEach(o => ordemPorDia[o.label] = ORDEM_DIAS[o.key] ?? 99);
          const filtrados = escala.dias;
          const grupos = new Map<string, typeof filtrados>();
          for (const d of filtrados) {
            const g = grupos.get(d.dia) ?? [];
            g.push(d);
            grupos.set(d.dia, g);
          }
          const gruposOrdenados = Array.from(grupos.entries()).sort((a,b) => {
            const oa = ordemPorDia[a[0]] ?? 99;
            const ob = ordemPorDia[b[0]] ?? 99;
            return oa - ob;
          });
          gruposOrdenados.forEach(([,arr]) => arr.sort((a,b)=>a.horario.localeCompare(b.horario)));
          if (gruposOrdenados.length === 0) return <p className="text-sm text-muted-foreground">Nenhum evento cadastrado nesta semana.</p>;
          return gruposOrdenados.map(([diaLabel, dias]) => {
            const baseKey = DIAS_SEMANA_OPCOES.find(o=>o.label===diaLabel)?.key ?? dias[0].key.split("-")[0];
            return (
            <div
              key={diaLabel}
              className="overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#D4A24C]/10 hover:border-[#D4A24C]/30"
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border/60 bg-gradient-to-r from-[#D4A24C]/10 via-transparent to-transparent">
                <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-[#D4A24C]/15 text-lg shadow-sm shadow-[#D4A24C]/20 ring-1 ring-[#D4A24C]/25" aria-hidden="true">
                  {EMOJI_DIA[baseKey] ?? "📅"}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold leading-tight tracking-tight text-foreground">
                    {diaLabel}
                  </h3>
                  <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    <span className="text-[#B8860B] dark:text-[#E8B35E]" aria-hidden="true">🕐</span>
                    {dias.length === 1 ? `${dias[0].horario}` : `${dias.length} horários`}
                  </div>
                </div>
              </div>

              <div className="divide-y divide-border/40">
                {dias.map((dia) => {
                  const papeis = PAPEIS_POR_DIA[dia.key] ?? PAPEIS_POR_DIA[dia.key.split("-")[0]] ?? [];
                  const temEscala = papeis.some(p => papelParaLista(dia.papeis[p.key]).length > 0);
                  return (
                    <div key={dia.key} className="px-5 py-4">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-[#D4A24C]/10 border border-[#D4A24C]/20 px-2.5 py-1 text-xs font-semibold tracking-wide text-[#B8860B] dark:text-[#E8B35E]">{dia.horario}</span>
                        <span className="text-[13px] font-medium text-foreground/80 truncate">{dia.titulo}</span>
                      </div>
                      {papeis.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Sem papéis definidos.</p>
                      ) : temEscala ? (
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
                      ) : (
                        <p className="text-xs italic text-muted-foreground">Escala a definir — edite em <span className="font-medium text-[#B8860B] dark:text-[#E8B35E]">#/admin</span></p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            );
          });
        })()}
      </div>
    </section>
  );
}

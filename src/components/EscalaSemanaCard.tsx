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
    <section aria-label="Escala da semana">
      <div className="flex items-center gap-2 mb-3">
        <span className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg bg-[#D4A24C]/12 text-sm ring-1 ring-[#D4A24C]/15" aria-hidden="true">
          📋
        </span>
        <div>
          <h2 className="font-display text-lg font-semibold leading-none text-foreground">
            Escala da Semana
          </h2>
          <p className="text-[11px] leading-none mt-1 text-muted-foreground">
            {formatSemana(semana)}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
              className="overflow-hidden rounded-lg border border-border/50 bg-card shadow-none transition-colors hover:border-[#D4A24C]/25"
            >
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border/40 bg-[#D4A24C]/[0.06]">
                <h3 className="font-display text-sm font-semibold leading-none text-foreground">
                  {diaLabel}
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {dias.length === 1 ? dias[0].horario : `${dias.length}×`}
                </span>
              </div>

              <div className="divide-y divide-border/30">
                {dias.map((dia) => {
                  const papeis = PAPEIS_POR_DIA[dia.key] ?? PAPEIS_POR_DIA[dia.key.split("-")[0]] ?? [];
                  const temEscala = papeis.some(p => papelParaLista(dia.papeis[p.key]).length > 0);
                  return (
                    <div key={dia.key} className="px-3 py-2">
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <span className="inline-flex items-center rounded-full bg-[#D4A24C]/10 border border-[#D4A24C]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#B8860B] dark:text-[#E8B35E]">{dia.horario}</span>
                        <span className="text-[11px] font-medium leading-none text-foreground/70 truncate">{dia.titulo}</span>
                      </div>
                      {papeis.length === 0 ? (
                        <p className="text-[11px] text-muted-foreground">Sem papéis.</p>
                      ) : temEscala ? (
                        <ul className="space-y-1.5">
                          {papeis
                            .filter((papel) => papelParaLista(dia.papeis[papel.key]).length > 0)
                            .map((papel) => {
                              const nomes = papelParaLista(dia.papeis[papel.key]);
                              return (
                                <li key={papel.key} className="flex items-center justify-between gap-2">
                                  <span className="text-[11px] font-medium text-foreground/60">
                                    {papel.label}
                                  </span>
                                  <span className="flex flex-wrap justify-end gap-1">
                                    {nomes.map((nome) => (
                                      <span
                                        key={nome}
                                        className="inline-flex items-center gap-1 rounded-full bg-[#D4A24C]/10 px-2 py-0.5 text-[11px] font-medium leading-none text-[#C4933C] ring-1 ring-[#D4A24C]/20 dark:text-[#E8B35E]"
                                      >
                                        <span className="h-1 w-1 rounded-full bg-[#D4A24C]" aria-hidden="true" />
                                        {nome}
                                      </span>
                                    ))}
                                  </span>
                                </li>
                              );
                            })}
                        </ul>
                      ) : (
                        <p className="text-[11px] italic text-muted-foreground">Escala a definir — edite em <span className="font-medium text-[#B8860B] dark:text-[#E8B35E]">#/escala</span></p>
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

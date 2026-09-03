import { useState, useEffect } from "react";
import { getEscala, formatSemana, isoWeek, mondayOfWeek, PAPEIS_POR_DIA, papelParaLista, EMOJI_DIA, ORDEM_DIAS, DIAS_SEMANA_OPCOES } from "../data/escala";

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
      <div className="mb-4 text-center">
        <h2 className="font-display text-lg font-semibold leading-none text-foreground">
          Escala da Semana
        </h2>
        <p className="text-[11px] leading-none mt-1.5 text-muted-foreground">
          {formatSemana(semana)}
        </p>
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
              <div className="flex items-center px-3 py-2.5 border-b border-border/40 bg-[#D4A24C]/[0.06]">
                <h3 className="font-display text-sm font-semibold leading-none text-foreground">
                  {diaLabel}
                </h3>
                {(() => {
                  const diasSemana = ["Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado","Domingo"];
                  const idx = diasSemana.indexOf(diaLabel);
                  if (idx >= 0) {
                    // Semana inicia na segunda-feira: segunda = mondayOfWeek, domingo = +6.
                    // Ex.: semana 2026-36 → seg 31/08 a dom 06/09.
                    const monday = mondayOfWeek(semana);
                    const d = new Date(Date.UTC(monday.getUTCFullYear(), monday.getUTCMonth(), monday.getUTCDate()));
                    d.setUTCDate(d.getUTCDate() + idx);
                    const dd = String(d.getUTCDate()).padStart(2, "0");
                    const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
                    return (
                      <span className="ml-1.5 text-[10px] font-medium text-muted-foreground tabular-nums">{dd}/{mm}</span>
                    );
                  }
                  return null;
                })()}
              </div>

              <div className="divide-y divide-border/30">
                {dias.map((dia) => {
                  const papeis = PAPEIS_POR_DIA[dia.key] ?? PAPEIS_POR_DIA[dia.key.split("-")[0]] ?? [];
                  const temEscala = papeis.some(p => papelParaLista(dia.papeis[p.key]).length > 0);
                  return (
                    <div key={dia.key} className="px-3 py-2">
                      <div className="mb-1.5 flex items-center justify-center relative">
                        <span className="absolute left-0 text-[10px] font-medium leading-none text-muted-foreground tabular-nums">{dia.horario}H</span>
                        <span className="inline-flex items-center justify-center rounded-full bg-[#D4A24C]/10 border border-[#D4A24C]/15 px-2.5 py-0.5 text-[10px] font-semibold leading-none text-[#B8860B] dark:text-[#E8B35E] text-center max-w-[75%] truncate">{dia.titulo}</span>
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
                                  <span className="inline-flex items-center gap-1 rounded-full bg-[#D4A24C]/10 px-2 py-0.5 text-[11px] font-medium leading-none text-[#C4933C] ring-1 ring-[#D4A24C]/20 dark:text-[#E8B35E]">
                                    <span className="h-1 w-1 rounded-full bg-[#D4A24C]" aria-hidden="true" />
                                    {papel.label}
                                  </span>
                                  <span className="flex flex-wrap justify-end gap-1">
                                    {nomes.map((nome) => (
                                      <span
                                        key={nome}
                                        className="text-[11px] font-medium text-foreground/70 text-right"
                                      >
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

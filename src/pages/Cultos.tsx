import { useState, useEffect } from "react";
import { getEscala, formatSemana, isoWeek, mondayOfWeek, PAPEIS_POR_DIA, papelParaLista, ORDEM_DIAS, DIAS_SEMANA_OPCOES } from "../data/escala";

export default function Cultos() {
  const [semanaAtual, setSemanaAtual] = useState(() => isoWeek(new Date()));
  const [escala, setEscala] = useState(() => getEscala(semanaAtual));
  useEffect(() => {
    const refresh = () => {
      const s = isoWeek(new Date());
      setSemanaAtual(s);
      setEscala(getEscala(s));
    };
    const onStorage = (e: StorageEvent) => { if (!e.key || e.key.includes("santuario")) refresh(); };
    window.addEventListener("santuario:escala-updated", refresh as EventListener);
    window.addEventListener("storage", onStorage);
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") refresh(); });
    return () => {
      window.removeEventListener("santuario:escala-updated", refresh as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background pt-16">
      {/* Header hero com imagem de fundo - /fotos/agenda/1.jpg */}
      <section className="relative overflow-hidden">
        <img
          src="/fotos/agenda/1.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/70" aria-hidden="true" />
        <div className="absolute inset-0 opacity-20" aria-hidden="true" style={{ background: "radial-gradient(ellipse at center top, rgba(212,162,76,0.28), transparent 70%)" }} />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="mb-0 max-w-2xl text-left">
            <p className="inline-flex items-center rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5 text-white text-xs font-semibold uppercase tracking-[0.18em] mb-4">
              Programacao
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight [text-shadow:0_2px_14px_rgba(0,0,0,0.6)]">
              Agenda Semanal
            </h1>
            <p className="mt-6 inline-flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm px-4 py-3 text-sm sm:text-base text-white/90 max-w-xl leading-relaxed">
              <span>Nossa programacao semanal e os proximos eventos especiais. Venha fazer parte desta comunidade!</span>
            </p>
            {/* LINK INTERNO — Cultos → Contato (endereço e como chegar) */}
            <a
              href="#/contato"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-bold text-gold-light backdrop-blur-sm transition-colors hover:bg-gold/30 hover:text-white"
            >
              📍 Ver endereço e como chegar →
            </a>
          </div>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Escala da semana atual */}
        <section aria-labelledby="escala-titulo" className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-gold/15 text-xl shadow-sm shadow-gold/20 ring-1 ring-gold/20" aria-hidden="true">
              📋
            </span>
            <div>
              <h2 id="escala-titulo" className="font-display text-2xl font-semibold text-foreground">
                Escala da Semana
              </h2>
              <p className="text-sm text-muted-foreground">
                {formatSemana(semanaAtual)}
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {(() => {
              const ordemPorDia: Record<string, number> = {};
              DIAS_SEMANA_OPCOES.forEach(o => ordemPorDia[o.label] = ORDEM_DIAS[o.key] ?? 99);
              const filtrados = escala.dias;
              const grupos = new Map<string, typeof filtrados>();
              for (const d of filtrados) { const g = grupos.get(d.dia) ?? []; g.push(d); grupos.set(d.dia, g); }
              const gruposOrdenados = Array.from(grupos.entries()).sort((a,b) => (ordemPorDia[a[0]]??99)-(ordemPorDia[b[0]]??99));
              gruposOrdenados.forEach(([,arr]) => arr.sort((a,b)=>a.horario.localeCompare(b.horario)));
              if (gruposOrdenados.length === 0) return <p className="text-sm text-muted-foreground">Nenhum evento cadastrado nesta semana.</p>;
              return gruposOrdenados.map(([diaLabel, dias]) => {
                const baseKey = DIAS_SEMANA_OPCOES.find(o=>o.label===diaLabel)?.key ?? dias[0].key.split("-")[0];
                return (
                <div
                  key={diaLabel}
                  className="overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 hover:border-gold/30"
                >
                  <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-border/60 bg-gradient-to-r from-gold/10 via-transparent to-transparent">
                                      <div className="min-w-0 flex-1">
                                        <h3 className="font-display text-lg font-semibold leading-tight tracking-tight text-foreground">
                                          {diaLabel}
                                        </h3>
                                      </div>
                                      <div className="flex flex-col items-end justify-center flex-shrink-0">
                                        {(() => {
                                          const meses = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
                                          const diasSemana = ["Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado","Domingo"];
                                          const idx = diasSemana.indexOf(diaLabel);
                                          if (idx >= 0) {
                                            const monday = mondayOfWeek(semanaAtual);
                                            const d = new Date(Date.UTC(monday.getUTCFullYear(), monday.getUTCMonth(), monday.getUTCDate()));
                                            d.setUTCDate(d.getUTCDate() + idx);
                                            const dd = String(d.getUTCDate()).padStart(2, "0");
                                            const mm = meses[d.getUTCMonth()];
                                            return (
                                              <div className="flex items-baseline gap-1.5 leading-none">
                                                <span className="font-display text-2xl font-bold tabular-nums text-gold-deep dark:text-gold-light tracking-tight">{dd}</span>
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-gold-deep/80 dark:text-gold-light/80">{mm}</span>
                                              </div>
                                            );
                                          }
                                          return null;
                                        })()}
                                      </div>
                                      </div>

                  <div className="divide-y divide-border/40">
                    {dias.map((dia) => {
                      const papeis = PAPEIS_POR_DIA[dia.key] ?? PAPEIS_POR_DIA[dia.key.split("-")[0]] ?? [];
                      const temEscala = papeis.some(p => papelParaLista(dia.papeis[p.key]).length > 0);
                      return (
                    <div key={dia.key} className="px-5 py-4">
                      <div className="mb-3 flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-gold/10 border border-gold/20 px-2.5 py-1 text-xs font-semibold tracking-wide text-gold-deep dark:text-gold-light">{dia.horario}</span>
                        <span className="text-xs font-medium text-foreground/80 truncate">{dia.titulo}</span>
                      </div>
                    {papeis.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Sem papéis definidos.
                      </p>
                    ) : temEscala ? (
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
                                                                                    className="inline-flex items-center gap-1 rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold-light ring-1 ring-gold/25"
                                                                                  >
                                                                                    <span
                                                                                      className="h-1.5 w-1.5 rounded-full bg-gold"
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
                    ) : (
                      <p className="text-xs italic text-muted-foreground">Escala a definir — edite em <span className="font-medium text-gold-light">#/escala</span></p>
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
      </div>
    </main>
  );
}


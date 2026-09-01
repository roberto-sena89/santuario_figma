import { WEEKLY_SCHEDULE, UPCOMING_EVENTS, formatDate, getEventTypeLabel } from "../data/schedule";
import PageTitle from "../components/ui/PageTitle";
import { getEscala, formatSemana, isoWeek, PAPEIS_POR_DIA, papelParaLista, EMOJI_DIA } from "../data/escala";

const TYPE_COLORS: Record<string, string> = {
  culto: "bg-primary/10 text-primary dark:bg-primary/20",
  estudo: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  oracao: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  jovens: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  criancas: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  especial: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  conferencia: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  retiro: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  evangelismo: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  outro: "bg-muted text-muted-foreground",
};

const SERVICE_TYPE_LABELS: Record<string, string> = {
  culto: "Culto",
  estudo: "Estudo Bíblico",
  oracao: "Oração",
  jovens: "Jovens",
  criancas: "Crianças",
  especial: "Especial",
};

const DAYS_ORDER = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

const DAY_EMOJI: Record<string, string> = {
  Domingo: "☀️",
  "Segunda-feira": "📚",
  "Terça-feira": "🌙",
  "Quarta-feira": "🙏",
  "Quinta-feira": "🕊️",
  "Sexta-feira": "🔥",
  Sábado: "🌟",
};

const TYPE_EMOJI: Record<string, string> = {
  culto: "🙏",
  estudo: "📖",
  oracao: "🕊️",
  jovens: "🔥",
  criancas: "🎈",
  especial: "✨",
  conferencia: "🌍",
  retiro: "⛰️",
  evangelismo: "📣",
  outro: "⭐",
};

function groupByDay<T extends { day: string }>(items: T[]): Record<string, T[]> {
  return items.reduce(
    (acc, item) => {
      if (!acc[item.day]) acc[item.day] = [];
      acc[item.day].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}

export default function Cultos() {
  const grouped = groupByDay(WEEKLY_SCHEDULE);
  const daysWithServices = DAYS_ORDER.filter((d) => grouped[d]);
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
            {escala.dias.map((dia) => {
              const papeis = PAPEIS_POR_DIA[dia.key] ?? [];
              const preenchidos = papeis.some(
                              (p) => papelParaLista(dia.papeis[p.key]).length > 0
                            );
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
                                      {preenchidos && (
                                        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-0.5 text-[10px] font-medium text-green-600 dark:text-green-400">
                                          ✓ definida
                                        </span>
                                      )}
                                    </div>

                  <div className="px-5 py-4">
                    {papeis.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        Sem escala nesta semana.
                      </p>
                    ) : (
                      <ul className="space-y-2.5">
                        {papeis.map((papel) => {
                                                  const nomes = papelParaLista(dia.papeis[papel.key]);
                                                  return (
                                                    <li
                                                      key={papel.key}
                                                      className="flex items-center justify-between gap-3"
                                                    >
                                                      <span className="text-xs font-medium text-muted-foreground">
                                                        {papel.label}
                                                      </span>
                                                      {nomes.length > 0 ? (
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
                                                      ) : (
                                                        <span className="rounded-full bg-muted/60 px-3 py-1 text-[11px] text-muted-foreground/60">
                                                          A definir
                                                        </span>
                                                      )}
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

        {/* Weekly schedule */}
        <section aria-label="Programação semanal" className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-[#D4A24C]/15 text-xl shadow-sm shadow-[#D4A24C]/20 ring-1 ring-[#D4A24C]/20">
              🗓️
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Programação Semanal
              </h2>
              <p className="text-sm text-muted-foreground">
                Cultos e encontros para toda a família
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {daysWithServices.map((day) => (
              <div
                key={day}
                className="overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#D4A24C]/10 hover:border-[#D4A24C]/30"
              >
                {/* Cabeçalho do dia */}
                <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-border/60 bg-gradient-to-r from-[#D4A24C]/10 via-transparent to-transparent">
                  <span className="text-base" aria-hidden="true">
                    {DAY_EMOJI[day] || "📅"}
                  </span>
                  <h3 className="font-display font-semibold text-foreground">
                    {day}
                  </h3>
                  <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-border/70 bg-card px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {grouped[day].length}
                    {grouped[day].length === 1 ? " encontro" : " encontros"}
                  </span>
                </div>

                {/* Serviços do dia */}
                <div className="divide-y divide-border/50">
                  {grouped[day].map((service, i) => (
                    <article
                      key={i}
                      className="flex items-start gap-4 px-5 py-4 transition-colors duration-200 hover:bg-muted/40"
                    >
                      {/* Horário */}
                      <div className="flex-shrink-0 sm:w-20 text-center">
                        <span className="inline-flex items-center justify-center rounded-lg bg-[#D4A24C]/12 px-2.5 py-1.5 font-mono text-sm font-semibold leading-none text-[#B8860B] ring-1 ring-[#D4A24C]/20 dark:text-[#E8B35E]">
                          {service.time}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="text-[15px] font-semibold text-foreground">
                            {service.title}
                          </h4>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                              TYPE_COLORS[service.type] || TYPE_COLORS.outro
                            }`}
                          >
                            <span aria-hidden="true">
                              {TYPE_EMOJI[service.type] || "✨"}
                            </span>
                            {SERVICE_TYPE_LABELS[service.type] || service.type}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {service.description}
                        </p>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <svg
                            className="h-3.5 w-3.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                          </svg>
                          {service.location}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming events */}
        <section aria-label="Próximos eventos">
          <div className="flex items-center gap-3 mb-8">
            <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-[#D4A24C]/15 text-xl shadow-sm shadow-[#D4A24C]/20 ring-1 ring-[#D4A24C]/20">
              ✨
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Próximos Eventos
              </h2>
              <p className="text-sm text-muted-foreground">
                Momentos especiais preparados para você
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {UPCOMING_EVENTS.map((event) => (
              <article
                key={event.id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#D4A24C]/10 hover:border-[#D4A24C]/30"
              >
                {event.highlight && (
                  <div
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#D4A24C] via-[#E8B35E] to-[#D4A24C]/40"
                    aria-label="Evento em destaque"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                        TYPE_COLORS[event.type] || TYPE_COLORS.outro
                      }`}
                    >
                      <span aria-hidden="true">
                        {TYPE_EMOJI[event.type] || "✨"}
                      </span>
                      {getEventTypeLabel(event.type)}
                    </span>
                    {event.highlight && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#D4A24C]/15 px-2.5 py-1 text-[11px] font-semibold text-[#B8860B] ring-1 ring-[#D4A24C]/25 dark:text-[#E8B35E]">
                        ★ Destaque
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <svg
                      className="h-3.5 w-3.5 flex-shrink-0 text-[#D4A24C]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <time className="capitalize" dateTime={event.date}>
                      {formatDate(event.date)} · {event.time}
                    </time>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mt-2.5 mb-2 transition-colors duration-200 group-hover:text-[#B8860B] dark:group-hover:text-[#E8B35E]">
                    {event.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <svg
                      className="h-3.5 w-3.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    {event.location}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

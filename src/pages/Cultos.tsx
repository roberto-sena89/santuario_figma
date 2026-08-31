import { WEEKLY_SCHEDULE, UPCOMING_EVENTS, formatDate, getEventTypeLabel } from "../data/schedule";

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

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">
            Programação
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-foreground mb-4">
            Cultos e Agenda
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Nossa programação semanal e os próximos eventos especiais. Venha fazer parte desta comunidade!
          </p>
        </div>

        {/* Weekly schedule */}
        <section aria-label="Programação semanal" className="mb-16">
          <h2 className="font-display text-xl font-semibold text-foreground mb-6">
            Programação Semanal
          </h2>
          <div className="space-y-6">
            {daysWithServices.map((day) => (
              <div key={day} className="grid sm:grid-cols-[120px_1fr] gap-4 items-start">
                <div className="sm:pt-1">
                  <span className="font-display font-semibold text-foreground text-base">
                    {day}
                  </span>
                </div>
                <div className="space-y-3">
                  {grouped[day].map((service, i) => (
                    <article
                      key={i}
                      className="bg-card border border-border rounded-xl p-5 flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 text-center">
                        <div className="font-mono font-semibold text-accent text-lg leading-none">
                          {service.time}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground text-base">
                            {service.title}
                          </h3>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              TYPE_COLORS[service.type] || TYPE_COLORS.outro
                            }`}
                          >
                            {SERVICE_TYPE_LABELS[service.type] || service.type}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-1.5 mt-2 text-muted-foreground text-xs">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
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
          <h2 className="font-display text-xl font-semibold text-foreground mb-6">
            Próximos Eventos
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {UPCOMING_EVENTS.map((event) => (
              <article
                key={event.id}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-accent/30 transition-all"
              >
                {event.highlight && (
                  <div className="bg-accent h-1" aria-label="Evento em destaque" />
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        TYPE_COLORS[event.type] || TYPE_COLORS.outro
                      }`}
                    >
                      {getEventTypeLabel(event.type)}
                    </span>
                    {event.highlight && (
                      <span className="text-xs font-semibold text-accent uppercase tracking-wide">
                        ★ Destaque
                      </span>
                    )}
                  </div>
                  <time
                    className="text-accent text-xs font-semibold uppercase tracking-wide"
                    dateTime={event.date}
                  >
                    {formatDate(event.date)} · {event.time}
                  </time>
                  <h3 className="font-display text-lg font-semibold text-foreground mt-2 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {event.location}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Notice */}
        <div className="mt-12 bg-muted rounded-xl p-6 text-center">
          <svg className="w-8 h-8 text-accent mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-foreground font-medium mb-1">Tem alguma dúvida?</p>
          <p className="text-muted-foreground text-sm">
            Entre em contato pelo WhatsApp ou visite a secretaria da igreja.
          </p>
        </div>
      </div>
    </main>
  );
}

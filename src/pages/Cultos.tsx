import { useMemo } from "react";
import SectionHero from "../components/ui/SectionHero";
import { MapPin, CalendarDays, Church, Star } from "lucide-react";
import { CHURCH } from "../data/church";
import {
  WEEKLY_SCHEDULE,
  UPCOMING_EVENTS,
  formatDate,
  getProximoCulto,
} from "../data/schedule";

const ORDEM_DIAS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

/**
 * Cultos (#/cultos) — página do VISITANTE: horários, endereço,
 * o que esperar e próximos eventos. A escala das equipes mora em
 * #/escala-voluntarios (fora do menu público).
 */
export default function Cultos() {
  const proximo = useMemo(() => getProximoCulto(), []);
  const porDia = useMemo(() => {
    const grupos = new Map<string, typeof WEEKLY_SCHEDULE>();
    for (const s of WEEKLY_SCHEDULE) {
      const g = grupos.get(s.day) ?? [];
      g.push(s);
      grupos.set(s.day, g);
    }
    return ORDEM_DIAS.filter((d) => grupos.has(d)).map((d) => ({
      dia: d,
      itens: grupos.get(d)!,
    }));
  }, []);
  const eventos = UPCOMING_EVENTS.slice(0, 3);

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background pt-16">
      <SectionHero image="/fotos/agenda/1.jpg" label="Cultos e horários">
        <div className="mb-0 max-w-2xl text-left">
          <p className="inline-flex items-center rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5 text-white text-xs font-semibold uppercase tracking-[0.18em] mb-4">
            Venha nos visitar
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight [text-shadow:0_2px_14px_rgba(0,0,0,0.6)]">
            Cultos e Horários
          </h1>
          <p className="mt-6 inline-flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm px-4 py-3 text-sm sm:text-base text-white/90 max-w-xl leading-relaxed">
            <span>Horários semanais, endereço e o que esperar no teu primeiro culto. Será uma alegria te receber!</span>
          </p>
        </div>
      </SectionHero>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Próximo culto */}
        <section aria-label="Próximo culto" className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.08] to-transparent px-5 py-4">
            <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-gold shadow-[0_0_8px_rgba(212,162,76,0.8)]" aria-hidden="true" />
            <p className="text-sm text-foreground">
              <strong className="font-bold">Próximo culto {proximo.dataLabel}:</strong>{" "}
              {proximo.title} · {proximo.day} {proximo.time} · {proximo.location}
            </p>
            <a
              href="#/contato"
              className="sm:ml-auto inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-bold text-gold-light transition-colors hover:bg-gold/30 hover:text-white"
            >
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Como chegar →
            </a>
          </div>
        </section>

        {/* Grade semanal */}
        <section aria-labelledby="grade-titulo" className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-gold/15 ring-1 ring-gold/20" aria-hidden="true">
              <CalendarDays className="h-5 w-5 text-gold" aria-hidden="true" />
            </span>
            <div>
              <h2 id="grade-titulo" className="font-display text-2xl font-semibold text-foreground">
                Grade semanal
              </h2>
              <p className="text-sm text-muted-foreground">
                Programação fixa da igreja
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {porDia.map(({ dia, itens }) => (
              <div
                key={dia}
                className="overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 hover:border-gold/30"
              >
                <div className="px-5 py-4 border-b border-border/60 bg-gradient-to-r from-gold/10 via-transparent to-transparent">
                  <h3 className="font-display text-lg font-semibold leading-tight tracking-tight text-foreground">
                    {dia}
                  </h3>
                </div>
                <ul className="divide-y divide-border/40">
                  {itens.map((s) => (
                    <li key={`${s.day}-${s.time}`} className="px-5 py-4">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-gold/10 border border-gold/20 px-2.5 py-1 text-xs font-semibold tracking-wide text-gold-light">
                          {s.time}
                        </span>
                        <span className="text-xs font-medium text-foreground/80">{s.location}</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{s.title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{s.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Endereço */}
        <section aria-labelledby="endereco-titulo" className="mb-12">
          <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/[0.08] to-transparent p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-gold/15 ring-1 ring-gold/20" aria-hidden="true">
                <MapPin className="h-5 w-5 text-gold" aria-hidden="true" />
              </span>
              <h2 id="endereco-titulo" className="font-display text-2xl font-semibold text-foreground">
                Onde estamos
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-5">{CHURCH.address.full}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={CHURCH.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full bg-gold px-8 text-sm font-bold text-gold-ink transition-all hover:bg-gold-hover hover:-translate-y-0.5"
              >
                Abrir no mapa →
              </a>
              <a
                href="#/contato"
                className="inline-flex h-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 px-8 text-sm font-semibold text-gold-light transition-colors hover:bg-gold/20"
              >
                Falar conosco
              </a>
            </div>
          </div>
        </section>

        {/* O que esperar */}
        <section aria-labelledby="esperar-titulo" className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-gold/15 ring-1 ring-gold/20" aria-hidden="true">
              <Church className="h-5 w-5 text-gold" aria-hidden="true" />
            </span>
            <h2 id="esperar-titulo" className="font-display text-2xl font-semibold text-foreground">
              O que esperar
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { t: "Louvor e adoração", d: "O Ministério de Louvor conduz a igreja em cânticos antes da mensagem." },
              { t: "Mensagem da Palavra", d: "Pregação bíblica direta, para todas as idades e níveis de fé." },
              { t: "Oração", d: "Há momento de oração em todos os cultos — e o Mural recebe pedidos toda semana." },
              { t: "Crianças bem-vindas", d: "Programação infantil própria aos sábados; nos demais dias, elas participam com a família." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-border bg-card/60 p-5">
                <p className="font-semibold text-foreground text-sm mb-1">{c.t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Próximos eventos */}
        <section aria-labelledby="eventos-titulo">
          <h2 id="eventos-titulo" className="font-display text-2xl font-semibold text-foreground mb-1">
            Próximos eventos
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Datas especiais além da grade semanal
          </p>
          <div className="grid gap-4">
            {eventos.map((ev) => (
              <div
                key={ev.id}
                className="rounded-2xl border border-border bg-card/60 p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {ev.highlight && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-gold-ink">
                      <Star className="h-3 w-3" fill="currentColor" aria-hidden="true" /> Destaque
                    </span>
                  )}
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
                    {formatDate(ev.date)} · {ev.time}
                  </span>
                </div>
                <p className="font-semibold text-foreground">{ev.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{ev.description}</p>
                <p className="text-xs text-muted-foreground/70 mt-2">{ev.location}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

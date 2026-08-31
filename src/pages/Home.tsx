import { getDailyVerse } from "../data/verses";
import { WEEKLY_SCHEDULE, UPCOMING_EVENTS, formatDate } from "../data/schedule";
import { MINISTERIOS } from "../data/ministerios";
import { CHURCH } from "../data/church";
import type { Page } from "../components/Navigation";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1763645274832-3f63395dd8f6?w=1800&h=1000&fit=crop&auto=format";

const BIBLE_IMAGE =
  "https://images.unsplash.com/photo-1497621122273-f5cfb6065c56?w=800&h=600&fit=crop&auto=format";

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const verse = getDailyVerse();
  const nextCultos = WEEKLY_SCHEDULE.filter((s) => s.type === "culto").slice(0, 3);
  const featuredMinistries = MINISTERIOS.slice(0, 4);
  const nextEvents = UPCOMING_EVENTS.slice(0, 3);

  const navigate = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-label="Boas-vindas"
      >
        <div className="absolute inset-0 bg-primary">
          <img
            src={HERO_IMAGE}
            alt="Interior de uma igreja iluminada com fiéis adorando"
            className="w-full h-full object-cover opacity-30"
            loading="eager"
            width={1800}
            height={1000}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent-foreground backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            Todos são bem-vindos
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-light text-white leading-tight mb-6">
            Um lugar para você<br />
            <span className="italic text-accent">encontrar a Deus</span>
          </h1>

          <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            {CHURCH.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("cultos")}
              className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-lg text-base transition-all hover:shadow-lg hover:shadow-accent/25"
            >
              Ver horários dos cultos
            </button>
            <button
              onClick={() => navigate("quem-somos")}
              className="border border-white/30 hover:border-white/60 text-white font-medium px-8 py-4 rounded-lg text-base backdrop-blur-sm transition-colors"
            >
              Novo por aqui?
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs uppercase tracking-widest">Rolar</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Palavra do Dia */}
      <section className="py-20 bg-primary" aria-label="Palavra do Dia">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-accent text-sm font-medium uppercase tracking-widest mb-4">
            Palavra do Dia
          </p>
          <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-primary-foreground leading-relaxed italic mb-6">
            "{verse.text}"
          </blockquote>
          <cite className="not-italic text-primary-foreground/60 font-medium text-base">
            — {verse.reference}
          </cite>
          <div className="mt-8">
            <button
              onClick={() => navigate("palavra-do-dia")}
              className="text-accent hover:text-accent/80 text-sm font-medium flex items-center gap-2 mx-auto transition-colors"
            >
              Ver versículo completo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="py-16 bg-background" aria-label="Acesso rápido">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                ),
                label: "Leitura Bíblica",
                page: "biblia" as Page,
                desc: "Leia a Palavra",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                ),
                label: "Playbacks",
                page: "playbacks" as Page,
                desc: "Louvores e ministração",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                ),
                label: "Agenda",
                page: "cultos" as Page,
                desc: "Eventos e cultos",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                ),
                label: "Ministérios",
                page: "ministerios" as Page,
                desc: "Conheça nossa equipe",
              },
            ].map((item) => (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className="bg-card border border-border rounded-xl p-6 text-left hover:border-accent/40 hover:shadow-md transition-all group"
              >
                <div className="text-accent mb-3 group-hover:scale-110 transition-transform origin-left">
                  {item.icon}
                </div>
                <div className="font-display font-semibold text-foreground text-base mb-1">
                  {item.label}
                </div>
                <div className="text-muted-foreground text-sm">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Próximos Cultos + Bíblia */}
      <section className="py-20 bg-muted/40" aria-label="Cultos e Bíblia">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Cultos */}
            <div>
              <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">
                Programação Semanal
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground mb-8">
                Venha nos visitar
              </h2>
              <div className="space-y-4">
                {nextCultos.map((culto, i) => (
                  <div
                    key={i}
                    className="bg-card border border-border rounded-xl p-5 flex items-start gap-4"
                  >
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-base mb-0.5">
                        {culto.title}
                      </div>
                      <div className="text-accent font-medium text-sm mb-1">
                        {culto.day} às {culto.time}
                      </div>
                      <div className="text-muted-foreground text-sm">{culto.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("cultos")}
                className="mt-6 text-accent hover:text-accent/80 font-medium text-sm flex items-center gap-2 transition-colors"
              >
                Ver agenda completa
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Bíblia CTA */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="bg-primary h-80 relative">
                <img
                  src={BIBLE_IMAGE}
                  alt="Bíblia aberta com luz natural"
                  className="w-full h-full object-cover opacity-40"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <svg className="w-12 h-12 text-accent mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <h3 className="font-display text-2xl text-white font-light mb-3">
                    Leia a Bíblia Sagrada
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    Acesse todos os livros do Antigo e Novo Testamento na tradução Almeida.
                  </p>
                  <button
                    onClick={() => navigate("biblia")}
                    className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
                  >
                    Abrir leitor bíblico
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Próximos Eventos */}
      <section className="py-20 bg-background" aria-label="Próximos eventos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">
                Em Breve
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground">
                Próximos eventos
              </h2>
            </div>
            <button
              onClick={() => navigate("cultos")}
              className="text-accent hover:text-accent/80 font-medium text-sm flex items-center gap-2 transition-colors flex-shrink-0"
            >
              Ver todos
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {nextEvents.map((event) => (
              <article
                key={event.id}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-accent/30 transition-all"
              >
                {event.highlight && (
                  <div className="bg-accent px-4 py-1.5">
                    <span className="text-white text-xs font-semibold uppercase tracking-wide">
                      Destaque
                    </span>
                  </div>
                )}
                <div className="p-6">
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
                    <span>{event.location}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ministérios */}
      <section className="py-20 bg-muted/40" aria-label="Ministérios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">
              Comunidade
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-foreground">
              Nossos ministérios
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base">
              Cada pessoa tem um lugar e um chamado. Conheça os ministérios e encontre onde você se encaixa.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredMinistries.map((m) => (
              <div
                key={m.id}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all hover:border-accent/30 group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-4"
                  style={{ backgroundColor: `${m.color}15`, color: m.color }}
                  aria-hidden="true"
                >
                  {m.icon}
                </div>
                <h3 className="font-display font-semibold text-foreground text-base mb-2">
                  {m.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("ministerios")}
              className="border border-border hover:border-accent/50 text-foreground font-medium px-6 py-3 rounded-lg text-sm transition-colors"
            >
              Ver todos os ministérios
            </button>
          </div>
        </div>
      </section>

      {/* Novo por aqui */}
      <section className="py-20 bg-accent" aria-label="Novo por aqui">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-light text-white mb-4">
            Está visitando pela primeira vez?
          </h2>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Seja muito bem-vindo! Aqui você vai encontrar uma comunidade acolhedora, ensino bíblico sólido e pessoas que se importam com você.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("quem-somos")}
              className="bg-white text-accent font-semibold px-8 py-4 rounded-lg text-base hover:bg-white/90 transition-colors"
            >
              Conheça nossa história
            </button>
            <a
              href={`https://wa.me/${CHURCH.whatsapp}?text=${encodeURIComponent(CHURCH.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/40 hover:border-white/70 text-white font-medium px-8 py-4 rounded-lg text-base transition-colors"
            >
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

import { getDailyVerse } from "../data/verses";
import { UPCOMING_EVENTS, formatDate } from "../data/schedule";
import { MINISTERIOS } from "../data/ministerios";
import { CHURCH } from "../data/church";
import type { Page } from "../components/Navigation";
import EscalaSemanaCard from "../components/EscalaSemanaCard";

const HERO_IMAGE = "/fotos/homepage/1.jfif";

const BIBLE_IMAGE =
  "https://images.unsplash.com/photo-1497621122273-f5cfb6065c56?w=800&h=600&fit=crop&auto=format";

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const verse = getDailyVerse();
  // Destaques: troca Infantil por Missões no grid da Home
  const featuredMinistries = MINISTERIOS.filter(
    (m) => m.id !== "criancas" && m.id !== "evangelismo"
  ).slice(0, 3);
  const missoes = MINISTERIOS.find((m) => m.id === "evangelismo");
  if (missoes) featuredMinistries.push(missoes);
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
        <div className="absolute inset-0 bg-sand-900">
          <img
            src={HERO_IMAGE}
            alt="Interior de uma igreja iluminada com fiéis adorando"
            className="w-full h-full object-cover opacity-90"
            loading="eager"
            width={1800}
            height={1000}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sand-900/60 via-sand-900/30 to-sand-900/80" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
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
                        className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#D4A24C] to-[#C4933C] text-gray-900 font-semibold pl-3 pr-7 py-2.5 rounded-full shadow-lg shadow-[#D4A24C]/30 ring-1 ring-[#B8860B]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4A24C]/45 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/25 text-base shadow-inner transition-transform duration-300 group-hover:scale-110" aria-hidden="true">⛪</span>
                        Ver horários dos cultos
                      </button>
                      <button
                        onClick={() => navigate("quem-somos")}
                        className="group inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-6 py-2.5 text-white font-medium backdrop-blur-sm transition-all duration-300 hover:border-white/70 hover:bg-white/15 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                      >
                        <span className="text-base transition-transform duration-300 group-hover:scale-110" aria-hidden="true">👋</span>
                        Novo por aqui?
                      </button>
                    </div>
        </div>
      </section>

      {/* Ministérios */}
            <section className="py-20 bg-muted/40" aria-label="Ministérios">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <p className="inline-flex items-center gap-2 rounded-full bg-[#D4A24C]/15 border border-[#D4A24C]/30 px-4 py-1.5 text-[#9C7A2E] text-xs font-semibold uppercase tracking-[0.18em] mb-3 mx-auto">
                    <span aria-hidden="true">🤝</span>
                    Comunidade
                  </p>
                  <h2 className="font-display text-3xl sm:text-4xl font-normal text-foreground">
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
                      className="group bg-gradient-to-b from-card to-card/60 border border-border/70 rounded-2xl p-6 hover:shadow-xl hover:shadow-[#D4A24C]/15 hover:border-[#D4A24C]/40 hover:-translate-y-1 transition-all duration-300"
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 bg-[#D4A24C]/10 border border-[#D4A24C]/25 text-[#9C7A2E] transition-transform duration-300 group-hover:scale-110 shadow-sm"
                        aria-hidden="true"
                      >
                        {m.icon}
                      </div>
                      <h3 className="font-display font-semibold text-foreground text-base mb-2 group-hover:text-[#9C7A2E] transition-colors">
                        {m.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {m.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-10">
                  <button
                    onClick={() => navigate("ministerios")}
                    className="group inline-flex items-center gap-2 rounded-full border border-[#D4A24C]/40 bg-[#D4A24C]/10 px-6 py-3 text-sm font-medium text-[#9C7A2E] transition-all duration-200 hover:border-[#D4A24C]/70 hover:bg-[#D4A24C]/20 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Ver todos os ministérios
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </section>

      {/* Palavra do Dia */}
            <section className="py-20 relative overflow-hidden" aria-label="Palavra do Dia">
                          <img
                            src="/fotos/homepage/7.jfif"
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
                            loading="lazy"
                            aria-hidden="true"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/55" />
                          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                      <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-gradient-to-r from-accent/15 via-white/10 to-accent/15 px-4 py-1.5 text-accent text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur-md shadow-sm shadow-black/20 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">
                                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-[11px]" aria-hidden="true">🙏</span>
                                              Palavra do Dia
                                            </span>
                      <span className="text-5xl sm:text-6xl leading-none text-accent/80 block mb-2 [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]" aria-hidden="true">❝</span>
                                            <div className="mx-auto max-w-3xl rounded-2xl bg-graphite/25 px-5 py-4 sm:px-8 sm:py-6 backdrop-blur-sm mb-6">
                                                                                        <blockquote className="font-bible text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-snug sm:leading-tight [text-shadow:0_2px_18px_rgba(0,0,0,0.65)]">
                                                                                          {verse.text}
                                                                                        </blockquote>
                                                                                        <cite className="not-italic block mt-3 font-bible text-white/80 font-medium text-base [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
                                              — {verse.reference}
                                            </cite>
                                            </div>
                      <div className="mt-8">
                        <button
                                                  onClick={() => navigate("palavra-do-dia")}
                                                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#D4A24C] to-[#C4933C] text-gray-900 font-semibold text-sm sm:text-base pl-2.5 pr-6 py-2 rounded-full shadow-lg shadow-[#D4A24C]/35 ring-1 ring-[#B8860B]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4A24C]/50 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
                                                >
                                                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/25 text-base shadow-inner transition-transform duration-300 group-hover:scale-110" aria-hidden="true">📖</span>
                                                  Ler a Palavra do Dia completa
                                                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">✨</span>
                                                </button>
                      </div>
        </div>
      </section>

      {/* Cultos + Escala + Bíblia */}
      <section className="py-12 bg-muted/30" aria-label="Cultos e Bíblia">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bíblia CTA — compacta, acima da programação */}
          <div className="relative rounded-xl overflow-hidden shadow-md shadow-black/15 border border-border/50 mb-8">
            <div className="absolute inset-0">
              <img
                src={BIBLE_IMAGE}
                alt="Bíblia aberta com luz natural"
                className="w-full h-full object-cover opacity-70"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/35" />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center p-5 sm:p-6 text-center">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#D4A24C]/20 ring-1 ring-[#D4A24C]/30 backdrop-blur-sm mb-3 shadow-md shadow-[#D4A24C]/15">
                <svg className="w-5 h-5 text-[#E8B35E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </span>
              <h3 className="font-display text-lg sm:text-xl text-white font-medium mb-1.5 [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
                Leia a Bíblia Sagrada
              </h3>
              <p className="text-white/80 text-xs leading-relaxed mb-4 max-w-xs [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]">
                Antigo e Novo Testamento — tradução Almeida.
              </p>
              <button
                onClick={() => navigate("biblia")}
                className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-[#D4A24C] to-[#C4933C] text-gray-900 text-sm font-semibold pl-2 pr-5 py-2 rounded-full shadow-md shadow-[#D4A24C]/25 ring-1 ring-[#B8860B]/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25 text-sm shadow-inner transition-transform duration-300 group-hover:scale-110" aria-hidden="true">📖</span>
                Ler Bíblia Agora
              </button>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-[#D4A24C]/10 border border-[#D4A24C]/20 px-3 py-1 text-[#9C7A2E] text-[11px] font-semibold uppercase tracking-[0.16em] mb-2">
              <span aria-hidden="true">⛪</span>
              Programação da semana
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-foreground">
              Sua semana na igreja
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm">
              Escala de ministérios atualizada semanalmente.
            </p>
          </div>

          <div className="rounded-xl border border-border/40 bg-card/40 p-3 sm:p-4">
            <EscalaSemanaCard />
          </div>
        </div>
      </section>

      {/* Próximos Eventos */}
            <section className="py-20 bg-background" aria-label="Próximos eventos">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                  <div>
                    <p className="inline-flex items-center gap-2 rounded-full bg-[#D4A24C]/15 border border-[#D4A24C]/30 px-4 py-1.5 text-[#9C7A2E] text-xs font-semibold uppercase tracking-[0.18em] mb-3">
                      <span aria-hidden="true">🗓️</span>
                      Em Breve
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl font-normal text-foreground">
                      Próximos eventos
                    </h2>
                  </div>
                  <button
                    onClick={() => navigate("cultos")}
                    className="group inline-flex items-center gap-2 rounded-full border border-[#D4A24C]/40 bg-[#D4A24C]/10 px-5 py-2.5 text-sm font-medium text-[#9C7A2E] transition-all duration-200 hover:border-[#D4A24C]/70 hover:bg-[#D4A24C]/20 hover:-translate-y-0.5 active:translate-y-0 flex-shrink-0"
                  >
                    Ver todos
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {nextEvents.map((event) => (
                    <article
                      key={event.id}
                      className="group bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/30 hover:border-[#D4A24C]/40 hover:-translate-y-1 transition-all duration-300"
                                    >
                                      {event.highlight && (
                                        <div className="bg-gradient-to-r from-[#D4A24C] to-[#C4933C] px-4 py-1.5">
                                                                            <span className="inline-flex items-center gap-1.5 text-gray-900 text-xs font-bold uppercase tracking-wide">
                                                                              <span aria-hidden="true">⭐</span>
                                                                              Destaque
                                                                            </span>
                                                                          </div>
                                      )}
                                      <div className="p-6">
                                                        <time
                                                          className="inline-flex items-center gap-1.5 text-[#D4A24C] text-xs font-semibold uppercase tracking-wide"
                                                          dateTime={event.date}
                                                        >
                                                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                          {formatDate(event.date)} · {event.time}
                                                        </time>
                                                        <h3 className="font-display text-lg font-semibold text-white mt-3 mb-2 group-hover:text-[#D4A24C] transition-colors">
                                                          {event.title}
                                                        </h3>
                                                        <p className="text-white/75 text-sm leading-relaxed mb-5">
                                          {event.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-white/60 text-xs border-t border-white/10 pt-4">
                          <svg className="w-3.5 h-3.5 flex-shrink-0 text-[#D4A24C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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



      {/* Quick links — Navegação rápida */}
            <section className="py-20 bg-muted relative" aria-label="Acesso rápido">
              {/* Linha decorativa sutil no topo da seção */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" aria-hidden="true" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Badge + título sutis */}
                <div className="text-center mb-10">
                  <p className="inline-flex items-center gap-2 rounded-full bg-[#D4A24C]/12 border border-[#D4A24C]/25 px-4 py-1.5 text-[#9C7A2E] dark:text-[#D4A24C] text-xs font-semibold uppercase tracking-[0.18em] mb-3">
                    <span aria-hidden="true">🗺️</span>
                    Navegue pelo site
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-normal text-foreground/75">
                    Encontre o que precisa
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
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
                      className="group relative bg-card/80 border border-border/60 rounded-2xl p-7 text-left backdrop-blur-sm shadow-sm transition-all duration-300 hover:border-[#D4A24C]/40 hover:shadow-lg hover:shadow-[#D4A24C]/10 hover:-translate-y-1 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-muted"
                    >
                      <div className="inline-flex w-12 h-12 items-center justify-center rounded-xl bg-[#D4A24C]/10 border border-[#D4A24C]/25 text-[#D4A24C] mb-4 transition-all duration-300 group-hover:bg-[#D4A24C]/15 group-hover:border-[#D4A24C]/40 group-hover:shadow-sm group-hover:shadow-[#D4A24C]/20">
                        {item.icon}
                      </div>
                      <div className="font-display font-semibold text-foreground text-base mb-1 group-hover:text-[#D4A24C] transition-colors">
                        {item.label}
                      </div>
                      <div className="text-muted-foreground/80 text-sm leading-relaxed">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

      {/* Novo por aqui */}
      <section className="relative overflow-hidden" aria-label="Novo por aqui">
        {/* Imagem de fundo */}
        <img
          src="/fotos/homepage/9.jfif"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
          aria-hidden="true"
        />
        {/* Gradiente — fade escuro nas bordas + leve overlay central pra legibilidade */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-graphite/85 via-graphite/55 to-graphite/85"
          aria-hidden="true"
        />
        {/* Ornam — linha bronze sutil no topo */}
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-3xl px-4 py-24 sm:py-28 text-center">
          {/* Eyebrow */}
                    <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-white/10 px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-sm shadow-lg shadow-black/20 [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]">
                      <span className="text-sm" aria-hidden="true">🕊️</span>
                      Primeira visita
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                    </p>

          {/* Headline */}
                    <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-white mb-3 text-balance [text-shadow:0_2px_20px_rgba(0,0,0,0.65)]">
                      Está visitando pela primeira vez?
                    </h2>

                    {/* Divider decorativo */}
                    <div className="mx-auto mb-5 h-0.5 w-16 rounded-full bg-accent/60" aria-hidden="true" />

          {/* Subhead */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg leading-[1.75] text-white mb-10 [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
            Seja muito bem-vindo. Aqui você vai encontrar uma comunidade acolhedora, ensino bíblico
            sólido e pessoas que se importam com você.
          </p>

          {/* CTAs — hierarquia clara: primário (bronze) + secundário (outline branco) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate("quem-somos")}
              className="group inline-flex items-center gap-2 rounded-full bg-[#D4A24C] hover:bg-[#C4933C] px-7 py-3.5 text-sm sm:text-base font-semibold text-gray-900 shadow-lg shadow-[#D4A24C]/25 ring-1 ring-[#B8860B]/40 transition-all duration-200 hover:shadow-xl hover:shadow-[#D4A24C]/45 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite"
            >
              Conheça nossa história
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
                                      onClick={() => onNavigate("missoes")}
                                      className="group inline-flex items-center gap-2.5 rounded-full border border-[#D4A24C]/50 bg-[#D4A24C]/10 px-7 py-3.5 text-sm sm:text-base font-medium text-[#D4A24C] backdrop-blur-sm transition-all duration-200 hover:border-[#D4A24C]/80 hover:bg-[#D4A24C]/20 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-graphite"
                                    >
                                      <svg className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.6 9h16.8M3.6 15h16.8" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a15 15 0 010 18 15 15 0 010-18z" />
                                      </svg>
                                      <span>Conheça a obra missionária</span>
                                    </button>
          </div>
        </div>
      </section>

    </main>
  );
}

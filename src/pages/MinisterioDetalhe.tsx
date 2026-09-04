import { MINISTERIOS, type Ministry } from "../data/ministerios";
import { CHURCH } from "../data/church";
import type { Page } from "../components/Navigation";

interface MinisterioDetalheProps {
  id: string;
  onNavigate: (page: Page) => void;
}

export default function MinisterioDetalhe({ id, onNavigate }: MinisterioDetalheProps) {
  const m: Ministry | undefined = MINISTERIOS.find((x) => x.id === id);

  if (!m) {
    return (
      <main id="main-content" className="min-h-screen bg-background pt-16">
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <p className="text-4xl mb-4">🙏</p>
          <h1 className="font-display text-2xl text-foreground mb-3">Ministério não encontrado</h1>
          <button
            onClick={() => onNavigate("ministerios")}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#D4A24C]/40 bg-[#D4A24C]/10 px-6 py-3 text-sm font-medium text-[#D4A24C] transition-all hover:bg-[#D4A24C]/20"
          >
            ← Voltar aos ministérios
          </button>
        </div>
      </main>
    );
  }

  const whatsappHref = `https://wa.me/${CHURCH.whatsapp}?text=${encodeURIComponent(
    `Olá! Tenho interesse no ${m.name}. Poderia me informar mais?`
  )}`;

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden" aria-label={m.name}>
        <div
          className="absolute inset-0 opacity-25"
          style={{ background: `radial-gradient(ellipse at top, ${m.color}55, transparent 70%)` }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4A24C]/40 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <button
            onClick={() => onNavigate("ministerios")}
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar aos ministérios
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center text-4xl sm:text-5xl ring-1 ring-black/5 shadow-lg flex-shrink-0"
              style={{
                backgroundColor: `${m.color}20`,
                color: m.color,
                boxShadow: `0 8px 24px -8px ${m.color}66`,
              }}
              aria-hidden="true"
            >
              {m.icon}
            </div>
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="block h-px w-8 bg-gradient-to-r from-transparent"
                  style={{ backgroundImage: `linear-gradient(to right, transparent, ${m.color}99)` }}
                  aria-hidden="true"
                />
                <span
                  className="text-[10.5px] font-semibold uppercase tracking-[0.28em] leading-none"
                  style={{ color: m.color }}
                >
                  Comunidade
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-tight mb-3">
                {m.name}
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                {m.resumo ?? m.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Versículo */}
      {m.versiculo && (
        <section
          className="relative py-12 bg-muted/40 overflow-hidden"
          style={
            m.id === "louvor"
              ? {
                  backgroundImage: `url('/fotos/minsterios/${m.id}.jpg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          {/* Overlay suave para legibilidade quando há imagem de fundo */}
          {m.id === "louvor" && (
            <div
              className="absolute inset-0 bg-gradient-to-b from-graphite/20 via-graphite/10 to-graphite/20"
              aria-hidden="true"
            />
          )}
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <div className="bg-card/80 border border-border/60 rounded-2xl p-8 backdrop-blur-sm shadow-sm">
              <span className="text-5xl leading-none text-[#D4A24C]/60 block mb-3" aria-hidden="true">❝</span>
              <blockquote className="font-bible text-2xl sm:text-3xl font-medium text-foreground leading-snug">
                {m.versiculo.texto}
              </blockquote>
              <cite className="not-italic block mt-4 text-[#D4A24C] font-medium text-base">
                — {m.versiculo.referencia}
              </cite>
            </div>
          </div>
        </section>
      )}

      {/* Sobre + Informações */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              {/* Cabeçalho da seção */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl text-xl ring-1 ring-black/5 shadow-sm"
                  style={{ backgroundColor: `${m.color}20`, color: m.color }}
                  aria-hidden="true"
                >
                  {m.icon}
                </span>
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-normal text-foreground leading-tight">
                    Sobre o ministério
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Nossa missão e propósito
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-3xl">
                {m.description}
              </p>

              {/* Atividades */}
              {m.atividades && m.atividades.length > 0 && (
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-5">
                    <h3 className="font-display font-semibold text-foreground text-lg">
                      O que fazemos
                    </h3>
                    <div
                      className="h-px flex-1"
                      style={{ background: `linear-gradient(to right, ${m.color}44, transparent)` }}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {m.atividades.map((a) => (
                      <div
                        key={a.titulo}
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 p-5 backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4A24C]/30 hover:shadow-lg"
                      >
                        {/* Barra de cor dinâmica no topo */}
                        <div
                          className="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{ background: `linear-gradient(to right, ${m.color}, ${m.color}00)` }}
                          aria-hidden="true"
                        />
                        {/* Indicador visual de cor */}
                        <div className="mb-3 flex items-center gap-2.5">
                          <div
                            className="h-1 w-1 rounded-full ring-1 ring-black/5"
                            style={{ backgroundColor: m.color }}
                            aria-hidden="true"
                          />
                          <span
                            className="text-[9.5px] font-semibold uppercase tracking-[0.22em] leading-none"
                            style={{ color: m.color }}
                          >
                            {m.name}
                          </span>
                        </div>
                        <h4 className="font-display font-semibold text-foreground text-sm mb-1.5 leading-snug">
                          {a.titulo}
                        </h4>
                        <p className="text-muted-foreground text-[13px] leading-relaxed">
                          {a.descricao}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefícios + Requisitos */}
              {(m.beneficios || m.requisitos) && (
                <div className="grid sm:grid-cols-2 gap-6">
                  {m.beneficios && m.beneficios.length > 0 && (
                    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm">
                      <div
                        className="px-6 py-5 border-b border-border/60"
                        style={{ background: `linear-gradient(135deg, ${m.color}1e, transparent 70%)` }}
                      >
                        <div className="mb-1 flex items-center gap-2">
                          <div
                            className="h-0.5 w-5 rounded-full"
                            style={{ backgroundColor: m.color }}
                            aria-hidden="true"
                          />
                          <span
                            className="text-[9.5px] font-semibold uppercase tracking-[0.26em] leading-none"
                            style={{ color: m.color }}
                          >
                            Benefícios
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-foreground text-base leading-tight">
                          O que você ganha
                        </h3>
                      </div>
                      <ul className="space-y-3 px-6 py-5">
                        {m.beneficios.map((b) => (
                          <li key={b} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-muted-foreground">
                            <span
                              className="mt-2.5 h-1 w-1 shrink-0 rounded-full"
                              style={{ backgroundColor: m.color }}
                              aria-hidden="true"
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {m.requisitos && m.requisitos.length > 0 && (
                    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm">
                      <div
                        className="px-6 py-5 border-b border-border/60"
                        style={{ background: `linear-gradient(135deg, ${m.color}1e, transparent 70%)` }}
                      >
                        <div className="mb-1 flex items-center gap-2">
                          <div
                            className="h-0.5 w-5 rounded-full"
                            style={{ backgroundColor: m.color }}
                            aria-hidden="true"
                          />
                          <span
                            className="text-[9.5px] font-semibold uppercase tracking-[0.26em] leading-none"
                            style={{ color: m.color }}
                          >
                            Requisitos
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-foreground text-base leading-tight">
                          Para participar
                        </h3>
                      </div>
                      <ul className="space-y-3 px-6 py-5">
                        {m.requisitos.map((r) => (
                          <li key={r} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-muted-foreground">
                            <span
                              className="mt-2.5 h-1 w-1 shrink-0 rounded-full"
                              style={{ backgroundColor: m.color }}
                              aria-hidden="true"
                            />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar informações */}
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md shadow-lg shadow-black/10">
                {/* Header com gradiente no tom do ministério */}
                <div
                  className="relative px-6 py-5 border-b border-border/60"
                  style={{ background: `linear-gradient(135deg, ${m.color}22, transparent 65%)` }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl text-xl ring-1 ring-black/5 shadow-sm"
                      style={{ backgroundColor: `${m.color}25`, color: m.color }}
                      aria-hidden="true"
                    >
                      {m.icon}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-foreground text-lg leading-tight">
                        Informações
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Como encontrar o ministério
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-5 space-y-4">
                                  <div className="flex items-center gap-4">
                                    <span
                                      className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl text-base shadow-sm ring-1 ring-black/5"
                                      style={{ backgroundColor: `${m.color}18`, color: m.color }}
                                      aria-hidden="true"
                                    >
                                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                      </svg>
                                    </span>
                                    <div className="min-w-0 flex-1">
                                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
                                        Líder
                                      </p>
                                      <p className="text-foreground text-[15px] font-medium leading-snug mt-0.5">
                                        {m.leader}
                                      </p>
                                    </div>
                                  </div>

                                  <div
                                    className="h-px"
                                    style={{ background: `linear-gradient(to right, ${m.color}33, transparent)` }}
                                    aria-hidden="true"
                                  />

                                  <div className="flex items-center gap-4">
                                    <span
                                      className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl text-base shadow-sm ring-1 ring-black/5"
                                      style={{ backgroundColor: `${m.color}18`, color: m.color }}
                                      aria-hidden="true"
                                    >
                                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                    </span>
                                    <div className="min-w-0 flex-1">
                                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
                                        Reunião
                                      </p>
                                      <p className="text-foreground text-[15px] font-medium leading-snug mt-0.5">
                                        {m.meetingDay} às {m.meetingTime}
                                      </p>
                                    </div>
                                  </div>

                                  <div
                                    className="h-px"
                                    style={{ background: `linear-gradient(to right, ${m.color}33, transparent)` }}
                                    aria-hidden="true"
                                  />

                                  <div className="flex items-start gap-4">
                                    <span
                                      className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl text-base shadow-sm ring-1 ring-black/5 mt-0.5"
                                      style={{ backgroundColor: `${m.color}18`, color: m.color }}
                                      aria-hidden="true"
                                    >
                                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                      </svg>
                                    </span>
                                    <div className="min-w-0 flex-1">
                                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
                                        Contato
                                      </p>
                                      <a href={`mailto:${m.contact}`} className="text-[#D4A24C] hover:underline text-[15px] font-medium break-all inline-block mt-0.5">
                                        {m.contact}
                                      </a>
                                      </div>
                                      </div>
                                      </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria */}
      {m.galeria && m.galeria.length > 0 && (
        <section className="py-16 bg-muted/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <div className="mb-3 flex items-center justify-center gap-3">
                <span className="block h-px w-8 bg-gradient-to-r from-transparent to-[#D4A24C]/60" aria-hidden="true" />
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-[#D4A24C]/90 leading-none">
                  Galeria
                </span>
                <span className="block h-px w-8 bg-gradient-to-l from-transparent to-[#D4A24C]/60" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-normal text-foreground">
                Momentos do ministério
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base">
                Adicione fotos em <code className="text-[#D4A24C]">public/fotos/ministerios/</code> para exibir aqui.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {m.galeria.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border/60 group"
                >
                  <img
                    src={src}
                    alt={`${m.name} — foto ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement!;
                      parent.classList.add("flex", "items-center", "justify-center");
                      parent.innerHTML = `<span class="text-4xl text-muted-foreground/50">${m.icon}</span>`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
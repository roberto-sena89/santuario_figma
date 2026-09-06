import { MINISTERIOS, type Ministry } from "../data/ministerios";
import { CHURCH } from "../data/church";
import type { Page } from "../components/Navigation";

interface MinisterioDetalheProps {
  id: string;
  onNavigate: (page: Page) => void;
}

/** Fundo fotográfico do hero — só ministérios com foto dedicada. */
const HERO_BACKGROUNDS: Record<string, string> = {
  louvor: "/fotos/minsterios/louvor/1.jpg",
  jovens: "/fotos/minsterios/jovens/1.jpg",
  criancas: "/fotos/minsterios/crianças/1.jpg",
  intercessao: "/fotos/minsterios/intercessão/1.jpg",
  casais: "/fotos/minsterios/familia/1.jpg",
  evangelismo: "/fotos/minsterios/missões/2.jpg",
};

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
      <section
        className="relative overflow-hidden"
        aria-label={m.name}
        style={
          HERO_BACKGROUNDS[m.id]
            ? {
                backgroundImage: `url('${HERO_BACKGROUNDS[m.id]}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {/* Overlay escuro para legibilidade sobre a foto */}
        {HERO_BACKGROUNDS[m.id] && (
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80"
            aria-hidden="true"
          />
        )}
        <div
          className="absolute inset-0 opacity-25"
          style={{ background: `radial-gradient(ellipse at top, ${m.color}55, transparent 70%)` }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4A24C]/40 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
            {/* Esquerda — identidade do ministério */}
            <div>
              <div>
                  <span
                    className="block h-px w-8 bg-gradient-to-r from-transparent"
                    style={{ backgroundImage: `linear-gradient(to right, transparent, ${m.color})` }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-[10.5px] font-semibold uppercase tracking-[0.28em] leading-none"
                    style={{ color: "#ffffff" }}
                  >
                    Comunidade
                  </span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-3 [text-shadow:0_2px_16px_rgba(0,0,0,0.85)]">
                  {m.name}
                </h1>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed max-w-xl [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]">
                  {m.resumo ?? m.description}
                </p>
              </div>

            {/* Direita — versículo do ministério */}
            {m.versiculo && (
              <div className="flex justify-end">
                <figure className="w-full max-w-md rounded-2xl border border-[#D4A24C]/30 bg-black/40 px-6 py-7 sm:px-8 sm:py-8 backdrop-blur-md shadow-lg shadow-black/20">
                  <span
                    className="block font-serif text-4xl leading-none text-[#D4A24C] mb-3 drop-shadow-sm"
                    aria-hidden="true"
                  >
                    ❝
                  </span>
                  <blockquote className="font-bible text-lg sm:text-xl font-medium text-white leading-[1.7] text-pretty [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
                    {m.versiculo.texto}
                  </blockquote>
                  <span
                    className="mt-5 block h-px w-12 bg-gradient-to-r from-[#D4A24C]/70 to-transparent"
                    aria-hidden="true"
                  />
                  <cite className="not-italic block mt-3 text-[#E8B35E] font-semibold text-sm uppercase tracking-[0.18em] [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
                    {m.versiculo.referencia}
                  </cite>
                </figure>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 min-w-0">
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

            {/* Sidebar Equipe */}
            {m.equipe && m.equipe.length > 0 && (
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="block h-px w-8 bg-gradient-to-r from-transparent to-[#D4A24C]/60"
                    aria-hidden="true"
                  />
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-[#D4A24C]/90 leading-none">
                    Equipe
                  </span>
                  <span
                    className="block h-px w-8 bg-gradient-to-l from-transparent to-[#D4A24C]/60"
                    aria-hidden="true"
                  />
                </div>

                <div className="grid gap-4">
                  {m.equipe.map((p, i) => {
                    const isLeader = i === 0;
                    const color = isLeader ? m.color : "#D4A24C";
                    const labelColor = isLeader ? m.color : "#B8860B";
                    const tag = isLeader ? m.name : "Obreiro";
                    return (
                      <div
                        key={i}
                        className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <div
                          className="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{ background: `linear-gradient(to right, ${color}, ${color}00)` }}
                          aria-hidden="true"
                        />
                        <div className="p-5">
                          <div className="mb-2.5 flex items-center gap-2">
                            <div className="h-1 w-1 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
                            <span
                              className="text-[9.5px] font-semibold uppercase tracking-[0.22em] leading-none"
                              style={{ color: labelColor }}
                            >
                              {tag}
                            </span>
                          </div>
                          <h3 className="font-display font-semibold text-foreground text-[15px] leading-tight">
                            {p.nome}
                          </h3>
                          <div
                            className="mt-1.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1"
                            style={{ backgroundColor: `${color}15`, color: labelColor, borderColor: `${color}30` }}
                          >
                            {p.papel}
                          </div>
                          <p className="text-muted-foreground text-[13px] leading-relaxed mt-2.5">
                            {p.bio}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
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
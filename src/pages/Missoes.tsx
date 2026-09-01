import { CHURCH } from "../data/church";
import { MISSOES } from "../data/missoes";
import type { Page } from "../components/Navigation";

interface MissoesProps {
  onNavigate: (page: Page) => void;
}

export default function Missoes({ onNavigate }: MissoesProps) {
  const m = MISSOES;

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden" aria-label="Missões">
        <div className="absolute inset-0 bg-gradient-to-br from-[#047857]/30 via-background/90 to-background" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4A24C]/40 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#D4A24C]/12 border border-[#D4A24C]/25 px-4 py-1.5 text-[#D4A24C] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
              <span aria-hidden="true">{m.icone}</span>
              {m.nome}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground leading-tight mb-4">
              {m.nome}
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl">
              {m.resumo}
            </p>
          </div>
        </div>
      </section>

      {/* Versículo */}
      <section className="py-16 bg-muted/40">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-card/80 border border-border/60 rounded-2xl p-8 sm:p-10 shadow-sm backdrop-blur-sm">
            <span className="text-5xl leading-none text-[#D4A24C]/60 block mb-3" aria-hidden="true">❝</span>
            <blockquote className="font-bible text-2xl sm:text-3xl lg:text-4xl font-medium text-foreground leading-snug">
              {m.versiculo.texto}
            </blockquote>
            <cite className="not-italic block mt-4 text-[#D4A24C] font-medium text-base">
              — {m.versiculo.referencia}
            </cite>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              {/* Cabeçalho da seção */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl text-xl ring-1 ring-black/5 shadow-sm"
                  style={{ backgroundColor: `${m.cor}20`, color: m.cor }}
                  aria-hidden="true"
                >
                  {m.icone}
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
              <p className="text-muted-foreground text-base leading-relaxed max-w-3xl">
                {m.descricao}
              </p>
            </div>

            {/* Sidebar informações */}
            <div>
              <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md shadow-lg shadow-black/10">
                {/* Header com gradiente no tom do ministério */}
                <div
                  className="relative px-6 py-5 border-b border-border/60"
                  style={{ background: `linear-gradient(135deg, ${m.cor}22, transparent 65%)` }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl text-xl ring-1 ring-black/5 shadow-sm"
                      style={{ backgroundColor: `${m.cor}25`, color: m.cor }}
                      aria-hidden="true"
                    >
                      {m.icone}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-foreground text-lg leading-tight">
                        Informações
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Como acompanhar o ministério
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-5 space-y-4">
                  <div className="flex items-center gap-4">
                    <span
                      className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl text-base shadow-sm ring-1 ring-black/5"
                      style={{ backgroundColor: `${m.cor}18`, color: m.cor }}
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
                        {m.reuniao}
                      </p>
                    </div>
                  </div>

                  <div
                    className="h-px"
                    style={{ background: `linear-gradient(to right, ${m.cor}33, transparent)` }}
                    aria-hidden="true"
                  />

                  <div className="flex items-start gap-4">
                    <span
                      className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl text-base shadow-sm ring-1 ring-black/5 mt-0.5"
                      style={{ backgroundColor: `${m.cor}18`, color: m.cor }}
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
                      <a href={`mailto:${m.contato}`} className="text-[#D4A24C] hover:underline text-[15px] font-medium break-all inline-block mt-0.5">
                        {m.contato}
                      </a>
                    </div>
                  </div>

                  <div
                    className="h-px"
                    style={{ background: `linear-gradient(to right, ${m.cor}33, transparent)` }}
                    aria-hidden="true"
                  />

                  <div className="flex items-start gap-4">
                    <span
                      className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl text-base shadow-sm ring-1 ring-black/5 mt-0.5"
                      style={{ backgroundColor: `${m.cor}18`, color: m.cor }}
                      aria-hidden="true"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
                        Liderança
                      </p>
                      <p className="text-foreground text-[15px] font-medium leading-snug mt-0.5">
                        {m.liderMissao.nome}
                      </p>
                      <p className="text-muted-foreground text-xs mt-0.5">
                        {m.liderMissao.papel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liderança e Obreiros */}
      <section className="py-16 bg-muted/40" aria-label="Liderança e obreiros">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#D4A24C]/12 border border-[#D4A24C]/25 px-4 py-1.5 text-[#D4A24C] text-xs font-semibold uppercase tracking-[0.18em] mb-3">
              <span aria-hidden="true">🤝</span>
              Equipe
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-foreground">
              Liderança e obreiros
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base">
              Pessoas chamadas para conduzir, treinar e sustentar a obra missionária.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Líder */}
            <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              {/* Glow sutil no hover */}
              <div
                className="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "linear-gradient(to right, #047857, #04785700)" }}
                aria-hidden="true"
              />
              <div className="p-6">
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl text-2xl shadow-sm ring-1 ring-black/5 overflow-hidden mb-4"
                  aria-hidden="true"
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{ background: "linear-gradient(135deg, #047857, transparent)" }}
                  />
                  <span className="relative z-10 text-[#047857]">🙏</span>
                </div>
                <h3 className="font-display font-semibold text-foreground text-base leading-tight">
                  {m.liderMissao.nome}
                </h3>
                <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1"
                  style={{ backgroundColor: "#04785715", color: "#047857", borderColor: "#04785730" }}
                >
                  <span className="text-xs" aria-hidden="true">🙏</span>
                  {m.liderMissao.papel}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                  {m.liderMissao.bio}
                </p>
              </div>
            </div>

            {/* Obreiros */}
            {m.obreiros.map((ob) => (
              <div key={ob.id} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                {/* Glow sutil no hover */}
                <div
                  className="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "linear-gradient(to right, #D4A24C, #D4A24C00)" }}
                  aria-hidden="true"
                />
                <div className="p-6">
                  <div className="relative grid h-14 w-14 place-items-center rounded-2xl text-2xl shadow-sm ring-1 ring-black/5 overflow-hidden mb-4"
                    aria-hidden="true"
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{ background: "linear-gradient(135deg, #D4A24C, transparent)" }}
                    />
                    <span className="relative z-10 text-[#D4A24C]">🕊️</span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-base leading-tight">
                    {ob.nome}
                  </h3>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1"
                    style={{ backgroundColor: "#D4A24C15", color: "#B8860B", borderColor: "#D4A24C30" }}
                  >
                    <span className="text-xs" aria-hidden="true">🕊️</span>
                    {ob.papel}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                    {ob.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Missionários */}
      <section className="py-16 bg-background" aria-label="Missionários">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#D4A24C]/12 border border-[#D4A24C]/25 px-4 py-1.5 text-[#D4A24C] text-xs font-semibold uppercase tracking-[0.18em] mb-3">
              <span aria-hidden="true">🌍</span>
              Campo
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-foreground">
              Missionários apoiados
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base">
              Conheça os missionários que nossa igreja apoia em diferentes campos.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {m.missionarios.map((mis, i) => {
              const cores = [
                { bg: "#047857", nome: "Região Norte", icon: "🌳" },
                { bg: "#0369A1", nome: "Campo — África", icon: "🌍" },
              ];
              const c = cores[i % cores.length];
              return (
                <div
                  key={mis.id}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  {/* Glow sutil no hover */}
                  <div
                    className="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `linear-gradient(to right, ${c.bg}, ${c.bg}00)` }}
                    aria-hidden="true"
                  />
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="relative grid h-16 w-16 flex-shrink-0 place-items-center rounded-2xl text-2xl shadow-sm ring-1 ring-black/5 overflow-hidden"
                      >
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{ background: `linear-gradient(135deg, ${c.bg}, transparent)` }}
                          aria-hidden="true"
                        />
                        <span className="relative z-10" style={{ color: c.bg }} aria-hidden="true">
                          {mis.nome.includes("Paulo") ? "✝️" : "🕊️"}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-semibold text-foreground text-base leading-tight">
                          {mis.nome}
                        </h3>
                        <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1"
                          style={{ backgroundColor: `${c.bg}15`, color: c.bg, borderColor: `${c.bg}30` }}
                        >
                          <span className="text-xs" aria-hidden="true">{c.icon}</span>
                          {mis.papel}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {mis.bio}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conferências */}
      <section className="py-16 bg-muted/40" aria-label="Conferências missionárias">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#D4A24C]/12 border border-[#D4A24C]/25 px-4 py-1.5 text-[#D4A24C] text-xs font-semibold uppercase tracking-[0.18em] mb-3">
              <span aria-hidden="true">📢</span>
              Eventos
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-foreground">
              Conferências missionárias
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base">
              Momentos de avivamento, ensino e envio para a obra missionária.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {m.conferencias.map((conf) => (
              <div
                key={conf.id}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                {/* Glow sutil no hover */}
                <div
                  className="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(to right, ${conf.destaque ? "#D4A24C" : "#047857"}, transparent)` }}
                  aria-hidden="true"
                />
                {conf.destaque && (
                  <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at top, #D4A24C, transparent 70%)" }}
                    aria-hidden="true"
                  />
                )}
                <div className="relative p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                      className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-xl text-xl ring-1 ring-black/5 shadow-sm"
                      style={{ backgroundColor: `${conf.destaque ? "#D4A24C" : "#047857"}18`, color: conf.destaque ? "#D4A24C" : "#047857" }}
                      aria-hidden="true"
                    >
                      {conf.destaque ? "⭐" : "📢"}
                    </div>
                    {conf.destaque && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#D4A24C]/15 text-[#D4A24C] text-[10px] font-bold uppercase tracking-wide px-3 py-1 ring-1 ring-[#D4A24C]/25">
                        Destaque
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-base leading-tight mb-3">
                    {conf.titulo}
                  </h3>
                  <div className="flex flex-col gap-1.5 mb-4">
                    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="grid h-5 w-5 place-items-center rounded-md bg-muted/60 text-[#D4A24C]" aria-hidden="true">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </span>
                      {conf.data}
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="grid h-5 w-5 place-items-center rounded-md bg-muted/60 text-[#D4A24C]" aria-hidden="true">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </span>
                      {conf.local}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {conf.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria / Vídeos */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#D4A24C]/12 border border-[#D4A24C]/25 px-4 py-1.5 text-[#D4A24C] text-xs font-semibold uppercase tracking-[0.18em] mb-3">
              <span aria-hidden="true">📸</span>
              Mídia
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-foreground">
              Fotos e vídeos
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base">
              Adicione fotos e vídeos nos arquivos de dados para exibir aqui.
            </p>
          </div>

          {/* Galeria de imagens */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {m.galeria.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border/60 group"
              >
                <img
                  src={src}
                  alt={`Missões — foto ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.classList.add("flex", "items-center", "justify-center");
                    e.currentTarget.parentElement!.innerHTML = `<span class="text-4xl text-muted-foreground/50">📷</span>`;
                  }}
                />
              </div>
            ))}
          </div>

          {/* Vídeos */}
          <div className="grid sm:grid-cols-2 gap-6">
            {m.videos.map((v, i) => (
              <div key={i} className="bg-card/80 border border-border/60 rounded-2xl overflow-hidden backdrop-blur-sm shadow-sm">
                <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground/50">
                  {v.id ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${v.id}`}
                      title={v.titulo}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : (
                    <div className="text-center p-6">
                      <span className="text-4xl block mb-2">🎬</span>
                      <p className="text-sm">{v.titulo}</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">Adicione o ID do vídeo nos dados</p>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-foreground text-sm">{v.titulo}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Apoie a obra missionária */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-card/80 border border-border/60 rounded-2xl p-8 sm:p-10 backdrop-blur-sm shadow-sm">
            <span className="text-4xl block mb-4" aria-hidden="true">🌍</span>
            <h2 className="font-display text-2xl sm:text-3xl font-normal text-foreground mb-4">
              Quer apoiar a obra missionária?
            </h2>
            <p className="text-muted-foreground text-base mb-6 max-w-lg mx-auto">
              Sua contribuição ajuda a sustentar missionários, viagens e eventos missionários. Entre em contato conosco.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => onNavigate("contribuicoes")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A24C] to-[#C4933C] text-gray-900 font-semibold px-6 py-3 rounded-full shadow-lg shadow-[#D4A24C]/30 transition-all hover:shadow-xl hover:shadow-[#D4A24C]/50 hover:-translate-y-0.5 active:translate-y-0"
              >
                🕊️ Apoie a obra
              </button>
              <a
                href={`mailto:${m.contato}`}
                className="inline-flex items-center gap-2 rounded-full border border-[#D4A24C]/50 bg-[#D4A24C]/10 px-6 py-3 text-sm font-medium text-[#D4A24C] backdrop-blur-sm transition-all hover:border-[#D4A24C]/80 hover:bg-[#D4A24C]/20 hover:-translate-y-0.5"
              >
                ✉️ Entrar em contato
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
import { CHURCH } from "../data/church";
import SectionHero from "../components/ui/SectionHero";
import { MISSOES } from "../data/missoes";
import type { Page } from "../components/Navigation";
import { Clapperboard } from "lucide-react";

interface MissoesProps {
  onNavigate: (page: Page) => void;
}

export default function Missoes({ onNavigate }: MissoesProps) {
  const m = MISSOES;

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background pt-16">
      <SectionHero
        image="/fotos/ministerios/missões/3.jpg"
        imagePosition="center 30%"
        label={m.nome}
        containerClassName="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24"
      >
        <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="block h-px w-10 bg-gradient-to-r from-transparent to-gold/80" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-light leading-none drop-shadow-sm">
                {m.nome}
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] mb-5 tracking-tight drop-shadow-md">
              {m.nome}
            </h1>
            <p className="text-white/85 text-lg sm:text-xl leading-relaxed max-w-2xl drop-shadow-sm">
              {m.resumo}
            </p>
        </div>
      </SectionHero>

      {/* Sobre + Liderança lado a lado */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Sobre */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="block h-px w-10 bg-gradient-to-r from-transparent to-emerald-700/70"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-300 leading-none">
                    Nossa missão e propósito
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground leading-tight tracking-tight">
                  Sobre o ministério
                </h2>
              </div>

              {/* Descrição sobre foto — iguala a altura da coluna "Equipe" ao lado */}
              <div className="relative overflow-hidden rounded-2xl border border-border/60 lg:h-[540px] lg:min-h-[480px]">
                <img
                  src="/fotos/ministerios/missões/4.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="lazy"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-black/55"
                  aria-hidden="true"
                />
                <div className="relative z-10 flex h-full flex-col justify-start p-6 sm:p-8">
                  <p className="max-w-prose text-white font-normal text-base leading-[1.8] text-pretty [text-shadow:0_2px_14px_rgba(0,0,0,0.9)]">
                    {m.descricao}
                  </p>
                </div>
              </div>
            </div>

            {/* Liderança e Obreiros (sidebar direita) */}
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="block h-px w-8 bg-gradient-to-r from-transparent to-gold/60"
                  aria-hidden="true"
                />
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-gold/90 leading-none">
                  Equipe
                </span>
                <span className="block h-px w-8 bg-gradient-to-l from-transparent to-gold/60" aria-hidden="true" />
              </div>

              <div className="grid gap-4">
                {/* Líder */}
                <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  <div
                    className="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "linear-gradient(to right, #047857, #04785700)" }}
                    aria-hidden="true"
                  />
                  <div className="p-5">
                    <div className="mb-2.5 flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full" style={{ backgroundColor: "#047857" }} aria-hidden="true" />
                      <span className="text-xs font-semibold uppercase tracking-[0.22em] leading-none" style={{ color: "#6EE7B7" }}>
                        Ministério de Missões
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-foreground text-[15px] leading-tight">
                      {m.liderMissao.nome}
                    </h3>
                    <div
                      className="mt-1.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1"
                      style={{ backgroundColor: "#04785725", color: "#6EE7B7", borderColor: "#04785750" }}
                    >
                      {m.liderMissao.papel}
                    </div>
                    <p className="text-muted-foreground text-[13px] leading-relaxed mt-2.5">
                      {m.liderMissao.bio}
                    </p>
                  </div>
                </div>

                {/* Obreiros */}
                {m.obreiros.map((ob) => (
                  <div key={ob.id} className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                    <div
                      className="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: "linear-gradient(to right, #D4A24C, #D4A24C00)" }}
                      aria-hidden="true"
                    />
                    <div className="p-5">
                      <div className="mb-2.5 flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full" style={{ backgroundColor: "#D4A24C" }} aria-hidden="true" />
                        <span className="text-xs font-semibold uppercase tracking-[0.22em] leading-none" style={{ color: "#E8B35E" }}>
                          Obreiro
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-foreground text-[15px] leading-tight">
                        {ob.nome}
                      </h3>
                      <div
                        className="mt-1.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1"
                        style={{ backgroundColor: "#D4A24C25", color: "#E8B35E", borderColor: "#D4A24C50" }}
                      >
                        {ob.papel}
                      </div>
                      <p className="text-muted-foreground text-[13px] leading-relaxed mt-2.5">
                        {ob.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missionários */}
      <section className="py-16 bg-background" aria-labelledby="missoes-campo">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="block h-px w-8 bg-gradient-to-r from-transparent to-gold/60" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-light leading-none">
                Campo
              </span>
              <span className="block h-px w-8 bg-gradient-to-l from-transparent to-gold/60" aria-hidden="true" />
            </div>
            <h2 id="missoes-campo" className="font-display text-2xl sm:text-3xl font-normal text-foreground">
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
                    {/* Indicador de cor (sem emoji) */}
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full" style={{ backgroundColor: c.bg }} aria-hidden="true" />
                      <span
                        className="text-xs font-semibold uppercase tracking-[0.22em] leading-none text-gold-light"
                      >
                        Missionário
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-foreground text-base leading-tight">
                      {mis.nome}
                    </h3>
                    <div
                      className="mt-1.5 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1"
                      style={{ backgroundColor: `${c.bg}25`, color: "#E8B35E", borderColor: `${c.bg}50` }}
                    >
                      {mis.papel}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-3">
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
      <section className="py-16 bg-muted/40" aria-labelledby="missoes-eventos">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="block h-px w-8 bg-gradient-to-r from-transparent to-gold/60" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-light leading-none">
                Eventos
              </span>
              <span className="block h-px w-8 bg-gradient-to-l from-transparent to-gold/60" aria-hidden="true" />
            </div>
            <h2 id="missoes-eventos" className="font-display text-2xl sm:text-3xl font-normal text-foreground">
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
                    {/* Indicador de cor (sem emoji) */}
                    <div className="flex items-center gap-2">
                      <div
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: conf.destaque ? "#D4A24C" : "#047857" }}
                        aria-hidden="true"
                      />
                      <span
                        className="text-xs font-semibold uppercase tracking-[0.22em] leading-none text-gold-light"
                      >
                        {conf.destaque ? "Conferência" : "Evento"}
                      </span>
                    </div>
                    {conf.destaque && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 text-gold-light text-xs font-bold uppercase tracking-wide px-3 py-1 ring-1 ring-gold/25">
                        Destaque
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-base leading-tight mb-3">
                    {conf.titulo}
                  </h3>
                  <div className="flex flex-col gap-1.5 mb-4">
                    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="grid h-5 w-5 place-items-center rounded-md bg-muted/60 text-gold" aria-hidden="true">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </span>
                      {conf.data}
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="grid h-5 w-5 place-items-center rounded-md bg-muted/60 text-gold" aria-hidden="true">
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
      <section className="py-16 bg-background" aria-labelledby="missoes-midia">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="block h-px w-8 bg-gradient-to-r from-transparent to-gold/60" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-light leading-none">
                Mídia
              </span>
              <span className="block h-px w-8 bg-gradient-to-l from-transparent to-gold/60" aria-hidden="true" />
            </div>
            <h2 id="missoes-midia" className="font-display text-2xl sm:text-3xl font-normal text-foreground">
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
                      <span className="mb-2 block" aria-hidden="true"><Clapperboard className="h-10 w-10 text-gold" aria-hidden="true" /></span>
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
      <section
        className="relative py-12 sm:py-14 overflow-hidden bg-muted/40"
        style={{
          backgroundImage: "url('/fotos/ministerios/missões/2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
        }}
      >
        {/* Overlay suave para legibilidade */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-graphite/70 via-graphite/60 to-graphite/70"
          aria-hidden="true"
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          {/* Ornamento superior */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="block h-px w-12 bg-gradient-to-r from-transparent to-gold/70" aria-hidden="true" />
            <span className="font-serif text-[16px] text-gold-light drop-shadow-sm" aria-hidden="true">✦</span>
            <span className="block h-px w-12 bg-gradient-to-l from-transparent to-gold/70" aria-hidden="true" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-[1.15] mb-4 tracking-tight drop-shadow-md">
            Quer apoiar a obra missionária?
          </h2>

          <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-6 drop-shadow-sm text-pretty">
            Sua contribuição ajuda a sustentar missionários, viagens e eventos missionários. Cada gesto faz diferença no campo.
          </p>

          {/* Versículo bíblico — faixa com card de apoio */}
          <figure className="mx-auto mb-8 max-w-xl rounded-2xl border border-white/10 bg-black/25 px-5 py-5 backdrop-blur-[2px]">
            <blockquote className="font-bible text-xl sm:text-2xl italic leading-[1.5] text-white drop-shadow-md text-balance font-medium">
              <span className="text-gold-light not-italic font-serif" aria-hidden="true">“</span>
              <span className="px-0.5">Ide por todo o mundo, pregai o evangelho a toda criatura.</span>
              <span className="text-gold-light not-italic font-serif" aria-hidden="true">”</span>
            </blockquote>
            <figcaption className="mt-4 flex items-center justify-center gap-3">
              <span className="block h-px w-8 bg-gold/70" aria-hidden="true" />
              <cite className="not-italic text-[11px] font-bold uppercase tracking-[0.3em] text-gold-light leading-none drop-shadow-sm">
                Marcos 16:15
              </cite>
              <span className="block h-px w-8 bg-gold/70" aria-hidden="true" />
            </figcaption>
          </figure>

          <div className="flex justify-center">
            <button
              onClick={() => onNavigate("contribuicoes")}
              aria-label="Apoie a obra missionária"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-gold to-gold-hover text-gray-900 font-semibold px-7 py-3 rounded-full shadow-lg shadow-gold/30 transition-all duration-200 hover:shadow-xl hover:shadow-gold/50 hover:-translate-y-0.5 active:translate-y-0"
            >
              Apoie a obra
              <svg
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

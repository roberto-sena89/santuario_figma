import { useState, useRef } from 'react';
import { Music, Search, BookOpen, Heart, Play, Volume2 } from 'lucide-react';
import { CATEGORIAS } from '../../data/playbacks.js';
import { formatDescricao } from '../../utils/format';

export default function PlaybacksHero({
  totalMusicas,
  totalArtistas,
  harpaCount,
  totalCategorias,
  busca,
  setBusca,
  buscaDebounced,
  categoria,
  setCategoria,
  onAbrirPlayerDestaque,
  destaque,
}) {
  const [mounted] = useState(true);
  const [focusedSearch, setFocusedSearch] = useState(false);
  const ref = useRef(null);

  return (
    <header
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-bg via-surface to-surface2"
      aria-label="Cabeçalho da página de playbacks"
    >
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/fotos/playbacks/play.jfif?v=2')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.9,
        }}
        aria-hidden="true"
      />
      {/* Overlay gradiente */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-b from-bg/80 via-bg/70 to-bg"
        aria-hidden="true"
      />
      {/* Textura sutil */}
      <div className="absolute inset-0 bg-noise pointer-events-none z-0" aria-hidden="true" />

      {/* Elementos decorativos */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none z-10" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none z-10" />

      <div className="relative z-20 mx-auto max-w-6xl px-4 pt-12 pb-6 sm:pt-16 sm:pb-8">
        {/* Breadcrumb + título */}
        <div
          className={`text-center transition-all duration-700 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-muted mb-3">
            <Music className="inline h-3 w-3 mr-1.5 -mt-0.5" aria-hidden="true" />
            Música · Adoração · Louvor
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text tracking-tight leading-tight">
            Playbacks <span className="text-secondary italic font-light">com</span> Letra
          </h1>
          <p className="mt-3 text-sm sm:text-base text-text2 max-w-xl mx-auto leading-relaxed">
            Curadoria de playbacks legendados para sua igreja, ensaio ou momento devocional. A letra
            aparece na tela — basta tocar.
          </p>
        </div>

        {/* Cards de stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`group relative rounded-2xl border border-secondary/40 bg-surface2/80 backdrop-blur-sm p-4 shadow-sm transition-all duration-500 hover:shadow-lg hover:shadow-secondary/10 hover:-translate-y-0.5 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary/15 text-secondary">
                <Music className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold tabular-nums text-text">
                  {totalMusicas.toLocaleString('pt-BR')}
                </p>
                <p className="text-xs text-text2">playbacks legendados</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => destaque && onAbrirPlayerDestaque(destaque)}
            disabled={!destaque}
            className={`group relative overflow-hidden rounded-2xl border border-secondary/40 bg-gradient-to-br from-surface2 to-surface p-4 text-left shadow-sm transition-all duration-500 hover:shadow-lg hover:shadow-secondary/15 hover:-translate-y-0.5 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '200ms' }}
            aria-label={
              destaque
                ? `Tocar ${formatDescricao(destaque)} em destaque`
                : 'Sem destaque no momento'
            }
          >
            {destaque ? (
              <div className="flex items-center gap-3">
                <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-secondary to-secondary-dark text-white shadow-md">
                  <Play className="h-4 w-4 ml-0.5" fill="currentColor" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-secondary mb-0.5">
                    Em destaque
                  </p>
                  <p className="text-sm font-semibold text-text truncate">{destaque.titulo}</p>
                  <p className="text-xs text-text2 truncate">{destaque.artista}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-text2">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-surface">
                  <Volume2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-xs">Em breve</p>
              </div>
            )}
          </button>

          <div
            className={`relative rounded-2xl border border-secondary/40 bg-surface2/80 backdrop-blur-sm p-4 shadow-sm transition-all duration-500 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-0.5 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary/15 text-secondary">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-secondary mb-0.5">
                  Versículo
                </p>
                <p className="text-xs italic text-text leading-snug">
                  "Cantai ao Senhor um cântico novo"
                </p>
                <p className="text-[10px] text-text2 mt-0.5">Salmos 96:1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de busca + categorias */}
        <div
          className={`mt-8 relative rounded-2xl border border-secondary/40 bg-surface2/90 backdrop-blur-md p-3 sm:p-4 shadow-lg shadow-black/5 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="relative">
            <Search
              className={`pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300 ${
                focusedSearch ? 'text-secondary' : 'text-muted'
              }`}
              aria-hidden="true"
            />
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onFocus={() => setFocusedSearch(true)}
              onBlur={() => setFocusedSearch(false)}
              placeholder="Buscar música, artista ou tom…"
              aria-label="Buscar no catálogo de playbacks"
              className={`w-full rounded-xl border bg-surface py-3.5 pl-11 pr-10 text-sm text-text outline-none transition-all duration-300 placeholder:text-muted ${
                focusedSearch
                  ? 'border-secondary/50 ring-4 ring-secondary/10'
                  : 'border-secondary/30'
              }`}
            />
            {busca && (
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-secondary uppercase tracking-wider">
                {busca !== buscaDebounced ? '…' : '✓'}
              </span>
            )}
          </div>

          <div className="mt-4 grid grid-cols-5 gap-2">
            {['Todas', ...CATEGORIAS].map((c, idx) => {
              const ativa = categoria === c;
              return (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCategoria(c)}
                  aria-pressed={ativa}
                  style={{ animationDelay: `${idx * 30}ms` }}
                  className={`group relative flex items-center justify-center rounded-xl px-3 py-2.5 text-xs font-semibold tracking-tight transition-all duration-300 ease-out ${
                    ativa
                      ? 'bg-gradient-to-br from-secondary via-secondary-soft to-secondary-dark text-white shadow-lg shadow-secondary/25'
                      : 'bg-surface text-text2 hover:bg-surface2 hover:text-secondary hover:shadow-md hover:shadow-secondary/10 hover:-translate-y-0.5 border border-secondary/40 hover:border-secondary/30'
                  }`}
                >
                  {c}
                  {ativa && (
                    <span
                      className="absolute -bottom-px left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-white/80"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-[11px] text-text2">
            <span className="inline-flex items-center gap-1.5">
              <Heart className="h-3 w-3" aria-hidden="true" />
              <span>
                <strong className="text-text">{totalArtistas}</strong> artistas
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-3 w-3" aria-hidden="true" />
              <span>
                <strong className="text-text">{harpaCount}</strong> hinos da Harpa
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Music className="h-3 w-3" aria-hidden="true" />
              <span>
                <strong className="text-text">{totalCategorias}</strong> categorias
              </span>
            </span>
          </div>
        </div>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-4 text-bg z-20"
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,12 C300,20 600,4 900,12 C1050,16 1150,8 1200,12 L1200,24 L0,24 Z"
          fill="currentColor"
        />
      </svg>
    </header>
  );
}

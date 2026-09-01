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
          opacity: 0.7,
          filter: 'saturate(0.55)',
        }}
        aria-hidden="true"
      />
      {/* Overlay gradiente neutro — imagem visível, texto legível */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/30 to-bg"
        aria-hidden="true"
      />
      {/* Textura sutil */}
      <div className="absolute inset-0 bg-noise pointer-events-none z-0" aria-hidden="true" />

      {/* Glows decorativos âmbar */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#D4A24C]/10 rounded-full blur-3xl pointer-events-none z-10" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#E8B35E]/6 rounded-full blur-3xl pointer-events-none z-10" />

      <div className="relative z-20 mx-auto max-w-6xl px-4 pt-12 pb-6 sm:pt-16 sm:pb-8">
        {/* Breadcrumb + título */}
        <div
          className={`text-center transition-all duration-700 ease-out ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-[#D4A24C]/15 border border-[#D4A24C]/30 px-4 py-1.5 text-[#9C7A2E] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
            <Music className="h-3.5 w-3.5" aria-hidden="true" />
            Musica · Adoracao · Louvor
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text tracking-tight leading-tight">
            Playbacks <span className="text-[#9C7A2E] italic font-medium">com</span> Letra
          </h1>
          <p className="mt-6 inline-flex items-start gap-3 rounded-2xl border border-[#D4A24C]/20 px-4 py-3 text-sm sm:text-base text-text2 max-w-xl mx-auto leading-relaxed">
            <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#D4A24C]/15 text-base" aria-hidden="true">🎶</span>
            <span>Curadoria de playbacks legendados para sua igreja, ensaio ou momento devocional. A letra aparece na tela — basta tocar.</span>
          </p>
        </div>

        {/* Cards de stats + destaque + versículo */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Stats: playbacks */}
          <div
            className={`group relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-4 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-[#D4A24C]/40 hover:shadow-lg hover:shadow-[#D4A24C]/10 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#D4A24C]/15 text-[#B8860B] ring-1 ring-[#D4A24C]/20 dark:text-[#E8B35E]">
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

          {/* Em destaque — CTA âmbar sólido */}
          <button
            onClick={() => destaque && onAbrirPlayerDestaque(destaque)}
            disabled={!destaque}
            className={`group relative overflow-hidden rounded-2xl bg-[#D4A24C] p-4 text-left shadow-lg shadow-[#D4A24C]/25 transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#C4933C] hover:shadow-[#D4A24C]/40 disabled:opacity-60 disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:bg-[#D4A24C] ${
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
                <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/25 text-gray-900 shadow-inner transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-4 w-4 ml-0.5" fill="currentColor" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-800/80 mb-0.5">
                    Em destaque
                  </p>
                  <p className="text-sm font-semibold text-gray-900 truncate">{destaque.titulo}</p>
                  <p className="text-xs text-gray-800/75 truncate">{destaque.artista || '—'}</p>
                </div>
                <span
                  className="hidden sm:grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/20 text-gray-900 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-gray-900/80">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/25 text-gray-900">
                  <Volume2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-xs font-semibold">Em breve</p>
              </div>
            )}
          </button>

          {/* Versículo */}
          <div
            className={`group relative rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-4 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-[#D4A24C]/40 hover:shadow-lg hover:shadow-[#D4A24C]/10 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#D4A24C]/15 text-[#B8860B] ring-1 ring-[#D4A24C]/20 dark:text-[#E8B35E]">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-[#B8860B] dark:text-[#E8B35E] mb-0.5">
                  Versículo
                </p>
                <p className="font-bible text-sm italic text-text leading-snug">
                  &quot;Cantai ao Senhor um cântico novo&quot;
                </p>
                <p className="text-[10px] text-text2 mt-0.5">Salmos 96:1</p>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de busca + categorias */}
        <div
          className={`mt-8 relative rounded-2xl border border-[#D4A24C]/20 bg-card/90 backdrop-blur-md p-3 sm:p-4 shadow-lg shadow-black/10 transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="relative">
            <Search
              className={`pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300 ${
                focusedSearch ? 'text-[#D4A24C]' : 'text-muted-foreground'
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
              className="w-full rounded-xl border border-border bg-surface py-3.5 pl-11 pr-10 text-sm text-text outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/25"
            />
            {busca && (
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-[#D4A24C] uppercase tracking-wider">
                {busca !== buscaDebounced ? '…' : '✓'}
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {['Todas', ...CATEGORIAS].map((c, idx) => {
              const ativa = categoria === c;
              return (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCategoria(c)}
                  aria-pressed={ativa}
                  style={{ animationDelay: `${idx * 30}ms` }}
                  className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold tracking-tight transition-all duration-300 ease-out ${
                    ativa
                      ? 'bg-[#D4A24C] text-gray-800 shadow-lg shadow-[#D4A24C]/30 hover:bg-[#C4933C]'
                      : 'border border-border bg-surface text-text2 hover:-translate-y-0.5 hover:border-[#D4A24C]/40 hover:bg-surface2 hover:text-[#E8B35E]'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-[11px] text-text2">
            <span className="inline-flex items-center gap-1.5">
              <Heart className="h-3 w-3 text-[#D4A24C]" aria-hidden="true" />
              <span>
                <strong className="text-text">{totalArtistas}</strong> artistas
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-3 w-3 text-[#D4A24C]" aria-hidden="true" />
              <span>
                <strong className="text-text">{harpaCount}</strong> hinos da Harpa
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Music className="h-3 w-3 text-[#D4A24C]" aria-hidden="true" />
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

import { useState, useEffect } from 'react';
import {
  Archive,
  Bird,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Cross,
  Filter,
  Flame,
  HandHeart,
  Heart,
  HeartPulse,
  Music,
  Music2,
  Search,
  Sparkles,
  Sun,
  Tag,
  X,
} from 'lucide-react';
import { CATEGORIAS } from '../../data/playbacks.js';
import { normalizar } from '../../utils/format';

// Ícones profissionais por categoria (mesmo padrão do PlaybackGrid)
const ICONES_CATEGORIA = {
  Todas: Sparkles,
  Adoração: Heart,
  'Louvor/Celebração': Music2,
  'Oração/Clamor': HandHeart,
  'Fé e Vitória': Cross,
  Gratidão: Sun,
  'Restauração e Cura': HeartPulse,
  'Consolo e Esperança': Bird,
  'Espírito Santo': Flame,
  Geral: Archive,
};

/**
 * Barra lateral de filtros personalizados para a página Playbacks.
 *
 * Recursos:
 *   - Sidebar fixa no desktop / drawer no mobile
 *   - Busca por artista com debounce
 *   - Accordion expansível por seção (categoria, tom, etc.)
 *   - Contagem de resultados por categoria
 *   - Estado vazio com mensagem amigável
 *   - Acessibilidade (aria-expanded, role, keyboard nav)
 *   - Performance (lazy render via state)
 *   - Persistência visual (sticky no desktop)
 */
export default function FilterSidebar({
  // Filtros
  categoria,
  setCategoria,
  tom,
  setTom,
  artistaSel,
  setArtistaSel,
  artistaBusca,
  setArtistaBusca,
  soFavoritas,
  setSoFavoritas,
  soHarpa,
  setSoHarpa,
  ordenacao,
  setOrdenacao,
  // Contagens
  totalPorCategoria,
  totalPorTom,
  // Listas
  artistasDisponiveis,
  tomsDisponiveis,
  contagemPorArtista,
  // Ações
  temFiltros,
  limparFiltros,
  // Visibilidade (mobile)
  open = false,
  onClose = null,
  favoritasCount = 0,
}) {
  // Accordion: controla quais seções estão abertas (padrão: todas abertas)
  const [secoesAbertas, setSecoesAbertas] = useState({
    categorias: true,
    tons: true,
    artistas: true,
    ordenacao: true,
  });

  const toggleSecao = (secao) => {
    setSecoesAbertas((prev) => ({ ...prev, [secao]: !prev[secao] }));
  };

  // Fechar drawer no mobile ao pressionar ESC
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  // Artistas filtrados pela busca (reutiliza lógica de normalização)
  const artistasFiltrados = artistaBusca.trim()
    ? artistasDisponiveis
        .filter((a) => normalizar(a).includes(normalizar(artistaBusca)))
        .slice(0, 30)
    : artistasDisponiveis.slice(0, 30);

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] transform overflow-y-auto
          bg-surface/95 border-r border-border backdrop-blur-xl
          shadow-2xl shadow-black/40 transition-transform duration-300 ease-out
          lg:sticky lg:top-4 lg:z-0 lg:h-[calc(100vh-2rem)] lg:w-72 lg:max-w-none
          lg:translate-x-0 lg:shadow-none lg:backdrop-blur-none
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-label="Filtros do catálogo de playbacks"
      >
        {/* Cabeçalho do sidebar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface/95 px-5 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#D4A24C]/25 to-[#D4A24C]/5 text-[#E8B35E] ring-1 ring-[#D4A24C]/30 shadow-[0_0_14px_rgba(212,162,76,0.18)]">
              <Filter className="h-4 w-4" aria-hidden="true" />
            </div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-text">Filtros</h2>
            {temFiltros && (
              <span className="ml-1 grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-br from-[#D4A24C] to-[#C4933C] px-1.5 text-[10px] font-bold text-gray-800 shadow-[0_0_10px_rgba(212,162,76,0.35)]">
                {
                  [
                    categoria !== 'Todas' && 1,
                    tom && 1,
                    artistaSel && 1,
                    soFavoritas && 1,
                    soHarpa && 1,
                  ].filter(Boolean).length
                }
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {temFiltros && (
              <button
                onClick={limparFiltros}
                className="rounded-lg px-2.5 py-1.5 text-[11px] font-semibold text-error transition hover:bg-error/10"
                aria-label="Limpar todos os filtros"
              >
                Limpar
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-lg text-text2 transition hover:bg-surface2 hover:text-text lg:hidden"
                aria-label="Fechar filtros"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4 p-4">
          {/* === Switches rápidos (Favoritas + Harpa) === */}
          <div className="rounded-2xl border border-[#D4A24C]/15 bg-gradient-to-b from-surface2/70 to-surface2/40 p-3 backdrop-blur-sm">
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
              <span className="h-1 w-1 rounded-full bg-[#D4A24C]" />
              Atalhos
            </p>
            <div className="space-y-1.5">
              <label
                className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2.5 text-sm transition-all duration-200 ${
                  soFavoritas
                    ? 'border-[#D4A24C]/50 bg-gradient-to-r from-[#D4A24C]/20 to-[#D4A24C]/5 text-[#E8B35E] shadow-[0_0_14px_rgba(212,162,76,0.12)]'
                    : 'border-border/40 bg-surface/50 text-text2 hover:-translate-y-0.5 hover:border-[#D4A24C]/40 hover:bg-surface2/70 hover:text-text'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Heart
                    className={`h-4 w-4 ${soFavoritas ? 'fill-current' : ''}`}
                    aria-hidden="true"
                  />
                  <span className="font-medium">Favoritas</span>
                  {favoritasCount > 0 && (
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                        soFavoritas
                          ? 'bg-[#D4A24C]/25 text-[#E8B35E]'
                          : 'bg-surface text-muted'
                      }`}
                    >
                      {favoritasCount}
                    </span>
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={soFavoritas}
                  onChange={(e) => setSoFavoritas(e.target.checked)}
                  className="sr-only"
                />
                <span
                  className={`relative h-5 w-9 rounded-full transition ${
                    soFavoritas
                      ? 'bg-gradient-to-r from-[#D4A24C] to-[#C4933C] shadow-[0_0_8px_rgba(212,162,76,0.4)]'
                      : 'bg-border'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                      soFavoritas ? 'left-4' : 'left-0.5'
                    }`}
                  />
                </span>
              </label>

              <label
                className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2.5 text-sm transition-all duration-200 ${
                  soHarpa
                    ? 'border-[#D4A24C]/50 bg-gradient-to-r from-[#D4A24C]/20 to-[#D4A24C]/5 text-[#E8B35E] shadow-[0_0_14px_rgba(212,162,76,0.12)]'
                    : 'border-border/40 bg-surface/50 text-text2 hover:-translate-y-0.5 hover:border-[#D4A24C]/40 hover:bg-surface2/70 hover:text-text'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  <span className="font-medium">Harpa Cristã</span>
                </span>
                <input
                  type="checkbox"
                  checked={soHarpa}
                  onChange={(e) => setSoHarpa(e.target.checked)}
                  className="sr-only"
                />
                <span
                  className={`relative h-5 w-9 rounded-full transition ${
                    soHarpa
                      ? 'bg-gradient-to-r from-[#D4A24C] to-[#C4933C] shadow-[0_0_8px_rgba(212,162,76,0.4)]'
                      : 'bg-border'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                      soHarpa ? 'left-4' : 'left-0.5'
                    }`}
                  />
                </span>
              </label>
            </div>
          </div>

          {/* === Ordenação === */}
          <SecaoAccordion
            titulo="Ordenar por"
            icone={Filter}
            aberta={secoesAbertas.ordenacao}
            onToggle={() => toggleSecao('ordenacao')}
            contador={ordenacao !== 'titulo-az' ? 1 : 0}
          >
            <div className="space-y-1">
              {[
                { id: 'titulo-az', label: 'Título A → Z' },
                { id: 'titulo-za', label: 'Título Z → A' },
                { id: 'artista-az', label: 'Artista A → Z' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setOrdenacao(opt.id)}
                  aria-pressed={ordenacao === opt.id}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-all duration-200 ${
                    ordenacao === opt.id
                      ? 'bg-gradient-to-r from-[#D4A24C]/20 to-[#D4A24C]/5 font-semibold text-[#E8B35E] ring-1 ring-inset ring-[#D4A24C]/30 shadow-[0_0_12px_rgba(212,162,76,0.08)]'
                      : 'text-text2 hover:translate-x-0.5 hover:bg-surface2/70 hover:text-text'
                  }`}
                >
                  <span>{opt.label}</span>
                  {ordenacao === opt.id && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4A24C] shadow-[0_0_6px_rgba(212,162,76,0.6)]" />
                  )}
                </button>
              ))}
            </div>
          </SecaoAccordion>

          {/* === Categorias === */}
          <SecaoAccordion
            titulo="Categoria"
            icone={Tag}
            aberta={secoesAbertas.categorias}
            onToggle={() => toggleSecao('categorias')}
            contador={categoria !== 'Todas' ? 1 : 0}
          >
            <div className="space-y-0.5 max-h-64 overflow-y-auto pr-1">
              {['Todas', ...CATEGORIAS].map((c) => {
                const Icon = ICONES_CATEGORIA[c] || Archive;
                const count = totalPorCategoria?.[c] ?? 0;
                const ativa = categoria === c;
                return (
                  <button
                    key={c}
                    onClick={() => setCategoria(c)}
                    aria-pressed={ativa}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-1.5 text-sm transition-all duration-200 ${
                      ativa
                        ? 'bg-gradient-to-r from-[#D4A24C]/20 to-[#D4A24C]/5 font-semibold text-[#E8B35E] ring-1 ring-inset ring-[#D4A24C]/30 shadow-[0_0_12px_rgba(212,162,76,0.08)]'
                        : 'text-text2 hover:translate-x-0.5 hover:bg-surface2/70 hover:text-text'
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Icon
                        className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                          ativa ? 'text-[#D4A24C]' : ''
                        }`}
                        aria-hidden="true"
                      />
                      <span className="truncate">{c}</span>
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums ${
                        ativa
                          ? 'bg-[#D4A24C]/25 text-[#E8B35E] ring-1 ring-[#D4A24C]/20'
                          : 'bg-surface/60 text-muted'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </SecaoAccordion>

          {/* === Tom === */}
          <SecaoAccordion
            titulo="Tom"
            icone={Music2}
            aberta={secoesAbertas.tons}
            onToggle={() => toggleSecao('tons')}
            contador={tom ? 1 : 0}
          >
            <button
              onClick={() => setTom('')}
              aria-pressed={!tom}
              className={`mb-1 flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-sm transition-all duration-200 ${
                !tom
                  ? 'bg-gradient-to-r from-[#D4A24C]/20 to-[#D4A24C]/5 font-semibold text-[#E8B35E] ring-1 ring-inset ring-[#D4A24C]/30'
                  : 'text-text2 hover:translate-x-0.5 hover:bg-surface2/70 hover:text-text'
              }`}
            >
              <span>Todos os tons</span>
              {!tom && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4A24C] shadow-[0_0_6px_rgba(212,162,76,0.6)]" />
              )}
            </button>
            <div className="max-h-48 space-y-2 overflow-y-auto pr-1">
              {tomsDisponiveis.maiores.length > 0 && (
                <GrupoTom
                  label="Maiores"
                  tons={tomsDisponiveis.maiores}
                  tom={tom}
                  setTom={setTom}
                  count={totalPorTom}
                />
              )}
              {tomsDisponiveis.menores.length > 0 && (
                <GrupoTom
                  label="Menores"
                  tons={tomsDisponiveis.menores}
                  tom={tom}
                  setTom={setTom}
                  count={totalPorTom}
                />
              )}
              {tomsDisponiveis.desloc.length > 0 && (
                <GrupoTom
                  label="Deslocamentos"
                  tons={tomsDisponiveis.desloc}
                  tom={tom}
                  setTom={setTom}
                  count={totalPorTom}
                />
              )}
              {tomsDisponiveis.outros.length > 0 && (
                <GrupoTom
                  label="Vozes / outros"
                  tons={tomsDisponiveis.outros}
                  tom={tom}
                  setTom={setTom}
                  count={totalPorTom}
                />
              )}
            </div>
          </SecaoAccordion>

          {/* === Artista === */}
          <SecaoAccordion
            titulo="Artista"
            icone={Music}
            aberta={secoesAbertas.artistas}
            onToggle={() => toggleSecao('artistas')}
            contador={artistaSel ? 1 : 0}
          >
            <div className="relative mb-2">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                value={artistaBusca}
                onChange={(e) => setArtistaBusca(e.target.value)}
                onFocus={() => setArtistaSel('')}
                placeholder="Buscar artista…"
                aria-label="Filtrar por artista"
                className="w-full rounded-lg border border-border/40 bg-surface/70 py-2 pl-8 pr-8 text-sm text-text outline-none transition-all duration-200 placeholder:text-muted focus:border-[#D4A24C] focus:bg-surface focus:ring-2 focus:ring-[#D4A24C]/25 focus:shadow-[0_0_14px_rgba(212,162,76,0.12)]"
              />
              {artistaBusca && (
                <button
                  onClick={() => setArtistaBusca('')}
                  className="absolute right-2 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full text-muted hover:bg-surface2 hover:text-text"
                  aria-label="Limpar busca"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              )}
            </div>
            <div className="max-h-64 space-y-0.5 overflow-y-auto pr-1">
              {artistaSel && (
                <button
                  onClick={() => {
                    setArtistaSel('');
                    setArtistaBusca('');
                  }}
                  className="mb-1 flex w-full items-center gap-2 rounded-xl bg-error/10 px-2.5 py-1.5 text-sm font-semibold text-error transition hover:bg-error/20"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                  Limpar: {artistaSel}
                </button>
              )}
              {artistasFiltrados.length === 0 ? (
                <p className="px-2 py-3 text-center text-xs text-muted">
                  Nenhum artista encontrado
                </p>
              ) : (
                artistasFiltrados.map((a) => {
                  const count = contagemPorArtista?.get(a) || 0;
                  const ativo = artistaSel === a;
                  return (
                    <button
                      key={a}
                      onClick={() => setArtistaSel(ativo ? '' : a)}
                      aria-pressed={ativo}
                      className={`flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-1.5 text-sm transition-all duration-200 ${
                        ativo
                          ? 'bg-gradient-to-r from-[#D4A24C]/20 to-[#D4A24C]/5 font-semibold text-[#E8B35E] ring-1 ring-inset ring-[#D4A24C]/30 shadow-[0_0_12px_rgba(212,162,76,0.08)]'
                          : 'text-text2 hover:translate-x-0.5 hover:bg-surface2/70 hover:text-text'
                      }`}
                    >
                      <span className="min-w-0 truncate text-left">{a}</span>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums ${
                          ativo
                            ? 'bg-[#D4A24C]/25 text-[#E8B35E] ring-1 ring-[#D4A24C]/20'
                            : 'bg-surface/60 text-muted'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </SecaoAccordion>
        </div>
      </aside>
    </>
  );
}

/**
 * Subcomponente: cabeçalho de seção com accordion
 */
function SecaoAccordion({ titulo, icone: Icone, aberta, onToggle, contador, children }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border backdrop-blur-sm transition-colors duration-200 ${
        aberta
          ? 'border-[#D4A24C]/20 bg-gradient-to-b from-surface2/70 to-surface2/30 shadow-[0_0_0_1px_rgba(212,162,76,0.04)]'
          : 'border-border/50 bg-surface2/40 hover:border-[#D4A24C]/25'
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={aberta}
        className={`flex w-full items-center justify-between px-3.5 py-3 text-left transition-colors duration-200 ${
          aberta ? 'bg-gradient-to-r from-[#D4A24C]/10 to-transparent' : 'hover:bg-surface2/60'
        }`}
      >
        <span className="flex items-center gap-2 text-sm font-bold text-text">
          {Icone && (
            <Icone
              className="h-4 w-4 text-[#D4A24C] drop-shadow-[0_0_5px_rgba(212,162,76,0.35)]"
              aria-hidden="true"
            />
          )}
          {titulo}
          {contador > 0 && (
            <span className="rounded-full bg-[#D4A24C]/20 px-1.5 py-0.5 text-[10px] font-bold text-[#E8B35E] ring-1 ring-[#D4A24C]/25">
              {contador}
            </span>
          )}
        </span>
        {aberta ? (
          <ChevronUp className="h-4 w-4 text-[#D4A24C]" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        )}
      </button>
      {aberta && <div className="border-t border-border/40 px-2 py-2">{children}</div>}
    </div>
  );
}

/**
 * Subcomponente: grupo de tons (maiores, menores, etc.)
 */
function GrupoTom({ label, tons, tom, setTom, count = {} }) {
  return (
    <div>
      <p className="px-1.5 pb-1 pt-1 text-[10px] font-bold uppercase tracking-wider text-muted">
        {label}
      </p>
      <div className="flex flex-wrap gap-1">
        {tons.map((t) => {
          const ativo = tom === t;
          const total = count[t] || 0;
          return (
            <button
              key={t}
              onClick={() => setTom(ativo ? '' : t)}
              className={`rounded-md border px-2 py-1 text-[11px] font-semibold transition-all duration-200 ${
                ativo
                  ? 'border-[#D4A24C] bg-gradient-to-b from-[#D4A24C] to-[#C4933C] text-gray-900 shadow-[0_2px_10px_rgba(212,162,76,0.35)]'
                  : total === 0
                    ? 'cursor-not-allowed border-border/20 bg-surface/30 text-muted/40'
                    : 'border-border/40 bg-surface/50 text-text2 hover:-translate-y-0.5 hover:border-[#D4A24C]/50 hover:bg-[#D4A24C]/10 hover:text-[#E8B35E]'
              }`}
              disabled={total === 0 && !ativo}
              aria-pressed={ativo}
            >
              {t.replace('Tom ', '')}
            </button>
          );
        })}
      </div>
    </div>
  );
}

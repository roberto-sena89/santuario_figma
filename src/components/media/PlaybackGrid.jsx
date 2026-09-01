import { useEffect, useMemo, useState } from 'react';
import {
  Archive,
  Bird,
  Cross,
  Flame,
  FolderOpen,
  HandHeart,
  Heart,
  HeartPulse,
  Music,
  Music2,
  Sparkles,
  Sun,
  Trash2,
  Filter,
} from 'lucide-react';
import { CATEGORIAS, thumb } from '../../data/playbacks.js';
import { SkeletonCard } from '../ui/Skeleton.jsx';
import { IGREJA } from '../../config.js';
import { formatDescricao, normalizar } from '../../utils/format';
import { track, EVENTOS } from '../../utils/analytics';
import PlaybacksHero from './PlaybacksHero';
import FilterSidebar from './FilterSidebar';

// Ícones profissionais por categoria (substituem os emojis)
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

export default function MusicasTab({
  lista,
  favoritas,
  toggleFav,
  idsAdicionados,
  onRemoverAdicionado,
  onAbrirPlayer,
  carregando = false,
  onBuscaChange = null,
  chunksInfo = null,
}) {
  // Dados para o cabeçalho
  const totalMusicas = lista.length;
  const artistasUnicos = new Set(lista.map((m) => m.artista)).size;
  const harpaCount = lista.filter((m) =>
    /harpa\s*crist/i.test(`${m.titulo} ${m.artista || ''}`)
  ).length;
  const categoriasUnicas = new Set(lista.map((m) => m.categoria)).size;

  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [soFavoritas, setSoFavoritas] = useState(false);
  const [tom, setTom] = useState('');
  const [artistaSel, setArtistaSel] = useState('');
  const [artistaBusca, setArtistaBusca] = useState('');
  const [soHarpa, setSoHarpa] = useState(false);
  const [ordenacao, setOrdenacao] = useState('titulo-az');
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(52);
  const [paginaIr, setPaginaIr] = useState('');
  const [carregandoInicial, setCarregandoInicial] = useState(true);
  const [buscaDebounced, setBuscaDebounced] = useState('');

  // Loading inicial para evitar flash de conteúdo
  useEffect(() => {
    const t = setTimeout(() => setCarregandoInicial(false), 350);
    return () => clearTimeout(t);
  }, []);

  // Debounce busca 300ms — evita refiltrar 15k itens a cada tecla
  useEffect(() => {
    const t = setTimeout(() => setBuscaDebounced(busca), 300);
    return () => clearTimeout(t);
  }, [busca]);

  // On-demand: garante que chunk da letra buscada já foi baixado
  useEffect(() => {
    if (onBuscaChange && buscaDebounced.trim()) {
      onBuscaChange(buscaDebounced);
      // Analytics: termos de busca alimentam a curadoria
      track(EVENTOS.busca, { termo: buscaDebounced });
    }
  }, [buscaDebounced, onBuscaChange]);

  const filtradas = useMemo(() => {
    const q = buscaDebounced.trim().toLowerCase();
    const listaFiltrada = lista.filter((m) => {
      if (categoria !== 'Todas' && m.categoria !== categoria) return false;
      if (soFavoritas && !favoritas.includes(m.id)) return false;
      if (tom && m.tom !== tom) return false;
      if (artistaSel && m.artista !== artistaSel) return false;
      // Harpa Cristã pode estar no título OU no artista (ex.: "HARPA CRISTA - HINO 03", artista "Desconhecido")
      const isHarpa = /harpa\s*crist/.test(normalizar(`${m.titulo} ${m.artista || ''}`));
      // Harpa Cristã só aparece quando o botão está pressionado; fora dele, sai da lista principal
      if (isHarpa !== soHarpa) return false;
      if (
        q &&
        !(
          m.titulo.toLowerCase().includes(q) ||
          m.artista.toLowerCase().includes(q) ||
          (m.tom && m.tom.toLowerCase().includes(q))
        )
      ) {
        return false;
      }
      return true;
    });
    const copia = [...listaFiltrada];
    // Harpa Cristã ativa: sempre em ordem numérica crescente dos hinos
    if (soHarpa) {
      const numHino = (m) => {
        const match = m.titulo.match(/hino\s*#?\s*(\d+)/i);
        return match ? parseInt(match[1], 10) : 9999;
      };
      copia.sort(
        (a, b) =>
          numHino(a) - numHino(b) || normalizar(a.titulo).localeCompare(normalizar(b.titulo))
      );
      return copia;
    }
    switch (ordenacao) {
      case 'titulo-az':
        copia.sort((a, b) => normalizar(a.titulo).localeCompare(normalizar(b.titulo)));
        break;
      case 'titulo-za':
        copia.sort((a, b) => normalizar(b.titulo).localeCompare(normalizar(a.titulo)));
        break;
      case 'artista-az':
        copia.sort(
          (a, b) =>
            normalizar(a.artista).localeCompare(normalizar(b.artista)) ||
            normalizar(a.titulo).localeCompare(normalizar(b.titulo))
        );
        break;
    }
    return copia;
  }, [
    buscaDebounced,
    categoria,
    soFavoritas,
    tom,
    artistaSel,
    soHarpa,
    favoritas,
    ordenacao,
    lista,
  ]);

  // Tons disponíveis agrupados (maiores, menores, deslocamentos, vozes)
  const tomsDisponiveis = useMemo(() => {
    const ordem = {
      C: 0,
      'C#': 1,
      Db: 2,
      D: 3,
      Eb: 4,
      E: 5,
      F: 6,
      'F#': 7,
      Gb: 8,
      G: 9,
      'G#': 10,
      Ab: 11,
      A: 12,
      Bb: 13,
      B: 14,
    };
    const grupos = { maiores: [], menores: [], desloc: [], outros: [] };
    const vistos = new Set();
    for (const m of lista) {
      if (!m.tom || vistos.has(m.tom)) continue;
      vistos.add(m.tom);
      const t = m.tom;
      if (/^Tom [A-G](#|b)?$/.test(t)) grupos.maiores.push(t);
      else if (/^Tom [A-G](#|b)?m$/.test(t)) grupos.menores.push(t);
      else if (/^\d+(\.\d+)? (abaixo|acima)$/.test(t)) grupos.desloc.push(t);
      else grupos.outros.push(t);
    }
    const porNota = (a, b) => {
      const na = a.match(/^Tom ([A-G](#|b)?)m?$/);
      const nb = b.match(/^Tom ([A-G](#|b)?)m?$/);
      if (!na || !nb) return a.localeCompare(b);
      return (ordem[na[1]] ?? 99) - (ordem[nb[1]] ?? 99);
    };
    const porDesloc = (a, b) => {
      const dir = (s) => (s.includes('abaixo') ? 0 : 1);
      return dir(a) - dir(b) || (parseFloat(a) || 0) - (parseFloat(b) || 0);
    };
    return {
      maiores: grupos.maiores.sort(porNota),
      menores: grupos.menores.sort(porNota),
      desloc: grupos.desloc.sort(porDesloc),
      outros: grupos.outros.sort(),
    };
  }, [lista]);

  // Artistas disponíveis (deduplicados e ordenados, somente artistas reais verificados)
  const artistasDisponiveis = useMemo(() => {
    const ignorados = new Set([
      'Artista desconhecido',
      'Playback Gospel',
      'Desconhecido',
      'Playback',
      'Harpa Cristã',
      'Todah',
      'Em Adoração',
      'Backing Track',
      'Cante Comigo Tocando🎹',
      'The Best Karaoke Bluetooth Speakers With Wire',
      'Erika Natyelle lançado pela Todah Network em novembro',
      'Cantor Cristão 28',
      'A Baixo*',
      'O MAIO TROFEL -DAMARIS',
    ]);
    const permitidosComArtigo = new Set(['Os Levitas']);
    const padraoFake =
      /(lançado|network|backing|karaoke|bluetooth|speakers|cante comigo|playback)/i;
    const temNumeroSuspeito = (nome) => {
      if (!/\d/.test(nome)) return false;
      const excecoes = new Set([
        'Adoradores 5',
        'Coral das Mulheres 4',
        'Central 3 e Nivea Soares',
        'Trio R3',
        'João 20',
      ]);
      if (excecoes.has(nome)) return false;
      return true;
    };
    const set = new Set();
    for (const m of lista) {
      const nome = (m.artista || '').trim();
      if (!nome || ignorados.has(nome)) continue;
      if (nome.length > 40) continue;
      if (padraoFake.test(nome)) continue;
      if (nome.includes('*')) continue;
      if (/^(A|O|As|Os)\s+/i.test(nome) && !permitidosComArtigo.has(nome)) continue;
      if (temNumeroSuspeito(nome)) continue;
      if (/^Tom\s/i.test(nome)) continue;
      if (/tons?\s+a\s*(baixo|cima)/i.test(nome)) continue;
      set.add(nome);
    }
    return [...set].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }, [lista]);

  // Contagem de músicas por artista
  const contagemPorArtista = useMemo(() => {
    const map = new Map();
    for (const m of lista) {
      const nome = (m.artista || '').trim();
      if (!nome) continue;
      map.set(nome, (map.get(nome) || 0) + 1);
    }
    return map;
  }, [lista]);

  const temFiltros = tom !== '' || artistaSel !== '' || soHarpa || categoria !== 'Todas';
  const limparFiltros = () => {
    setTom('');
    setArtistaSel('');
    setArtistaBusca('');
    setSoHarpa(false);
    setCategoria('Todas');
  };

  // Analytics: abertura de player e favoritas
  const abrirPlayer = (m) => {
    track(EVENTOS.abrirPlayer, { titulo: m.titulo, artista: m.artista });
    onAbrirPlayer(m);
  };
  const alternarFavorita = (id) => {
    track(favoritas.includes(id) ? EVENTOS.desfavoritar : EVENTOS.favoritar);
    toggleFav(id);
  };

  // Paginação
  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / itensPorPagina));
  const paginaSegura = Math.min(pagina, totalPaginas);
  const inicio = (paginaSegura - 1) * itensPorPagina;
  const itensPagina = filtradas.slice(inicio, inicio + itensPorPagina);

  // Volta para a página 1 quando a busca (debounced)/filtros mudam
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset de paginação ao mudar filtros é intencional
    setPagina(1);
  }, [buscaDebounced, categoria, soFavoritas, tom, artistaSel, soHarpa, ordenacao, itensPorPagina]);

  const irParaPagina = (p) => {
    setPagina(Math.min(Math.max(1, p), totalPaginas));
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Campo "ir para página": valida e navega direto
  const irParaPaginaDireta = () => {
    const p = parseInt(paginaIr, 10);
    if (!Number.isNaN(p) && p >= 1 && p <= totalPaginas) {
      setPagina(p);
      setPaginaIr('');
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const irParaTopo = () => {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const paginasVisiveis = () => {
    const total = totalPaginas;
    const atual = paginaSegura;
    if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1);
    const lista = new Set([1, total, atual]);
    for (let i = atual - 1; i <= atual + 1; i++) {
      if (i >= 1 && i <= total) lista.add(i);
    }
    return [...lista].sort((a, b) => a - b);
  };

  // Contagem por categoria (após aplicar Harpa Cristã para refletir a lista visível)
  const totalPorCategoria = useMemo(() => {
    const map = { Todas: lista.length };
    for (const c of CATEGORIAS) map[c] = 0;
    for (const m of lista) {
      const isHarpa = /harpa\s*crist/.test(normalizar(`${m.titulo} ${m.artista || ''}`));
      if (isHarpa !== soHarpa) continue;
      if (m.categoria && map[m.categoria] !== undefined) map[m.categoria] += 1;
    }
    return map;
  }, [lista, soHarpa]);

  // Contagem por tom (após aplicar Harpa Cristã)
  const totalPorTom = useMemo(() => {
    const map = {};
    for (const m of lista) {
      const isHarpa = /harpa\s*crist/.test(normalizar(`${m.titulo} ${m.artista || ''}`));
      if (isHarpa !== soHarpa) continue;
      if (m.tom) map[m.tom] = (map[m.tom] || 0) + 1;
    }
    return map;
  }, [lista, soHarpa]);

  return (
    <>
      {/* Novo cabeçalho aconchegante */}
      <PlaybacksHero
        totalMusicas={totalMusicas}
        totalArtistas={artistasUnicos}
        harpaCount={harpaCount}
        totalCategorias={categoriasUnicas}
        busca={busca}
        setBusca={setBusca}
        buscaDebounced={buscaDebounced}
        categoria={categoria}
        setCategoria={setCategoria}
        onAbrirPlayerDestaque={onAbrirPlayer}
        destaque={filtradas[0]} // Primeiro item filtrado como destaque
      />

      {/* Layout principal: Sidebar de Filtros + Grid de Playbacks */}
      {/* Botão mobile para abrir sidebar (acima do flex container) */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pt-6 lg:hidden">
        <button
          onClick={() => setSidebarAberta(true)}
          className="inline-flex items-center gap-2 rounded-2xl border border-border/50 bg-surface2 px-4 py-2.5 text-sm font-semibold text-text transition hover:border-secondary/40 hover:text-secondary"
          aria-label="Abrir filtros"
        >
          <Filter className="h-4 w-4" aria-hidden="true" />
          Filtros
          {temFiltros && (
            <span className="ml-1 grid h-5 min-w-5 place-items-center rounded-full bg-secondary px-1.5 text-[10px] font-bold text-white">
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
        </button>
        <span className="text-xs tabular-nums text-muted">
          {filtradas.length} {filtradas.length === 1 ? 'resultado' : 'resultados'}
        </span>
      </div>

      <div className="mx-auto flex max-w-6xl gap-6 px-4 pb-16 pt-4">
        {/* Sidebar de Filtros */}
        <FilterSidebar
          categoria={categoria}
          setCategoria={setCategoria}
          tom={tom}
          setTom={setTom}
          artistaSel={artistaSel}
          setArtistaSel={setArtistaSel}
          artistaBusca={artistaBusca}
          setArtistaBusca={setArtistaBusca}
          soFavoritas={soFavoritas}
          setSoFavoritas={setSoFavoritas}
          soHarpa={soHarpa}
          setSoHarpa={setSoHarpa}
          ordenacao={ordenacao}
          setOrdenacao={setOrdenacao}
          totalPorCategoria={totalPorCategoria}
          totalPorTom={totalPorTom}
          artistasDisponiveis={artistasDisponiveis}
          tomsDisponiveis={tomsDisponiveis}
          contagemPorArtista={contagemPorArtista}
          temFiltros={temFiltros}
          limparFiltros={limparFiltros}
          open={sidebarAberta}
          onClose={() => setSidebarAberta(false)}
          favoritasCount={favoritas.length}
        />

        {/* Conteúdo principal: grid de playbacks */}
        <div className="min-w-0 flex-1">
          {carregando || carregandoInicial ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filtradas.length === 0 ? (
            <div className="py-20 text-center">
              <Music className="mx-auto h-12 w-12 text-muted" aria-hidden="true" />
              <p className="mt-4 text-muted">
                Nenhuma música encontrada. Ajuste a busca ou os filtros.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between text-xs text-muted">
                <span className="tabular-nums">
                  Exibindo {inicio + 1}–{Math.min(paginaSegura * itensPorPagina, filtradas.length)}{' '}
                  de {filtradas.length} músicas
                </span>
                <span className="hidden sm:inline tabular-nums">
                  Página {paginaSegura} de {totalPaginas}
                </span>
              </div>
              {chunksInfo && chunksInfo.carregados < chunksInfo.total && (
                <div className="mb-3 rounded-xl border border-border/30 bg-graphite px-3 py-2 text-center text-[11px] text-text2">
                  Carregando catálogo {chunksInfo.carregados}/{chunksInfo.total} blocos — resultados
                  parciais (busca em A-Z garante download da letra)
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {itensPagina.map((m) => {
                  const ehFavorita = favoritas.includes(m.id);
                  const descricao = formatDescricao(m);
                  return (
                    <div
                      key={m.id}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-surface transition-[transform,box-shadow,border-color] duration-400 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/20 hover:border-secondary/20"
                    >
                      <button
                        onClick={() => abrirPlayer(m)}
                        className="relative block aspect-video w-full overflow-hidden text-left"
                        title="Assistir playback"
                        aria-label={`Assistir ${descricao} no player`}
                      >
                        <img
                          src={thumb(m.id, 'mqdefault')}
                          alt={descricao}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
                        />
                        {/* Overlay sutil no hover */}
                        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <span className="pointer-events-none absolute inset-0 grid place-items-center bg-black/0 transition-[background-color] duration-300 group-hover:bg-black/20">
                          <span className="flex h-11 w-16 items-center justify-center rounded-md bg-[#FF0000] shadow-md shadow-black/40 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#FF0033] sm:h-12 sm:w-[4.5rem]">
                            <svg
                              viewBox="0 0 24 24"
                              className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </span>
                        {/* Badge adicionado */}
                        {idsAdicionados.has(m.id) && (
                          <span className="absolute left-2 top-2 rounded-full border border-success/40 bg-success/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                            ✓
                          </span>
                        )}
                      </button>

                      <div className="flex flex-1 flex-col gap-2 p-4">
                        <button
                          onClick={() => abrirPlayer(m)}
                          title={`${descricao} — assistir no player`}
                          aria-label={`${descricao} — assistir no player`}
                          className="line-clamp-2 text-left text-sm font-semibold leading-snug text-text transition-colors duration-200 hover:text-secondary"
                        >
                          {descricao}
                        </button>
                        <p className="line-clamp-1 text-xs text-text2/70">
                          {m.tom ? (
                            <span className="inline-flex items-center gap-1 font-medium text-secondary/80">
                              <Music className="h-3.5 w-3.5" aria-hidden="true" /> {m.tom}
                            </span>
                          ) : (
                            <span className="text-text2/60">{m.categoria}</span>
                          )}
                        </p>

                        <div
                          className="mt-auto flex items-center gap-2 pt-2"
                          role="group"
                          aria-label="Ações do playback"
                        >
                          <span className="mr-auto inline-flex min-w-0 items-center gap-1.5 rounded-full border border-secondary/20 bg-secondary/8 px-2.5 py-1 text-[10px] font-semibold text-secondary/80">
                            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-secondary/80 text-white">
                              <IconeCategoria categoria={m.categoria} />
                            </span>
                            <span className="truncate">{m.categoria}</span>
                          </span>
                          <button
                            onClick={() => alternarFavorita(m.id)}
                            title={ehFavorita ? 'Remover das favoritas' : 'Favoritar'}
                            aria-label={
                              ehFavorita
                                ? `Remover ${descricao} das favoritas`
                                : `Favoritar ${descricao}`
                            }
                            aria-pressed={ehFavorita}
                            className={`grid h-9 w-9 place-items-center rounded-lg border border-transparent text-sm transition-[color,background-color] duration-200 ${
                              ehFavorita
                                ? 'text-secondary'
                                : 'text-text2/60 hover:text-secondary hover:bg-secondary/5'
                            }`}
                          >
                            <Heart
                              className={`h-4 w-4 ${ehFavorita ? 'fill-current' : ''}`}
                              aria-hidden="true"
                            />
                          </button>
                          {idsAdicionados.has(m.id) && (
                            <button
                              onClick={() => onRemoverAdicionado(m.id)}
                              title="Remover desta lista"
                              aria-label={`Remover ${descricao} da lista`}
                              className="grid h-9 w-9 place-items-center rounded-lg text-text2/60 transition-[color,background-color] duration-200 hover:border-error/40 hover:text-error hover:bg-error/5"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Paginação */}
              {totalPaginas > 1 && (
                <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <button
                    onClick={() => irParaPagina(paginaSegura - 1)}
                    disabled={paginaSegura <= 1}
                    className="inline-flex h-10 items-center rounded-2xl border border-secondary/40 bg-secondary/10 px-4 text-sm font-medium text-secondary transition hover:bg-secondary/20 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ‹ Anterior
                  </button>

                  {/* Números de página */}
                  {paginasVisiveis().map((p, i, arr) => (
                    <span key={p} className="inline-flex h-10 items-center">
                      {i > 0 && arr[i - 1] !== p - 1 && (
                        <span className="px-1 text-sm text-muted">…</span>
                      )}
                      <button
                        onClick={() => irParaPagina(p)}
                        aria-current={p === paginaSegura ? 'page' : undefined}
                        className={`inline-flex h-10 w-10 items-center justify-center text-sm font-semibold transition ${
                          p === paginaSegura
                            ? 'rounded-full bg-graphite text-white border-2 border-secondary shadow-[0_4px_12px_rgba(17,21,31,0.4)]'
                            : 'rounded-2xl border border-secondary/30 bg-secondary/5 text-secondary hover:bg-secondary/15 hover:shadow-md'
                        }`}
                      >
                        {p}
                      </button>
                    </span>
                  ))}

                  <button
                    onClick={() => irParaPagina(paginaSegura + 1)}
                    disabled={paginaSegura >= totalPaginas}
                    className="inline-flex h-10 items-center rounded-2xl border border-secondary/40 bg-secondary/10 px-4 text-sm font-medium text-secondary transition hover:bg-secondary/20 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Próximo ›
                  </button>

                  {/* Ir para página */}
                  <span className="ml-2 inline-flex items-center gap-1 text-sm text-muted">
                    Ir para
                    <input
                      type="number"
                      min={1}
                      max={totalPaginas}
                      value={paginaIr}
                      onChange={(e) => setPaginaIr(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && irParaPaginaDireta()}
                      aria-label="Ir para página"
                      className="inline-flex h-10 w-14 items-center justify-center rounded-2xl border border-secondary/40 bg-secondary/10 px-2 text-center text-sm font-medium text-secondary outline-none transition hover:bg-secondary/20 focus:border-secondary/60"
                    />
                    <span className="whitespace-nowrap">de {totalPaginas}</span>
                  </span>

                  {/* Itens por página */}
                  <select
                    value={itensPorPagina}
                    onChange={(e) => setItensPorPagina(Number(e.target.value))}
                    aria-label="Itens por página"
                    className="ml-2 h-8 cursor-pointer rounded-lg border border-secondary/40 bg-surface2 px-2 text-sm text-secondary outline-none transition hover:border-secondary/60 focus:border-secondary"
                  >
                    <option value={24}>24/pág</option>
                    <option value={52}>52/pág</option>
                    <option value={104}>104/pág</option>
                  </select>

                  {/* Voltar ao topo da seção */}
                  <button
                    onClick={irParaTopo}
                    title="Voltar ao topo do catálogo"
                    aria-label="Voltar ao topo do catálogo"
                    className="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-secondary/40 bg-surface2 text-xs text-secondary transition hover:bg-secondary/10 hover:border-secondary/60"
                  >
                    ↑
                  </button>
                </div>
              )}

              <p className="mt-6 text-center text-xs text-muted">
                {filtradas.length} de {lista.length} músicas · Curadoria do {IGREJA.nome}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// Helper: ícone pequeno da categoria dentro da pill do card
function IconeCategoria({ categoria }) {
  const Icon = ICONES_CATEGORIA[categoria] || FolderOpen;
  return <Icon className="h-3 w-3" aria-hidden="true" />;
}

import { useEffect, useMemo, useRef, useState } from "react";
import type { HarpaHino } from "../data/harpaCompleta";
import PlayerModal from "../components/media/PlayerModal.jsx";
import {
  buscarPlaybacksDoHino,
  type PlaybackMatch,
} from "../data/harpaPlayback";

type SearchFn = (query: string) => HarpaHino[];

export default function Harpa() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 24;
  const [loaded, setLoaded] = useState(false);
  const [playerVideo, setPlayerVideo] = useState<PlaybackMatch | null>(null);
  const searchRef = useRef<SearchFn | null>(null);
  const hinosRef = useRef<HarpaHino[]>([]);

  useEffect(() => {
    import("../data/harpaCompleta").then((mod) => {
      hinosRef.current = mod.HARPA_HINOS;
      searchRef.current = mod.searchHinos;
      setLoaded(true);
    });
  }, []);

  const hymns = useMemo(() => {
    if (!searchRef.current) return [];
    return searchRef.current(query);
  }, [query, loaded]);

  const totalPages = Math.max(1, Math.ceil(hymns.length / PAGE_SIZE));
  const pageSlice = hymns.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);


  useEffect(() => {
    setPage(1);
  }, [query]);


  if (!loaded) {
    return (
      <main id="main-content" className="min-h-screen bg-background pt-16">
        {/* Header hero com imagem de fundo - /fotos/harpa/1.jpg */}
        <section className="relative overflow-hidden">
          <img src="/fotos/harpa/1.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-center" loading="eager" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/70" aria-hidden="true" />
          <div className="absolute inset-0 opacity-20" aria-hidden="true" style={{ background: "radial-gradient(ellipse at center top, rgba(212,162,76,0.28), transparent 70%)" }} />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
            <div className="mb-0 max-w-2xl text-left">
              <p className="inline-flex items-center rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5 text-white text-xs font-semibold uppercase tracking-[0.18em] mb-4">Hinario</p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight [text-shadow:0_2px_14px_rgba(0,0,0,0.6)]">Harpa Crista</h1>
              <p className="mt-6 inline-flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm px-4 py-3 text-sm sm:text-base text-white/90 max-w-xl leading-relaxed"><span>Hinos classicos do hinario cristao.</span></p>
            </div>
          </div>
        </section>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
            <svg className="h-8 w-8 animate-spin mb-4" viewBox="0 0 24 24" stroke="currentColor">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <p className="text-sm">Carregando hinário completo...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      {/* Header hero com imagem de fundo - /fotos/harpa/1.jpg */}
      <section className="relative overflow-hidden">
        <img src="/fotos/harpa/1.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-center" loading="eager" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/70" aria-hidden="true" />
        <div className="absolute inset-0 opacity-20" aria-hidden="true" style={{ background: "radial-gradient(ellipse at center top, rgba(212,162,76,0.28), transparent 70%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
          <div className="mb-0 max-w-2xl text-left">
            <p className="inline-flex items-center rounded-full bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5 text-white text-xs font-semibold uppercase tracking-[0.18em] mb-4">Hinario</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight [text-shadow:0_2px_14px_rgba(0,0,0,0.6)]">Harpa Crista</h1>
            <p className="mt-6 inline-flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm px-4 py-3 text-sm sm:text-base text-white/90 max-w-xl leading-relaxed"><span>Hinos classicos do hinario cristao. Busque por numero ou titulo. Hinos com {"\u{1F3B5}"} têm playback para cantar junto.</span></p>
          </div>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Search */}
        <div className="relative mb-4">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por número ou título do hino..."
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:border-[#D4A24C] focus:ring-2 focus:ring-[#D4A24C]/25 focus:outline-none transition-all duration-200"
            aria-label="Buscar hino"
          />
        </div>

        {/* Results count */}
        <p className="text-muted-foreground text-sm mb-5">
          Exibindo {Math.min((page - 1) * PAGE_SIZE + 1, hymns.length)}–{Math.min(page * PAGE_SIZE, hymns.length)} de {hymns.length}{" "}
          {hymns.length === 1 ? "hino" : "hinos"} · Página {page} de {totalPages}
        </p>

        {/* Hymn list */}
        {pageSlice.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <p>Nenhum hino encontrado para esta busca.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pageSlice.map((hymn) => (
              <HymnCard
                key={hymn.number}
                hymn={hymn}
                open={expanded === hymn.number}
                onToggle={() => setExpanded(expanded === hymn.number ? null : hymn.number)}
                onOuvir={setPlayerVideo}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">

            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="inline-flex items-center gap-1 rounded-full border border-[#D4A24C]/40 bg-[#D4A24C]/10 px-4 py-1.5 text-sm font-semibold text-[#B8860B] dark:text-[#E8B35E] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#D4A24C]/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Anterior
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                const p = start + i;
                if (p > totalPages) return null;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`h-9 w-9 rounded-full text-sm font-semibold transition-all duration-200 ${
                      p === page
                        ? "bg-[#D4A24C] text-gray-900 border-2 border-[#E8B35E]/70 shadow-lg shadow-[#D4A24C]/30 scale-105"
                        : "border border-[#D4A24C]/30 bg-[#D4A24C]/5 text-[#B8860B] hover:bg-[#D4A24C]/15 hover:-translate-y-0.5 dark:text-[#E8B35E]"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="inline-flex items-center gap-1 rounded-full border border-[#D4A24C]/40 bg-[#D4A24C]/10 px-4 py-1.5 text-sm font-semibold text-[#B8860B] dark:text-[#E8B35E] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#D4A24C]/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              Próximo
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        )}
      </div>
      <PlayerModal video={playerVideo} onClose={() => setPlayerVideo(null)} />
    </main>
  );
}

function CanteJunto({
  titulo,
  onAbrir,
}: {
  titulo: string;
  onAbrir: (v: PlaybackMatch) => void;
}) {
  const [estado, setEstado] = useState<"loading" | "vazio" | "ok">("loading");
  const [matches, setMatches] = useState<PlaybackMatch[]>([]);

  useEffect(() => {
    let vivo = true;
    setEstado("loading");
    buscarPlaybacksDoHino(titulo).then((m) => {
      if (!vivo) return;
      setMatches(m);
      setEstado(m.length ? "ok" : "vazio");
    });
    return () => {
      vivo = false;
    };
  }, [titulo]);

  if (estado === "loading") {
    return (
      <p className="text-xs text-muted-foreground" role="status">
        Procurando playback...
      </p>
    );
  }
  if (estado === "vazio") return null;
  return (
    <div className="rounded-xl border border-[#D4A24C]/25 bg-[#D4A24C]/5 p-4">
      <p className="text-xs font-semibold text-[#B8860B] dark:text-[#E8B35E] uppercase tracking-wide mb-2">
        {"\u{1F3B5} Cante junto"}
      </p>
      <div className="flex flex-col gap-2">
        {matches.map((m) => (
          <button
            key={m.id}
            onClick={() => onAbrir(m)}
            className="inline-flex items-center gap-2 rounded-full border border-[#D4A24C]/30 bg-background px-4 py-2 text-left text-sm font-semibold text-foreground transition-all hover:border-[#D4A24C]/60 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A24C]/70"
          >
            <svg className="h-4 w-4 flex-shrink-0 text-[#D4A24C]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span className="min-w-0 truncate">
              Ouvir playback{m.artista ? ` — ${m.artista}` : ""}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function HymnCard({
  hymn,
  open,
  onToggle,
  onOuvir,
}: {
  hymn: HarpaHino;
  open: boolean;
  onToggle: () => void;
  onOuvir: (v: PlaybackMatch) => void;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:border-[#D4A24C]/30 hover:shadow-lg hover:shadow-[#D4A24C]/10">
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
        aria-expanded={open}
        aria-controls={`hymn-${hymn.number}-content`}
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-[#D4A24C]/10 font-display font-bold text-[#B8860B] dark:text-[#E8B35E] ring-1 ring-[#D4A24C]/20 transition-transform duration-300 group-hover:scale-110">
            {hymn.number}
          </span>
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-foreground text-base leading-snug transition-colors duration-200 group-hover:text-[#B8860B] dark:group-hover:text-[#E8B35E]">
              {hymn.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {hymn.verses.length} {hymn.verses.length === 1 ? "estrofe" : "estrofes"}
              {hymn.chorus && " · com refrão"}
            </p>
          </div>
        </div>
        <svg
          className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180 text-[#D4A24C]" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div id={`hymn-${hymn.number}-content`} className="px-6 pb-6 border-t border-border/60 pt-6">
          <div className="space-y-6">
            {hymn.verses.map((verse, i) => (
              <div key={i}>
                <p className="text-xs font-semibold text-[#B8860B] dark:text-[#E8B35E] uppercase tracking-wide mb-2">
                  {i + 1}ª Estrofe
                </p>
                <p className="font-bible text-foreground/90 text-base leading-[1.9] whitespace-pre-line italic">
                  {verse}
                </p>
              </div>
            ))}
            {hymn.chorus && (
              <div className="border-l-2 border-[#D4A24C]/50 pl-5 py-1">
                <p className="text-xs font-semibold text-[#B8860B] dark:text-[#E8B35E] uppercase tracking-wide mb-2">
                  Refrão
                </p>
                <p className="font-bible text-foreground/90 text-base leading-[1.9] whitespace-pre-line italic">
                  {hymn.chorus}
                </p>
              </div>
            )}
            <CanteJunto titulo={hymn.title} onAbrir={onOuvir} />
          </div>
        </div>
      )}
    </article>
  );
}
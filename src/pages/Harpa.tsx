import { useState } from "react";
import {
  searchHymns,
  HARPA_CATEGORIES,
  HARPA_YOUTUBE,
  getEmbedUrl,
  type HarpaHymn,
} from "../data/harpa";
import PageTitle from "../components/ui/PageTitle";

export default function Harpa() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [playerOpen, setPlayerOpen] = useState(false);

  const hymns = searchHymns(query, category);
  const embedUrl = getEmbedUrl();

  const toggle = (num: number) => {
    setExpanded((prev) => (prev === num ? null : num));
  };

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <PageTitle
          eyebrow="Hinario"
          eyebrowIcon="🎵"
          title="Harpa Crista"
          subtitle="Hinos classicos do hinario cristao. Busque por numero, titulo ou categoria."
          subtitleIcon="📖"
          align="left"
        />

        {/* Player do YouTube (hinario completo) */}
        {embedUrl && (
          <YouTubePlaylistSection
            embedUrl={embedUrl}
            channelName={HARPA_YOUTUBE.channelName}
            channelUrl={HARPA_YOUTUBE.channelUrl}
            open={playerOpen}
            onToggle={() => setPlayerOpen((v) => !v)}
          />
        )}

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
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
            aria-label="Buscar hino"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8" role="group" aria-label="Filtrar por categoria">
          {HARPA_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-accent text-white"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-muted-foreground text-sm mb-5">
          {hymns.length} {hymns.length === 1 ? "hino encontrado" : "hinos encontrados"}
        </p>

        {/* Hymn list */}
        {hymns.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <p>Nenhum hino encontrado para esta busca.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {hymns.map((hymn) => (
              <HymnCard
                key={hymn.number}
                hymn={hymn}
                expanded={expanded === hymn.number}
                onToggle={() => toggle(hymn.number)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function buildYouTubeSearchUrl(hymn: HarpaHymn): string {
  const params = new URLSearchParams();
  params.set("search_query", `${hymn.number} ${hymn.title}`);
  return `https://www.youtube.com/results?${params.toString()}`;
}

function HymnCard({
  hymn,
  expanded,
  onToggle,
}: {
  hymn: HarpaHymn;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const youtubeUrl = buildYouTubeSearchUrl(hymn);

  const copyLyrics = async () => {
    const text = [
      `${hymn.number}. ${hymn.title}`,
      "",
      ...hymn.verses.map((v, i) => `${i + 1}ª Estrofe:\n${v}`),
      hymn.chorus ? `\nRefrão:\n${hymn.chorus}` : "",
    ].join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  };

  return (
    <article className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
        aria-expanded={expanded}
        aria-controls={`hymn-${hymn.number}-content`}
      >
        <div className="flex items-center gap-2">
          <span className="text-accent font-display font-bold text-lg w-8 flex-shrink-0">
            {hymn.number}
          </span>
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-1.5 rounded-full bg-muted hover:bg-muted-foreground/10 text-muted-foreground hover:text-accent transition-colors"
            aria-label={`Buscar "${hymn.title}" no YouTube`}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <div>
            <div className="font-display font-semibold text-foreground text-base">
              {hymn.title}
            </div>
            <div className="text-muted-foreground text-xs mt-0.5">
              {hymn.author} · {hymn.category}
            </div>
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div id={`hymn-${hymn.number}-content`} className="px-6 pb-6 border-t border-border pt-6">
          <div className="space-y-6">
            {hymn.verses.map((verse, i) => (
              <div key={i}>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  {i + 1}ª Estrofe
                </p>
                <p className="font-display text-foreground text-base leading-[1.9] whitespace-pre-line italic">
                  {verse}
                </p>
              </div>
            ))}
            {hymn.chorus && (
              <div className="border-l-2 border-accent pl-5 py-1">
                <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">
                  Refrão
                </p>
                <p className="font-display text-foreground text-base leading-[1.9] whitespace-pre-line italic">
                  {hymn.chorus}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6 pt-4 border-t border-border">
            <button
              onClick={copyLyrics}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Letra copiada!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copiar letra
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

/* ════════════════════════════════════════════════════
   Player do YouTube — hinário completo (playlist embed)
   ════════════════════════════════════════════════════ */

function YouTubePlaylistSection({
  embedUrl,
  channelName,
  channelUrl,
  open,
  onToggle,
}: {
  embedUrl: string;
  channelName: string | null;
  channelUrl: string | null;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      <section
        className="mb-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
        aria-label="Player do hinário completo"
      >
      {/* Header do player — pode colapsar/expandir */}
      <div className="flex items-center justify-between gap-4 border-b border-border bg-muted/30 px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
              Hinário completo em vídeo
            </p>
            <h2 className="font-serif text-base font-semibold leading-tight text-foreground sm:text-lg">
              {channelName
                ? `Playlist do canal ${channelName}`
                : "Playlist do YouTube"}
            </h2>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2">
          {channelUrl && (
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-accent/50 hover:text-foreground sm:inline-flex"
              aria-label={`Abrir canal ${channelName} no YouTube`}
            >
              Abrir canal
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 10h6m0 0v6m0-6L10 16"
                />
              </svg>
            </a>
          )}
          <button
            onClick={onToggle}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            aria-label={open ? "Fechar player" : "Abrir player"}
            aria-expanded={open}
          >
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Iframe do YouTube — ocultado com hidden quando !open para garantir funcionamento */}
      <div className={open ? "" : "hidden"}>
        <div className="aspect-video w-full bg-graphite">
          <iframe
            src={embedUrl}
            title="Playlist do hinário Harpa Cristã"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-full w-full border-0"
          />
        </div>
        <p className="border-t border-border bg-muted/30 px-5 py-3 text-[11.5px] text-muted-foreground">
          Player incorporado do YouTube. Use os controles do player para
          navegar entre os hinos, ajustar velocidade e baixar a letra pela
          cópia de cada hino abaixo.
        </p>
      </div>
    </section>

    {/* Playlists recomendadas */}
    <section className="mb-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Playlists Recomendadas</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="https://www.youtube.com/playlist?list=PLzWjmBOf3rY3hAXmvMI1-W52a23u-3U4o"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border border-border rounded-xl p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Hinos da Harpa Cristã</h4>
                <p className="text-sm text-muted-foreground">
                  Playlist oficial do CPAD com seleção de hinos
                </p>
              </div>
              <div className="text-accent">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 10h6m0 0v6m0-6L10 16" />
                </svg>
              </div>
            </div>
          </a>
          <a
            href="https://www.youtube.com/@HarpaCristaParaTocar"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border border-border rounded-xl p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Harpa Cristã Para Tocar</h4>
                <p className="text-sm text-muted-foreground">
                  Canal dedicado aos hinos da Harpa Cristã
                </p>
              </div>
              <div className="text-accent">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 10h6m0 0v6m0-6L10 16" />
                </svg>
              </div>
            </div>
          </a>
          <a
            href="https://www.youtube.com/results?search_query=harpa+cristã+hino+1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border border-border rounded-xl p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Busca por Número</h4>
                <p className="text-sm text-muted-foreground">
                  Busca individual para encontrar qualquer hino
                </p>
              </div>
              <div className="text-accent">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 10h6m0 0v6m0-6L10 16" />
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
    </>
  );
}

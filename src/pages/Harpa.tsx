import { useState } from "react";
import { searchHymns, HARPA_CATEGORIES, type HarpaHymn } from "../data/harpa";

export default function Harpa() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [expanded, setExpanded] = useState<number | null>(null);

  const hymns = searchHymns(query, category);

  const toggle = (num: number) => {
    setExpanded((prev) => (prev === num ? null : num));
  };

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">
            Hinário
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-foreground">
            Harpa Cristã
          </h1>
          <p className="text-muted-foreground mt-2">
            Hinos clássicos do hinário cristão. Busque por número, título ou categoria.
          </p>
        </div>

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
        <div className="flex items-center gap-4">
          <span className="text-accent font-display font-bold text-lg w-10 flex-shrink-0">
            {hymn.number}
          </span>
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

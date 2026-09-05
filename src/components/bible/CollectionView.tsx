/**
 * Visualização principal de uma coleção temática.
 *
 * Dois modos:
 * 1. Coleções com subtemas (Mulher/Homem): header da coleção + tabs de subtemas
 *    + SubtemaView imersivo (hero, cards, reflexão, oração, ações).
 * 2. Coleções sem subtemas (Jovens/Família/Consolo): header + lista simples
 *    de versículos curados com card visual.
 */

import { useEffect, useMemo, useState } from "react";
import type {
  CuratedVerse,
  CuratedCollection,
} from "../../data/bibleCollections";
import { BIBLE_BOOKS } from "../../data/bibleBooks";
import SubtemaTabs from "./SubtemaTabs";
import SubtemaView from "./SubtemaView";

interface CollectionViewProps {
  collection: CuratedCollection;
  initialSubtemaId?: string | null;
  onCopy?: (text: string) => Promise<void> | void;
  onNavigateToBook?: (bookId: number, chapter: number, verse: number) => void;
  copyFeedback?: number | null;
}

function groupByTheme(verses: CuratedVerse[]) {
  const map = new Map<string, CuratedVerse[]>();
  for (const v of verses) {
    const key = v.theme || "Versículos";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(v);
  }
  return Array.from(map.entries());
}

export default function CollectionView({
  collection,
  initialSubtemaId,
  onCopy,
  onNavigateToBook,
  copyFeedback,
}: CollectionViewProps) {
  // ============ Coleções com subtemas (Mulher/Homem) ============
  if (collection.subtemas.length > 0) {
    return <CollectionWithSubtemas collection={collection} initialSubtemaId={initialSubtemaId} onNavigateToBook={onNavigateToBook} />;
  }

  // ============ Coleções sem subtemas (Jovens/Família/Consolo) ============
  return <CollectionSimpleList collection={collection} onCopy={onCopy} onNavigateToBook={onNavigateToBook} copyFeedback={copyFeedback} />;
}

// =================================================================
// SUB-COMPONENTE: Coleção com subtemas (Mulher / Homem)
// =================================================================

interface CollectionWithSubtemasProps {
  collection: CuratedCollection;
  initialSubtemaId?: string | null;
  onNavigateToBook?: (bookId: number, chapter: number, verse: number) => void;
}

function CollectionWithSubtemas({
  collection,
  initialSubtemaId,
  onNavigateToBook,
}: CollectionWithSubtemasProps) {
  const [activeSubtemaId, setActiveSubtemaId] = useState<string>(
    initialSubtemaId && collection.subtemas.some(s => s.id === initialSubtemaId)
      ? initialSubtemaId
      : collection.subtemas[0].id
  );
  const activeSubtema = useMemo(
    () => collection.subtemas.find((s) => s.id === activeSubtemaId) ?? collection.subtemas[0],
    [activeSubtemaId, collection]
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sincroniza hash da URL
  useEffect(() => {
    const newHash = `#/${collection.slug}/${activeSubtema.id}`;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, "", newHash);
    }
  }, [collection.slug, activeSubtema.id]);

  // Lê hash inicial
  useEffect(() => {
    const m = window.location.hash.match(/^#\/([^/]+)\/?([^/]*)/);
    if (m) {
      const slug = m[1];
      const sub = m[2];
      if (slug === collection.slug && sub) {
        if (collection.subtemas.some(s => s.id === sub)) {
          setActiveSubtemaId(sub);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6">
      {/* Sidebar / Drawer (mobile) */}
      <aside
        className={`
          ${sidebarOpen ? "fixed inset-0 z-50 bg-background p-4 overflow-y-auto lg:static lg:p-0 lg:bg-transparent" : "hidden lg:block"}
          lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto
        `}
        aria-label="Navegação por subtemas"
      >
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <h2 className="font-display text-lg font-semibold">Subtemas</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded hover:bg-muted"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        {/* Header da coleção (sidebar) */}
        <div className="mb-5 pb-4 border-b border-border">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-accent/80 mb-1">
            {collection.emoji} {collection.label}
          </p>
          <p className="text-xs text-muted-foreground">
            {collection.curator}
          </p>
        </div>

        <SubtemaTabs
          subtemas={collection.subtemas}
          active={activeSubtemaId}
          onChange={(id) => {
            setActiveSubtemaId(id);
            setSidebarOpen(false);
          }}
          style={collection.style}
          variant="sidebar"
        />
      </aside>

      {/* Main: header da coleção + subtema ativo */}
      <div className="min-w-0">
        {/* Mobile: botão para abrir sidebar */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg bg-card hover:bg-muted"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Subtemas
          </button>
        </div>

        {/* Header da coleção (sempre visível no topo) */}
        <header className="mb-6 pb-6 border-b border-border">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-accent mb-2">
            {collection.emoji} Coleção
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-foreground leading-tight">
            {collection.label}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl">
            {collection.subtitulo}
          </p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80 mt-3">
            {collection.curator}
          </p>
        </header>

        {/* Navegação horizontal (mobile/tablet) */}
        <div className="mb-6 lg:hidden">
          <SubtemaTabs
            subtemas={collection.subtemas}
            active={activeSubtemaId}
            onChange={setActiveSubtemaId}
            style={collection.style}
            variant="horizontal"
          />
        </div>

        {/* Subtema ativo */}
        <SubtemaView
          subtema={activeSubtema}
          collectionLabel={collection.label}
          collectionEmoji={collection.emoji}
          collectionCurator={collection.curator}
          style={collection.style}
          onNavigateToBook={onNavigateToBook}
        />
      </div>
    </div>
  );
}

// =================================================================
// SUB-COMPONENTE: Coleção simples (Jovens / Família / Consolo)
// =================================================================

interface CollectionSimpleListProps {
  collection: CuratedCollection;
  onCopy?: (text: string) => Promise<void> | void;
  onNavigateToBook?: (bookId: number, chapter: number, verse: number) => void;
  copyFeedback?: number | null;
}

function CollectionSimpleList({
  collection,
  onCopy,
  onNavigateToBook,
  copyFeedback: _copyFeedback,
}: CollectionSimpleListProps) {
  const groups = groupByTheme(collection.verses ?? []);
  return (
    <article className="space-y-8">
      <header className="border-b border-border pb-6">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-accent mb-2">
          {collection.emoji} Coleção
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-light text-foreground leading-tight">
          {collection.label}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl">
          {collection.subtitulo}
        </p>
        <p className="text-foreground/80 mt-4 leading-relaxed max-w-2xl">
          {collection.intro}
        </p>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-3">
          {collection.curator}
        </p>
      </header>

      <div className="space-y-8">
        {groups.map(([theme, items]) => (
          <section key={theme}>
            <h2 className="font-display text-base font-semibold text-accent uppercase tracking-wider mb-4">
              {theme}
            </h2>
            <ul className="space-y-3">
              {items.map((cv, idx) => {
                const book = BIBLE_BOOKS[cv.book - 1];
                if (!book) return null;
                const ref = `${book.pt} ${cv.chapter}:${cv.verse}`;
                return (
                  <li
                    key={`${cv.book}-${cv.chapter}-${cv.verse}-${idx}`}
                    className="group bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-accent/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <button
                        onClick={() => onNavigateToBook?.(cv.book, cv.chapter, cv.verse)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        aria-label={`Abrir ${ref} na Bíblia`}
                      >
                        {ref}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      {onCopy && (
                        <button
                          onClick={() => onCopy(ref)}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:underline"
                          aria-label="Copiar referência"
                        >
                          Copiar
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Texto completo disponível em {book.pt} {cv.chapter}:{cv.verse}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}

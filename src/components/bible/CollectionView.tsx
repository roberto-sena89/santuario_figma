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
import { useCollectionProgress } from "../../data/bibleCollections";
import { BIBLE_BOOKS } from "../../data/bibleBooks";
import { getChapterVerses, type ArcBible } from "../../data/arcCompleta";
import SubtemaTabs from "./SubtemaTabs";
import SubtemaView from "./SubtemaView";

interface CollectionViewProps {
  collection: CuratedCollection;
  initialSubtemaId?: string | null;
  /** Bíblia ARC carregada (para exibir o texto completo dos versículos). */
  bible?: ArcBible | null;
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
  bible,
  onCopy,
  onNavigateToBook,
  copyFeedback,
}: CollectionViewProps) {
  // ============ Coleções com subtemas (Mulher/Homem) ============
  if (collection.subtemas.length > 0) {
    return <CollectionWithSubtemas collection={collection} initialSubtemaId={initialSubtemaId} onNavigateToBook={onNavigateToBook} />;
  }

  // ============ Coleções sem subtemas (Jovens/Família/Consolo) ============
  return <CollectionSimpleList collection={collection} bible={bible} onCopy={onCopy} onNavigateToBook={onNavigateToBook} copyFeedback={copyFeedback} />;
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

  // Progresso de leitura da coleção
  const progress = useCollectionProgress(
    collection.id,
    collection.subtemas,
    activeSubtemaId
  );

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
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-accent">
            {collection.label}
          </p>
          <p className="mt-1.5 text-[11.5px] leading-snug text-muted-foreground">
            Curadoria — {collection.curator}
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
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-accent mb-2">
            Coleção
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-foreground leading-tight text-pretty">
            {collection.label}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed text-pretty">
            {collection.subtitulo}
          </p>
          <p className="mt-4 text-[11.5px] leading-snug text-muted-foreground">
            Curadoria — {collection.curator}
          </p>

          {/* Barra de progresso de leitura */}
          {progress.total > 0 && (
            <div
              className="mt-5 max-w-md"
              role="status"
              aria-label={`Progresso de leitura: ${progress.readCount} de ${progress.total} subtemas lidos`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {progress.readCount === progress.total
                    ? "Coleção completa"
                    : `Você leu ${progress.readCount} de ${progress.total}`}
                </span>
                <span className="text-[10.5px] font-semibold text-accent tabular-nums">
                  {progress.percent}%
                </span>
              </div>
              <div
                className="h-1.5 w-full overflow-hidden rounded-full bg-muted/60"
                aria-hidden="true"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent/80 to-accent transition-all duration-700 ease-out"
                  style={{ width: `${progress.percent}%` }}
                />
              </div>
            </div>
          )}
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
          onRead={progress.markAsRead}
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
  bible?: ArcBible | null;
  onCopy?: (text: string) => Promise<void> | void;
  onNavigateToBook?: (bookId: number, chapter: number, verse: number) => void;
  copyFeedback?: number | null;
}

function CollectionSimpleList({
  collection,
  bible,
  onCopy,
  onNavigateToBook,
  copyFeedback: _copyFeedback,
}: CollectionSimpleListProps) {
  const groups = groupByTheme(collection.verses ?? []);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  return (
    <article className="space-y-8">
      <header className="border-b border-border pb-6">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-accent mb-2">
          Coleção
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-light text-foreground leading-tight text-pretty">
          {collection.label}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl leading-relaxed text-pretty">
          {collection.subtitulo}
        </p>
        <p className="text-foreground/80 mt-4 leading-relaxed max-w-2xl text-pretty">
          {collection.intro}
        </p>
        <p className="mt-4 text-[11.5px] leading-snug text-muted-foreground">
          Curadoria — {collection.curator}
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
                const texts = bible
                  ? getChapterVerses(bible, cv.book, cv.chapter)
                  : null;
                const text = texts ? texts[cv.verse - 1] : null;
                return (
                  <li
                    key={`${cv.book}-${cv.chapter}-${cv.verse}-${idx}`}
                    className="group rounded-xl border border-border bg-background/40 p-4 sm:p-5 transition-colors duration-200 hover:border-[#D4A24C]/35"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <button
                        onClick={() => onNavigateToBook?.(cv.book, cv.chapter, cv.verse)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#D4A24C]/10 border border-[#D4A24C]/25 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#D4A24C] transition-colors hover:bg-[#D4A24C]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        aria-label={`Abrir ${ref} na Bíblia`}
                      >
                        {ref}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      {onCopy && (
                        <button
                          onClick={async () => {
                            await onCopy(
                              text
                                ? `"${text.trim()}" — ${ref}`
                                : ref
                            );
                            setCopiedIdx(idx);
                            setTimeout(() => setCopiedIdx(null), 2000);
                          }}
                          className="text-[11px] text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:underline"
                          aria-label={text ? "Copiar versículo completo" : "Copiar referência"}
                        >
                          {copiedIdx === idx ? "Copiado!" : "Copiar"}
                        </button>
                      )}
                    </div>
                    {text ? (
                      <p className="bible-verse-text">{text.trim()}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Texto completo disponível em {ref}
                      </p>
                    )}
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

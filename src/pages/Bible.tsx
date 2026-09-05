import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { BIBLE_BOOKS, AT_BOOKS, NT_BOOKS, type BibleBook } from "../data/bibleBooks";
import { loadArcBible, getChapterVerses, ARC_TRANSLATION, ARC_FULL_NAME, type ArcBible } from "../data/arcCompleta";
import {
  CURATED_COLLECTIONS,
  THEME_MAP,
  COLLECTIONS_BY_ID,
  type CuratedVerse,
} from "../data/bibleCollections";
import {
  useDebounce,
  encodeBibleHash,
  decodeBibleHash,
} from "../data/bibleUtils";

import CollectionsTabs from "../components/bible/CollectionsTabs";
import BookGrid from "../components/bible/BookGrid";
import ChapterGrid from "../components/bible/ChapterGrid";
import ThemeChips from "../components/bible/ThemeChips";
import CollectionView from "../components/bible/CollectionView";
import Highlights from "../components/bible/Highlights";

interface BibleVerse {
  verse: number;
  text: string;
}

const STORAGE_KEY_FAVORITES = "iegv_bible_favorites";
const STORAGE_KEY_FONT = "iegv_bible_font_size";
const STORAGE_KEY_HISTORY = "iegv_bible_history";
const MAX_HISTORY = 20;

type FontSize = "sm" | "base" | "lg" | "xl";
const fontSizeClass: Record<FontSize, string> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export default function Bible() {
  // Estado da Bíblia
  const [bible, setBible] = useState<ArcBible | null>(null);
  const [bibleLoading, setBibleLoading] = useState(true);
  const [bibleError, setBibleError] = useState<string | null>(null);

  // Estado de visualização
  const [initialSubtemaId, setInitialSubtemaId] = useState<string | null>(null);
  const [activeCollection, setActiveCollection] = useState<string>("complete");
  const [testament, setTestament] = useState<"AT" | "NT">("AT");
  const [selectedBook, setSelectedBook] = useState<BibleBook>(BIBLE_BOOKS[18]); // Jó
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [bookQuery, setBookQuery] = useState("");
  const [verseQuery, setVerseQuery] = useState("");
  const debouncedVerseQuery = useDebounce(verseQuery, 250);

  // Versículos
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // UI
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    return (localStorage.getItem(STORAGE_KEY_FONT) as FontSize) || "base";
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_FAVORITES) || "[]");
    } catch {
      return [];
    }
  });
  const [copied, setCopied] = useState<number | null>(null);
  const [copyText, setCopyText] = useState<string | null>(null);
  const [chapterCache, setChapterCache] = useState<
    Record<string, BibleVerse[]>
  >({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const verseContainerRef = useRef<HTMLElement>(null);

  // ============================================================
  // Carregamento da Bíblia (uma vez, lazy, offline-first)
  // ============================================================
  useEffect(() => {
    let cancelled = false;
    setBibleLoading(true);
    setBibleError(null);
    loadArcBible()
      .then((data) => {
        if (!cancelled) {
          setBible(data);
          setBibleLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setBibleError(
            err instanceof Error
              ? `Não foi possível carregar a Bíblia (${err.message}).`
              : "Não foi possível carregar a Bíblia."
          );
          setBibleLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // ============================================================
  // Hash routing — sincroniza URL ↔ estado (back/forward + share)
  // ============================================================
  useEffect(() => {
    // Inicializa a partir do hash atual
    const initial = decodeBibleHash(window.location.hash);
    if (initial.collectionId) {
      setActiveCollection(initial.collectionId);
      // Tenta resolver o subtema pelo slug
      if (initial.subtemaSlug) {
        const col = COLLECTIONS_BY_ID[initial.collectionId];
        const sub = col?.subtemas.find(
          (s) => s.id === initial.subtemaSlug
        );
        if (sub) setInitialSubtemaId(sub.id);
      }
    } else {
      if (initial.testament) setTestament(initial.testament);
      if (initial.bookId) {
        const book = BIBLE_BOOKS.find((b) => b.id === initial.bookId);
        if (book) {
          setSelectedBook(book);
          if (book.testament !== initial.testament && initial.testament) {
            setTestament(book.testament);
          }
        }
      }
      if (initial.chapter) setSelectedChapter(initial.chapter);
    }
  }, []);

  useEffect(() => {
    const newHash = encodeBibleHash(
      activeCollection === "complete" ? null : activeCollection,
      activeCollection === "complete" ? testament : null,
      activeCollection === "complete" ? selectedBook.id : null,
      activeCollection === "complete" ? selectedChapter : null
    );
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, "", newHash);
    }
  }, [activeCollection, testament, selectedBook.id, selectedChapter]);

  // ============================================================
  // Carregamento de capítulo (com cache em memória)
  // ============================================================
  const fetchChapter = useCallback(
    (book: BibleBook, chapter: number) => {
      if (!bible) return;
      const key = `${book.id}-${chapter}`;
      const cached = chapterCache[key];
      if (cached) {
        setVerses(cached);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const chapterVerses = getChapterVerses(bible, book.id, chapter);
        const mapped = chapterVerses.map((text, idx) => ({
          verse: idx + 1,
          text,
        }));
        setVerses(mapped);
        setChapterCache((prev) => ({ ...prev, [key]: mapped }));
        // Persiste histórico de navegação
        try {
          const hist: string[] = JSON.parse(
            localStorage.getItem(STORAGE_KEY_HISTORY) || "[]"
          );
          const ref = `${book.id}-${chapter}`;
          const next = [ref, ...hist.filter((h) => h !== ref)].slice(0, MAX_HISTORY);
          localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(next));
        } catch {}
      } catch (err) {
        setError("Não foi possível carregar o capítulo.");
        setVerses([]);
      } finally {
        setLoading(false);
      }
    },
    [bible, chapterCache]
  );

  useEffect(() => {
    if (bible && activeCollection === "complete") {
      fetchChapter(selectedBook, selectedChapter);
    }
  }, [bible, activeCollection, selectedBook, selectedChapter, fetchChapter]);

  // ============================================================
  // Handlers de navegação
  // ============================================================
  const handleCollectionChange = (id: string) => {
    setActiveCollection(id);
    setBookQuery("");
    setVerseQuery("");
    setSidebarOpen(false);
  };

  const handleTestamentChange = (t: "AT" | "NT") => {
    setTestament(t);
    setBookQuery("");
    const firstBook = t === "AT" ? AT_BOOKS[0] : NT_BOOKS[0];
    setSelectedBook(firstBook);
    setSelectedChapter(1);
  };

  const handleBookChange = (book: BibleBook) => {
    setSelectedBook(book);
    setSelectedChapter(1);
    if (book.testament !== testament) setTestament(book.testament);
  };

  const handleChapterChange = (n: number) => setSelectedChapter(n);

  const prevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter((c) => c - 1);
    } else {
      const idx = BIBLE_BOOKS.findIndex((b) => b.id === selectedBook.id);
      if (idx > 0) {
        const prevBook = BIBLE_BOOKS[idx - 1];
        setSelectedBook(prevBook);
        setSelectedChapter(prevBook.chapters);
        if (prevBook.testament !== testament) setTestament(prevBook.testament);
      }
    }
  };

  const nextChapter = () => {
    if (selectedChapter < selectedBook.chapters) {
      setSelectedChapter((c) => c + 1);
    } else {
      const idx = BIBLE_BOOKS.findIndex((b) => b.id === selectedBook.id);
      if (idx < BIBLE_BOOKS.length - 1) {
        const nextBook = BIBLE_BOOKS[idx + 1];
        setSelectedBook(nextBook);
        setSelectedChapter(1);
        if (nextBook.testament !== testament) setTestament(nextBook.testament);
      }
    }
  };

  // ============================================================
  // Favoritos e copiar
  // ============================================================
  const toggleFavorite = (verseKey: string) => {
    setFavorites((prev) => {
      const next = prev.includes(verseKey)
        ? prev.filter((f) => f !== verseKey)
        : [...prev, verseKey];
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(next));
      return next;
    });
  };

  const copyVerse = async (verse: BibleVerse) => {
    const text = `"${verse.text.trim()}" — ${selectedBook.pt} ${selectedChapter}:${verse.verse}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(verse.verse);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* ignore */
    }
  };

  const copyReference = async (cv: CuratedVerse) => {
    const book = BIBLE_BOOKS[cv.book - 1];
    if (!book) return;
    const text = `${book.pt} ${cv.chapter}:${cv.verse}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopyText(text);
      setTimeout(() => setCopyText(null), 2000);
    } catch {
      /* ignore */
    }
  };

  const changeFontSize = (size: FontSize) => {
    setFontSize(size);
    localStorage.setItem(STORAGE_KEY_FONT, size);
  };

  // ============================================================
  // Navegação a partir de coleção/tema
  // ============================================================
  const navigateToVerse = (bookId: number, chapter: number, verse: number) => {
    const book = BIBLE_BOOKS.find((b) => b.id === bookId);
    if (!book) return;
    setActiveCollection("complete");
    setTestament(book.testament);
    setSelectedBook(book);
    setSelectedChapter(chapter);
    setBookQuery("");
    setVerseQuery("");
    setTimeout(() => {
      const el = document.getElementById(`verse-${verse}`);
      if (el && verseContainerRef.current) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 300);
  };

  // Filtra versículos baseado na busca
  const filteredVerses = useMemo(() => {
    if (!debouncedVerseQuery.trim()) return verses;
    const q = debouncedVerseQuery.toLowerCase().trim();
    return verses.filter((v) => v.text.toLowerCase().includes(q));
  }, [verses, debouncedVerseQuery]);

  // ============================================================
  // Render
  // ============================================================
  const isCollection = activeCollection !== "complete";
  const collectionData =
    activeCollection !== "complete" ? COLLECTIONS_BY_ID[activeCollection] : null;

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-6">
          <h1 className="font-display text-3xl sm:text-4xl font-light text-foreground leading-tight">
            Bíblia Sagrada
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Tradução {ARC_FULL_NAME} ({ARC_TRANSLATION}) — navegação por livro,
            capítulo ou coleções temáticas.
          </p>
        </header>

        {/* Nível 1: Coleções Temáticas */}
        <div className="mb-8">
          <CollectionsTabs
            active={activeCollection}
            onChange={handleCollectionChange}
          />
        </div>

        {/* Temas/emoções — só no modo Bíblia Completa */}
        {!isCollection && (
          <div className="mb-8">
            <ThemeChips
              onSelect={(verses, label) => {
                // Mostra a primeira referência, em modo Bíblia Completa
                if (verses.length > 0) {
                  const first = verses[0];
                  navigateToVerse(first.book, first.chapter, first.verse);
                  setVerseQuery(label);
                }
              }}
            />
          </div>
        )}

        {/* Erro ao carregar Bíblia */}
        {bibleError && (
          <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 text-center">
            <p className="text-red-400 font-medium mb-2">Erro ao carregar a Bíblia</p>
            <p className="text-red-300 text-sm mb-4">{bibleError}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Modo: Bíblia Completa */}
        {!bibleError && !isCollection && (
          <div className="grid lg:grid-cols-[300px_1fr] gap-6">
            {/* Sidebar / Drawer Mobile */}
            <aside
              className={`
                ${sidebarOpen ? "fixed inset-0 z-50 bg-background p-4 overflow-y-auto lg:static lg:p-0 lg:bg-transparent" : "hidden lg:block"}
                lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto
              `}
              aria-label="Navegação da Bíblia"
            >
              {/* Botão fechar (mobile) */}
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h2 className="font-display text-lg font-semibold">Navegar</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded hover:bg-muted"
                  aria-label="Fechar navegação"
                >
                  ✕
                </button>
              </div>

              {/* Nível 2: Testamentos */}
              <div className="flex rounded-lg overflow-hidden border border-border mb-4" role="tablist" aria-label="Testamento">
                <button
                  onClick={() => handleTestamentChange("AT")}
                  className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                    testament === "AT"
                      ? "bg-accent text-accent-foreground"
                      : "bg-card text-muted-foreground hover:text-foreground"
                  }`}
                  aria-pressed={testament === "AT"}
                  role="tab"
                  aria-selected={testament === "AT"}
                >
                  Antigo Testamento
                  <span className="block text-[10px] opacity-70 mt-0.5">{AT_BOOKS.length} livros</span>
                </button>
                <button
                  onClick={() => handleTestamentChange("NT")}
                  className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                    testament === "NT"
                      ? "bg-accent text-accent-foreground"
                      : "bg-card text-muted-foreground hover:text-foreground"
                  }`}
                  aria-pressed={testament === "NT"}
                  role="tab"
                  aria-selected={testament === "NT"}
                >
                  Novo Testamento
                  <span className="block text-[10px] opacity-70 mt-0.5">{NT_BOOKS.length} livros</span>
                </button>
              </div>

              {/* Nível 3a: Busca + Grid de Livros */}
              <div className="bg-card border border-border rounded-xl p-3 mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Livros
                </p>
                <div className="relative mb-3">
                  <svg
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="search"
                    value={bookQuery}
                    onChange={(e) => setBookQuery(e.target.value)}
                    placeholder="Buscar livro..."
                    aria-label="Buscar livro"
                    className="w-full pl-8 pr-3 py-1.5 text-sm rounded border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                  />
                </div>
                <BookGrid
                  testament={testament}
                  selectedBookId={selectedBook.id}
                  onSelect={(b) => {
                    handleBookChange(b);
                    setSidebarOpen(false);
                  }}
                  query={bookQuery}
                  emptyMessage="Nenhum livro encontrado"
                />
              </div>

              {/* Nível 3b: Grid de Capítulos */}
              <div className="bg-card border border-border rounded-xl p-3">
                <ChapterGrid
                  total={selectedBook.chapters}
                  selected={selectedChapter}
                  onSelect={handleChapterChange}
                  bookLabel={selectedBook.pt}
                />
              </div>
            </aside>

            {/* Main content */}
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
                  Navegar
                </button>
                <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1" role="group" aria-label="Tamanho da fonte">
                  {(["sm", "base", "lg", "xl"] as FontSize[]).map((size, i) => (
                    <button
                      key={size}
                      onClick={() => changeFontSize(size)}
                      className={`w-7 h-7 flex items-center justify-center rounded text-xs font-medium transition-colors ${
                        fontSize === size
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      aria-label={`Fonte ${["pequena", "normal", "grande", "extra grande"][i]}`}
                      aria-pressed={fontSize === size}
                    >
                      A{i > 0 ? "+" : ""}
                    </button>
                  ))}
                </div>
              </div>

              {/* Header bar (desktop) */}
              <div className="hidden lg:flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground">
                    {selectedBook.pt} {selectedChapter}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    Capítulo {selectedChapter} de {selectedBook.chapters} ·{" "}
                    <span className="text-accent">{ARC_TRANSLATION}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1" role="group" aria-label="Tamanho da fonte">
                  {(["sm", "base", "lg", "xl"] as FontSize[]).map((size, i) => (
                    <button
                      key={size}
                      onClick={() => changeFontSize(size)}
                      className={`w-8 h-8 flex items-center justify-center rounded text-xs font-medium transition-colors ${
                        fontSize === size
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                      aria-label={`Fonte ${["pequena", "normal", "grande", "extra grande"][i]}`}
                      aria-pressed={fontSize === size}
                    >
                      A{i > 0 ? "+" : ""}
                    </button>
                  ))}
                </div>
              </div>

              {/* Busca dentro do capítulo */}
              <div className="relative mb-6">
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
                  ref={searchInputRef}
                  type="search"
                  value={verseQuery}
                  onChange={(e) => setVerseQuery(e.target.value)}
                  placeholder="Buscar palavra no capítulo..."
                  aria-label="Buscar no capítulo"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                />
                {verseQuery && (
                  <button
                    onClick={() => {
                      setVerseQuery("");
                      searchInputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                    aria-label="Limpar busca"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Skeleton / loading inicial da Bíblia */}
              {bibleLoading && (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <div
                    className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin"
                    aria-hidden="true"
                  />
                  <p className="text-muted-foreground text-sm">Carregando Bíblia...</p>
                </div>
              )}

              {/* Skeleton / loading do capítulo */}
              {!bibleLoading && loading && (
                <div className="space-y-2" aria-busy="true">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-6 bg-muted rounded animate-pulse"
                      style={{ width: `${60 + Math.random() * 35}%` }}
                    />
                  ))}
                </div>
              )}

              {/* Erro ao carregar capítulo */}
              {error && (
                <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 text-center">
                  <p className="text-red-400 font-medium mb-2">Erro ao carregar</p>
                  <p className="text-red-300 text-sm mb-4">{error}</p>
                  <button
                    onClick={() => fetchChapter(selectedBook, selectedChapter)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Tentar novamente
                  </button>
                </div>
              )}

              {/* Versículos */}
              {!bibleLoading && !loading && !error && verses.length > 0 && (
                <article
                  ref={verseContainerRef}
                  className="bg-card border border-border rounded-2xl p-6 sm:p-10"
                >
                  {/* Header do capítulo (mobile) */}
                  <div className="lg:hidden mb-6 pb-4 border-b border-border">
                    <h2 className="font-display text-xl font-light text-foreground">
                      {selectedBook.pt} {selectedChapter}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {selectedChapter}/{selectedBook.chapters} · {ARC_TRANSLATION}
                    </p>
                  </div>

                  {filteredVerses.length === 0 && debouncedVerseQuery ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        Nenhum versículo encontrado com "<strong>{debouncedVerseQuery}</strong>"
                      </p>
                      <button
                        onClick={() => setVerseQuery("")}
                        className="mt-3 text-sm text-accent hover:underline"
                      >
                        Limpar busca
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`bible-verse-text space-y-1 ${fontSizeClass[fontSize]}`}
                      aria-live="polite"
                    >
                      {filteredVerses.map((verse) => {
                        const key = `${selectedBook.id}-${selectedChapter}-${verse.verse}`;
                        const isFav = favorites.includes(key);
                        return (
                          <div
                            key={verse.verse}
                            className="group relative py-1 rounded-lg hover:bg-accent/5 px-2 -mx-2 transition-colors"
                            id={`verse-${verse.verse}`}
                          >
                            <span className="select-none inline-block w-7 text-accent font-semibold text-xs align-top mt-1.5 flex-shrink-0">
                              {verse.verse}
                            </span>
                            <span className="text-foreground leading-[1.9] font-bible">
                              <Highlights text={verse.text} query={debouncedVerseQuery} />
                            </span>
                            <span className="ml-2 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity align-middle">
                              <button
                                onClick={() => copyVerse(verse)}
                                className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                aria-label={`Copiar versículo ${verse.verse}`}
                              >
                                {copied === verse.verse ? (
                                  <svg
                                    className="w-3.5 h-3.5 text-green-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                )}
                              </button>
                              <button
                                onClick={() => toggleFavorite(key)}
                                className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${
                                  isFav
                                    ? "text-accent hover:text-accent/70"
                                    : "text-muted-foreground hover:text-accent hover:bg-muted"
                                }`}
                                aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                                aria-pressed={isFav}
                              >
                                <svg
                                  className="w-3.5 h-3.5"
                                  fill={isFav ? "currentColor" : "none"}
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  aria-hidden="true"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                              </button>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Navegação inferior */}
                  <div className="flex justify-between mt-10 pt-6 border-t border-border">
                    <button
                      onClick={prevChapter}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                      aria-label="Capítulo anterior"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Capítulo anterior
                    </button>
                    <button
                      onClick={nextChapter}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                      aria-label="Próximo capítulo"
                    >
                      Próximo capítulo
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </article>
              )}

              {/* Favoritos count */}
              {favorites.length > 0 && (
                <p className="text-center text-muted-foreground text-xs mt-4">
                  {favorites.length}{" "}
                  {favorites.length === 1
                    ? "versículo favoritado"
                    : "versículos favoritados"}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Modo: Coleção Temática */}
        {!bibleError && isCollection && collectionData && (
          <CollectionView
            collection={collectionData}
            initialSubtemaId={initialSubtemaId}
            onCopy={async (text: string) => {
              try {
                await navigator.clipboard.writeText(text);
                setCopyText(text);
                setTimeout(() => setCopyText(null), 2000);
              } catch {
                /* ignore */
              }
            }}
            onNavigateToBook={navigateToVerse}
          />
        )}
      </div>
    </main>
  );
}

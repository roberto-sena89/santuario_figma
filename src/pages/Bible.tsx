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
import PageTitle from "../components/ui/PageTitle";

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

// Estatísticas e atalhos do painel inicial
const TOTAL_CHAPTERS = BIBLE_BOOKS.reduce((sum, b) => sum + b.chapters, 0);
const QUICK_BOOK_NAMES = ["Gênesis", "Salmos", "Provérbios", "Isaías", "João", "Romanos"];
const QUICK_BOOKS = QUICK_BOOK_NAMES.map((name) =>
  BIBLE_BOOKS.find((b) => b.pt === name)
).filter((b): b is BibleBook => Boolean(b));

// Resultado de um tema selecionado (chips "Por sentimento")
interface ThemeResultItem {
  bookId: number;
  chapter: number;
  verse: number;
  ref: string;
  text: string;
}

export default function Bible() {
  // Estado da Bíblia
  const [bible, setBible] = useState<ArcBible | null>(null);
  const [bibleLoading, setBibleLoading] = useState(true);
  const [bibleError, setBibleError] = useState<string | null>(null);

  // Estado de visualização
  const [initialSubtemaId, setInitialSubtemaId] = useState<string | null>(null);
  const [activeCollection, setActiveCollection] = useState<string>("complete");
  const [testament, setTestament] = useState<"AT" | "NT">("AT");
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
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
  // Última leitura (do histórico) para o painel inicial
  const [lastRead, setLastRead] = useState<{ book: BibleBook; chapter: number } | null>(null);
  // Resultado de tema selecionado (chips "Por sentimento")
  const [themeResult, setThemeResult] = useState<{
    label: string;
    items: ThemeResultItem[];
  } | null>(null);

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
  // Flag pra evitar que o useEffect de escrita sobrescreva a hash
  // antes do useEffect de leitura ter sido processado.
  const [hashReady, setHashReady] = useState(false);

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
    // Marca como pronto depois de um tick (deixa o estado assentar)
    const t = setTimeout(() => setHashReady(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!hashReady) return; // espera a leitura inicial
    const newHash =
      activeCollection !== "complete"
        ? encodeBibleHash(activeCollection, null, null, null)
        : selectedBook
          ? encodeBibleHash(null, testament, selectedBook.id, selectedChapter)
          : "#/biblia";
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, "", newHash);
    }
  }, [hashReady, activeCollection, testament, selectedBook, selectedChapter]);

  // Reage a mudanças externas de hash (menu, back/forward, link compartilhado)
  useEffect(() => {
    const onHash = () => {
      const state = decodeBibleHash(window.location.hash);
      if (state.collectionId && state.collectionId !== activeCollection) {
        handleCollectionChange(state.collectionId);
        if (state.subtemaSlug) setInitialSubtemaId(state.subtemaSlug);
      } else if (!state.collectionId && activeCollection !== "complete") {
        handleCollectionChange("complete");
      } else if (
        !state.collectionId &&
        activeCollection === "complete" &&
        state.bookId
      ) {
        const book = BIBLE_BOOKS.find((b) => b.id === state.bookId);
        if (book) {
          setSelectedBook(book);
          if (state.chapter) setSelectedChapter(state.chapter);
          if (book.testament !== testament) setTestament(book.testament);
        }
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCollection, testament]);

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
    if (bible && activeCollection === "complete" && selectedBook) {
      fetchChapter(selectedBook, selectedChapter);
    }
  }, [bible, activeCollection, selectedBook, selectedChapter, fetchChapter]);

  // Lê a última leitura do histórico (para "Continuar leitura" no painel inicial)
  useEffect(() => {
    try {
      const hist: string[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY_HISTORY) || "[]"
      );
      const ref = hist[0];
      if (!ref) return;
      const [bookId, chapter] = ref.split("-").map(Number);
      const book = BIBLE_BOOKS.find((b) => b.id === bookId);
      if (book && chapter >= 1 && chapter <= book.chapters) {
        setLastRead({ book, chapter });
      }
    } catch {}
  }, []);

  // ============================================================
  // Handlers de navegação
  // ============================================================
  const handleCollectionChange = (id: string) => {
    setActiveCollection(id);
    setBookQuery("");
    setVerseQuery("");
    setThemeResult(null);
    setSidebarOpen(false);
  };

  const handleTestamentChange = (t: "AT" | "NT") => {
    setTestament(t);
    setBookQuery("");
  };

  const handleBookChange = (book: BibleBook) => {
    setSelectedBook(book);
    setSelectedChapter(1);
    setThemeResult(null);
    if (book.testament !== testament) setTestament(book.testament);
  };

  const handleChapterChange = (n: number) => {
    setThemeResult(null);
    setSelectedChapter(n);
  };

  const prevChapter = () => {
    if (!selectedBook) return;
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
    if (!selectedBook) return;
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
    if (!selectedBook) return;
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
    setThemeResult(null);
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

  // Extremos para desabilitar navegação de capítulos
  const bookIdx = selectedBook
    ? BIBLE_BOOKS.findIndex((b) => b.id === selectedBook.id)
    : -1;
  const isFirstChapter =
    selectedBook !== null && bookIdx === 0 && selectedChapter === 1;
  const isLastChapter =
    selectedBook !== null &&
    bookIdx === BIBLE_BOOKS.length - 1 &&
    selectedChapter === selectedBook.chapters;

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header — padrão PageTitle do site */}
        <PageTitle
          eyebrow="Leitura e Devoção"
          title="Bíblia"
          titleAccent="Sagrada"
          subtitle={`Tradução ${ARC_FULL_NAME} (${ARC_TRANSLATION}) — navegue por livro e capítulo ou explore coleções temáticas curadas para o seu momento.`}
        />

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
                if (!bible) {
                  // Bíblia ainda carregando: cai na primeira referência
                  if (verses.length > 0) {
                    navigateToVerse(verses[0].book, verses[0].chapter, verses[0].verse);
                  }
                  return;
                }
                // Extrai o texto real de cada versículo curado
                const items: ThemeResultItem[] = [];
                for (const cv of verses) {
                  const book = BIBLE_BOOKS[cv.book - 1];
                  if (!book) continue;
                  const texts = getChapterVerses(bible, cv.book, cv.chapter);
                  const text = texts[cv.verse - 1];
                  if (!text) continue;
                  items.push({
                    bookId: cv.book,
                    chapter: cv.chapter,
                    verse: cv.verse,
                    ref: `${book.pt} ${cv.chapter}:${cv.verse}`,
                    text: text.trim(),
                  });
                }
                setThemeResult({ label, items });
              }}
            />
          </div>
        )}

        {/* Erro ao carregar Bíblia */}
        {bibleError && (
          <div className="bg-error/10 border border-error/30 rounded-2xl p-6 text-center">
            <p className="text-error font-medium mb-2">Erro ao carregar a Bíblia</p>
            <p className="text-muted-foreground text-sm mb-4">{bibleError}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-accent text-accent-foreground px-5 py-2 rounded-full text-sm font-medium hover:bg-accent/85 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
                ${sidebarOpen ? "fixed inset-0 z-50 bg-background p-4 lg:static lg:p-0 lg:bg-transparent" : "hidden lg:block"}
                lg:sticky lg:top-24
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

              {/* Nível 2: Testamentos — segmented control */}
              <div
                className="grid grid-cols-2 gap-1 bg-card border border-border rounded-xl p-1 mb-4"
                role="tablist"
                aria-label="Testamento"
              >
                <button
                  onClick={() => handleTestamentChange("AT")}
                  className={`rounded-lg py-2.5 text-sm font-medium border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    testament === "AT"
                      ? "border-[#D4A24C]/45 bg-gradient-to-r from-[#D4A24C]/20 to-[#C4933C]/12 text-[#D4A24C] shadow-md shadow-black/20"
                      : "border-transparent text-muted-foreground hover:text-[#D4A24C] hover:bg-[#D4A24C]/5"
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
                  className={`rounded-lg py-2.5 text-sm font-medium border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    testament === "NT"
                      ? "border-[#D4A24C]/45 bg-gradient-to-r from-[#D4A24C]/20 to-[#C4933C]/12 text-[#D4A24C] shadow-md shadow-black/20"
                      : "border-transparent text-muted-foreground hover:text-[#D4A24C] hover:bg-[#D4A24C]/5"
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
              <div className="bg-card/60 border border-border rounded-2xl p-4 mb-4">
                <p className="text-[10.5px] font-semibold text-muted-foreground uppercase tracking-[0.22em] mb-3">
                  Livros
                </p>
                <div className="relative mb-3">
                  <svg
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground"
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
                    className="w-full pl-10 pr-3 py-2.5 text-sm rounded-xl border border-border bg-muted/30 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/40 focus:border-[#D4A24C]/40 transition-colors"
                  />
                </div>
                <BookGrid
                  testament={testament}
                  selectedBookId={selectedBook?.id ?? -1}
                  onSelect={(b) => {
                    handleBookChange(b);
                    setSidebarOpen(false);
                  }}
                  query={bookQuery}
                  emptyMessage="Nenhum livro encontrado"
                />
              </div>

              {/* Nível 3b: Grid de Capítulos — só com livro selecionado */}
              {selectedBook && (
                <div className="bg-card/60 border border-border rounded-2xl p-4">
                  <ChapterGrid
                    total={selectedBook.chapters}
                    selected={selectedChapter}
                    onSelect={handleChapterChange}
                    bookLabel={selectedBook.pt}
                  />
                </div>
              )}
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
                {selectedBook && (
                  <FontSizeControl value={fontSize} onChange={changeFontSize} compact />
                )}
              </div>

              {themeResult ? (
                <ThemeResultPanel
                  result={themeResult}
                  favorites={favorites}
                  fontSizeClass={fontSizeClass[fontSize]}
                  onToggleFavorite={toggleFavorite}
                  onOpenVerse={(bookId, chapter) => {
                    setThemeResult(null);
                    navigateToVerse(bookId, chapter, 1);
                  }}
                  onClose={() => setThemeResult(null)}
                />
              ) : selectedBook ? (
                <>
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

                <FontSizeControl value={fontSize} onChange={changeFontSize} />
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

              {/* Skeleton / loading do capítulo — larguras determinísticas */}
              {!bibleLoading && loading && (
                <div className="space-y-3" aria-busy="true">
                  {[92, 100, 78, 96, 85, 100, 72, 88].map((w, i) => (
                    <div
                      key={i}
                      className="h-5 bg-muted/70 rounded animate-pulse"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              )}

              {/* Erro ao carregar capítulo */}
              {error && (
                <div className="bg-error/10 border border-error/30 rounded-2xl p-6 text-center">
                  <p className="text-error font-medium mb-2">Erro ao carregar</p>
                  <p className="text-muted-foreground text-sm mb-4">{error}</p>
                  <button
                    onClick={() => fetchChapter(selectedBook, selectedChapter)}
                    className="bg-accent text-accent-foreground px-5 py-2 rounded-full text-sm font-medium hover:bg-accent/85 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Tentar novamente
                  </button>
                </div>
              )}

              {/* Versículos */}
              {!bibleLoading && !loading && !error && verses.length > 0 && (
                <article
                  ref={verseContainerRef}
                  className="relative bg-card border border-border rounded-2xl px-6 py-8 sm:px-12 sm:py-12 overflow-hidden"
                >
                  {/* Ornamentos de citação */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-3 font-display text-6xl leading-none text-accent/10 select-none"
                  >
                    “
                  </span>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 bottom-3 font-display text-6xl leading-none text-accent/10 select-none"
                  >
                    ”
                  </span>
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
                      className={`bible-verse-text space-y-1 mx-auto max-w-[72ch] ${fontSizeClass[fontSize]}`}
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
                            <span className="select-none inline-block w-7 text-accent/80 font-semibold text-[11px] align-top mt-2 tabular-nums flex-shrink-0">
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
                      disabled={isFirstChapter}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-accent/50 hover:text-accent disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      aria-label="Capítulo anterior"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Capítulo anterior
                    </button>
                    <button
                      onClick={nextChapter}
                      disabled={isLastChapter}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-accent/50 hover:text-accent disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
                </>
              ) : (
                <BibleWelcome
                  lastRead={lastRead}
                  favoritesCount={favorites.length}
                  onPickBook={handleBookChange}
                  onContinue={(book, chapter) => {
                    setSelectedBook(book);
                    setSelectedChapter(chapter);
                  }}
                />
              )}

              {/* Favoritos count */}
              {favorites.length > 0 && (
                <p className="text-center mt-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {favorites.length}{" "}
                    {favorites.length === 1
                      ? "versículo favoritado"
                      : "versículos favoritados"}
                  </span>
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
            bible={bible}
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

/* ════════════════════════════════════════════════════
   FontSizeControl — seletor segmentado de tamanho de fonte
   ════════════════════════════════════════════════════ */

function FontSizeControl({
  value,
  onChange,
  compact = false,
}: {
  value: FontSize;
  onChange: (size: FontSize) => void;
  compact?: boolean;
}) {
  const sizes: FontSize[] = ["sm", "base", "lg", "xl"];
  const labels = ["pequena", "normal", "grande", "extra grande"];
  return (
    <div
      className="inline-flex items-center gap-1 bg-card border border-border rounded-full p-1"
      role="group"
      aria-label="Tamanho da fonte"
    >
      {sizes.map((size, i) => (
        <button
          key={size}
          onClick={() => onChange(size)}
          className={`${
            compact ? "w-7 h-7" : "w-8 h-8"
          } flex items-center justify-center rounded-full text-xs font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            value === size
              ? "bg-accent text-accent-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
          aria-label={`Fonte ${labels[i]}`}
          aria-pressed={value === size}
        >
          {i === 0 ? "A" : `A${"+".repeat(i)}`}
        </button>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════
   ThemeResultPanel — versículos de um tema ("Por sentimento")
   ════════════════════════════════════════════════════ */

function ThemeResultPanel({
  result,
  favorites,
  fontSizeClass,
  onToggleFavorite,
  onOpenVerse,
  onClose,
}: {
  result: { label: string; items: ThemeResultItem[] };
  favorites: string[];
  fontSizeClass: string;
  onToggleFavorite: (key: string) => void;
  onOpenVerse: (bookId: number, chapter: number) => void;
  onClose: () => void;
}) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copy = async (idx: number, text: string, ref: string) => {
    try {
      await navigator.clipboard.writeText(`"${text}" — ${ref}`);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <article
      className="relative bg-card border border-border rounded-2xl px-6 py-8 sm:px-12 sm:py-12 overflow-hidden"
      aria-label={`Versículos sobre ${result.label}`}
    >
      {/* Ornamentos de citação */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-3 font-display text-6xl leading-none text-accent/10 select-none"
      >
        “
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 bottom-3 font-display text-6xl leading-none text-accent/10 select-none"
      >
        ”
      </span>

      {/* Header */}
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-accent mb-2">
            Versículos selecionados
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground leading-tight">
            {result.label}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {result.items.length} {result.items.length === 1 ? "versículo" : "versículos"} ·{" "}
            {ARC_TRANSLATION}
          </p>
        </div>
        <button
          onClick={onClose}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-[#D4A24C]/40 hover:text-[#D4A24C] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Fechar resultados"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mt-6 h-px w-10 bg-gradient-to-r from-[#D4A24C]/70 to-transparent" aria-hidden="true" />

      {/* Lista de versículos */}
      {result.items.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          Nenhum versículo disponível para este tema ainda.
        </p>
      ) : (
        <div className="relative mt-6 space-y-3">
          {result.items.map((item, idx) => {
            const key = `${item.bookId}-${item.chapter}-${item.verse}`;
            const isFav = favorites.includes(key);
            return (
              <div
                key={key}
                className="group rounded-xl border border-border bg-background/40 p-4 sm:p-5 transition-colors duration-200 hover:border-[#D4A24C]/35"
              >
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <button
                    onClick={() => onOpenVerse(item.bookId, item.chapter)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#D4A24C]/10 border border-[#D4A24C]/25 px-3 py-1 text-[11px] font-semibold tracking-wide text-[#D4A24C] transition-colors hover:bg-[#D4A24C]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={`Abrir ${item.ref} no capítulo completo`}
                  >
                    {item.ref}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => copy(idx, item.text, item.ref)}
                      className="text-[11px] text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:underline"
                      aria-label={`Copiar ${item.ref}`}
                    >
                      {copiedIdx === idx ? "Copiado!" : "Copiar"}
                    </button>
                    <button
                      onClick={() => onToggleFavorite(key)}
                      aria-pressed={isFav}
                      className={`grid h-8 w-8 place-items-center rounded-full transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        isFav
                          ? "text-[#D4A24C]"
                          : "text-muted-foreground hover:text-[#D4A24C]"
                      }`}
                      aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
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
                  </div>
                </div>

                <p className={`bible-verse-text ${fontSizeClass}`}>{item.text}</p>
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}

/* ════════════════════════════════════════════════════
   BibleWelcome — painel inicial (nenhum capítulo aberto)
   Mostra instruções, estatísticas, atalhos e última leitura
   ════════════════════════════════════════════════════ */

function BibleWelcome({
  lastRead,
  favoritesCount,
  onPickBook,
  onContinue,
}: {
  lastRead: { book: BibleBook; chapter: number } | null;
  favoritesCount: number;
  onPickBook: (book: BibleBook) => void;
  onContinue: (book: BibleBook, chapter: number) => void;
}) {
  return (
    <section
      className="relative bg-card border border-border rounded-2xl px-6 py-10 sm:px-12 sm:py-14 overflow-hidden"
      aria-label="Comece a ler"
    >
      {/* Ornamentos de citação */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-3 font-display text-6xl leading-none text-accent/10 select-none"
      >
        “
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 bottom-3 font-display text-6xl leading-none text-accent/10 select-none"
      >
        ”
      </span>

      <div className="relative mx-auto max-w-xl text-center">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-accent mb-3">
          Comece por aqui
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground leading-tight">
          Escolha um livro para começar a ler
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mt-3 leading-relaxed text-pretty">
          Use o painel ao lado para navegar por livro e capítulo — ou toque em
          “Navegar” no celular. Você também pode explorar as coleções temáticas
          e os sentimentos acima.
        </p>

        {/* Estatísticas */}
        <div className="mt-8 flex items-center justify-center gap-6 sm:gap-8">
          <div>
            <p className="font-display text-2xl text-accent">{BIBLE_BOOKS.length}</p>
            <p className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground mt-1">
              livros
            </p>
          </div>
          <div className="h-8 w-px bg-border" aria-hidden="true" />
          <div>
            <p className="font-display text-2xl text-accent">
              {TOTAL_CHAPTERS.toLocaleString("pt-BR")}
            </p>
            <p className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground mt-1">
              capítulos
            </p>
          </div>
          <div className="h-8 w-px bg-border" aria-hidden="true" />
          <div>
            <p className="font-display text-2xl text-accent">{ARC_TRANSLATION}</p>
            <p className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground mt-1">
              tradução
            </p>
          </div>
        </div>

        {/* Continuar leitura */}
        {lastRead && (
          <button
            onClick={() => onContinue(lastRead.book, lastRead.chapter)}
            className="mt-8 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Continuar leitura — {lastRead.book.pt} {lastRead.chapter}
          </button>
        )}

        {/* Livros populares */}
        <div className="mt-7">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-muted-foreground mb-3">
            Populares
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {QUICK_BOOKS.map((book) => (
              <button
                key={book.id}
                onClick={() => onPickBook(book)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {book.pt}
              </button>
            ))}
          </div>
        </div>

        {/* Favoritos */}
        {favoritesCount > 0 && (
          <p className="mt-7">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {favoritesCount}{" "}
              {favoritesCount === 1
                ? "versículo favoritado"
                : "versículos favoritados"}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}

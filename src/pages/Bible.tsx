import { useState, useEffect, useCallback } from "react";
import { BIBLE_BOOKS, AT_BOOKS, NT_BOOKS, type BibleBook } from "../data/bibleBooks";

interface BibleVerse {
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

interface BibleChapterData {
  reference: string;
  verses: BibleVerse[];
  translation_id: string;
  error?: string;
}

const STORAGE_KEY_FAVORITES = "iegv_bible_favorites";
const STORAGE_KEY_FONT = "iegv_bible_font_size";

type FontSize = "sm" | "base" | "lg" | "xl";

const fontSizeClass: Record<FontSize, string> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export default function Bible() {
  const [selectedBook, setSelectedBook] = useState<BibleBook>(BIBLE_BOOKS[18]);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testament, setTestament] = useState<"AT" | "NT">("AT");
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

  const books = testament === "AT" ? AT_BOOKS : NT_BOOKS;

  const fetchChapter = useCallback(async (book: BibleBook, chapter: number) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://bible-api.com/${book.en}+${chapter}?translation=almeida`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Não foi possível carregar o capítulo.");
      const data: BibleChapterData = await res.json();
      if (data.error) throw new Error(data.error);
      setVerses(data.verses || []);
    } catch (err) {
      setError(
        "Não foi possível carregar o capítulo. Verifique sua conexão e tente novamente."
      );
      setVerses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChapter(selectedBook, selectedChapter);
  }, [selectedBook, selectedChapter, fetchChapter]);

  const handleBookChange = (book: BibleBook) => {
    setSelectedBook(book);
    setSelectedChapter(1);
  };

  const prevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter((c) => c - 1);
    } else {
      const idx = BIBLE_BOOKS.findIndex((b) => b.id === selectedBook.id);
      if (idx > 0) {
        const prevBook = BIBLE_BOOKS[idx - 1];
        setSelectedBook(prevBook);
        setSelectedChapter(prevBook.chapters);
        if (prevBook.testament !== testament) {
          setTestament(prevBook.testament);
        }
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        if (nextBook.testament !== testament) {
          setTestament(nextBook.testament);
        }
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    const text = `"${verse.text.trim()}" — ${selectedBook.pt} ${verse.chapter}:${verse.verse}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(verse.verse);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* fallback: ignore */
    }
  };

  const changeFontSize = (size: FontSize) => {
    setFontSize(size);
    localStorage.setItem(STORAGE_KEY_FONT, size);
  };

  const chapterArray = Array.from({ length: selectedBook.chapters }, (_, i) => i + 1);

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto pb-4">
            {/* Testament toggle */}
            <div className="flex rounded-lg overflow-hidden border border-border mb-4">
              <button
                onClick={() => {
                  setTestament("AT");
                  handleBookChange(AT_BOOKS[0]);
                }}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                  testament === "AT"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                }`}
                aria-pressed={testament === "AT"}
              >
                Antigo Testamento
              </button>
              <button
                onClick={() => {
                  setTestament("NT");
                  handleBookChange(NT_BOOKS[0]);
                }}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                  testament === "NT"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                }`}
                aria-pressed={testament === "NT"}
              >
                Novo Testamento
              </button>
            </div>

            {/* Books list */}
            <div className="bg-card border border-border rounded-xl overflow-hidden mb-4">
              <div className="p-3 border-b border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Livro
                </p>
              </div>
              <div className="max-h-64 lg:max-h-72 overflow-y-auto">
                {books.map((book) => (
                  <button
                    key={book.id}
                    onClick={() => handleBookChange(book)}
                    className={`w-full text-left px-3 py-2.5 text-sm flex items-center justify-between transition-colors ${
                      selectedBook.id === book.id
                        ? "bg-accent/10 text-accent font-semibold"
                        : "text-foreground hover:bg-muted"
                    }`}
                    aria-current={selectedBook.id === book.id ? "true" : undefined}
                  >
                    <span>{book.pt}</span>
                    <span className="text-xs text-muted-foreground">{book.abbr}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chapter selector */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-3 border-b border-border">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Capítulo — {selectedBook.pt}
                </p>
              </div>
              <div className="p-3 grid grid-cols-5 gap-1 max-h-48 overflow-y-auto">
                {chapterArray.map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setSelectedChapter(ch)}
                    className={`aspect-square flex items-center justify-center text-sm rounded transition-colors ${
                      selectedChapter === ch
                        ? "bg-accent text-white font-bold"
                        : "hover:bg-muted text-foreground"
                    }`}
                    aria-label={`Capítulo ${ch}`}
                    aria-pressed={selectedChapter === ch}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="min-w-0">
            {/* Header bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-light text-foreground">
                  {selectedBook.pt}
                </h1>
                <p className="text-muted-foreground text-sm mt-0.5">
                  Capítulo {selectedChapter} de {selectedBook.chapters} · Tradução Almeida
                </p>
              </div>

              {/* Font size controls */}
              <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-1" role="group" aria-label="Tamanho da fonte">
                {(["sm", "base", "lg", "xl"] as FontSize[]).map((size, i) => (
                  <button
                    key={size}
                    onClick={() => changeFontSize(size)}
                    className={`w-8 h-8 flex items-center justify-center rounded text-xs font-medium transition-colors ${
                      fontSize === size
                        ? "bg-accent text-white"
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

            {/* Navigation */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={prevChapter}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                aria-label="Capítulo anterior"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Anterior
              </button>
              <button
                onClick={nextChapter}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                aria-label="Próximo capítulo"
              >
                Próximo
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Verses */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                <p className="text-muted-foreground text-sm">Carregando capítulo...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center dark:bg-red-900/20 dark:border-red-800">
                <svg className="w-10 h-10 text-red-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-red-700 dark:text-red-400 font-medium mb-1">Erro ao carregar</p>
                <p className="text-red-600 dark:text-red-300 text-sm mb-4">{error}</p>
                <button
                  onClick={() => fetchChapter(selectedBook, selectedChapter)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {!loading && !error && verses.length > 0 && (
              <article className="bg-card border border-border rounded-2xl p-6 sm:p-10">
                <div className={`bible-verse-text space-y-1 ${fontSizeClass[fontSize]}`}>
                  {verses.map((verse) => {
                    const key = `${selectedBook.id}-${verse.chapter}-${verse.verse}`;
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
                        <span className="text-foreground leading-[1.9]">
                          {verse.text}
                        </span>
                        {/* Verse actions */}
                        <span className="ml-2 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity align-middle">
                          <button
                            onClick={() => copyVerse(verse)}
                            className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            aria-label={`Copiar versículo ${verse.verse}`}
                          >
                            {copied === verse.verse ? (
                              <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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

                {/* Bottom navigation */}
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

            {/* Favorites count */}
            {favorites.length > 0 && (
              <p className="text-center text-muted-foreground text-xs mt-4">
                {favorites.length} {favorites.length === 1 ? "versículo favoritado" : "versículos favoritados"}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

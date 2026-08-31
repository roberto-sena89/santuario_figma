import { useState, useRef, useEffect } from "react";
import { TRACKS, TRACK_CATEGORIES, type Track } from "../data/playbacks";

export default function Playbacks() {
  const [category, setCategory] = useState("todos");
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [search, setSearch] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filtered = TRACKS.filter((t) => {
    const matchCat = category === "todos" || t.category === category;
    const matchSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.artist.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const play = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying((p) => !p);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying && currentTrack) {
      const parts = currentTrack.duration.split(":").map(Number);
      const totalSecs = (parts[0] || 0) * 60 + (parts[1] || 0);
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 100 / (totalSecs * 10);
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTrack]);

  const categoryLabel = (cat: Track["category"]): string => {
    const labels: Record<Track["category"], string> = {
      louvor: "Louvor",
      ministeracao: "Ministração",
      playback: "Playback",
      instrumental: "Instrumental",
    };
    return labels[cat];
  };

  const categoryColor = (cat: Track["category"]): string => {
    const colors: Record<Track["category"], string> = {
      louvor: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
      ministeracao: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      playback: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      instrumental: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    };
    return colors[cat];
  };

  return (
    <main id="main-content" className="min-h-screen bg-background pt-16 pb-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="text-accent text-sm font-medium uppercase tracking-widest mb-2">
            Música
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-light text-foreground">
            Playbacks & Louvores
          </h1>
          <p className="text-muted-foreground mt-2">
            Louvores, ministrações e playbacks do ministério de música da nossa igreja.
          </p>
        </div>

        {/* Search & filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título ou artista..."
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
              aria-label="Buscar músicas"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-8" role="tablist" aria-label="Categorias">
          {TRACK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              role="tab"
              aria-selected={category === cat.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat.id
                  ? "bg-accent text-white"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Track list */}
        <div className="space-y-2" role="list" aria-label="Lista de músicas">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <p>Nenhuma música encontrada.</p>
            </div>
          )}
          {filtered.map((track) => {
            const isActive = currentTrack?.id === track.id;
            return (
              <div
                key={track.id}
                role="listitem"
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? "bg-accent/10 border-accent/30"
                    : "bg-card border-border hover:border-accent/30 hover:shadow-sm"
                }`}
                onClick={() => play(track)}
              >
                {/* Play button */}
                <button
                  className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    isActive
                      ? "bg-accent text-white"
                      : "bg-muted text-muted-foreground hover:bg-accent/20 hover:text-accent"
                  }`}
                  aria-label={isActive && isPlaying ? `Pausar ${track.title}` : `Reproduzir ${track.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    play(track);
                  }}
                >
                  {isActive && isPlaying ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm truncate">
                    {track.title}
                  </div>
                  <div className="text-muted-foreground text-xs truncate">{track.artist}</div>
                  {isActive && (
                    <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-100"
                        style={{ width: `${progress}%` }}
                        role="progressbar"
                        aria-valuenow={Math.round(progress)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Progresso da reprodução"
                      />
                    </div>
                  )}
                </div>

                {/* Category + duration */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`hidden sm:inline text-xs font-medium px-2 py-0.5 rounded-full ${categoryColor(track.category)}`}>
                    {categoryLabel(track.category)}
                  </span>
                  <span className="text-muted-foreground text-sm font-mono">
                    {track.duration}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note about audio */}
        <p className="text-muted-foreground text-xs text-center mt-8 italic">
          Para adicionar áudios reais, edite o arquivo{" "}
          <code className="bg-muted px-1 py-0.5 rounded">src/data/playbacks.ts</code>{" "}
          e informe a URL de cada faixa no campo{" "}
          <code className="bg-muted px-1 py-0.5 rounded">audioUrl</code>.
        </p>
      </div>

      {/* Persistent mini-player */}
      {currentTrack && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-primary border-t border-primary-foreground/10 z-50"
          role="region"
          aria-label="Player de música"
        >
          {/* Progress bar */}
          <div className="h-0.5 bg-primary-foreground/10">
            <div
              className="h-full bg-accent transition-all duration-100"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0 hover:bg-accent/90 transition-colors"
              aria-label={isPlaying ? "Pausar" : "Reproduzir"}
            >
              {isPlaying ? (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-primary-foreground text-sm truncate">
                {currentTrack.title}
              </div>
              <div className="text-primary-foreground/60 text-xs truncate">
                {currentTrack.artist}
              </div>
            </div>
            <span className="text-primary-foreground/60 text-sm font-mono flex-shrink-0">
              {currentTrack.duration}
            </span>
            <button
              onClick={() => {
                setCurrentTrack(null);
                setIsPlaying(false);
                setProgress(0);
              }}
              className="w-8 h-8 flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              aria-label="Fechar player"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <audio ref={audioRef} className="hidden" aria-hidden="true" />
    </main>
  );
}

/**
 * Player de áudio (leitura em voz alta via Web Speech API).
 * Aparece ao lado do título do capítulo. Mostra play/pause, prev/next e velocidade.
 */

import { useState } from "react";
import type { useBibleAudio, AudioSpeed } from "../../hooks/useBibleAudio";

interface AudioPlayerProps {
  audio: ReturnType<typeof useBibleAudio>;
  verses: { verse: number; text: string }[];
  bookId: number;
  chapter: number;
}

const speedOptions: { value: AudioSpeed; label: string }[] = [
  { value: 0.75, label: "0.75x" },
  { value: 1, label: "1x" },
  { value: 1.25, label: "1.25x" },
  { value: 1.5, label: "1.5x" },
];

export default function AudioPlayer({ audio, verses, bookId, chapter }: AudioPlayerProps) {
  const [speedOpen, setSpeedOpen] = useState(false);

  if (!audio.isSupported) return null;

  const verseRefs = verses.map((v) => ({
    book: bookId,
    chapter,
    verse: v.verse,
    text: v.text,
  }));

  const handlePlay = () => {
    if (audio.isSpeaking && !audio.isPaused) {
      audio.pause();
    } else if (audio.isPaused) {
      audio.play(verseRefs);
    } else {
      audio.play(verseRefs);
    }
  };

  const currentSpeed = speedOptions.find((s) => s.value === audio.speed) || speedOptions[1];

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-border bg-card/70 backdrop-blur-sm p-1"
      role="group"
      aria-label="Leitura em áudio"
    >
      {/* Anterior */}
      <button
        onClick={audio.prev}
        disabled={!audio.isSpeaking || audio.currentIndex <= 0}
        className="w-7 h-7 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Versículo anterior"
        title="Anterior"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 19l-7-7 7-7M5 19V5" />
        </svg>
      </button>

      {/* Play/Pause */}
      <button
        onClick={handlePlay}
        className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={audio.isSpeaking && !audio.isPaused ? "Pausar leitura" : "Iniciar leitura"}
        title={audio.isSpeaking && !audio.isPaused ? "Pausar" : "Ouvir"}
      >
        {audio.isSpeaking && !audio.isPaused ? (
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Próximo */}
      <button
        onClick={audio.next}
        disabled={
          !audio.isSpeaking || audio.currentIndex >= verses.length - 1
        }
        className="w-7 h-7 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Próximo versículo"
        title="Próximo"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 5l7 7-7 7M19 5v14" />
        </svg>
      </button>

      {/* Stop */}
      <button
        onClick={audio.stop}
        disabled={!audio.isSpeaking}
        className="w-7 h-7 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="Parar leitura"
        title="Parar"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="6" y="6" width="12" height="12" rx="1" />
        </svg>
      </button>

      <div className="w-px h-4 bg-border mx-0.5" aria-hidden="true" />

      {/* Velocidade */}
      <div className="relative">
        <button
          onClick={() => setSpeedOpen((v) => !v)}
          className="h-7 px-2 inline-flex items-center gap-1 rounded-full text-[10.5px] font-bold uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-haspopup="listbox"
          aria-expanded={speedOpen}
          aria-label={`Velocidade atual: ${currentSpeed.label}`}
          title="Velocidade da leitura"
        >
          {currentSpeed.label}
          <svg className={`w-3 h-3 transition-transform ${speedOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {speedOpen && (
          <ul
            role="listbox"
            aria-label="Velocidade"
            className="absolute right-0 top-full mt-1 z-20 min-w-[5rem] rounded-md border border-border bg-card shadow-lg py-1"
          >
            {speedOptions.map((s) => (
              <li key={s.value}>
                <button
                  onClick={() => {
                    audio.setSpeed(s.value);
                    setSpeedOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium transition-colors ${
                    audio.speed === s.value
                      ? "bg-accent/15 text-accent"
                      : "text-foreground hover:bg-muted"
                  }`}
                  role="option"
                  aria-selected={audio.speed === s.value}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

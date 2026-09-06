/**
 * Barra de ações por versículo (copiar, link, favoritar, nota, compartilhar).
 * Aparece em hover (desktop) ou sempre visível no estado ativo (mobile/teclado).
 */

import { useEffect, useState } from "react";

interface VerseActionsProps {
  verseKey: string; // ex: "19-23-1" (bookId-chapter-verse)
  verseRef: string; // ex: "Salmos 23:1" — referência formatada
  verseText: string;
  bookId: number;
  chapter: number;
  verse: number;
  isFavorited: boolean;
  onToggleFavorite: (key: string) => void;
  onCopy: (text: string) => Promise<void> | void;
  onShowNote: (key: string) => void;
  hasNote: boolean;
  onShare: () => void;
  isHighlighted?: boolean; // destaque do modo áudio
}

export default function VerseActions({
  verseKey,
  verseRef,
  verseText,
  isFavorited,
  onToggleFavorite,
  onCopy,
  onShowNote,
  hasNote,
  onShare,
  isHighlighted,
}: VerseActionsProps) {
  const [copyState, setCopyState] = useState<"idle" | "ok" | "link">("idle");
  const [linkState, setLinkState] = useState<"idle" | "ok">("idle");

  useEffect(() => {
    if (copyState === "idle") return;
    const t = setTimeout(() => setCopyState("idle"), 2000);
    return () => clearTimeout(t);
  }, [copyState]);

  useEffect(() => {
    if (linkState === "idle") return;
    const t = setTimeout(() => setLinkState("idle"), 2000);
    return () => clearTimeout(t);
  }, [linkState]);

  const handleCopy = async () => {
    const text = `"${verseText.trim()}" — ${verseRef}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopyState("ok");
      onCopy(text);
    } catch {
      /* ignore */
    }
  };

  const handleLink = async () => {
    // Deep-link para a Bíblia no formato do roteador: #/testament:AT/book:N/chapter:N/verse:N
    const [bookId, chapter, verse] = verseKey.split("-").map(Number);
    const testament = bookId <= 39 ? "AT" : "NT";
    const url = `${window.location.origin}/#/testament:${testament}/book:${bookId}/chapter:${chapter}/verse:${verse}`;
    try {
      await navigator.clipboard.writeText(url);
      setLinkState("ok");
    } catch {
      /* ignore */
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-0.5 ml-2 align-middle transition-opacity ${
        isHighlighted ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus-within:opacity-100"
      }`}
      role="group"
      aria-label={`Ações para ${verseRef}`}
    >
      <button
        onClick={handleCopy}
        className="w-7 h-7 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={`Copiar ${verseRef}`}
        title={`Copiar ${verseRef}`}
      >
        {copyState === "ok" ? (
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
      <button
        onClick={handleLink}
        className="w-7 h-7 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={`Copiar link de ${verseRef}`}
        title="Copiar link do versículo"
      >
        {linkState === "ok" ? (
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )}
      </button>
      <button
        onClick={() => onToggleFavorite(verseKey)}
        className={`w-7 h-7 flex items-center justify-center rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
          isFavorited
            ? "text-accent hover:text-accent/70"
            : "text-muted-foreground hover:text-accent hover:bg-muted"
        }`}
        aria-label={isFavorited ? `Remover ${verseRef} dos favoritos` : `Adicionar ${verseRef} aos favoritos`}
        aria-pressed={isFavorited}
        title={isFavorited ? "Remover dos favoritos" : "Favoritar"}
      >
        <svg
          className="w-3.5 h-3.5"
          fill={isFavorited ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      <button
        onClick={() => onShowNote(verseKey)}
        className={`w-7 h-7 flex items-center justify-center rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
          hasNote
            ? "text-accent hover:text-accent/70"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
        aria-label={hasNote ? `Editar nota de ${verseRef}` : `Adicionar nota em ${verseRef}`}
        aria-pressed={hasNote}
        title={hasNote ? "Editar nota" : "Adicionar nota"}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button
        onClick={onShare}
        className="w-7 h-7 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={`Compartilhar ${verseRef}`}
        title="Compartilhar"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      </button>
    </span>
  );
}

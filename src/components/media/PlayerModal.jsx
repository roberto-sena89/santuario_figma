import { useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { formatDescricao } from '../../utils/format';

/**
 * Lightbox player: abre o vídeo oficial do YouTube em um modal
 * com iframe embutido (a letra já está no próprio vídeo).
 */
export default function PlayerModal({ video, onClose }) {
  const containerRef = useFocusTrap(true);

  useEffect(() => {
    if (!video) return;
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Player: ${formatDescricao(video)}`}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-bg/80 p-0 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-none bg-surface shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border bg-surface2/80 px-4 py-3 sm:px-5">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-text sm:text-base">
              {formatDescricao(video)}
            </p>
            <p className="truncate text-xs text-muted">
              Player oficial do YouTube — a letra está no vídeo
            </p>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir no YouTube"
            aria-label="Abrir no YouTube"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            onClick={onClose}
            aria-label="Fechar player"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-muted transition-colors hover:border-border hover:text-text"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1`}
            title={formatDescricao(video)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}

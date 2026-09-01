import { useCallback, useEffect, useRef, useState } from 'react';
import { ExternalLink, Music, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { formatDescricao } from '../../utils/format';

// Carrega a YouTube IFrame API uma única vez
let ytApiPromise = null;
function loadYoutubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev && prev();
      resolve(window.YT);
    };
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  });
  return ytApiPromise;
}

/**
 * Lightbox player: abre o vídeo oficial do YouTube em um modal
 * com controles próprios na parte inferior (volume, mudo, play/pause)
 * via YouTube IFrame API — os botões nativos do YouTube ficam no iframe
 * e não podem ser reposicionados (cross-origin).
 */
export default function PlayerModal({ video, onClose }) {
  const containerRef = useFocusTrap(true);
  const playerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [tocando, setTocando] = useState(true);
  const [mudo, setMudo] = useState(false);
  const [volume, setVolume] = useState(100);
  const [pronto, setPronto] = useState(false);

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

  // Cria o player via IFrame API (permite controlar volume/play do nosso lado)
  useEffect(() => {
    if (!video) return;
    let cancelado = false;
    loadYoutubeApi().then((YT) => {
      if (cancelado || !wrapperRef.current) return;
      playerRef.current = new YT.Player(wrapperRef.current, {
        videoId: video.id,
        playerVars: {
          autoplay: 1,
          rel: 0,
          playsinline: 1,
          controls: 1,
        },
        events: {
          onReady: (e) => {
            setPronto(true);
            e.target.setVolume(100);
          },
          onStateChange: (e) => setTocando(e.data === YT.PlayerState.PLAYING),
        },
      });
    });
    return () => {
      cancelado = true;
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [video]);

  const alternarPlay = useCallback(() => {
    if (!playerRef.current || !pronto) return;
    const p = playerRef.current;
    if (p.getPlayerState() === 1) {
      p.pauseVideo();
      setTocando(false);
    } else {
      p.playVideo();
      setTocando(true);
    }
  }, [pronto]);

  const alternarMudo = useCallback(() => {
    if (!playerRef.current || !pronto) return;
    const p = playerRef.current;
    if (mudo) {
      p.unMute();
      setMudo(false);
    } else {
      p.mute();
      setMudo(true);
    }
  }, [mudo, pronto]);

  const mudarVolume = useCallback(
    (v) => {
      if (!playerRef.current || !pronto) return;
      const val = Math.max(0, Math.min(100, v));
      setVolume(val);
      const p = playerRef.current;
      if (val === 0) {
        p.mute();
        setMudo(true);
      } else {
        if (mudo) {
          p.unMute();
          setMudo(false);
        }
        p.setVolume(val);
      }
    },
    [mudo, pronto]
  );

  if (!video) return null;

  const volumeMostrado = mudo ? 0 : volume;

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
        className="relative flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-none bg-surface shadow-2xl ring-1 ring-[#D4A24C]/15 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[#D4A24C]/20 bg-gradient-to-r from-[#D4A24C]/10 via-surface2/60 to-surface2/80 px-4 py-3 sm:px-5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#D4A24C]/15 ring-1 ring-[#D4A24C]/25 text-[#B8860B] dark:text-[#E8B35E]">
            <Music className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-text sm:text-base">
              {formatDescricao(video)}
            </p>
            <p className="truncate text-xs text-[#B8860B]/70 dark:text-[#E8B35E]/70">
              Player oficial do YouTube — a letra está no vídeo
            </p>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir no YouTube"
            aria-label="Abrir no YouTube"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#D4A24C]/30 bg-[#D4A24C]/10 text-[#B8860B] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4A24C]/60 hover:bg-[#D4A24C]/20 hover:shadow-lg hover:shadow-[#D4A24C]/20 dark:text-[#E8B35E]"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="relative aspect-video w-full bg-black">
          <div ref={wrapperRef} className="h-full w-full" />

          {/* Controles próprios — parte inferior do player */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-3 pb-2.5 pt-8 opacity-100">
            <button
              onClick={alternarPlay}
              disabled={!pronto}
              aria-label={tocando ? 'Pausar' : 'Reproduzir'}
              className="pointer-events-auto grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#D4A24C] text-gray-900 shadow-lg shadow-[#D4A24C]/30 transition-all duration-200 hover:scale-105 hover:bg-[#E8B35E] disabled:opacity-50"
            >
              {tocando ? (
                <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
              ) : (
                <Play className="h-4 w-4 fill-current pl-0.5" aria-hidden="true" />
              )}
            </button>

            <button
              onClick={alternarMudo}
              disabled={!pronto}
              aria-label={mudo ? 'Ativar som' : 'Desativar som'}
              title={mudo ? 'Ativar som' : 'Desativar som'}
              className="pointer-events-auto grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/90 transition-all duration-200 hover:scale-105 hover:text-[#E8B35E] disabled:opacity-50"
            >
              {mudo || volumeMostrado === 0 ? (
                <VolumeX className="h-4.5 w-4.5" aria-hidden="true" />
              ) : (
                <Volume2 className="h-4.5 w-4.5" aria-hidden="true" />
              )}
            </button>

            <input
              type="range"
              min={0}
              max={100}
              value={volumeMostrado}
              disabled={!pronto}
              onChange={(e) => mudarVolume(Number(e.target.value))}
              aria-label="Volume"
              className="pointer-events-auto h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-white/25 accent-[#D4A24C] sm:w-32"
            />

            <button
              onClick={onClose}
              aria-label="Fechar player"
              title="Fechar player"
              className="pointer-events-auto grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-error/50 hover:text-error hover:bg-error/10 hover:shadow-lg hover:shadow-error/20"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef } from 'react';

/**
 * Trava o foco dentro do contêiner enquanto `ativo` for true
 * e devolve o foco ao elemento anterior ao desmontar.
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(ativo = true) {
  const containerRef = useRef<T | null>(null);
  const anteriorRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ativo) return undefined;
    const container = containerRef.current;
    anteriorRef.current = document.activeElement as HTMLElement | null;

    const focaveis = () =>
      container
        ? [
            ...container.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            ),
          ].filter((el) => !(el as HTMLInputElement).disabled && el.offsetParent !== null)
        : [];

    const primeiros = focaveis();
    primeiros[0]?.focus();

    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const els = focaveis();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
      anteriorRef.current?.focus?.();
    };
  }, [ativo]);

  return containerRef;
}

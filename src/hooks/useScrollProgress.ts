/**
 * Hook de progresso de scroll vertical de um elemento.
 * Retorna 0..1 representando a posição do scroll dentro do contêiner.
 */

import { useEffect, useState } from "react";

export function useScrollProgress(target: HTMLElement | null) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!target) return;

    const update = () => {
      const rect = target.getBoundingClientRect();
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      // Início = quando o topo do elemento entra no viewport
      // Fim = quando o fundo do elemento sai do viewport
      const total = rect.height - viewportH;
      if (total <= 0) {
        setProgress(rect.bottom < viewportH ? 1 : 0);
        return;
      }
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [target]);

  return progress;
}

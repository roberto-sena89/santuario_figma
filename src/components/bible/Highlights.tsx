/**
 * Destaca ocorrências de uma query dentro de um texto.
 * Usado na busca em tempo real dentro do capítulo.
 */

import { useMemo } from "react";
import { normalizeSearchText } from "../../data/bibleUtils";

interface HighlightsProps {
  text: string;
  query: string;
}

export default function Highlights({ text, query }: HighlightsProps) {
  const segments = useMemo(() => {
    const nq = normalizeSearchText(query);
    if (!nq) return [{ text, match: false }];
    // Encontra todas as posições da query no texto (case + accent insensitive)
    const normText = normalizeSearchText(text);
    const result: { text: string; match: boolean }[] = [];
    let cursor = 0;
    while (cursor < text.length) {
      const idx = normText.indexOf(nq, cursor);
      if (idx === -1) {
        result.push({ text: text.slice(cursor), match: false });
        break;
      }
      if (idx > cursor) {
        result.push({ text: text.slice(cursor, idx), match: false });
      }
      result.push({ text: text.slice(idx, idx + nq.length), match: true });
      cursor = idx + nq.length;
    }
    return result;
  }, [text, query]);

  return (
    <>
      {segments.map((seg, i) =>
        seg.match ? (
          <mark
            key={i}
            className="bg-accent/40 text-foreground rounded px-0.5"
            style={{ boxShadow: "inset 0 -2px 0 #C8B888" }}
          >
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </>
  );
}

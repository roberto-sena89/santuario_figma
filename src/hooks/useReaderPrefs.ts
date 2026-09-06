/**
 * Preferências do Reader (tema, fonte, entrelinha, largura de coluna).
 * Persiste em localStorage e respeita prefers-color-scheme na primeira visita.
 */

import { useEffect, useState } from "react";

export type ReaderTheme = "claro" | "sepia" | "escuro";
export type ReaderLineHeight = "compacta" | "confortavel" | "generosa";
export type ReaderColumnWidth = "estreita" | "padrao" | "larga";
export type ReaderVerseNumber = "sobrescrito" | "margem" | "oculto";

export interface ReaderPrefs {
  theme: ReaderTheme;
  fontScale: number; // 0.875..1.4 (multiplicador)
  lineHeight: ReaderLineHeight;
  columnWidth: ReaderColumnWidth;
  verseNumber: ReaderVerseNumber;
  /** Modo zen (tela cheia) */
  zenMode: boolean;
}

const STORAGE_KEY = "iegv_bible_reader_prefs";

const defaults: ReaderPrefs = {
  theme: "claro",
  fontScale: 1,
  lineHeight: "confortavel",
  columnWidth: "padrao",
  verseNumber: "margem",
  zenMode: false,
};

function readPrefs(): ReaderPrefs {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Sugestão inicial baseada em prefers-color-scheme
      if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
        return { ...defaults, theme: "escuro" };
      }
      return defaults;
    }
    const parsed = JSON.parse(raw) as Partial<ReaderPrefs>;
    return { ...defaults, ...parsed };
  } catch {
    return defaults;
  }
}

function writePrefs(prefs: ReaderPrefs) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* ignore */
  }
}

export function useReaderPrefs() {
  const [prefs, setPrefs] = useState<ReaderPrefs>(readPrefs);

  // Persiste sempre que muda
  useEffect(() => {
    writePrefs(prefs);
  }, [prefs]);

  const update = <K extends keyof ReaderPrefs>(key: K, value: ReaderPrefs[K]) => {
    setPrefs((p) => ({ ...p, [key]: value }));
  };

  const reset = () => setPrefs(defaults);

  return { prefs, update, reset };
}

/** Aplica o tema ao <html> via atributo data-reader-theme. */
export function applyReaderTheme(theme: ReaderTheme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-reader-theme", theme);
}

/** Converte as prefs em classes Tailwind pro contêiner do texto. */
export function readerTextClasses(p: ReaderPrefs): string {
  const fontSize = `text-[${Math.round(18 * p.fontScale)}px]`;
  const lh =
    p.lineHeight === "compacta"
      ? "leading-[1.65]"
      : p.lineHeight === "generosa"
      ? "leading-[2]"
      : "leading-[1.85]";
  const w =
    p.columnWidth === "estreita"
      ? "max-w-[58ch]"
      : p.columnWidth === "larga"
      ? "max-w-[88ch]"
      : "max-w-[72ch]";
  return `${fontSize} ${lh} ${w}`;
}

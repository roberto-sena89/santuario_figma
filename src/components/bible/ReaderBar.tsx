/**
 * Barra flutuante do Reader (tema, fonte, entrelinha, largura, modo zen).
 * Fixa no topo, translúcida, colapsável em mobile.
 */

import { useEffect, useState } from "react";
import {
  applyReaderTheme,
  readerTextClasses,
  type ReaderPrefs,
  type ReaderTheme,
  type ReaderLineHeight,
  type ReaderColumnWidth,
} from "../../hooks/useReaderPrefs";

interface ReaderBarProps {
  prefs: ReaderPrefs;
  update: <K extends keyof ReaderPrefs>(key: K, value: ReaderPrefs[K]) => void;
  onReset: () => void;
  /** Quantos versículos o usuário tem (exibido quando zenMode). */
  verseCount?: number;
  /** Callback para colapsar/expandir (mobile). */
  onCollapse?: (collapsed: boolean) => void;
}

const themes: { id: ReaderTheme; label: string; bg: string }[] = [
  { id: "claro", label: "Claro", bg: "bg-reader-paper" },
  { id: "sepia", label: "Sépia", bg: "bg-reader-sepia" },
  { id: "escuro", label: "Escuro", bg: "bg-reader-dark" },
];

export default function ReaderBar({ prefs, update, onReset, onCollapse }: ReaderBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Aplica o tema no <html> sempre que muda
  useEffect(() => {
    applyReaderTheme(prefs.theme);
  }, [prefs.theme]);

  useEffect(() => {
    onCollapse?.(!mobileOpen);
  }, [mobileOpen, onCollapse]);

  // Atalhos de teclado: Cmd/Ctrl + "+" / "-" para fonte, "0" para reset
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.key === "=" || e.key === "+") {
        e.preventDefault();
        update("fontScale", Math.min(1.4, +(prefs.fontScale + 0.1).toFixed(2)));
      } else if (e.key === "-") {
        e.preventDefault();
        update("fontScale", Math.max(0.875, +(prefs.fontScale - 0.1).toFixed(2)));
      } else if (e.key === "0") {
        e.preventDefault();
        onReset();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prefs.fontScale, update, onReset]);

  const fontPercent = Math.round(prefs.fontScale * 100);

  return (
    <div
      className="sticky top-16 z-30 mb-4 -mx-4 sm:mx-0"
      role="toolbar"
      aria-label="Controles de leitura"
    >
      <div
        className="px-3 sm:px-4 py-2 sm:py-2.5 backdrop-blur-md bg-card/80 border-y border-border shadow-sm"
        data-reader-theme={prefs.theme}
      >
        {/* Mobile: botão colapsar + indicador */}
        <div className="flex items-center justify-between gap-2 sm:hidden">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Fechar controles de leitura" : "Abrir controles de leitura"}
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform ${mobileOpen ? "rotate-90" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>Leitura</span>
          </button>
          <div className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span>{fontPercent}%</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{prefs.theme === "sepia" ? "sépia" : prefs.theme}</span>
          </div>
        </div>

        {/* Controles (sempre visíveis no desktop, condicionais no mobile) */}
        <div
          className={`${
            mobileOpen ? "flex flex-col gap-2 mt-2" : "hidden"
          } sm:!flex sm:flex-row sm:items-center sm:gap-1 sm:mt-0`}
        >
          {/* Tamanho da fonte */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => update("fontScale", Math.max(0.875, +(prefs.fontScale - 0.1).toFixed(2)))}
              className="w-8 h-8 inline-flex items-center justify-center rounded-md text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              aria-label="Diminuir fonte"
            >
              A−
            </button>
            <div
              className="px-2 h-8 inline-flex items-center justify-center text-xs font-semibold tabular-nums text-foreground/80 min-w-[3.5rem]"
              aria-label={`Tamanho da fonte: ${fontPercent}%`}
            >
              {fontPercent}%
            </div>
            <button
              onClick={() => update("fontScale", Math.min(1.4, +(prefs.fontScale + 0.1).toFixed(2)))}
              className="w-8 h-8 inline-flex items-center justify-center rounded-md text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              aria-label="Aumentar fonte"
            >
              A+
            </button>
          </div>

          <div className="hidden sm:block h-5 w-px bg-border" aria-hidden="true" />

          {/* Entrelinha */}
          <LineHeightPicker value={prefs.lineHeight} onChange={(v) => update("lineHeight", v)} />

          <div className="hidden sm:block h-5 w-px bg-border" aria-hidden="true" />

          {/* Largura */}
          <ColumnWidthPicker value={prefs.columnWidth} onChange={(v) => update("columnWidth", v)} />

          <div className="hidden sm:block h-5 w-px bg-border" aria-hidden="true" />

          {/* Tema */}
          <div
            className="inline-flex items-center rounded-md border border-border bg-muted/40 p-0.5"
            role="radiogroup"
            aria-label="Tema de leitura"
          >
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => update("theme", t.id)}
                className={`relative w-7 h-7 rounded transition-all ${
                  prefs.theme === t.id ? "ring-1 ring-accent" : "hover:ring-1 hover:ring-border"
                }`}
                role="radio"
                aria-checked={prefs.theme === t.id}
                aria-label={`Tema ${t.label}`}
                title={t.label}
              >
                <span
                  className={`absolute inset-1 rounded ${t.bg} border border-black/10`}
                  aria-hidden="true"
                />
                {prefs.theme === t.id && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden sm:block h-5 w-px bg-border" aria-hidden="true" />

          {/* Versículos */}
          <VerseNumberPicker value={prefs.verseNumber} onChange={(v) => update("verseNumber", v)} />

          <div className="hidden sm:block h-5 w-px bg-border" aria-hidden="true" />

          {/* Modo zen */}
          <button
            onClick={() => update("zenMode", !prefs.zenMode)}
            className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-xs font-semibold transition-colors ${
              prefs.zenMode ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
            aria-label={prefs.zenMode ? "Sair do modo zen" : "Entrar no modo zen"}
            aria-pressed={prefs.zenMode}
            title="Modo zen (Ctrl+Z)"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4M4 16v4h4M20 8V4h-4M20 16v4h-4" />
            </svg>
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Restaurar preferências de leitura"
            title="Restaurar padrões (Ctrl+0)"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function LineHeightPicker({
  value,
  onChange,
}: {
  value: ReaderLineHeight;
  onChange: (v: ReaderLineHeight) => void;
}) {
  const opts: { id: ReaderLineHeight; label: string; icon: string }[] = [
    { id: "compacta", label: "Entrelinha compacta", icon: "≡" },
    { id: "confortavel", label: "Entrelinha confortável", icon: "≣" },
    { id: "generosa", label: "Entrelinha generosa", icon: "☰" },
  ];
  return (
    <div
      className="inline-flex items-center rounded-md border border-border bg-muted/40 p-0.5"
      role="radiogroup"
      aria-label="Entrelinha"
    >
      {opts.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`w-7 h-7 rounded text-sm font-semibold transition-colors ${
            value === o.id ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
          role="radio"
          aria-checked={value === o.id}
          aria-label={o.label}
          title={o.label}
        >
          {o.icon}
        </button>
      ))}
    </div>
  );
}

function ColumnWidthPicker({
  value,
  onChange,
}: {
  value: ReaderColumnWidth;
  onChange: (v: ReaderColumnWidth) => void;
}) {
  const opts: { id: ReaderColumnWidth; label: string; width: string }[] = [
    { id: "estreita", label: "Coluna estreita", width: "w-3" },
    { id: "padrao", label: "Coluna padrão", width: "w-5" },
    { id: "larga", label: "Coluna larga", width: "w-7" },
  ];
  return (
    <div
      className="inline-flex items-center rounded-md border border-border bg-muted/40 p-0.5"
      role="radiogroup"
      aria-label="Largura da coluna"
    >
      {opts.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`h-7 px-2 rounded transition-colors flex items-center gap-1.5 ${
            value === o.id ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
          role="radio"
          aria-checked={value === o.id}
          aria-label={o.label}
          title={o.label}
        >
          <span
            className={`h-3 ${o.width} rounded-sm ${value === o.id ? "bg-accent-foreground/80" : "bg-current opacity-50"}`}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}

function VerseNumberPicker({
  value,
  onChange,
}: {
  value: "sobrescrito" | "margem" | "oculto";
  onChange: (v: "sobrescrito" | "margem" | "oculto") => void;
}) {
  const opts: { id: "sobrescrito" | "margem" | "oculto"; label: string; sym: string }[] = [
    { id: "sobrescrito", label: "Versículos sobrescritos", sym: "¹" },
    { id: "margem", label: "Versículos na margem", sym: "1" },
    { id: "oculto", label: "Ocultar versículos", sym: "—" },
  ];
  return (
    <div
      className="inline-flex items-center rounded-md border border-border bg-muted/40 p-0.5"
      role="radiogroup"
      aria-label="Estilo de numeração"
    >
      {opts.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`h-7 px-2 rounded text-sm font-semibold transition-colors ${
            value === o.id ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
          role="radio"
          aria-checked={value === o.id}
          aria-label={o.label}
          title={o.label}
        >
          {o.sym}
        </button>
      ))}
    </div>
  );
}


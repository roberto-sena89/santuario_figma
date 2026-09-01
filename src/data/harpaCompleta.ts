/**
 * Harpa Cristã completa — 640 hinos.
 * Fonte: github.com/DanielLiberato/Harpa-Crista-JSON-640-Hinos-Completa
 * (JSON com 640 hinos da Harpa Cristã, igrejas Assembleia de Deus).
 *
 * Formato bruto (por número):
 *   { "1": { "hino": "1 - Título", "coro": "...", "verses": { "1": "...", "2": "..." } } }
 * A chave "-1" guarda metadados do autor e é ignorada.
 *
 * Este módulo normaliza para HarpaHino (número + título + estrofes em ordem)
 * e expõe busca por número ou título.
 */
import raw from "./harpa_crista_640_hinos.json";

export type HarpaHino = {
  number: number;
  title: string;
  chorus: string; // vazio "" quando não tem refrão
  verses: string[]; // estrofes em ordem
};

type RawHino = {
  hino: string; // "1 - Chuvas de Graça"
  coro?: string; // pode conter <br>
  verses?: Record<string, string>; // {"1": "...", "2": "..."}
};

const RAW = raw as unknown as Record<string, RawHino>;

/** Converte <br> em quebra de linha e remove demais tags HTML. */
function cleanLines(s: string): string {
  return s
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .trim();
}

export const HARPA_HINOS: HarpaHino[] = Object.entries(RAW)
  .filter(([num]) => num !== "-1")
  .map(([num, h]) => {
    const title = h.hino.includes(" - ")
      ? h.hino.split(" - ").slice(1).join(" - ")
      : h.hino;
    const verses = Object.entries(h.verses ?? {})
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([, v]) => cleanLines(v));
    return {
      number: Number(num),
      title: title.trim(),
      chorus: cleanLines(h.coro ?? ""),
      verses,
    };
  })
  .sort((a, b) => a.number - b.number);

/** Busca por número (parcial) ou título (case-insensitive). */
export function searchHinos(query: string): HarpaHino[] {
  const q = query.trim().toLowerCase();
  if (!q) return HARPA_HINOS;
  return HARPA_HINOS.filter(
    (h) =>
      h.number.toString() === q ||
      h.number.toString().includes(q) ||
      h.title.toLowerCase().includes(q)
  );
}

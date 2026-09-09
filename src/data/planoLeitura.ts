/**
 * PLANO DE LEITURA ANUAL — a Bíblia inteira em 365 dias.
 * Gera as porções a partir de BIBLE_BOOKS (1189 capítulos no total):
 * os primeiros 94 dias têm 4 capítulos, os demais têm 3.
 * Progresso e sequência (streak) ficam em localStorage, por ano.
 */

import { BIBLE_BOOKS } from "./bibleBooks";

export interface LeituraCap {
  bookId: number;
  livro: string;
  abbr: string;
  testament: "AT" | "NT";
  chapter: number;
}

export interface DiaLeitura {
  dia: number; // 1..365
  caps: LeituraCap[];
  resumo: string; // ex: "Gn 1-3"
}

/** Todos os capítulos da Bíblia em ordem, achatados. */
function todosOsCapitulos(): LeituraCap[] {
  const lista: LeituraCap[] = [];
  for (const b of BIBLE_BOOKS) {
    for (let c = 1; c <= b.chapters; c++) {
      lista.push({
        bookId: b.id,
        livro: b.pt,
        abbr: b.abbr,
        testament: b.testament,
        chapter: c,
      });
    }
  }
  return lista;
}

function resumir(caps: LeituraCap[]): string {
  // Agrupa capítulos consecutivos do mesmo livro: "Gn 1-3; Êx 1"
  const partes: string[] = [];
  let i = 0;
  while (i < caps.length) {
    const base = caps[i];
    let fim = base.chapter;
    let j = i + 1;
    while (
      j < caps.length &&
      caps[j].bookId === base.bookId &&
      caps[j].chapter === fim + 1
    ) {
      fim = caps[j].chapter;
      j++;
    }
    partes.push(
      fim === base.chapter
        ? `${base.abbr} ${base.chapter}`
        : `${base.abbr} ${base.chapter}-${fim}`
    );
    i = j;
  }
  return partes.join("; ");
}

/** As 365 porções do plano (calculado uma vez). */
export const PLANO_365: DiaLeitura[] = (() => {
  const caps = todosOsCapitulos();
  const dias: DiaLeitura[] = [];
  const POR_DIA_BASE = 3;
  const extras = caps.length - POR_DIA_BASE * 365; // 94 dias com 4 capítulos
  let pos = 0;
  for (let d = 1; d <= 365; d++) {
    const n = POR_DIA_BASE + (d <= extras ? 1 : 0);
    const porcao = caps.slice(pos, pos + n);
    pos += n;
    dias.push({ dia: d, caps: porcao, resumo: resumir(porcao) });
  }
  return dias;
})();

/** Dia do ano (1..365/366) para uma data. Ano bissexto: 29/fev repete o dia 60. */
export function diaDoAno(date: Date): number {
  const inicio = new Date(date.getFullYear(), 0, 1);
  const diff = Math.floor((date.getTime() - inicio.getTime()) / 86400000) + 1;
  return Math.min(diff, 365);
}

/** Porção de leitura de uma data. */
export function getLeituraDoDia(date: Date): DiaLeitura {
  return PLANO_365[diaDoAno(date) - 1];
}

// ---------- Progresso (localStorage) ----------

const chaveAno = (ano: number) => `santuario:plano:${ano}`;

export function carregarDiasLidos(ano: number): Set<number> {
  try {
    const raw = localStorage.getItem(chaveAno(ano));
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return new Set(arr.filter((n) => n >= 1 && n <= 365));
  } catch {}
  return new Set();
}

function salvarDiasLidos(ano: number, dias: Set<number>) {
  try {
    localStorage.setItem(chaveAno(ano), JSON.stringify([...dias].sort((a, b) => a - b)));
  } catch {}
}

export function marcarDiaLido(ano: number, dia: number): Set<number> {
  const dias = carregarDiasLidos(ano);
  dias.add(dia);
  salvarDiasLidos(ano, dias);
  return dias;
}

export function desmarcarDia(ano: number, dia: number): Set<number> {
  const dias = carregarDiasLidos(ano);
  dias.delete(dia);
  salvarDiasLidos(ano, dias);
  return dias;
}

/** Sequência atual: dias consecutivos lidos até hoje (tolera hoje ainda não lido). */
export function calcularStreak(dias: Set<number>, hojeDia: number): number {
  let s = 0;
  let d = dias.has(hojeDia) ? hojeDia : hojeDia - 1;
  while (d >= 1 && dias.has(d)) {
    s++;
    d--;
  }
  return s;
}

/** Selos por marco de dias lidos. */
export const SELOS = [
  { dias: 7, emoji: "🌱", nome: "Primeira semana" },
  { dias: 30, emoji: "🔥", nome: "Mês de fogo" },
  { dias: 100, emoji: "⛰️", nome: "100 dias" },
  { dias: 200, emoji: "🦅", nome: "200 dias" },
  { dias: 365, emoji: "👑", nome: "Bíblia completa" },
];

export function selosConquistados(totalLidos: number) {
  return SELOS.map((s) => ({ ...s, ok: totalLidos >= s.dias }));
}

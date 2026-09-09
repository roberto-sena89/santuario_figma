/**
 * MOMENTO COM DEUS — ritual diário que une Palavra do Dia + Devocional.
 * Cada dia: 1 versículo, 1 reflexão, 1 pergunta de aplicação,
 * botão "Amém" (com sequência) e imagem para compartilhar.
 */

import { getPalavraDoDia, type PalavraDoDia } from "./palavraDoDia";
import { getDevotionalByDate, type Devotional } from "./devotionals";

/** Pergunta de aplicação por tema (versículo ou devocional). */
const PERGUNTA_POR_TEMA: Record<string, string> = {
  "Amor": "A quem Deus está te chamando a amar hoje — em palavra ou atitude?",
  "Fé": "Onde tua fé está sendo provada esta semana, e qual passo ela pede?",
  "Esperança": "Que situação parecia sem saída e precisa da tua esperança hoje?",
  "Paz": "O que tem roubado tua paz — e o que dá para entregar a Deus agora?",
  "Força": "Em que área estás cansado? Como a força de Deus muda teu próximo passo?",
  "Graça": "Onde ainda tentas “merecer” o que Deus já deu de graça?",
  "Misericórdia": "A quem precisas estender hoje a misericórdia que recebeste?",
  "Provisão": "Qual necessidade vais apresentar a Deus com simplicidade hoje?",
  "Gratidão": "Lista 3 coisas de hoje pelas quais agradecer — quais são?",
  "Perdão": "Há alguém para perdoar (ou pedir perdão)? O que te impede?",
  "Oração": "Pelo que vais orar hoje que ainda não oraste esta semana?",
  "Confiança": "Que decisão estás segurando nas próprias mãos em vez de entregar?",
  "Descanso": "Como vais descansar de verdade hoje — corpo, mente e alma?",
  "Alegria": "Onde Deus já te deu alegria hoje que passou despercebida?",
  "Humildade": "Em que ponto o orgulho tem falado mais alto que a voz de Deus?",
  "Santidade": "Que pequeno ajuste de hoje te aproxima de quem Deus te chamou a ser?",
  "Fidelidade": "Em que compromisso (com Deus ou pessoas) precisas ser fiel hoje?",
  "Sabedoria": "Que decisão pede sabedoria do alto antes de qualquer conselho humano?",
};

const PERGUNTA_PADRAO =
  "Que frase deste momento Deus marcou no teu coração — e como vais vivê-la hoje?";

export interface RitualDoDia {
  dataISO: string;
  palavra: PalavraDoDia;
  devocional: Devotional;
  pergunta: string;
}

export function getRitualDoDia(date: Date = new Date()): RitualDoDia {
  const palavra = getPalavraDoDia(date);
  const devocional = getDevotionalByDate(date);
  const pergunta =
    PERGUNTA_POR_TEMA[palavra.theme] ??
    PERGUNTA_POR_TEMA[devocional.theme] ??
    PERGUNTA_PADRAO;
  return {
    dataISO: date.toISOString().split("T")[0],
    palavra,
    devocional,
    pergunta,
  };
}

// ---------- "Amém" do dia (localStorage) ----------

const KEY_AMENS = "santuario:momento:amens";

function lerAmens(): string[] {
  try {
    const raw = localStorage.getItem(KEY_AMENS);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

export function jaDisseAmem(dataISO: string): boolean {
  return lerAmens().includes(dataISO);
}

export function dizerAmem(dataISO: string): string[] {
  const lista = lerAmens();
  if (!lista.includes(dataISO)) {
    lista.push(dataISO);
    lista.sort();
    try {
      localStorage.setItem(KEY_AMENS, JSON.stringify(lista.slice(-730)));
    } catch {}
  }
  return lista;
}

/** Sequência de dias consecutivos com "amém" até hoje (tolera hoje pendente). */
export function streakAmens(hojeISO: string): number {
  const set = new Set(lerAmens());
  const d = new Date(hojeISO + "T12:00:00");
  if (!set.has(hojeISO)) d.setDate(d.getDate() - 1);
  let s = 0;
  while (set.has(d.toISOString().split("T")[0])) {
    s++;
    d.setDate(d.getDate() - 1);
  }
  return s;
}

export function totalAmens(): number {
  return lerAmens().length;
}

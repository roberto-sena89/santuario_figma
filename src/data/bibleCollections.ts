/**
 * Coleções temáticas e mapa de temas/emoções para a Bíblia.
 * Cada item referencia livro (id do BIBLE_BOOKS) + capítulo + versículo.
 */

export interface CuratedVerse {
  book: number; // 1..66
  chapter: number;
  verse: number;
  /** Subtema opcional (ex: "Maternidade", "Coragem"). */
  theme?: string;
}

export interface CuratedCollection {
  id: string;
  label: string;
  emoji: string;
  description: string;
  curator: string;
  intro: string;
  verses: CuratedVerse[];
}

export const CURATED_COLLECTIONS: CuratedCollection[] = [
  {
    id: "biblia-da-mulher",
    label: "Bíblia da Mulher",
    emoji: "👩",
    curator: "Curadoria Santuário da Adoração",
    intro:
      "Uma seleção de versículos que falam ao coração da mulher — sobre virtude, fé, maternidade, relacionamentos, força e coragem. Uma palavra de Deus pra cada estação da vida.",
    description:
      "Para a mulher que busca ser edificada pela Palavra em cada papel que vive.",
    verses: [
      // Virtude e caráter
      { book: 31, chapter: 31, verse: 30, theme: "Virtude" },
      { book: 20, chapter: 31, verse: 25, theme: "Virtude" },
      { book: 19, chapter: 1, verse: 2, theme: "Virtude" },
      // Fé
      { book: 60, chapter: 1, verse: 5, theme: "Fé" },
      { book: 50, chapter: 5, verse: 7, theme: "Fé" },
      // Maternidade
      { book: 19, chapter: 127, verse: 3, theme: "Maternidade" },
      { book: 20, chapter: 22, verse: 6, theme: "Maternidade" },
      { book: 23, chapter: 66, verse: 13, theme: "Maternidade" },
      // Relacionamentos
      { book: 62, chapter: 4, verse: 7, theme: "Relacionamentos" },
      { book: 20, chapter: 17, verse: 1, theme: "Relacionamentos" },
      // Força e coragem
      { book: 23, chapter: 40, verse: 31, theme: "Força e Coragem" },
      { book: 50, chapter: 4, verse: 13, theme: "Força e Coragem" },
      { book: 9, chapter: 1, verse: 27, theme: "Força e Coragem" },
    ],
  },
  {
    id: "biblia-do-homem",
    label: "Bíblia do Homem",
    emoji: "👨",
    curator: "Curadoria Santuário da Adoração",
    intro:
      "Versículos sobre liderança espiritual, coragem, paternidade, batalha espiritual e fidelidade. Uma palavra firme pra quem foi chamado a conduzir.",
    description:
      "Para o homem que busca cumprir o propósito de Deus com integridade.",
    verses: [
      // Liderança espiritual
      { book: 50, chapter: 5, verse: 23, theme: "Liderança" },
      { book: 27, chapter: 1, verse: 8, theme: "Liderança" },
      { book: 19, chapter: 78, verse: 72, theme: "Liderança" },
      // Coragem
      { book: 6, chapter: 1, verse: 9, theme: "Coragem" },
      { book: 5, chapter: 31, verse: 6, theme: "Coragem" },
      // Paternidade
      { book: 20, chapter: 20, verse: 7, theme: "Paternidade" },
      { book: 5, chapter: 6, verse: 7, theme: "Paternidade" },
      { book: 44, chapter: 22, verse: 3, theme: "Paternidade" },
      // Batalha espiritual
      { book: 49, chapter: 6, verse: 11, theme: "Batalha Espiritual" },
      { book: 66, chapter: 12, verse: 11, theme: "Batalha Espiritual" },
      { book: 45, chapter: 8, verse: 37, theme: "Batalha Espiritual" },
      // Fidelidade
      { book: 20, chapter: 20, verse: 11, theme: "Fidelidade" },
      { book: 24, chapter: 9, verse: 23, theme: "Fidelidade" },
    ],
  },
  {
    id: "jovens",
    label: "Jovens",
    emoji: "🌱",
    curator: "Curadoria Santuário da Adoração",
    intro:
      "Para os jovens que estão firmando a fé, escolhendo caminhos e buscando direção. Versículos que inflamam coragem e propósito.",
    description: "Direção, coragem e identidade em Deus pra essa geração.",
    verses: [
      { book: 27, chapter: 1, verse: 8, theme: "Propósito" },
      { book: 50, chapter: 4, verse: 13, theme: "Força" },
      { book: 60, chapter: 1, verse: 15, theme: "Santidade" },
      { book: 19, chapter: 119, verse: 9, theme: "Pureza" },
      { book: 19, chapter: 119, verse: 11, theme: "Palavra" },
      { book: 50, chapter: 5, verse: 1, theme: "Imitação" },
      { book: 50, chapter: 5, verse: 16, theme: "Propósito" },
      { book: 45, chapter: 12, verse: 2, theme: "Transformação" },
      { book: 19, chapter: 25, verse: 4, theme: "Direção" },
      { book: 19, chapter: 25, verse: 5, theme: "Direção" },
    ],
  },
  {
    id: "familia",
    label: "Família",
    emoji: "👨‍👩‍👧",
    curator: "Curadoria Santuário da Adoração",
    intro:
      "Versículos que edificam lares — sobre o casamento, a educação dos filhos, o amor que permanece e a presença de Deus no cotidiano da casa.",
    description: "Edificação, amor e presença de Deus pra cada lar.",
    verses: [
      { book: 19, chapter: 127, verse: 1, theme: "Lar" },
      { book: 19, chapter: 128, verse: 3, theme: "Filhos" },
      { book: 20, chapter: 22, verse: 6, theme: "Filhos" },
      { book: 45, chapter: 12, verse: 5, theme: "Comunidade" },
      { book: 49, chapter: 5, verse: 21, theme: "Casamento" },
      { book: 49, chapter: 5, verse: 25, theme: "Casamento" },
      { book: 49, chapter: 5, verse: 33, theme: "Casamento" },
      { book: 45, chapter: 12, verse: 9, theme: "Amor" },
      { book: 46, chapter: 13, verse: 4, theme: "Amor" },
      { book: 46, chapter: 13, verse: 7, theme: "Amor" },
    ],
  },
  {
    id: "consolo-e-esperanca",
    label: "Consolo e Esperança",
    emoji: "🕊️",
    curator: "Curadoria Santuário da Adoração",
    intro:
      "Para momentos de dor, luto, cansaço e ansiedade. A Palavra de Deus como refúgio — onde a esperança é restaurada.",
    description: "Onde a alma encontra refúgio e a esperança é restaurada.",
    verses: [
      { book: 19, chapter: 23, verse: 4, theme: "Consolo" },
      { book: 19, chapter: 34, verse: 18, theme: "Consolo" },
      { book: 23, chapter: 41, verse: 10, theme: "Consolo" },
      { book: 24, chapter: 29, verse: 11, theme: "Esperança" },
      { book: 45, chapter: 15, verse: 13, theme: "Esperança" },
      { book: 49, chapter: 2, verse: 14, theme: "Esperança" },
      { book: 19, chapter: 46, verse: 1, theme: "Refúgio" },
      { book: 19, chapter: 46, verse: 10, theme: "Refúgio" },
      { book: 23, chapter: 43, verse: 2, theme: "Refúgio" },
      { book: 45, chapter: 8, verse: 28, theme: "Confiança" },
      { book: 19, chapter: 91, verse: 1, theme: "Proteção" },
      { book: 19, chapter: 91, verse: 11, theme: "Proteção" },
    ],
  },
];

/** Mapa de temas/emoções (busca por sentimento). */
export interface ThemeMap {
  id: string;
  label: string;
  emoji: string;
  verses: CuratedVerse[];
}

export const THEME_MAP: ThemeMap[] = [
  {
    id: "esperanca",
    label: "Esperança",
    emoji: "🌅",
    verses: [
      { book: 24, chapter: 29, verse: 11 },
      { book: 45, chapter: 15, verse: 13 },
      { book: 19, chapter: 42, verse: 5 },
      { book: 19, chapter: 130, verse: 5 },
    ],
  },
  {
    id: "ansiedade",
    label: "Ansiedade",
    emoji: "💭",
    verses: [
      { book: 50, chapter: 4, verse: 6 },
      { book: 19, chapter: 94, verse: 19 },
      { book: 40, chapter: 6, verse: 34 },
      { book: 23, chapter: 41, verse: 10 },
    ],
  },
  {
    id: "gratidao",
    label: "Gratidão",
    emoji: "🙏",
    verses: [
      { book: 46, chapter: 10, verse: 31 },
      { book: 19, chapter: 107, verse: 1 },
      { book: 19, chapter: 118, verse: 24 },
      { book: 50, chapter: 5, verse: 18 },
    ],
  },
  {
    id: "forca",
    label: "Força",
    emoji: "💪",
    verses: [
      { book: 50, chapter: 4, verse: 13 },
      { book: 23, chapter: 40, verse: 31 },
      { book: 19, chapter: 18, verse: 32 },
      { book: 49, chapter: 6, verse: 10 },
    ],
  },
  {
    id: "perdao",
    label: "Perdão",
    emoji: "🕊️",
    verses: [
      { book: 19, chapter: 103, verse: 12 },
      { book: 49, chapter: 4, verse: 32 },
      { book: 42, chapter: 6, verse: 37 },
      { book: 23, chapter: 1, verse: 18 },
    ],
  },
  {
    id: "consolo",
    label: "Consolo",
    emoji: "🤍",
    verses: [
      { book: 24, chapter: 31, verse: 13 },
      { book: 19, chapter: 23, verse: 4 },
      { book: 45, chapter: 8, verse: 28 },
      { book: 66, chapter: 21, verse: 4 },
    ],
  },
  {
    id: "coragem",
    label: "Coragem",
    emoji: "🦁",
    verses: [
      { book: 6, chapter: 1, verse: 9 },
      { book: 5, chapter: 31, verse: 6 },
      { book: 27, chapter: 1, verse: 8 },
      { book: 19, chapter: 27, verse: 14 },
    ],
  },
  {
    id: "paz",
    label: "Paz",
    emoji: "🕊️",
    verses: [
      { book: 45, chapter: 5, verse: 1 },
      { book: 49, chapter: 2, verse: 14 },
      { book: 40, chapter: 11, verse: 28 },
      { book: 19, chapter: 4, verse: 9 },
    ],
  },
];

/** Look-up rápido por id. */
export const COLLECTIONS_BY_ID = Object.fromEntries(
  CURATED_COLLECTIONS.map((c) => [c.id, c])
);
export const THEMES_BY_ID = Object.fromEntries(THEME_MAP.map((t) => [t.id, t]));

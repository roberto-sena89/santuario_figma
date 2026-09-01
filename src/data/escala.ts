// ============================================================
// ESCALA SEMANAL — dados e lógica de persistência (localStorage)
// ============================================================

export interface EscalaDia {
  key: string; // ex: "segunda", "quarta"
  dia: string; // ex: "Segunda-feira"
  horario: string; // ex: "18:00"
  titulo: string; // ex: "Círculo de Oração"
  /**
   * Papéis da escala para este dia.
   * Valor = pessoa escalada (string), ou lista de pessoas (string[] para papéis
   * como "Auxiliar" que aceitam mais de uma pessoa). Vazio/undefined = não definido.
   */
  papeis: Record<string, string | string[]>;
}

export interface EscalaSemana {
  /** Semana civil no formato AAAA-SS (ISO week). Ex: "2026-36" */
  semana: string;
  dias: EscalaDia[];
}

/** Define quais dias têm escala e quais papéis cada um tem. */
export const DIAS_ESCALA: Omit<EscalaDia, "papeis">[] = [
  {
    key: "segunda",
    dia: "Segunda-feira",
    horario: "18:00",
    titulo: "Círculo de Oração",
  },
  {
    key: "terca",
    dia: "Terça-feira",
    horario: "18:00",
    titulo: "Estudo Bíblico para Crianças",
  },
  {
    key: "quarta",
    dia: "Quarta-feira",
    horario: "19:00",
    titulo: "Culto de Ensino",
  },
];

/** Papéis por dia (ordem de exibição). `multi: true` aceita várias pessoas. */
export const PAPEIS_POR_DIA: Record<
  string,
  { key: string; label: string; multi?: boolean }[]
> = {
  segunda: [
    { key: "dirigente", label: "Dirigente" },
    { key: "porteiro", label: "Porteiro" },
    { key: "auxiliar", label: "Auxiliar", multi: true },
  ],
  quarta: [
    { key: "dirigente", label: "Dirigente" },
    { key: "pregador", label: "Pregador da Palavra" },
    { key: "louvor", label: "Louvor da Oferta" },
    { key: "porteiro", label: "Porteiro" },
    { key: "auxiliar", label: "Auxiliar", multi: true },
  ],
  terca: [
    { key: "dirigente", label: "Dirigente" },
    { key: "porteiro", label: "Porteiro" },
    { key: "auxiliar", label: "Auxiliar", multi: true },
  ],
};

/** Normaliza o valor de um papel para lista (suporta string ou string[]). */
export function papelParaLista(valor: string | string[] | undefined): string[] {
  if (!valor) return [];
  return Array.isArray(valor) ? valor.filter(Boolean) : [valor].filter(Boolean);
}

/** Pessoas disponíveis para escalar (cadastro manual). */
export const PESSOAS_PADRAO: string[] = [
  "Irmã Neurismar",
  "Irmão Edval",
  "Irmão Nonato",
  "Irmã Ana Goreth",
  "Irmão Leandro",
  "Irmao Israel",
  "Irmã Rafaela Luna",
  "Irmão Matheus Neres",
  "Irmão Daniel Feitosa",
  "Pr.Wellington Mendes",
  "Pra.Karina Oliveira",
  "Irmão Alan Diniz",
  "Presbítero Edson Leite",
  "Diácono Marcos Brito",
  "Irmã Olga Evangelista",
  "Diaconisa Ivoneide Neres",
  "Irmã Carla Diniz",
  "Irmã Eliana Braga",
  "Irmã Rogelma Duarte",
  "Irmã Márcia Brito",
  "Irmã Márcia Pereira",
  "Irmã Ilderlange Correa",
  "Irmã Nadja Teixeira",
  "Irmã Nara Kelma",
  "Irmão Rene Ferreira",
];

/** Emoji representativo de cada dia da escala. */
export const EMOJI_DIA: Record<string, string> = {
  segunda: "🕊️",
  quarta: "📖",
  terca: "🧒",
};

/** Emoji representativo de cada papel. */
export const PAPEL_EMOJI: Record<string, string> = {
  dirigente: "🎤",
  pregador: "📖",
  louvor: "🎶",
  porteiro: "🚪",
  auxiliar: "🤝",
};

// ============================================================
// UTILIDADES DE DATA
// ============================================================

/** Retorna a semana ISO (AAAA-SS) de uma data. */
export function isoWeek(date: Date): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-${String(weekNo).padStart(2, "0")}`;
}

/** Data da segunda-feira de uma semana ISO (AAAA-SS). */
export function mondayOfWeek(semana: string): Date {
  const [year, week] = semana.split("-").map(Number);
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const dayNum = jan4.getUTCDay() || 7;
  jan4.setUTCDate(jan4.getUTCDate() + (1 - dayNum) + (week - 1) * 7);
  return jan4;
}

/** Gera uma lista de semanas ao redor de uma data central (ex: -4 a +4). */
export function semanasAoRedor(central: Date, raio = 4): string[] {
  const monday = new Date(central);
  const day = monday.getDay() || 7;
  monday.setDate(monday.getDate() - (day - 1));
  const semanas: string[] = [];
  for (let i = -raio; i <= raio; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i * 7);
    semanas.push(isoWeek(d));
  }
  return semanas;
}

/** Formata uma semana ISO como "Semana de 08/09 a 14/09". */
export function formatSemana(semana: string): string {
  const monday = mondayOfWeek(semana);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const fmt = (d: Date) =>
    d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  return `${fmt(monday)} a ${fmt(sunday)}`;
}

// ============================================================
// ACESSO E PERSISTÊNCIA (localStorage)
// ============================================================

const STORAGE_KEY = "santuario_escala";
const SENHA_KEY = "santuario_escala_senha";

export const SENHA_PADRAO = "santuario2026"; // senha fixa do painel admin

export function escalaVazia(semana: string): EscalaSemana {
  return {
    semana,
    dias: DIAS_ESCALA.map((d) => ({
      ...d,
      papeis: Object.fromEntries(
        PAPEIS_POR_DIA[d.key].map((p) => [p.key, ""])
      ),
    })),
  };
}

/** Lê todas as semanas salvas. */
export function carregarEscalas(): Record<string, EscalaSemana> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, EscalaSemana>) : {};
  } catch {
    return {};
  }
}

/** Salva a escala de uma semana. */
export function salvarEscala(escala: EscalaSemana) {
  const all = carregarEscalas();
  all[escala.semana] = escala;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

/** Retorna a escala de uma semana (cria vazia se não existir). */
export function getEscala(semana: string): EscalaSemana {
  const all = carregarEscalas();
  return all[semana] ?? escalaVazia(semana);
}

/** Verifica se a senha está correta. */
export function verificarSenha(senha: string): boolean {
  return senha === SENHA_PADRAO;
}

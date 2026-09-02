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

/** Ordem canônica dos dias para ordenação. */
export const ORDEM_DIAS: Record<string, number> = {
  segunda: 1, terca: 2, quarta: 3, quinta: 4, sexta: 5, sabado: 6, domingo: 7,
};
export const DIAS_SEMANA_OPCOES: { key: string; label: string }[] = [
  { key: "segunda", label: "Segunda-feira" },
  { key: "terca", label: "Terça-feira" },
  { key: "quarta", label: "Quarta-feira" },
  { key: "quinta", label: "Quinta-feira" },
  { key: "sexta", label: "Sexta-feira" },
  { key: "sabado", label: "Sábado" },
  { key: "domingo", label: "Domingo" },
];

/** Nomes de culto mais comuns — sugestões para autocomplete/atalhos. */
export const SUGESTOES_CULTO: string[] = [
  "Círculo de Oração",
  "Culto da Família",
  "Culto da Rede de Jovens",
  "Culto de Adoração",
  "Culto de Ensino e Crescimento",
  "Culto de Missões",
  "Culto de Santa Ceia",
  "Ensaio do Louvor (Rede de Crianças)",
  "Ensaio do Louvor (Rede de Jovens)",
  "Ensaio do Louvor (Rede de Mulheres)",
  "Ensaio do Louvor (Rede de Pré-Adolescente)",
  "Estudo Bíblico para Crianças",
];

/** Define quais dias têm escala e quais papéis cada um tem. (padrão inicial) */
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
    titulo: "Culto de Ensino e Crescimento",
  },
];

/** Papéis por dia (ordem de exibição). `multi: true` aceita várias pessoas. */
export const PAPEIS_POR_DIA: Record<
  string,
  { key: string; label: string; multi?: boolean }[]
> = {
  segunda: [
    { key: "dirigente", label: "Dirigente" },
    { key: "pregador", label: "Pregador da Palavra" },
    { key: "louvor_geral", label: "Louvor" },
    { key: "louvor", label: "Louvor da Oferta" },
    { key: "porteiro", label: "Porteiro" },
    { key: "auxiliar", label: "Auxiliar", multi: true },
  ],
  quarta: [
    { key: "dirigente", label: "Dirigente" },
    { key: "pregador", label: "Pregador da Palavra" },
    { key: "louvor_geral", label: "Louvor" },
    { key: "louvor", label: "Louvor da Oferta" },
    { key: "porteiro", label: "Porteiro" },
    { key: "auxiliar", label: "Auxiliar", multi: true },
  ],
  terca: [
    { key: "dirigente", label: "Dirigente" },
    { key: "pregador", label: "Pregador da Palavra" },
    { key: "louvor_geral", label: "Louvor" },
    { key: "louvor", label: "Louvor da Oferta" },
    { key: "porteiro", label: "Porteiro" },
    { key: "auxiliar", label: "Auxiliar", multi: true },
  ],
  quinta: [
    { key: "dirigente", label: "Dirigente" },
    { key: "pregador", label: "Pregador da Palavra" },
    { key: "louvor_geral", label: "Louvor" },
    { key: "louvor", label: "Louvor da Oferta" },
    { key: "porteiro", label: "Porteiro" },
    { key: "auxiliar", label: "Auxiliar", multi: true },
  ],
  sexta: [
    { key: "dirigente", label: "Dirigente" },
    { key: "pregador", label: "Pregador da Palavra" },
    { key: "louvor_geral", label: "Louvor" },
    { key: "louvor", label: "Louvor da Oferta" },
    { key: "porteiro", label: "Porteiro" },
    { key: "auxiliar", label: "Auxiliar", multi: true },
  ],
  sabado: [
    { key: "dirigente", label: "Dirigente" },
    { key: "pregador", label: "Pregador da Palavra" },
    { key: "louvor_geral", label: "Louvor" },
    { key: "louvor", label: "Louvor da Oferta" },
    { key: "porteiro", label: "Porteiro" },
    { key: "auxiliar", label: "Auxiliar", multi: true },
  ],
  domingo: [
    { key: "dirigente", label: "Dirigente" },
    { key: "pregador", label: "Pregador da Palavra" },
    { key: "louvor_geral", label: "Louvor" },
    { key: "louvor", label: "Louvor da Oferta" },
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
  terca: "🧒",
  quarta: "📖",
  quinta: "🎸",
  sexta: "🎤",
  sabado: "✨",
  domingo: "☀️",
};

/** Emoji representativo de cada papel. */
export const PAPEL_EMOJI: Record<string, string> = {
  dirigente: "🎤",
  pregador: "📖",
  louvor_geral: "🎵",
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
const CULTOS_KEY = "santuario_cultos_def";
const SENHA_KEY = "santuario_escala_senha";

export const SENHA_PADRAO = "santuario2026"; // senha fixa do painel admin

/** Carrega cultos cadastrados (ou padrão). Ordena por dia da semana + horário. */
export function carregarCultos(): Omit<EscalaDia, "papeis">[] {
  try {
    const raw = localStorage.getItem(CULTOS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Omit<EscalaDia, "papeis">[];
      if (Array.isArray(parsed) && parsed.length > 0) return ordenarCultos(parsed);
    }
  } catch { /* ignore */ }
  return [...DIAS_ESCALA];
}

export function salvarCultos(cultos: Omit<EscalaDia, "papeis">[]) {
  localStorage.setItem(CULTOS_KEY, JSON.stringify(ordenarCultos(cultos)));
}

function ordenarCultos(cultos: Omit<EscalaDia, "papeis">[]) {
  // mapa label -> ordem (para quando key tem slug "quinta-ensaio-...")
  const ordemPorLabel: Record<string, number> = {};
  DIAS_SEMANA_OPCOES.forEach((o) => { ordemPorLabel[o.label] = ORDEM_DIAS[o.key] ?? 99; });
  return [...cultos].sort((a, b) => {
    // tenta por key direto, senão por dia label
    const oa = ORDEM_DIAS[a.key] ?? ordemPorLabel[a.dia] ?? 99;
    const ob = ORDEM_DIAS[b.key] ?? ordemPorLabel[b.dia] ?? 99;
    if (oa !== ob) return oa - ob;
    return a.horario.localeCompare(b.horario);
  });
}

/** Papeis padrão para um culto (fallback se não houver em PAPEIS_POR_DIA). */
export function papeisParaCulto(cultoKey: string) {
  const base = [
    { key: "dirigente", label: "Dirigente" },
    { key: "pregador", label: "Pregador da Palavra" },
    { key: "louvor_geral", label: "Louvor" },
    { key: "louvor", label: "Louvor da Oferta" },
    { key: "porteiro", label: "Porteiro" },
    { key: "auxiliar", label: "Auxiliar", multi: true },
  ] as const;
  return (PAPEIS_POR_DIA[cultoKey] as typeof base | undefined) ?? [...base];
}

export function escalaVazia(semana: string): EscalaSemana {
  const cultos = carregarCultos();
  return {
    semana,
    dias: cultos.map((d) => ({
      ...d,
      papeis: Object.fromEntries(
        papeisParaCulto(d.key).map((p) => [p.key, p.multi ? [] : ""])
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

export interface ServiceSchedule {
  day: string;
  dayShort: string;
  time: string;
  title: string;
  description: string;
  location: string;
  type: "culto" | "estudo" | "oracao" | "jovens" | "criancas" | "especial";
}

export interface ChurchEvent {
  id: number;
  date: string;
  time: string;
  title: string;
  description: string;
  location: string;
  type: "culto" | "conferencia" | "retiro" | "evangelismo" | "outro";
  highlight?: boolean;
}

export const WEEKLY_SCHEDULE: ServiceSchedule[] = [
  {
    day: "Domingo",
    dayShort: "Dom",
    time: "09:00",
    title: "Escola Bíblica Dominical",
    description: "Estudo da Palavra para todas as idades, com turmas separadas por faixa etária.",
    location: "Salão Principal",
    type: "estudo",
  },
  {
    day: "Domingo",
    dayShort: "Dom",
    time: "10:30",
    title: "Culto de Celebração",
    description: "Louvor, adoração e pregação da Palavra. Culto para toda a família.",
    location: "Salão Principal",
    type: "culto",
  },
  {
    day: "Domingo",
    dayShort: "Dom",
    time: "19:00",
    title: "Culto Noturno",
    description: "Culto de cura e libertação com oração pelos enfermos.",
    location: "Salão Principal",
    type: "culto",
  },
  {
    day: "Terça-feira",
    dayShort: "Ter",
    time: "19:30",
    title: "Culto de Santa Ceia",
    description: "Momento especial de comunhão e partilha do pão e do vinho.",
    location: "Salão Principal",
    type: "culto",
  },
  {
    day: "Quarta-feira",
    dayShort: "Qua",
    time: "19:30",
    title: "Estudo Bíblico",
    description: "Aprofundamento da Palavra de Deus em ambiente íntimo e participativo.",
    location: "Salão de Estudos",
    type: "estudo",
  },
  {
    day: "Quinta-feira",
    dayShort: "Qui",
    time: "19:30",
    title: "Reunião de Oração",
    description: "Intercessão coletiva pelos pedidos da comunidade, cidade e nações.",
    location: "Sala de Oração",
    type: "oracao",
  },
  {
    day: "Sexta-feira",
    dayShort: "Sex",
    time: "19:30",
    title: "Culto de Jovens",
    description: "Ministração especial para adolescentes e jovens adultos.",
    location: "Salão Principal",
    type: "jovens",
  },
  {
    day: "Sábado",
    dayShort: "Sáb",
    time: "15:00",
    title: "Ministério Infantil",
    description: "Atividades bíblicas e criativas para crianças de 4 a 12 anos.",
    location: "Salão Infantil",
    type: "criancas",
  },
  {
    day: "Sábado",
    dayShort: "Sáb",
    time: "19:00",
    title: "Vigília de Oração",
    description: "Vigília mensal de adoração e intercessão pela madrugada.",
    location: "Salão Principal",
    type: "oracao",
  },
];

export const UPCOMING_EVENTS: ChurchEvent[] = [
  {
    id: 1,
    date: "2026-09-07",
    time: "09:00",
    title: "Culto Especial — Independência",
    description: "Culto cívico comemorativo com pregação especial sobre liberdade em Cristo.",
    location: "Salão Principal",
    type: "culto",
    highlight: true,
  },
  {
    id: 2,
    date: "2026-09-12",
    time: "19:00",
    title: "Seminário de Casais",
    description: "Três noites de ensinamentos sobre família, comunicação e amor conjugal.",
    location: "Salão de Eventos",
    type: "conferencia",
    highlight: false,
  },
  {
    id: 3,
    date: "2026-09-20",
    time: "08:00",
    title: "Retiro de Jovens — Serra",
    description: "Final de semana de renovação espiritual para jovens de 16 a 30 anos.",
    location: "Sítio Novo Horizonte — Atibaia/SP",
    type: "retiro",
    highlight: true,
  },
  {
    id: 4,
    date: "2026-09-27",
    time: "10:00",
    title: "Evangelismo na Praça",
    description: "Saída de evangelismo com distribuição de folhetos e pregação ao ar livre.",
    location: "Praça da República — São Paulo/SP",
    type: "evangelismo",
    highlight: false,
  },
  {
    id: 5,
    date: "2026-10-04",
    time: "09:00",
    title: "Conferência Missionária",
    description: "Dois dias com missionários nacionais e internacionais compartilhando suas experiências.",
    location: "Salão Principal",
    type: "conferencia",
    highlight: true,
  },
  {
    id: 6,
    date: "2026-10-18",
    time: "19:00",
    title: "Noite de Adoração",
    description: "Culto especial de adoração com participação do Ministério de Louvor convidado.",
    location: "Salão Principal",
    type: "culto",
    highlight: false,
  },
];

export function getEventTypeLabel(type: ChurchEvent["type"]): string {
  const labels: Record<ChurchEvent["type"], string> = {
    culto: "Culto",
    conferencia: "Conferência",
    retiro: "Retiro",
    evangelismo: "Evangelismo",
    outro: "Evento",
  };
  return labels[type];
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

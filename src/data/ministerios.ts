export interface Ministry {
  id: string;
  name: string;
  icon: string;
  description: string;
  leader: string;
  contact: string;
  meetingDay: string;
  meetingTime: string;
  color: string;
}

export const MINISTERIOS: Ministry[] = [
  {
    id: "louvor",
    name: "Ministério de Louvor",
    icon: "♪",
    description:
      "Responsável pela adoração corporativa nos cultos. Cantores, músicos e técnicos de som trabalham juntos para criar uma atmosfera de adoração genuína.",
    leader: "Ev. Renato Costa",
    contact: "louvor@igrejagracaeverdade.com.br",
    meetingDay: "Sábado",
    meetingTime: "14:00",
    color: "#7C3AED",
  },
  {
    id: "jovens",
    name: "Ministério de Jovens",
    icon: "✦",
    description:
      "Um espaço para jovens de 15 a 30 anos crescerem na fé, construírem amizades saudáveis e descobrirem seu propósito em Deus.",
    leader: "Pr. Felipe Andrade",
    contact: "jovens@igrejagracaeverdade.com.br",
    meetingDay: "Sexta-feira",
    meetingTime: "19:30",
    color: "#DC2626",
  },
  {
    id: "criancas",
    name: "Ministério Infantil",
    icon: "★",
    description:
      "Ensino bíblico lúdico e criativo para crianças de 4 a 12 anos. Teatro, música, artesanato e histórias bíblicas de forma divertida e significativa.",
    leader: "Dna. Patrícia Souza",
    contact: "infantil@igrejagracaeverdade.com.br",
    meetingDay: "Sábado",
    meetingTime: "15:00",
    color: "#059669",
  },
  {
    id: "intercessao",
    name: "Ministério de Intercessão",
    icon: "✝",
    description:
      "O coração que bate pela igreja. Nossos intercessores se dedicam à oração regular pela comunidade, pelo país e pelas nações.",
    leader: "Dna. Maria Helena",
    contact: "oracao@igrejagracaeverdade.com.br",
    meetingDay: "Quinta-feira",
    meetingTime: "19:30",
    color: "#B8860B",
  },
  {
    id: "casais",
    name: "Ministério de Casais",
    icon: "♥",
    description:
      "Suporte, ensinamento e comunhão para casais em todas as etapas do casamento. Seminários, aconselhamento e encontros regulares.",
    leader: "Pr. João e Pra. Tânia Silva",
    contact: "casais@igrejagracaeverdade.com.br",
    meetingDay: "Primeira sexta do mês",
    meetingTime: "19:30",
    color: "#E11D48",
  },
  {
    id: "diaconia",
    name: "Diaconia Social",
    icon: "◆",
    description:
      "Ação social e assistência às famílias em necessidade. Distribuição de alimentos, roupas e apoio às comunidades vulneráveis.",
    leader: "Diac. Carlos Roberto",
    contact: "social@igrejagracaeverdade.com.br",
    meetingDay: "Sábado",
    meetingTime: "08:00",
    color: "#0369A1",
  },
  {
    id: "evangelismo",
    name: "Ministério de Evangelismo",
    icon: "◉",
    description:
      "Saídas regulares de evangelismo nas praças, hospitais e presídios. Treinamento em evangelismo pessoal e alcance de novos convertidos.",
    leader: "Ev. Marcos Oliveira",
    contact: "evangelismo@igrejagracaeverdade.com.br",
    meetingDay: "Último sábado do mês",
    meetingTime: "09:00",
    color: "#047857",
  },
];

export interface MissaoDestaque {
  titulo: string;
  descricao: string;
  imagem?: string;
}

export interface ConferenciaMissional {
  id: string;
  titulo: string;
  data: string;
  local: string;
  descricao: string;
  destaque?: boolean;
}

export interface PessoaMissao {
  id: string;
  nome: string;
  papel: string;
  bio?: string;
}

/**
 * Dados do Ministério de Missões — edite aqui para alimentar a página.
 *
 * - liderMissao: líder do ministério
 * - obreiros: equipe de apoio / obreiros
 * - missionarios: missionários apoiados / enviados
 * - conferencias: conferências missionárias
 * - galeria: imagens (URLs ou /fotos/...)
 * - videos: vídeos (embed YouTube / Vimeo)
 */
export const MISSOES = {
  id: "missoes",
  nome: "Ministério de Missões",
  icone: "🌍",
  cor: "#047857",
  resumo:
    "Levar o evangelho até os confins da terra. Saídas missionárias, apoio a missionários e treinamento de obreiros para o campo.",
  descricao:
    "O Ministério de Missões existe para cumprir o ide de Jesus: ir por todo o mundo e pregar o evangelho a toda criatura. Apoiamos missionários no campo, organizamos conferências missionárias, treinamos obreiros e mobilizamos a igreja para a obra missionária.",
  versiculo: {
    texto: "Ide por todo o mundo, pregai o evangelho a toda criatura.",
    referencia: "Marcos 16:15",
  },
  liderMissao: {
    nome: "Ev. Marcos Oliveira",
    papel: "Líder do Ministério de Missões",
    bio: "Chamado para a obra missionária, lidera as frentes de alcance e o envio de missionários.",
  },
  contato: "missoes@igrejagracaeverdade.com.br",
  reuniao: "Último sábado do mês às 09:00",
  obreiros: [
    { id: "obr1", nome: "Diácono Roberto Lima", papel: "Obreiro — Logística missionária", bio: "Coordena viagens, suprimentos e apoio logístico das equipes." },
    { id: "obr2", nome: "Irmã Marta Souza", papel: "Obreira — Intercessão missionária", bio: "Lidera a corrente de oração pelos missionários e campos." },
    { id: "obr3", nome: "Irmão Samuel Rocha", papel: "Obreiro — Treinamento", bio: "Ministra treinamentos de evangelismo e discipulado para as equipes." },
  ] as PessoaMissao[],
  missionarios: [
    { id: "mis1", nome: "Missionário Paulo e família", papel: "Campo — Região Norte", bio: "Plantação de igrejas e obras sociais na região Norte do país." },
    { id: "mis2", nome: "Missionária Joana Freitas", papel: "Campo — África", bio: "Apoio a crianças e evangelismo em comunidades da África." },
  ] as PessoaMissao[],
  conferencias: [
    {
      id: "conf1",
      titulo: "Conferência Missionária Anual",
      data: "Em breve",
      local: "Sede da igreja",
      descricao: "Noite de avivamento missionário com testemunhos, desafios e envio de equipes.",
      destaque: true,
    },
  ] as ConferenciaMissional[],
  galeria: [
    "/fotos/missoes/1.jpg",
    "/fotos/missoes/2.jpg",
    "/fotos/missoes/3.jpg",
    "/fotos/missoes/4.jpg",
  ],
  videos: [
    { titulo: "Como nasce um chamado missionário", id: "" },
    { titulo: "Testemunho do campo", id: "" },
  ],
};

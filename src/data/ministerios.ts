export interface Ministry {
  id: string;
  name: string;
  icon: string;
  description: string;
  leader: string;
  /** Equipe de liderança/obreiros — o primeiro item é o líder (cor do ministério).
   * Os demais são renderizados como "Obreiro" (âmbar). */
  equipe?: { nome: string; papel: string; bio: string }[];
  contact: string;
  meetingDay: string;
  meetingTime: string;
  color: string;
  /* Conteúdo enriquecido das páginas dedicadas */
  versiculo?: { texto: string; referencia: string };
  resumo?: string;
  atividades?: { titulo: string; descricao: string; icon: string }[];
  beneficios?: string[];
  requisitos?: string[];
  galeria?: string[];
}

export const MINISTERIOS: Ministry[] = [
  {
    id: "louvor",
    name: "Ministério de Louvor",
    icon: "♪",
    description:
      "Responsável pela adoração corporativa nos cultos. Cantores, músicos e técnicos de som trabalham juntos para criar uma atmosfera de adoração genuína.",
    leader: "Ev. Renato Costa",
    equipe: [
      { nome: "Ev. Renato Costa", papel: "Líder do Ministério de Louvor", bio: "Pastor e músico, conduz a equipe de adoração com zelo pela presença de Deus." },
      { nome: "Raquel Andrade", papel: "Coordenação vocal", bio: "Responsável pelos vocais e harmonias nos ensaios e cultos." },
      { nome: "Marcos Vinícius", papel: "Som e iluminação", bio: "Opera mesa de som e iluminação dos cultos." },
      { nome: "Lívia Santana", papel: "Produção dos cultos", bio: "Organiza agendas, escalas e recepção da equipe." },
    ],
    contact: "louvor@igrejagracaeverdade.com.br",
    meetingDay: "Sábado",
    meetingTime: "14:00",
    color: "#7C3AED",
    versiculo: {
      texto: "Louvai ao Senhor, porque ele é bom; porque a sua benignidade dura para sempre.",
      referencia: "Salmos 136:1",
    },
    resumo:
      "Conduzimos a igreja em adoração a Deus através da música, preparando cada detalhe para que a presença do Senhor seja o centro dos nossos cultos.",
    atividades: [
      { titulo: "Cantores", descricao: "Vocal principal e apoio, com ensaios semanais de repertório e harmonia.", icon: "🎤" },
      { titulo: "Músicos", descricao: "Instrumentistas de teclado, violão, guitarra, baixo, bateria e outros.", icon: "🎸" },
      { titulo: "Técnicos de som", descricao: "Operação de mesa de som, iluminação e projeção nos cultos.", icon: "🎛️" },
    ],
    beneficios: [
      "Crescer espiritualmente através da adoração",
      "Desenvolver dons musicais e artísticos",
      "Viver comunhão com a equipe de louvor",
      "Servir à igreja com excelência",
    ],
    requisitos: [
      "Ser membro ou frequentador assíduo",
      "Ter vida de oração e testemunho",
      "Compromisso com ensaios e escalas",
      "Disponibilidade nos horários dos cultos",
    ],
    galeria: ["/fotos/ministerios/louvor/1.jpg"],
  },
  {
    id: "jovens",
    name: "Ministério de Jovens",
    icon: "✦",
    description:
      "Um espaço para jovens de 15 a 30 anos crescerem na fé, construírem amizades saudáveis e descobrirem seu propósito em Deus.",
    leader: "Pr. Felipe Andrade",
    equipe: [
      { nome: "Pr. Felipe Andrade", papel: "Líder do Ministério de Jovens", bio: "Pastor com visão para a juventude, discipula e mobiliza a próxima geração." },
      { nome: "Thiago Mendes", papel: "Coordenador de células", bio: "Lidera os grupos de discipulado jovem." },
      { nome: "Carolina Lima", papel: "Comunicação", bio: "Cuida das redes sociais e da comunicação do ministério." },
      { nome: "Daniel Rocha", papel: "Eventos", bio: "Coordena encontros, acampamentos e ações sociais." },
    ],
    contact: "jovens@igrejagracaeverdade.com.br",
    meetingDay: "Sexta-feira",
    meetingTime: "19:30",
    color: "#DC2626",
    versiculo: {
      texto: "Ninguém despreze a tua mocidade; mas sê o exemplo dos fiéis, na palavra, no trato, na caridade, no espírito, na fé, na pureza.",
      referencia: "1 Timóteo 4:12",
    },
    resumo:
      "Um movimento vibrante que reúne a juventude da igreja para adoração, ensino, comunhão e propósito, formando a próxima geração de líderes.",
    atividades: [
      { titulo: "Encontros semanais", descricao: "Cultos jovens com louvor, palavra e dinâmicas toda sexta.", icon: "🎉" },
      { titulo: "Grupos de discipulado", descricao: "Pequenos grupos para crescimento e amizades profundas.", icon: "📖" },
      { titulo: "Ação social jovem", descricao: "Mutirões e visitas a lares e comunidades.", icon: "🤲" },
    ],
    beneficios: [
      "Fazer parte de uma geração que busca a Deus",
      "Amizades saudáveis e duradouras",
      "Descobrir propósito e chamado",
      "Desenvolver liderança",
    ],
    requisitos: [
      "Ter entre 15 e 30 anos",
      "Vontade de crescer na fé",
      "Participar dos encontros semanais",
      "Coração aberto para servir",
    ],
    galeria: ["/fotos/ministerios/jovens/1.jpg"],
  },
  {
    id: "criancas",
    name: "Ministério Infantil",
    icon: "★",
    description:
      "Ensino bíblico lúdico e criativo para crianças de 4 a 12 anos. Teatro, música, artesanato e histórias bíblicas de forma divertida e significativa.",
    leader: "Dna. Patrícia Souza",
    equipe: [
      { nome: "Dna. Patrícia Souza", papel: "Líder do Ministério Infantil", bio: "Educadora cristã apaixonada por ensinar crianças no caminho de Deus." },
      { nome: "Ana Paula Reis", papel: "Coordenadora do berçário", bio: "Cuida dos bebês e da estrutura das salas." },
      { nome: "Fernanda Lima", papel: "Escola bíblica", bio: "Prepara os ensinos adaptados por faixa etária." },
      { nome: "Bruno Castro", papel: "Logística e recreação", bio: "Organiza espaço físico e as atividades das crianças." },
    ],
    contact: "infantil@igrejagracaeverdade.com.br",
    meetingDay: "Sábado",
    meetingTime: "15:00",
    color: "#059669",
    versiculo: {
      texto: "Deixai vir a mim os pequeninos, não os impeçais, porque dos tais é o reino de Deus.",
      referencia: "Marcos 10:14",
    },
    resumo:
      "Cuidamos das nossas crianças com amor e excelência, plantando a semente da Palavra no coração dos pequenos de forma lúdica e segura.",
    atividades: [
      { titulo: "Escola bíblica", descricao: "Ensino adaptado por faixa etária com histórias e atividades.", icon: "📚" },
      { titulo: "Teatro e música", descricao: "Apresentações e cânticos infantis nos cultos.", icon: "🎭" },
      { titulo: "Oficinas criativas", descricao: "Artesanato e brincadeiras que reforçam o ensino.", icon: "🎨" },
    ],
    beneficios: [
      "Ver crianças crescendo no conhecimento de Deus",
      "Usar dons de ensino e criatividade",
      "Ambiente seguro e preparado",
      "Famílias acolhidas desde cedo",
    ],
    requisitos: [
      "Amor por crianças",
      "Disponibilidade aos sábados",
      "Participação nos treinamentos",
      "Curso de berçário/crianças (orientação)",
    ],
    galeria: ["/fotos/ministerios/crianças/1.jpg"],
  },
  {
    id: "intercessao",
    name: "Ministério de Intercessão",
    icon: "✝",
    description:
      "O coração que bate pela igreja. Nossos intercessores se dedicam à oração regular pela comunidade, pelo país e pelas nações.",
    leader: "Dna. Maria Helena",
    equipe: [
      { nome: "Dna. Maria Helena", papel: "Líder do Ministério de Intercessão", bio: "Mulher de oração que conduz a equipe em intercessão constante." },
      { nome: "Irmã Luzia", papel: "Vigílias", bio: "Organiza as vigílias e noites de oração." },
      { nome: "João Pedro", papel: "Mural de pedidos", bio: "Recebe e distribui os pedidos de oração." },
      { nome: "Rita Fonseca", papel: "Intercessão por eventos", bio: "Cobre os cultos e programações em oração." },
    ],
    contact: "oracao@igrejagracaeverdade.com.br",
    meetingDay: "Quinta-feira",
    meetingTime: "19:30",
    color: "#B8860B",
    versiculo: {
      texto: "Orando em todo o tempo com toda a oração e súplica no Espírito.",
      referencia: "Efésios 6:18",
    },
    resumo:
      "Um exército de joelhos que sustenta a igreja em oração, intercedendo pelos cultos, lideranças, famílias, cidade e nações.",
    atividades: [
      { titulo: "Vigílias de oração", descricao: "Noites de intercessão e adoração mensais.", icon: "🕯️" },
      { titulo: "Mural de pedidos", descricao: "Recebemos e intercedemos por pedidos da igreja e visitantes.", icon: "📋" },
      { titulo: "Intercessão por eventos", descricao: "Cobertura de oração para cultos e programações.", icon: "🙏" },
    ],
    beneficios: [
      "Crescimento na vida de oração",
      "Sensibilidade ao Espírito Santo",
      "Comunhão profunda entre intercessores",
      "Ver respostas de Deus",
    ],
    requisitos: [
      "Vida de oração pessoal",
      "Discrição e confidencialidade",
      "Frequência às reuniões de quinta",
      "Coração intercessor",
    ],
    galeria: ["/fotos/ministerios/intercessão/1.jpg"],
  },
  {
    id: "casais",
    name: "Ministério da Família",
    icon: "♥",
    description:
      "Suporte, ensinamento e comunhão para casais em todas as etapas do casamento. Seminários, aconselhamento e encontros regulares.",
    leader: "Pr. João e Pra. Tânia Silva",
    equipe: [
      { nome: "Pr. João e Pra. Tânia Silva", papel: "Líderes do Ministério da Família", bio: "Casal pastoral que pastoreia famílias e fortalece casamentos." },
      { nome: "Moisés e Sara Andrade", papel: "Mentoria de casais", bio: "Discipulam casais recém-casados." },
      { nome: "André e Paula Costa", papel: "Encontros", bio: "Organizam os encontros e seminários mensais." },
      { nome: "Carlos e Míriam", papel: "Acolhimento", bio: "Recebem novos casais com carinho." },
    ],
    contact: "casais@igrejagracaeverdade.com.br",
    meetingDay: "Primeira sexta do mês",
    meetingTime: "19:30",
    color: "#E11D48",
    versiculo: {
      texto: "Vós, maridos, amai vossas mulheres, como também Cristo amou a igreja e a si mesmo se entregou por ela.",
      referencia: "Efésios 5:25",
    },
    resumo:
      "Fortalecemos casamentos através de ensino bíblico, comunhão e apoio mútuo, ajudando famílias a florescerem em todas as estações.",
    atividades: [
      { titulo: "Encontros mensais", descricao: "Noites temáticas para casais com jantar e ensino.", icon: "🍽️" },
      { titulo: "Seminários", descricao: "Cursos sobre comunicação, finanças e vida conjugal.", icon: "📘" },
      { titulo: "Aconselhamento", descricao: "Suporte pastoral e aconselhamento para casais.", icon: "💬" },
    ],
    beneficios: [
      "Casamento fortalecido pela Palavra",
      "Rede de apoio entre casais",
      "Ferramentas práticas para o dia a dia",
      "Famílias abençoadas e abençoadoras",
    ],
    requisitos: [
      "Ser casado(a)",
      "Desejo de investir no casamento",
      "Participação nos encontros mensais",
      "Abertura para aconselhamento",
    ],
    galeria: ["/fotos/ministerios/familia/1.jpg"],
  },
  {
    id: "diaconia",
    name: "Diaconia Social",
    icon: "◆",
    description:
      "Ação social e assistência às famílias em necessidade. Distribuição de alimentos, roupas e apoio às comunidades vulneráveis.",
    leader: "Diac. Carlos Roberto",
    equipe: [
      { nome: "Diac. Carlos Roberto", papel: "Líder da Diaconia Social", bio: "Diácono que coordena a assistência às famílias em necessidade." },
      { nome: "Irmã Helena", papel: "Distribuição de alimentos", bio: "Organiza cestas básicas e o cadastro das famílias." },
      { nome: "Marcos Paulo", papel: "Mutirões", bio: "Coordena arrecadações e entregas." },
      { nome: "Sueli Ferreira", papel: "Campanhas", bio: "Mobiliza a igreja nas campanhas de doação." },
    ],
    contact: "social@igrejagracaeverdade.com.br",
    meetingDay: "Sábado",
    meetingTime: "08:00",
    color: "#0369A1",
    versiculo: {
      texto: "E, fazendo o bem, não nos cansemos, porque a seu tempo ceifaremos, se não houvermos desfalecido.",
      referencia: "Gálatas 6:9",
    },
    resumo:
      "Levamos o amor de Cristo em ações práticas: cestas básicas, roupas, visitas e apoio a famílias em situação de vulnerabilidade.",
    atividades: [
      { titulo: "Distribuição de alimentos", descricao: "Montagem e entrega de cestas básicas mensais.", icon: "🥫" },
      { titulo: "Arrecadações", descricao: "Campanhas de roupas, agasalhos e alimentos.", icon: "🧺" },
      { titulo: "Visitas e apoio", descricao: "Assistência a famílias e comunidades carentes.", icon: "🤝" },
    ],
    beneficios: [
      "Exercitar a fé em obras práticas",
      "Impactar vidas e comunidades",
      "Trabalhar em equipe com propósito",
      "Ser as mãos e pés de Jesus",
    ],
    requisitos: [
      "Sensibilidade ao próximo",
      "Disponibilidade aos sábados",
      "Participação nas campanhas",
      "Compromisso e organização",
    ],
    galeria: [],
  },
  {
    id: "evangelismo",
    name: "Ministério de Missões",
    icon: "◉",
    description:
      "Saídas regulares de evangelismo nas praças, hospitais e presídios. Treinamento em evangelismo pessoal e alcance de novos convertidos.",
    leader: "Ev. Marcos Oliveira",
    equipe: [
      { nome: "Ev. Marcos Oliveira", papel: "Líder do Ministério de Missões", bio: "Chamado para a obra missionária, lidera as frentes de alcance e o envio de missionários." },
      { nome: "Diácono Roberto Lima", papel: "Obreiro — Logística missionária", bio: "Coordena viagens, suprimentos e apoio logístico das equipes." },
      { nome: "Irmã Marta Souza", papel: "Obreira — Intercessão missionária", bio: "Lidera a corrente de oração pelos missionários e campos." },
      { nome: "Irmão Samuel Rocha", papel: "Obreiro — Treinamento", bio: "Ministra treinamentos de evangelismo e discipulado para as equipes." },
    ],
    contact: "evangelismo@igrejagracaeverdade.com.br",
    meetingDay: "Último sábado do mês",
    meetingTime: "09:00",
    color: "#047857",
    versiculo: {
      texto: "Ide por todo o mundo, pregai o evangelho a toda criatura.",
      referencia: "Marcos 16:15",
    },
    resumo:
      "Cumprimos o ide de Jesus: levamos o evangelho às ruas, hospitais e além, treinando obreiros e mobilizando a igreja para as missões.",
    atividades: [
      { titulo: "Saídas evangelísticas", descricao: "Ação em praças, hospitais e presídios.", icon: "📣" },
      { titulo: "Treinamento", descricao: "Capacitação em evangelismo pessoal e discipulado.", icon: "🎓" },
      { titulo: "Apoio a missionários", descricao: "Sustento e intercessão por missionários no campo.", icon: "🌍" },
    ],
    beneficios: [
      "Participar da maior obra: ganhar almas",
      "Crescimento em coragem e fé",
      "Treinamento prático de evangelismo",
      "Ver vidas transformadas",
    ],
    requisitos: [
      "Amor pelas almas",
      "Disponibilidade nas saídas",
      "Participação nos treinamentos",
      "Testemunho coerente",
    ],
    galeria: ["/fotos/ministerios/missoes/1.jpg", "/fotos/ministerios/missoes/2.jpg"],
  },
];
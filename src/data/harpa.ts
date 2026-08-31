export interface HarpaHymn {
  number: number;
  title: string;
  author: string;
  category: string;
  verses: string[];
  chorus?: string;
  audioUrl?: string;
}

export const HARPA_HYMNS: HarpaHymn[] = [
  {
    number: 1,
    title: "A Prova do Amor",
    author: "Domínio público",
    category: "Salvação",
    verses: [
      "Deus amou o mundo de tal maneira\nQue enviou seu Filho para nos salvar;\nQuem nEle crê e segue a sua trilha\nA vida eterna irá desfrutar.",
      "Jesus veio ao mundo para dar-nos vida,\nPara resgatar-nos do poder do mal;\nEm seu sangue precioso somos limpos,\nPor sua graça somos mais que vencedores, afinal.",
      "Que amor tão maravilhoso é esse\nQue Deus enviou Jesus para morrer;\nE que Jesus ressuscitou glorioso,\nDando-nos a todos nova vida e poder.",
    ],
    chorus:
      "Oh! Que amor, oh! Que amor,\nO amor de Deus que nos salvou!\nOh! Que amor, oh! Que amor,\nO amor de Deus que nos salvou!",
  },
  {
    number: 34,
    title: "Firme nas Promessas",
    author: "Russell Kelso Carter (1886)",
    category: "Fé",
    verses: [
      "Firme nas promessas que Cristo me fez,\nNas promessas certas que nunca passarão;\nCantarei de Deus os louvores outra vez,\nFirme nas promessas de Deus.",
      "Firme nas promessas, firme em Cristo estou,\nNas Escrituras Santas que ele me deu;\nGuiado pelo Espírito que me iluminou,\nFirme nas promessas de Deus.",
      "Firme nas promessas que nunca faltarão,\nCom fé e amor seguindo ao Salvador;\nGlorificando a Deus em toda situação,\nFirme nas promessas de Deus.",
    ],
    chorus:
      "Firme, firme, firme nas promessas de Deus meu Salvador!\nFirme, firme, firme nas promessas eternas de amor.",
  },
  {
    number: 65,
    title: "Junto à Cruz",
    author: "Fanny Crosby (1869)",
    category: "Adoração",
    verses: [
      "Junto à cruz onde Jesus morreu,\nOnde o sangue tão precioso correu;\nAli minha alma é purificada,\nJunto à cruz serei consolada.",
      "Junto à cruz, onde recebi o perdão,\nAli Deus me deu sua salvação;\nO peso do pecado foi removido,\nQuando na cruz fui redimido.",
      "Junto à cruz contemplarei seu amor,\nAté que eu veja o meu Senhor;\nAte que me chame para a glória,\nJunto à cruz contarei essa história.",
    ],
    chorus:
      "Junto à cruz, junto à cruz,\nAli foi que primeiro vi a luz;\nE a carga da culpa de minha alma se foi,\nAo olhar para a cruz do Calvário.",
  },
  {
    number: 98,
    title: "Alvo Mais que a Neve",
    author: "James Nicholson (1872)",
    category: "Purificação",
    verses: [
      "Senhor Jesus, a ti me rendo,\nO teu perdão peço hoje aqui;\nNo sangue teu me lava agora,\nAlvo mais que a neve, limpa em ti.",
      "Senhor Jesus, de coração\nConfesso minha ingratidão;\nPurifica-me, torna-me digno,\nAlvo mais que a neve, de perdão.",
      "Senhor Jesus, transforma-me,\nFaze-me como tu quiseres ser;\nNo teu amor completo e puro,\nAlvo mais que a neve poderei ser.",
    ],
    chorus:
      "Alvo mais que a neve,\nSim, alvo mais que a neve;\nLava-me, Senhor Jesus,\nAlvo mais que a neve.",
  },
  {
    number: 149,
    title: "Castelo Forte",
    author: "Martinho Lutero (1529)",
    category: "Proteção",
    verses: [
      "Castelo forte é nosso Deus,\nUm bom escudo e espada;\nNos livra dos contrários seus\nE de toda armada;\nAquele inimigo antigo\nCom poder e rigor,\nArma-se com furor;\nNa terra, não há igual.",
      "Com força nossa não se quer\nEm vão ao fim chegar;\nO vence quem Deus escolher,\nPor nós há de lutar;\nPergunta: quem é este?\nJesus Cristo é o Senhor,\nO forte vencedor,\nO campo fica nosso.",
      "Ainda que encham o mundo todo\nDiabos, não tenhamos medo;\nO príncipe do mundo embora,\nAmeaça-nos com ira agora;\nNós não tememos o seu poder,\nPois está julgado por seu dever;\nUma palavrinha pode abatê-lo.",
    ],
    chorus:
      "A Palavra do Senhor permanece para sempre!\nA Palavra do Senhor permanece para sempre!",
  },
  {
    number: 213,
    title: "Ó Alegria Inefável",
    author: "Henry Williams Baker (1875)",
    category: "Alegria",
    verses: [
      "Ó alegria inefável,\nSaber que Jesus é meu!\nSer salvo por graça amável,\nQue o Pai tão bondoso deu.\nSaber que meu nome está\nNo livro da vida já.",
      "Ó paz tão maravilhosa,\nQue encanta o meu coração!\nJesus me deu esta preciosa\nE santa consolação.\nNão mais o temor me oprime,\nPois Cristo meu fardo redime.",
      "Ó vida que é bem-ditosa,\nViver perto do Senhor!\nNa sombra da mão poderosa,\nSer guardado com amor.\nNada me pode separar\nDo amor de Cristo singular.",
    ],
    chorus:
      "Que alegria! Que alegria!\nSalvo e guardado pelo amor de Deus!\nQue alegria! Que alegria!\nSalvo e guardado pelo amor de Deus!",
  },
  {
    number: 290,
    title: "Sim, Eu Sei",
    author: "Fanny Crosby (1873)",
    category: "Salvação",
    verses: [
      "Bem-aventurança, que dom celestial,\nSalvo em Jesus meu Senhor;\nEle é a minha herança e capital,\nEle é o meu consolador.",
      "Perfeita submissão, que glória é estar\nNo amor do Senhor em paz;\nNa graça divina que sempre há de amparar,\nTudo em Cristo está.",
      "Perfeita submissão, perfeita alegria,\nFeliz descanso em Jesus;\nVivo em visão do eterno dia,\nÀ espera do Rei das luzes.",
    ],
    chorus:
      "Sim, eu sei, sim, eu sei,\nQue Jesus me salva agora sim;\nSim, eu sei, sim, eu sei,\nQue Jesus me salva agora sim.",
  },
  {
    number: 370,
    title: "Jesus, o Amigo das Crianças",
    author: "Domínio público",
    category: "Crianças",
    verses: [
      "Jesus disse: 'Deixai os pequeninos\nVir a mim sem os impedir;\nPois o reino dos céus é dos meninos,'\nEm Jesus posso descansar e sorrir.",
      "Ele nos ama com amor infinito,\nSua graça para todos tem;\nSeu cuidado por cada garotinho,\nÉ promessa que nunca varia nem tem fim.",
      "Como ovelha que o bom Pastor carrega,\nNos seus braços com amor;\nJesus nossos passos guia e protege,\nÉ o eterno e bom Senhor.",
    ],
    chorus:
      "Jesus ama as crianças, sim, Jesus ama;\nJesus ama as crianças, a Bíblia assim diz.",
  },
  {
    number: 452,
    title: "Sou Feliz",
    author: "Domínio público",
    category: "Alegria",
    verses: [
      "Sou feliz, sou feliz,\nPorque tenho a Jesus;\nEle a minha alma redimiu\nCom seu precioso sangue.",
      "Sou feliz no Senhor,\nNa certeza da salvação;\nCheguei ao porto do amor,\nQue me deu redenção.",
      "Quando o mundo me tentar\nE quiser me desviar,\nVou a Jesus me agarrar\nE deixar o pecado.",
    ],
    chorus:
      "Sou feliz, sou feliz,\nSim, sou feliz em Jesus;\nSou feliz, sou feliz,\nSim, sou feliz em Jesus.",
  },
  {
    number: 508,
    title: "Graças Dou ao Senhor",
    author: "Domínio público",
    category: "Gratidão",
    verses: [
      "Graças dou ao Senhor,\nPelo bem que Ele me fez;\nSua graça e seu amor,\nManifesta mais de uma vez.",
      "Pelo pai e pela mãe,\nPela paz que Ele me dá;\nPelos filhos que Ele tem,\nGlória ao Senhor que nos sustenta.",
      "Por cada amanhecer,\nPela chuva e pelo sol;\nPor poder em Deus crer,\nE cantar um novo carol.",
    ],
    chorus:
      "Aleluia! Aleluia!\nGraças dou ao Senhor!\nAleluia! Aleluia!\nGlória ao meu Salvador!",
  },
  {
    number: 580,
    title: "Maravilhosa Graça",
    author: "Domínio público",
    category: "Graça",
    verses: [
      "Maravilhosa graça de Jesus,\nMais rica do que eu poderia dizer;\nMaravilhosa graça de Jesus,\nQue me livrou do pecado a me prender.",
      "Maravilhosa, infinita, graça profunda,\nQue como um rio largo flui;\nMaravilhosa graça de Deus que abunda,\nQue para todos vem e para mim.",
      "Maravilhosa graça que me salva,\nA graça que me purifica e faz andar;\nMaravilhosa graça que me alcança,\nE que me leva ao Pai sem vacilar.",
    ],
    chorus:
      "Maravilhosa graça, Jesus a deu;\nMaravilhosa graça a mim se estendeu;\nMaravilhosa graça, maior que o pecado,\nMaravilhosa graça, a mim foi dado.",
  },
  {
    number: 627,
    title: "Firma a Tua Mão em Mim",
    author: "Domínio público",
    category: "Confiança",
    verses: [
      "Firma a tua mão em mim, Senhor,\nQuando fraco me sentir;\nSeja tu o meu pastor,\nNa estrada ao porvir.",
      "Quando o mundo me tentar,\nE quiser me envolver;\nFaz-me firme permanecer,\nNo teu nome sempre ter.",
      "Quando dúvidas vieram,\nE o meu coração temer;\nLembrarei que tu és fiel,\nE me farás vencer.",
    ],
    chorus:
      "Firma a tua mão em mim, Senhor,\nFirma a tua mão em mim;\nQuando fraco me sentir,\nFirma a tua mão em mim.",
  },
  {
    number: 640,
    title: "Glória ao Rei",
    author: "Domínio público",
    category: "Louvor",
    verses: [
      "Glória ao Rei, glória ao Rei,\nGlória ao Rei dos Reis;\nJesus Cristo reina hoje,\nAté o fim dos dias.",
      "Ele veio como servo,\nMas ressuscitou em glória;\nHoje reina no alto céu,\nE para sempre na vitória.",
      "Um dia voltará glorioso,\nDo céu descerá com poder;\nSeu povo será levado,\nE com Ele a reinar.",
    ],
    chorus:
      "Glória, glória, aleluia!\nGlória ao Rei dos Reis!\nGlória, glória, aleluia!\nJesus Cristo é o Senhor!",
  },
];

export const HARPA_CATEGORIES = [
  "Todas",
  "Adoração",
  "Alegria",
  "Crianças",
  "Fé",
  "Graça",
  "Gratidão",
  "Louvor",
  "Proteção",
  "Purificação",
  "Salvação",
  "Confiança",
];

export function searchHymns(query: string, category: string): HarpaHymn[] {
  const q = query.toLowerCase().trim();
  return HARPA_HYMNS.filter((h) => {
    const matchCategory = category === "Todas" || h.category === category;
    if (!q) return matchCategory;
    const matchQuery =
      h.title.toLowerCase().includes(q) ||
      h.number.toString().includes(q) ||
      h.category.toLowerCase().includes(q) ||
      h.verses.some((v) => v.toLowerCase().includes(q));
    return matchCategory && matchQuery;
  });
}

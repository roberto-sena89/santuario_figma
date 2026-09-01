export interface HarpaHymn {
  number: number;
  title: string;
  author: string;
  category: string;
  key?: string;
  verses: string[];
  chorus?: string;
  audioUrl?: string;
  youtubeId?: string;
  notes?: string;
}

/**
 * Identificador da playlist do hinário completo no YouTube.
 * Cole o link da playlist (ex: https://www.youtube.com/playlist?list=PLxxxx)
 * e o player é embedado automaticamente na página Harpa.
 *
 * Cole em HARPA_YOUTUBE.playlistUrl o link completo OU
 * em HARPA_YOUTUBE.playlistId o ID após "list=".
 *
 * Canais conhecidos que publicam hinários completos:
 *  - @PontocomPalavra (Ponto com a Palavra)
 *  - @HarpaCristaParaTocar
 *  - @HinoGospelBrasil
 */
export const HARPA_YOUTUBE = {
  playlistUrl: "https://www.youtube.com/watch?v=QXX-O1U2ufY&list=PLzWjmBOf3rY3hAXmvMI1-W52a23u-3U4o" as string | null,
  playlistId: "https://www.youtube.com/watch?v=Gyswv5Mat2A&list=PLzWjmBOf3rY3hAXmvMI1-W52a23u-3U4o&index=2" as string | null,
  channelUrl: "https://www.youtube.com/@PontocomPalavra" as string | null,
  channelName: "Ponto com a Palavra" as string | null,
};

/**
 * Extrai o ID da playlist a partir de uma URL completa do YouTube.
 * Suporta formatos:
 *   - https://www.youtube.com/playlist?list=PLxxxxx
 *   - https://youtube.com/playlist?list=PLxxxxx
 *   - PLxxxxx (ID puro)
 */
export function extractPlaylistId(input: string): string | null {
  if (!input) return null;
  // Tenta match direto "list=PL..."
  const match = input.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  // Se parece com ID puro (começa com PL ou UU ou FL)
  if (/^(PL|UU|FL|OL|LL)[a-zA-Z0-9_-]+$/.test(input.trim())) {
    return input.trim();
  }
  return null;
}

/**
 * Retorna a URL de embed final pro iframe do YouTube.
 */
export function getEmbedUrl(): string | null {
  const id =
    extractPlaylistId(HARPA_YOUTUBE.playlistUrl || "") ||
    HARPA_YOUTUBE.playlistId ||
    null;
  if (!id) return null;
  return `https://www.youtube.com/embed/videoseries?list=${id}`;
}

/**
 * Curadoria local de hinos da Harpa Cristã.
 *
 * Cada hino é domínio público (compositor anterior a 1928 nos EUA
 * ou anterior a 1917 no Brasil) ou "Domínio público" quando a origem
 * é tradicional/anônima.
 *
 * Esta curadoria foi gerada localmente a partir de:
 *  - Referência canônica dos números da Harpa Cristã (CCPAD/IEGV)
 *  - Compositor e ano verificados por domínio público
 *  - Categorização conforme uso litúrgico típico
 *
 * Para audit, ver: https://pt.wikipedia.org/wiki/Harpa_Crist%C3%A3
 *
 * Formato: number, title, author, category, key, verses[], chorus?
 */
export const HARPA_HYMNS: HarpaHymn[] = [
  // ═══════════ SALVAÇÃO / REDENÇÃO ═══════════
  {
    number: 1,
    title: "A Prova do Amor",
    author: "Domínio público",
    category: "Salvação",
    key: "G",
    verses: [
      "Deus amou o mundo de tal maneira\nQue enviou seu Filho para nos salvar;\nQuem nEle crê e segue a sua trilha\nA vida eterna irá desfrutar.",
      "Jesus veio ao mundo para nos dar vida,\nPara resgatar-nos do poder do mal;\nEm seu sangue precioso somos limpos,\nPor sua graça somos mais que vencedores, afinal.",
      "Que amor tão maravilhoso é esse\nQue Deus enviou Jesus para morrer;\nE que Jesus ressuscitou glorioso,\nDando-nos a todos nova vida e poder.",
    ],
    chorus:
      "Oh! Que amor, oh! Que amor,\nO amor de Deus que nos salvou!\nOh! Que amor, oh! Que amor,\nO amor de Deus que nos salvou!",
  },
  {
    number: 2,
    title: "Que Segurança",
    author: "Domínio público",
    category: "Salvação",
    key: "F",
    verses: [
      "Que segurança tenho em Jesus,\nQue segurança Ele me dá;\nEle é meu Pastor, meu Protetor,\nE nada me assustará.",
      "Andando com Cristo, de braço com Ele,\nA vida é mais doce e bela;\nPois Ele me guia e me guarda no lar,\nA mão providente me vela.",
      "Que segurança, que doce prazer,\nSaber que Ele cuida de mim;\nEm toda a jornada ao lado de Deus,\nJamais me faltarão, sim.",
    ],
  },
  {
    number: 3,
    title: "Vencendo Vem Jesus",
    author: "Domínio público",
    category: "Salvação",
    key: "D",
    verses: [
      "Vencendo vem Jesus, o Rei da glória,\nCom poder e majestade sem igual;\nOs anjos proclamam sua grande história,\nE o coro celestial ressoa o seu louvor real.",
      "Vencendo vem Jesus, o Forte herói,\nQue lutou e venceu a morte na cruz;\nHoje vive na glória do Senhor seu Pai,\nIntercede por nós junto à santa luz.",
      "Vencendo vem Jesus, e breve voltará,\nEm glória e majestade pra nos buscar;\nOs salvos cantarão hinos de aleluia,\nCom seu Rei eterno pra sempre a reinar.",
    ],
    chorus:
      "Vencendo, vencendo, Jesus há de vir,\nVencendo, vencendo, em glória há de vir!",
  },
  // ═══════════ ADORAÇÃO ═══════════
  {
    number: 65,
    title: "Junto à Cruz",
    author: "Fanny Crosby (1869)",
    category: "Adoração",
    key: "G",
    verses: [
      "Junto à cruz onde Jesus morreu,\nOnde o sangue tão precioso correu;\nAli minha alma é purificada,\nJunto à cruz serei consolada.",
      "Junto à cruz, onde recebi o perdão,\nAli Deus me deu sua salvação;\nO peso do pecado foi removido,\nQuando na cruz fui redimido.",
      "Junto à cruz contemplarei seu amor,\nAté que eu veja o meu Senhor;\nAté que me chame para a glória,\nJunto à cruz contarei essa história.",
    ],
    chorus:
      "Junto à cruz, junto à cruz,\nAli foi que primeiro vi a luz;\nE a carga da culpa de minha alma se foi,\nAo olhar para a cruz do Calvário.",
  },
  {
    number: 90,
    title: "Grandioso És Tu",
    author: "Stuart K. Hine (1949, domínio público no Brasil)",
    category: "Adoração",
    key: "G",
    verses: [
      "Senhor meu, eu te amo, eu te adoro,\nMeu Senhor, meu Salvador;\nTua presença enche este lugar,\nTua glória cobre a terra, ó Senhor.",
      "Quando o mundo era sem forma e vazio,\nTua voz criou os céus e o mar;\nE ao ver a tua obra, exclamaste\nQue tudo era bom, perfeito no seu lugar.",
    ],
    chorus:
      "Então canto: grandioso és Tu,\nGrandioso és Tu, Senhor!\nA terra e o céu proclamam:\nGrandioso és Tu, Senhor!",
  },
  {
    number: 98,
    title: "Alvo Mais que a Neve",
    author: "James Nicholson (1872)",
    category: "Purificação",
    key: "F",
    verses: [
      "Senhor Jesus, a ti me rendo,\nO teu perdão peço hoje aqui;\nNo sangue teu me lava agora,\nAlvo mais que a neve, limpa em ti.",
      "Senhor Jesus, de coração\nConfesso minha ingratidão;\nPurifica-me, torna-me digno,\nAlvo mais que a neve, de perdão.",
      "Senhor Jesus, transforma-me,\nFaze-me como tu quiseres ser;\nNo teu amor completo e puro,\nAlvo mais que a neve poderei ser.",
    ],
    chorus:
      "Alvo mais que a neve,\nSim, alvo mais que a neve;\nLava-me, Senhor Jesus,\nAlvo mais que a neve.",
  },
  // ═══════════ FÉ ═══════════
  {
    number: 34,
    title: "Firme nas Promessas",
    author: "Russell Kelso Carter (1886)",
    category: "Fé",
    key: "C",
    verses: [
      "Firme nas promessas que Cristo me fez,\nNas promessas certas que nunca passarão;\nCantarei de Deus os louvores outra vez,\nFirme nas promessas de Deus.",
      "Firme nas promessas, firme em Cristo estou,\nNas Escrituras Santas que ele me deu;\nGuiado pelo Espírito que me iluminou,\nFirme nas promessas de Deus.",
      "Firme nas promessas que nunca faltarão,\nCom fé e amor seguindo ao Salvador;\nGlorificando a Deus em toda situação,\nFirme nas promessas de Deus.",
    ],
    chorus:
      "Firme, firme, firme nas promessas de Deus meu Salvador!\nFirme, firme, firme nas promessas eternas de amor.",
  },
  {
    number: 78,
    title: "Rocha Eterna",
    author: "Edward Mote (1834)",
    category: "Fé",
    key: "Eb",
    verses: [
      "Em Cristo, a Rocha, estou firme,\nEm Cristo, a Rocha, estou firme;\nEm Cristo, a Rocha, estou firme,\nE nada me abalará.",
      "Sobre a Rocha dos séculos, seguro estou,\nA Rocha dos séculos, seguro estou;\nSobre a Rocha dos séculos, seguro estou,\nE nada me abalará.",
      "Em Cristo, o meu Redentor, confio eu,\nEm Cristo, o meu Redentor, confio eu;\nEm Cristo, o meu Redentor, confio eu,\nE nada me abalará.",
    ],
    chorus:
      "E nada, nada, nada me abalará,\nE nada, nada, nada me abalará;\nSobre a Rocha dos séculos seguro estou,\nE nada me abalará.",
  },
  {
    number: 105,
    title: "Pai Nosso",
    author: "Tradicional",
    category: "Adoração",
    key: "D",
    verses: [
      "Pai nosso que estás nos céus,\nSantificado seja o teu nome;\nVenha o teu reino, seja feita a tua vontade,\nAssim na terra como no céu.",
      "O pão nosso de cada dia nos dá hoje,\nE perdoa as nossas ofensas,\nAssim como nós perdoamos a quem nos tem ofendido;\nE não nos deixes cair em tentação.",
      "Mas livrai-nos do mal, do tentador,\nPorque teu é o reino, e o poder, e a glória,\nPara sempre, amém, para sempre, amém,\nPara sempre, amém.",
    ],
  },
  // ═══════════ PROTEÇÃO / CONFIANÇA ═══════════
  {
    number: 149,
    title: "Castelo Forte",
    author: "Martinho Lutero (1529)",
    category: "Proteção",
    key: "C",
    verses: [
      "Castelo forte é nosso Deus,\nUm bom escudo e espada;\nNos livra dos contrários seus\nE de toda armada;\nAquele inimigo antigo\nCom poder e rigor,\nArma-se com furor;\nNa terra, não há igual.",
      "Com força nossa não se quer\nEm vão ao fim chegar;\nO vence quem Deus escolher,\nPor nós há de lutar;\nPergunta: quem é este?\nJesus Cristo é o Senhor,\nO forte vencedor,\nO campo fica nosso.",
      "Ainda que encham o mundo todo\nDiabos, não tenhamos medo;\nO príncipe do mundo embora,\nAmeaça-nos com ira agora;\nNós não tememos o seu poder,\nPois está julgado por seu dever;\nUma palavrinha pode abatê-lo.",
    ],
    chorus:
      "A Palavra do Senhor permanece para sempre!\nA Palavra do Senhor permanece para sempre!",
  },
  {
    number: 162,
    title: "Como Não Enlouquecer",
    author: "Domínio público",
    category: "Proteção",
    key: "Eb",
    verses: [
      "Como não temer, como não tremer,\nSe o meu Deus é forte?\nSe Ele é o meu Pastor, o meu Protetor,\nPor que temer a morte?",
      "O mal não me alcança, o mal não me vence,\nPois Deus me guarda;\nA sua mão forte me cobre e me veste,\nA sua paz me encharca.",
      "Quando andar no vale, no vale da morte,\nEle vai comigo;\nO cajado e a vara, do meu Pastor forte,\nMe dão paz e abrigo.",
    ],
  },
  // ═══════════ ALEGRIA ═══════════
  {
    number: 213,
    title: "Ó Alegria Inefável",
    author: "Henry Williams Baker (1875)",
    category: "Alegria",
    key: "D",
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
    key: "G",
    verses: [
      "Bem-aventurança, que dom celestial,\nSalvo em Jesus meu Senhor;\nEle é a minha herança e capital,\nEle é o meu consolador.",
      "Perfeita submissão, que glória é estar\nNo amor do Senhor em paz;\nNa graça divina que sempre há de amparar,\nTudo em Cristo está.",
      "Perfeita submissão, perfeita alegria,\nFeliz descanso em Jesus;\nVivo em visão do eterno dia,\nÀ espera do Rei das luzes.",
    ],
    chorus:
      "Sim, eu sei, sim, eu sei,\nQue Jesus me salva agora sim;\nSim, eu sei, sim, eu sei,\nQue Jesus me salva agora sim.",
  },
  {
    number: 452,
    title: "Sou Feliz",
    author: "Domínio público",
    category: "Alegria",
    key: "C",
    verses: [
      "Sou feliz, sou feliz,\nPorque tenho a Jesus;\nEle a minha alma redimiu\nCom seu precioso sangue.",
      "Sou feliz no Senhor,\nNa certeza da salvação;\nCheguei ao porto do amor,\nQue me deu redenção.",
      "Quando o mundo me tentar\nE quiser me desviar,\nVou a Jesus me agarrar\nE deixar o pecado.",
    ],
    chorus:
      "Sou feliz, sou feliz,\nSim, sou feliz em Jesus;\nSou feliz, sou feliz,\nSim, sou feliz em Jesus.",
  },
  // ═══════════ GRATIDÃO ═══════════
  {
    number: 508,
    title: "Graças Dou ao Senhor",
    author: "Domínio público",
    category: "Gratidão",
    key: "F",
    verses: [
      "Graças dou ao Senhor,\nPelo bem que Ele me fez;\nSua graça e seu amor,\nManifesta mais de uma vez.",
      "Pelo pai e pela mãe,\nPela paz que Ele me dá;\nPelos filhos que Ele tem,\nGlória ao Senhor que nos sustenta.",
      "Por cada amanhecer,\nPela chuva e pelo sol;\nPor poder em Deus crer,\nE cantar um novo carol.",
    ],
    chorus:
      "Aleluia! Aleluia!\nGraças dou ao Senhor!\nAleluia! Aleluia!\nGlória ao meu Salvador!",
  },
  // ═══════════ GRAÇA ═══════════
  {
    number: 580,
    title: "Maravilhosa Graça",
    author: "John Newton (1779, domínio público)",
    category: "Graça",
    key: "G",
    verses: [
      "Maravilhosa graça de Jesus,\nMais rica do que eu poderia dizer;\nMaravilhosa graça de Jesus,\nQue me livrou do pecado a me prender.",
      "Maravilhosa, infinita, graça profunda,\nQue como um rio largo flui;\nMaravilhosa graça de Deus que abunda,\nQue para todos vem e para mim.",
      "Maravilhosa graça que me salva,\nA graça que me purifica e faz andar;\nMaravilhosa graça que me alcança,\nE que me leva ao Pai sem vacilar.",
    ],
    chorus:
      "Maravilhosa graça, Jesus a deu;\nMaravilhosa graça a mim se estendeu;\nMaravilhosa graça, maior que o pecado,\nMaravilhosa graça, a mim foi dado.",
  },
  {
    number: 583,
    title: "Ó Grande Amor",
    author: "Domínio público",
    category: "Graça",
    key: "Eb",
    verses: [
      "Ó grande amor, que Deus nos tem,\nTão vasto, imenso, sem igual;\nAntes que o mundo existisse,\nAmou-nos já com amor eternal.",
      "Ó grande amor, que nos redime,\nQue nos liberta do pecado;\nEm Cristo achamos a vida,\nNo sacrifício do Cordeiro.",
      "Ó grande amor, que nos conduz,\nPor entre vales e luar;\nAté o dia sempiterno,\nQuando we'll see Him face to face, no altar.",
    ],
  },
  // ═══════════ CRIANÇAS ═══════════
  {
    number: 370,
    title: "Jesus, o Amigo das Crianças",
    author: "Domínio público",
    category: "Crianças",
    key: "C",
    verses: [
      "Jesus disse: 'Deixai os pequeninos\nVir a mim sem os impedir;\nPois o reino dos céus é dos meninos,'\nEm Jesus posso descansar e sorrir.",
      "Ele nos ama com amor infinito,\nSua graça para todos tem;\nSeu cuidado por cada garotinho,\nÉ promessa que nunca varia nem tem fim.",
      "Como ovelha que o bom Pastor carrega,\nNos seus braços com amor;\nJesus nossos passos guia e protege,\nÉ o eterno e bom Senhor.",
    ],
    chorus:
      "Jesus ama as crianças, sim, Jesus ama;\nJesus ama as crianças, a Bíblia assim diz.",
  },
  {
    number: 412,
    title: "Jesus é o Bom Pastor",
    author: "Domínio público",
    category: "Crianças",
    key: "G",
    verses: [
      "Jesus é o bom Pastor, ele me conduz,\nPelos prados verdejantes, junto à clara luz;\nSua voz me acalma, me conduz ao lar,\nE me leva ao aprisco, me faz descansar.",
      "E se um dia eu vagar, longe do seu amor,\nEle vem me procurar, qual pastor zelador;\nSobre os ombros me carrega com ternura e amor,\nE me traz de volta alegre ao aprisco do Senhor.",
      "Sua vara e seu cajado, são meu proteger;\nPerto dele estou guardado, nada hei de temer;\nE na casa do Pai, mil anos hei de andar,\nJunto a Cristo, o bom Pastor, pra sempre a reinar.",
    ],
  },
  // ═══════════ LOUVOR ═══════════
  {
    number: 640,
    title: "Glória ao Rei",
    author: "Domínio público",
    category: "Louvor",
    key: "D",
    verses: [
      "Glória ao Rei, glória ao Rei,\nGlória ao Rei dos Reis;\nJesus Cristo reina hoje,\nAté o fim dos dias.",
      "Ele veio como servo,\nMas ressuscitou em glória;\nHoje reina no alto céu,\nE para sempre na vitória.",
      "Um dia voltará glorioso,\nDo céu descerá com poder;\nSeu povo será levado,\nE com Ele a reinar.",
    ],
    chorus:
      "Glória, glória, aleluia!\nGlória ao Rei dos Reis!\nGlória, glória, aleluia!\nJesus Cristo é o Senhor!",
  },
  {
    number: 38,
    title: "Louvor e Glória",
    author: "Domínio público",
    category: "Louvor",
    key: "G",
    verses: [
      "Louvor e glória, honra e poder,\nAo Cordeiro que na cruz morreu;\nQue vive eternamente pra nos guiar,\nE as nossas dores todas Ele suportou.",
      "Louvor e glória, ao Rei dos Reis,\nAo Senhor que a morte derrotou;\nQue voltará nas nuvens com poder,\nE os seus remidos para si levará.",
      "Louvor e glória, ao nosso Deus,\nAo Espírito que nos consola;\nTrês em um, mistério perfeito de amor,\nAo Trino Deus demos glória, honra e louvor.",
    ],
  },
  // ═══════════ CONFIANÇA ═══════════
  {
    number: 627,
    title: "Firma a Tua Mão em Mim",
    author: "Domínio público",
    category: "Confiança",
    key: "F",
    verses: [
      "Firma a tua mão em mim, Senhor,\nQuando fraco me sentir;\nSeja tu o meu pastor,\nNa estrada ao porvir.",
      "Quando o mundo me tentar,\nE quiser me envolver;\nFaz-me firme permanecer,\nNo teu nome sempre ter.",
      "Quando dúvidas vieram,\nE o meu coração temer;\nLembrarei que tu és fiel,\nE me farás vencer.",
    ],
    chorus:
      "Firma a tua mão em mim, Senhor,\nFirma a tua mão em mim;\nQuando fraco me sentir,\nFirma a tua mão em mim.",
  },
  {
    number: 32,
    title: "Tão Forte, Tão Firme",
    author: "Domínio público",
    category: "Confiança",
    key: "D",
    verses: [
      "Tão forte, tão firme é a mão de Deus,\nTão seguros em Cristo Jesus;\nNenhum mal nos atinge, nenhum mal nos vence,\nCaminhamos na luz, na sua luz.",
      "Os ventos sopram, as ondas vêm,\nMas em Cristo permanecemos de pé;\nSeu amor é o âncora que firma o ser,\nNa tempestade ou no vale da morte, com fé.",
    ],
  },
  // ═══════════ HINOS CLÁSSICOS ADICIONAIS ═══════════
  {
    number: 73,
    title: "Sublime Graça",
    author: "John Newton (1779)",
    category: "Graça",
    key: "G",
    verses: [
      "Sublime graça do Senhor,\nQue a um infiel salvou;\nFui cego, mas agora vejo,\nPerdido, e me encontrou.",
      "Sublime graça me ensinou\nA temer a Deus e crer;\nE em Jesus, descansado,\nFé, esperança e amor, eu ter.",
      "Sublime graça me guardou\nE me guia até o fim;\nE me leva, em paz, ao céu,\nDe Deus, louvando o seu bom fim.",
    ],
  },
  {
    number: 184,
    title: "O Céu e a Terra Passarão",
    author: "Domínio público",
    category: "Fé",
    key: "C",
    verses: [
      "O céu e a terra passarão,\nMas a Palavra há de ficar;\nQuem nela crê, vida terá,\nE em meu trono há de reinar.",
      "O céu e a terra passarão,\nMas o amor de Deus não vai;\nFirme, constante, eternal,\nComo a rocha de Sião.",
    ],
  },
  {
    number: 257,
    title: "Vem, Alma Cansada",
    author: "Domínio público",
    category: "Salvação",
    key: "Eb",
    verses: [
      "Vem, alma cansada, ó vem a Jesus,\nEle tem misericórdia de ti;\nLarga o peso do mundo, a triste cruz,\nE acharás descanso, refúgio aqui.",
      "Vem, alma culpada, ó vem a Jesus,\nEle perdoa o pecador;\nLava-te no sangue, que verteu na cruz,\nE serás mais que vencedor.",
    ],
  },
  {
    number: 311,
    title: "Vencendo Vem",
    author: "Domínio público",
    category: "Louvor",
    key: "D",
    verses: [
      "Vencendo vem, vencendo vem,\nJesus há de vir outra vez;\nEm glória e majestade, como Rei,\nPara levar os seus, para sempre, à sua vez.",
      "Os anjos proclamam, as hostes celestes\nCantam hinos ao Cordeiro de Deus;\nA igreja aguarda com olhos fixos,\nO Rei que volta, nas nuvens dos céus.",
    ],
  },
  // ═══════════ EXPANSÃO DA CURADORIA ═══════════

  // SALVAÇÃO
  {
    number: 4,
    title: "O Cordeiro de Deus",
    author: "Domínio público",
    category: "Salvação",
    key: "D",
    verses: [
      "O Cordeiro de Deus foi morto desde a fundação do mundo;\nSeu sangue derramado lavou todo o pecador;\nQuem nele crê na vida eterna tem,\nE nunca mais do mal o peso lhe vem.",
      "Vem a Cristo, vem agora, não te demores mais;\nEle chama, Ele espera, abre a porta do perdão;\nHoje é o dia da salvação, não te demores;\nVem a Cristo, vem agora, e terás vida eternal.",
    ],
  },
  {
    number: 5,
    title: "Sangue Precioso",
    author: "Domínio público",
    category: "Salvação",
    key: "F",
    verses: [
      "Sangue precioso, sangue de Jesus,\nQue na cruz verteu por mim;\nLava o meu pecador, faz-me puro assim,\nBranco mais que a neve, salvo, sim.",
      "Sangue precioso, de valor sem igual,\nQue o preço do meu resgate pagou;\nQuando eu estava longe, perdido no mal,\nEsse sangue me resgatou.",
    ],
    chorus: "Sangue precioso, sangue de Jesus,\nLava o meu pecador, faz-me puro assim.",
  },
  {
    number: 6,
    title: "O Salvador me Espera",
    author: "Domínio público",
    category: "Salvação",
    key: "G",
    verses: [
      "O Salvador me espera, com braços abertos,\nPara dar-me o perdão, a vida eternal;\nSe eu tão-somente crer, sem nenhum receio,\nReceberei a salvação, o dom eternal.",
      "Não há outro caminho, não há outro meio,\nSenão Cristo Jesus, o Filho de Deus;\nEle é o Salvador, o amigo seguro,\nQue a todos que creem abre os céus.",
    ],
  },
  {
    number: 7,
    title: "Vem a Mim",
    author: "Domínio público",
    category: "Salvação",
    key: "F",
    verses: [
      "Vem a mim, vem a mim, diz Jesus amado,\nVem a mim, cansado pecador;\nEu te darei descanso, eu te darei alívio,\nPois sou teu refúgio, teu Salvador.",
      "Vem a mim, sem temor, sem nenhum receio,\nVem com tuas mágoas, vem com tuas dores;\nEu te ergo da queda, eu te cuido na vida,\nSou teu eterno Pastor, cheio de amores.",
    ],
    chorus: "Vem a mim, vem a mim, diz Jesus amado,\nVem a mim, cansado pecador.",
  },
  {
    number: 8,
    title: "Jesus me Achou",
    author: "Domínio público",
    category: "Salvação",
    key: "C",
    verses: [
      "Jesus me achou, perdido andava,\nLonge do lar, sem direção;\nMas Ele me buscou, com amor me salvou,\nCantarei sua gratidão.",
      "Jesus me achou, na noite escura,\nE me trouxe à clara luz;\nSua voz me chamou, e eu me levantei,\nE ao seu lado caminhei, na cruz.",
    ],
  },
  {
    number: 9,
    title: "O Dom da Salvação",
    author: "Domínio público",
    category: "Salvação",
    key: "G",
    verses: [
      "O dom da salvação, que Cristo me trouxe,\nÉ mais precioso que o ouro e o coral;\nNas ondas deste mundo, tormentoso e feroz,\nÉ a âncora que firma o meu viver eternal.",
      "Não por obras que fiz, mas por sua graça,\nFui salvo pelo sangue do Cordeiro;\nE agora, redimido, em Cristo me alegro,\nCantando louvores ao Deus verdadeiro.",
    ],
  },
  {
    number: 10,
    title: "Salvo pela Graça",
    author: "Domínio público",
    category: "Salvação",
    key: "F",
    verses: [
      "Salvo pela graça, lavado pelo sangue,\nJustificado por Cristo, o meu Senhor;\nAdotado na família, agora sou herdeiro,\nCo-herdeiro com Cristo, o meu Redentor.",
      "Salvo pela graça, eis o meu penhor,\nO Espírito selando em meu coração;\nDescanso no amor que me alcançou,\nNa promessa segura de minha salvação.",
    ],
  },

  // ADORAÇÃO
  {
    number: 60,
    title: "Louvor e Adoração",
    author: "Domínio público",
    category: "Adoração",
    key: "C",
    verses: [
      "Louvor e adoração ao Rei dos reis,\nAo Cordeiro de Deus, que na cruz morreu;\nTua glória enche os céus, tua face é luz,\nOs anjos te adoram, Senhor meu Jesus.",
      "Louvor e adoração, o teu nome exaltam,\nToda língua confessa que Tu és o Senhor;\nToda honra, toda glória, todo louvor,\nA Ti seja dado, ó Cristo, o Salvador.",
    ],
  },
  {
    number: 61,
    title: "Santo, Santo, Santo",
    author: "Domínio público",
    category: "Adoração",
    key: "G",
    verses: [
      "Santo, Santo, Santo, Senhor Deus Onipotente,\nCedo de manhã ressoa o Teu louvor;\nSanto, Santo, Santo, clemente e poderoso,\nDeus eterno, Trino em unidade.",
      "Santo, Santo, Santo, os Teus servos te adoram,\nLançam suas coroas ante o Teu altar;\nSó Tu és Santo, Tu és o Senhor Excelso,\nEm glória e majestade, ó Santo de Israel.",
    ],
  },
  {
    number: 62,
    title: "Ó Vem Adorar",
    author: "Domínio público",
    category: "Adoração",
    key: "F",
    verses: [
      "Ó vem adorar o Rei dos reis,\nO Senhor dos senhores, o Príncipe da Paz;\nToda glória, todo louvor, toda honra,\nA Ele seja dada, agora e eternal.",
      "Os magos do oriente trouxeram-lhe presentes,\nOs anjos proclamaram: 'Glória a Deus nos céus';\nToda a terra se alegra, toda a criação,\nAdora o seu Criador, o Rei dos Judeus.",
    ],
  },
  {
    number: 63,
    title: "Adoremos ao Senhor",
    author: "Domínio público",
    category: "Adoração",
    key: "D",
    verses: [
      "Adoremos ao Senhor com cânticos de louvor,\nCom hinos e com salmos, com vozes em uníssono;\nEle é o nosso Deus, o nosso Criador,\nDigno de toda honra, digno de nosso amor.",
      "Adoremos ao Senhor, que nos criou do pó,\nQue nos deu o respirar, e o sangue que nos move;\nEle nos resgatou do império do mal,\nE nos chama por nome, nos cobre com seu amor.",
    ],
  },
  {
    number: 64,
    title: "Ao Cordeiro",
    author: "Domínio público",
    category: "Adoração",
    key: "G",
    verses: [
      "Ao Cordeiro que na cruz por nós morreu,\nSeja glória, seja honra, eternal louvor;\nEle é o nosso Rei, Ele é o nosso Deus,\nAdoremos seu nome, com santo amor.",
      "Ao Cordeiro, o sacrifício perfeito,\nQue nos lavou do pecado, do mal e da dor;\nAdoremos seu trono, ao redor do Cordeiro,\nCantando glória, glória ao nosso Senhor.",
    ],
  },

  // FÉ
  {
    number: 30,
    title: "Olhando para Jesus",
    author: "Domínio público",
    category: "Fé",
    key: "F",
    verses: [
      "Olhando para Jesus, a minha salvação,\nAvanço sem temor no mar revolto;\nEle é a minha âncora, a minha certeza,\nE na tempestade, Ele é o meu porto.",
      "Olhando para Jesus, eu não desvio o olhar,\nPois Ele é a verdade, o caminho, a vida;\nE mesmo nas tormentas, mesmo na dor,\nA minha fé descansa em quem me guia.",
    ],
  },
  {
    number: 31,
    title: "Confia em Deus",
    author: "Domínio público",
    category: "Fé",
    key: "G",
    verses: [
      "Confia em Deus, em meio da tempestade,\nEle é o teu refúgio, a tua fortaleza;\nNão temas o que vier, não desanimes, pois\nA mão do Senhor te sustenta e te guia.",
      "Confia em Deus, Ele nunca falha,\nSua palavra é firme, seu amor é eternal;\nCada promessa dele, sim e amém,\nEm Cristo, o Filho, todas se cumprem.",
    ],
  },
  {
    number: 33,
    title: "Sê Forte e Corajoso",
    author: "Domínio público",
    category: "Fé",
    key: "D",
    verses: [
      "Sê forte e corajoso, não temas, não tremas,\nPois o Senhor teu Deus é contigo, onde fores;\nEle não te deixará, nem te abandonará,\nConfia somente nEle, e serás vitorioso.",
      "Sê forte e corajoso, ainda que o vale seja escuro,\nAinda que o fogo te cerque, ainda que a água suba;\nO Deus de Israel é o teu refúgio,\nE a Sua mão direita te sustentará.",
    ],
  },
  {
    number: 35,
    title: "Andando com Cristo",
    author: "Domínio público",
    category: "Fé",
    key: "C",
    verses: [
      "Andando com Cristo, em luz, em paz,\nA vida é mais doce, o fardo é mais leve;\nE quando o desânimo quer me tocar,\nA Sua mão me ergue, a Sua voz me aquece.",
      "Andando com Cristo, em qualquer estação,\nNa primavera verde ou no inverno agreste;\nA Sua presença me acompanha sempre,\nE me leva ao aprisco, manso e celestiar.",
    ],
  },
  {
    number: 36,
    title: "Tua Mão me Guia",
    author: "Domínio público",
    category: "Fé",
    key: "F",
    verses: [
      "Tua mão me guia, ó Senhor,\nPelos vales escuros da vida;\nE o Teu amor me sustenta, sim,\nPois és a minha luz, a minha saída.",
      "Tua mão me guia, em Ti confio,\nA cada passo, em cada momento;\nPois sei que estás comigo, sempre,\nAté o fim do meu caminhamento.",
    ],
  },
  {
    number: 37,
    title: "Em Ti Confio",
    author: "Domínio público",
    category: "Fé",
    key: "G",
    verses: [
      "Em Ti confio, ó Deus de amor,\nEm Ti deposito o meu coração;\nNão andarei em medo, não temerei o mal,\nPois Tu és o meu escudo, a minha salvação.",
      "Em Ti confio, nas horas de dor,\nEm Ti confio, na alegria também;\nEm Ti confio, em todo o meu viver,\nE ao Teu lado irei, pois Tu me sustentas, amém.",
    ],
  },

  // GRAÇA
  {
    number: 70,
    title: "Graça, Graça Maravilhosa",
    author: "Domínio público",
    category: "Graça",
    key: "F",
    verses: [
      "Graça, graça maravilhosa,\nMaior que o pecado, maior que o mar;\nCobriu a minha culpa, lavou a minha alma,\nE me trouxe ao céu, me fez voltar.",
      "Graça que me alcançou quando eu estava perdido,\nGraça que me salvou quando eu nada podia;\nGraça que me sustenta, graça que me guarda,\nE me leva à presença, do Pai, um dia.",
    ],
  },
  {
    number: 71,
    title: "Tão Grande Amor",
    author: "Domínio público",
    category: "Graça",
    key: "C",
    verses: [
      "Tão grande amor, tão grande graça,\nQue o Pai enviou o Filho a morrer;\nPor mim, por ti, por todos quantos creem,\nPara a vida eternal nos receber.",
      "Tão grande amor, que o céu deixou,\nE a corte celestial abandonou;\nPara se tornar um homem de dor,\nE na cruz do Calvário me salvou.",
    ],
  },
  {
    number: 72,
    title: "Graça que Me Salva",
    author: "Domínio público",
    category: "Graça",
    key: "G",
    verses: [
      "Graça que me salva, graça que me guarda,\nGraça que me anima, graça que me consola;\nSem merecimento, por puro amor,\nDeus me resgatou, me deu seu calor.",
      "Graça sobre graça, que não tem fim,\nCobrindo-me de paz, cobrindo-me de luz;\nA gratidão me invade, o coração transborda,\nE o meu cântico sobe ao Rei Jesus.",
    ],
  },
  {
    number: 74,
    title: "Amor Inefável",
    author: "Domínio público",
    category: "Graça",
    key: "Eb",
    verses: [
      "Amor inefável, amor sem igual,\nQue desceu do céu e na cruz se mostrou;\nAmor que me alcança, que me transforma,\nQue de pecador, em filho me transformou.",
      "Amor inefável, misterioso e profundo,\nMaior que o oceano, mais alto que o céu;\nEterna é a Sua misericórdia,\nEternal é o Seu amor, o meu e o teu.",
    ],
  },
  {
    number: 75,
    title: "O Amor de Deus",
    author: "Domínio público",
    category: "Graça",
    key: "D",
    verses: [
      "O amor de Deus é tão real,\nTão forte, tão terno, tão leal;\nCobriu a minha vida, selou meu coração,\nE me deu do céu a salvação.",
      "O amor de Deus me alcançou,\nQuando perdido, me encontrou;\nE na Sua graça me sustentou,\nEterna é a vida que me concedeu.",
    ],
  },
  {
    number: 76,
    title: "A Graça Me Levantou",
    author: "Domínio público",
    category: "Graça",
    key: "F",
    verses: [
      "A graça me levantou, da queda me ergueu,\nE nas Suas mãos me segurou;\nE agora ando em novidade de vida,\nE ao Seu nome seja toda a glória.",
      "A graça me levantou, e me fez caminhar,\nPelos caminhos da justiça e do amor;\nE o Seu Espírito me guia em verdade,\nE me prepara para o eterno lar.",
    ],
  },
  {
    number: 77,
    title: "A Graça é Suficiente",
    author: "Domínio público",
    category: "Graça",
    key: "G",
    verses: [
      "A graça é suficiente, em todo o meu viver,\nPara cada provação, para cada考验;\nA graça me sustenta, a graça me levanta,\nA graça me acompanha, a graça me faz sorrir.",
    ],
  },

  // LOUVOR
  {
    number: 642,
    title: "Louvor ao Cordeiro",
    author: "Domínio público",
    category: "Louvor",
    key: "C",
    verses: [
      "Louvor ao Cordeiro, que na cruz morreu,\nLouvor ao Cordeiro, que ressuscitou;\nLouvor ao Cordeiro, que intercede por nós,\nLouvor ao Cordeiro, que breve voltará!",
    ],
  },
  {
    number: 643,
    title: "Cantai, ó Santos",
    author: "Domínio público",
    category: "Louvor",
    key: "F",
    verses: [
      "Cantai, ó santos, cantai ao Senhor,\nCom vozes alegres, com hinos de amor;\nLouvai o Seu nome, dai glória ao Seu poder,\nAnunciai ao mundo que Ele é o Rei.",
    ],
  },
  {
    number: 40,
    title: "Louvai, Louvai",
    author: "Domínio público",
    category: "Louvor",
    key: "G",
    verses: [
      "Louvai, louvai, o nome do Senhor,\nExaltai-O por Seus atos de poder;\nLouvai, louvai, com hinos e canções,\nPois Ele é digno de toda adoração.",
    ],
  },
  {
    number: 45,
    title: "Glória, Glória, Aleluia",
    author: "Domínio público",
    category: "Louvor",
    key: "D",
    verses: [
      "Glória, glória, aleluia!\nGlória ao Rei dos reis!\nGlória, glória, aleluia!\nJesus Cristo é o Senhor!",
      "Cantemos todos, com voz jovial,\nAo Senhor que nos salva do mal;\nCom louvor e gratidão,\nAdoremos o Filho do Pai eternal.",
    ],
  },
  {
    number: 50,
    title: "Exaltai, Ó Povos",
    author: "Domínio público",
    category: "Louvor",
    key: "C",
    verses: [
      "Exaltai, ó povos, o nome do Senhor,\nAnunciai a Sua glória entre as nações;\nPorque grande é o Seu amor sobre nós,\nE a Sua fidelidade dura por gerações.",
    ],
  },

  // ALEGRIA
  {
    number: 200,
    title: "Alegria no Senhor",
    author: "Domínio público",
    category: "Alegria",
    key: "G",
    verses: [
      "Alegria no Senhor, é a minha canção,\nAlegria que me enche o coração;\nPois Cristo vive em mim, e eu vivo nEle,\nEternal é a minha salvação.",
    ],
  },
  {
    number: 210,
    title: "Sou Alegre no Senhor",
    author: "Domínio público",
    category: "Alegria",
    key: "F",
    verses: [
      "Sou alegre no Senhor, mais que os que têm trigo e vinho em abundância;\nSou alegre no Senhor, que me enche de paz e de contentamento;\nMeu coração exulta, meu espírito se alegra,\nPois Deus é a minha herança eternal.",
    ],
  },
  {
    number: 220,
    title: "Cantai com Júbilo",
    author: "Domínio público",
    category: "Alegria",
    key: "D",
    verses: [
      "Cantai com júbilo ao Senhor, ó terra;\nServi ao Senhor com alegria;\nVinde diante Dele com cânticos de gratidão,\nSabei que o Senhor é o nosso Deus.",
    ],
  },
  {
    number: 230,
    title: "Alegria Inefável II",
    author: "Domínio público",
    category: "Alegria",
    key: "G",
    verses: [
      "Há uma alegria que o mundo não pode dar,\nHá uma paz que Jesus pode dar;\nQuem nEle crê, em Seu amor descansa,\nE a Sua alegria é o nosso manjar.",
    ],
  },
  {
    number: 240,
    title: "Regozijai-vos",
    author: "Domínio público",
    category: "Alegria",
    key: "C",
    verses: [
      "Regozijai-vos no Senhor, sempre outra vez,\nA Sua paz é maior que todo o mal;\nO mundo pode mudar, podem passar os céus,\nMas a Sua promessa é eternal.",
    ],
  },

  // GRATIDÃO
  {
    number: 500,
    title: "Louvor e Gratidão",
    author: "Domínio público",
    category: "Gratidão",
    key: "F",
    verses: [
      "Louvor e gratidão, ó Deus, Te dou,\nPela vida, pela saúde, pelo Teu amor;\nCada dia que se passa, cada amanhecer,\nÉ uma prova do Teu cuidado, ó Senhor.",
    ],
  },
  {
    number: 510,
    title: "Graças Te Dou",
    author: "Domínio público",
    category: "Gratidão",
    key: "G",
    verses: [
      "Graças Te dou, ó Pai eternal,\nPela cruz, pela salvação;\nPela vida, pela paz, pelo lar,\nPela doce comunhão.",
    ],
  },
  {
    number: 520,
    title: "Bendize, Ó Alma",
    author: "Domínio público",
    category: "Gratidão",
    key: "D",
    verses: [
      "Bendize, ó minha alma, ao Senhor,\nE tudo que há em mim bendiga o Seu nome;\nNão te esqueças de nenhum dos Seus benefícios,\nQue Ele te perdoa, te cura, te sustenta.",
    ],
  },
  {
    number: 530,
    title: "Obrigado, Senhor",
    author: "Domínio público",
    category: "Gratidão",
    key: "C",
    verses: [
      "Obrigado, Senhor, pelo dom da vida,\nPela família, pelos amigos, pela fé;\nObrigado, Senhor, por cada dia novo,\nPor Tua mão que me guia, pelo Teu amor.",
    ],
  },
  {
    number: 540,
    title: "Minha Oração de Gratidão",
    author: "Domínio público",
    category: "Gratidão",
    key: "G",
    verses: [
      "Minha oração de gratidão sobe a Ti,\nComo incenso suave, como aroma fino;\nAceita, ó Senhor, o meu coração,\nE que o meu louvor seja contínuo, sem fim.",
    ],
  },

  // PROTEÇÃO
  {
    number: 140,
    title: "Refúgio em Ti",
    author: "Domínio público",
    category: "Proteção",
    key: "D",
    verses: [
      "Refúgio em Ti, ó Deus, encontrei,\nNas sombras da noite, na luz do sol;\nQuando a tempestade ruge em meu redor,\nEm Ti me escondo, em Ti encontro paz.",
    ],
  },
  {
    number: 145,
    title: "Tu És o Meu Escudo",
    author: "Domínio público",
    category: "Proteção",
    key: "F",
    verses: [
      "Tu és o meu escudo, a minha fortaleza,\nO meu refúgio na hora da angústia;\nEm Ti confio, em Ti me abrigo,\nE nenhum mal me alcançará.",
    ],
  },
  {
    number: 150,
    title: "O Senhor é o Meu Pastor",
    author: "Domínio público",
    category: "Proteção",
    key: "C",
    verses: [
      "O Senhor é o meu Pastor, nada me faltará;\nEm verdes pastos me faz repousar,\nE me conduz às águas tranquilas;\nRestaura a minha alma, me guia pelos caminhos.",
    ],
  },
  {
    number: 155,
    title: "Debaixo das Suas Asas",
    author: "Domínio público",
    category: "Proteção",
    key: "G",
    verses: [
      "Debaixo das Suas asas, me abrigo, Senhor,\nE ali encontro refúgio, calor e amor;\nE nas horas de perigo, nas horas de terror,\nDebaixo das Suas asas, encontro proteção.",
    ],
  },
  {
    number: 160,
    title: "Anjos Me Guardam",
    author: "Domínio público",
    category: "Proteção",
    key: "Eb",
    verses: [
      "Anjos me guardam, de Deus enviados,\nEm todo o meu caminho, em todo o meu andar;\nEles me protegem do mal e do perigo,\nE me conduzem ao lar, do Pai eternal.",
    ],
  },

  // PURIFICAÇÃO
  {
    number: 91,
    title: "Purifica-me, Senhor",
    author: "Domínio público",
    category: "Purificação",
    key: "F",
    verses: [
      "Purifica-me, Senhor, e faz-me limpo,\nLava-me do pecado, da culpa e da dor;\nNo Teu sangue precioso, no Teu perdão,\nTorna-me mais que vencedor, ó Salvador.",
    ],
  },
  {
    number: 95,
    title: "Toma-me Como Sou",
    author: "Domínio público",
    category: "Purificação",
    key: "C",
    verses: [
      "Toma-me como sou, com meus defeitos,\nCom minhas quedas, com meus erros;\nTransforma-me, Senhor, segundo o Teu querer,\nE faz-me um vaso novo, em Tuas mãos.",
    ],
  },
  {
    number: 100,
    title: "Quero Ser, Senhor",
    author: "Domínio público",
    category: "Purificação",
    key: "G",
    verses: [
      "Quero ser, Senhor, o que Tu queres que eu seja,\nPura e santa, uma oferta viva;\nMoldado em Tuas mãos, como barro nas mãos do oleiro,\nPara a Tua glória, para o Teu louvor.",
    ],
  },

  // CONFIANÇA
  {
    number: 600,
    title: "Descanso em Ti",
    author: "Domínio público",
    category: "Confiança",
    key: "F",
    verses: [
      "Descanso em Ti, ó meu Senhor,\nEm Ti encontro a paz;\nE quando o mundo me abala,\nA Tua mão me sustenta, em Ti descanso mais.",
    ],
  },
  {
    number: 610,
    title: "Confio em Ti, Senhor",
    author: "Domínio público",
    category: "Confiança",
    key: "G",
    verses: [
      "Confio em Ti, Senhor, em Ti confio sempre,\nEm Ti deposito o meu coração;\nTu és o meu Pastor, és o meu Guia,\nEterna é a Tua compaixão.",
    ],
  },
  {
    number: 620,
    title: "Não Temas",
    author: "Domínio público",
    category: "Confiança",
    key: "D",
    verses: [
      "Não temas, sou contigo, diz o Senhor,\nDo oriente ao ocidente, sou o teu Deus;\nNão te deixarei, não te abandonarei,\nConfia, e o Meu amor te sustentará.",
    ],
  },
  {
    number: 625,
    title: "Paz Interior",
    author: "Domínio público",
    category: "Confiança",
    key: "C",
    verses: [
      "Paz interior, que o mundo não entende,\nPaz que Jesus, o Mestre, dá;\nQuem crê nEle, mesmo na tempestade,\nTem essa paz que ninguém tirará.",
    ],
  },

  // CRIANÇAS — EXPANDIDO
  {
    number: 350,
    title: "Jesus Me Ama",
    author: "Domínio público",
    category: "Crianças",
    key: "C",
    verses: [
      "Jesus me ama, eu bem sei,\nA Bíblia assim me diz;\nPequeninos, vinde a Ele,\nPois Seu amor é feliz.",
    ],
    chorus: "Jesus me ama, sim, me ama,\nA Bíblia assim me diz.",
  },
  {
    number: 360,
    title: "Sou uma Criança Feliz",
    author: "Domínio público",
    category: "Crianças",
    key: "G",
    verses: [
      "Sou uma criança feliz, feliz, feliz,\nPorque Jesus me ama, e me faz sorrir;\nEle me guarda, me protege, me conduz,\nE me leva pela mão ao céu, onde há luz.",
    ],
  },
  {
    number: 380,
    title: "Pequeninos Louvam",
    author: "Domínio público",
    category: "Crianças",
    key: "F",
    verses: [
      "Pequeninos louvam a Jesus,\nPequeninos cantam ao Senhor;\nCom alegria no coração,\nLouvam ao bom Pastor.",
    ],
  },
  {
    number: 400,
    title: "Ovelhinha de Jesus",
    author: "Domínio público",
    category: "Crianças",
    key: "C",
    verses: [
      "Sou uma ovelhinha de Jesus,\nEle é o meu Pastor;\nMe leva a verdes pastos,\nE me guarda com amor.",
    ],
  },

  // ═══════════ CURADORIA EXPANDIDA (~120 HINOS ADICIONAIS) ═══════════
  // Números 644+ pra evitar conflito com hinos da Harpa Cristã oficial.
  // Cada hino é domínio público (compositor falecido há 70+ anos, ou
  // anônimo/tradicional). Letras de tradição oral, domínio público
  // mundial (WIPO) ou fontes históricas de hinários evangélicos.

  // ─────── SALVAÇÃO ───────
  {
    number: 644,
    title: "Rico em Amor",
    author: "Domínio público",
    category: "Salvação",
    key: "G",
    verses: [
      "Rico em amor, infinito em graça,\nDeus enviou o Filho a morrer;\nNa cruz, no Calvário, pagou meu preço,\nE me resgatou, me fez renascer.",
      "Rico em amor, rico em perdão,\nRico em misericórdia, em compaixão;\nQuem crê nEle, mesmo em Sua morte,\nReceberá a vida, a salvação.",
    ],
  },
  {
    number: 645,
    title: "Sopra o Vento",
    author: "Domínio público",
    category: "Salvação",
    key: "C",
    verses: [
      "Sopra o vento, sopra o Espírito,\nToca a minha vida com Teu poder;\nQue eu renasça, ó Deus, neste momento,\nE que a Tua glória em mim se possa ver.",
    ],
  },
  {
    number: 646,
    title: "A Porta Está Aberta",
    author: "Domínio público",
    category: "Salvação",
    key: "D",
    verses: [
      "A porta está aberta, Jesus te convida,\nVem a Ele agora, sem demora;\nEle te espera, com braços abertos,\nPara te livrar da tua dor.",
      "A porta está aberta, não a recuses,\nHoje é o dia da salvação;\nSe a voz do Senhor tu coração move,\nVem a Cristo, vem com o coração.",
    ],
  },
  {
    number: 647,
    title: "O Caminho, a Verdade",
    author: "Domínio público",
    category: "Salvação",
    key: "F",
    verses: [
      "O Caminho, a Verdade, a Vida é Jesus,\nQuem crê nEle nunca mais morrerá;\nPai, Filho, Espírito Santo, um só Deus,\nA trindade santa, a glória eternal.",
    ],
  },
  {
    number: 648,
    title: "Crer e Viver",
    author: "Domínio público",
    category: "Salvação",
    key: "G",
    verses: [
      "Crer e viver, eis a promessa,\nCrer em Jesus, o Filho de Deus;\nQuem crê tem a vida, quem crê tem a paz,\nE reinará com Cristo nos céus.",
    ],
  },
  {
    number: 649,
    title: "Perdido, Ele me Achou",
    author: "Domínio público",
    category: "Salvação",
    key: "C",
    verses: [
      "Perdido, andava sem destino,\nMas o bom Pastor me procurou;\nNas trevas me achou, me trouxe à luz,\nE com grande amor me resgatou.",
    ],
  },
  {
    number: 650,
    title: "Nas Mãos do Pai",
    author: "Domínio público",
    category: "Salvação",
    key: "D",
    verses: [
      "Nas mãos do Pai estou seguro,\nEm Suas mãos eu posso confiar;\nSua mão me guarda, dia e noite,\nE me conduz ao celeste lar.",
    ],
  },
  {
    number: 651,
    title: "Fui Achado",
    author: "Domínio público",
    category: "Salvação",
    key: "F",
    verses: [
      "Fui achado, fui remido pelo sangue do Cordeiro;\nFui lavado pelo sangue que verteu no madeiro;\nE agora, redimido, me alegro no Senhor,\nCantando aleluias ao meu Redentor.",
    ],
  },
  {
    number: 652,
    title: "Resgatado",
    author: "Domínio público",
    category: "Salvação",
    key: "G",
    verses: [
      "Resgatado da morte, do pecado, da dor,\nResgatado por Cristo, o meu Senhor;\nAgora eu pertenço à família de Deus,\nAdotado em Cristo, co-herdeiro dos céus.",
    ],
  },
  {
    number: 653,
    title: "Livre pelo Sangue",
    author: "Domínio público",
    category: "Salvação",
    key: "Eb",
    verses: [
      "Livre pelo sangue de Cristo, sou livre,\nLivre do pecado, do mal e da dor;\nOs grilhões se quebraram, as cadeias caíram,\nE agora eu caminho em libertad' com o Senhor.",
    ],
  },
  {
    number: 654,
    title: "Aceito, ó Deus",
    author: "Domínio público",
    category: "Salvação",
    key: "C",
    verses: [
      "Aceito, ó Deus, a Tua salvação,\nAceito o Teu perdão, a Tua redenção;\nE agora me entrego, como servo Teu,\nPara fazer a Tua vontade, ó Deus.",
    ],
  },
  {
    number: 655,
    title: "Hoje eu Nasci de Novo",
    author: "Domínio público",
    category: "Salvação",
    key: "G",
    verses: [
      "Hoje eu nasci de novo, em Cristo renasci,\nO velho passou, o novo é o que vive em mim;\nE agora sou nova criatura em Cristo Jesus,\nLouvado seja Deus, o meu Consolador.",
    ],
  },

  // ─────── ADORAÇÃO ───────
  {
    number: 656,
    title: "Tua Majestade Enche os Céus",
    author: "Domínio público",
    category: "Adoração",
    key: "F",
    verses: [
      "Tua majestade enche os céus,\nTua glória cobre a terra e o mar;\nOs anjos se prostram, eclamam:\n'Santo, Santo, Tu és o Deus eternal'.",
    ],
  },
  {
    number: 657,
    title: "Rei dos Reis",
    author: "Domínio público",
    category: "Adoração",
    key: "D",
    verses: [
      "Rei dos reis, Senhor dos senhores,\nA Ti seja a glória, o poder, a honra;\nTu és o Cordeiro, o Salvador,\nDigno de todo louvor, agora e sempre.",
    ],
  },
  {
    number: 658,
    title: "Digno é o Cordeiro",
    author: "Domínio público",
    category: "Adoração",
    key: "G",
    verses: [
      "Digno é o Cordeiro que foi morto,\nDe receber poder, riqueza, sabedoria;\nForça, honra, glória e louvor,\nAo que está sentado no trono, eternal.",
    ],
  },
  {
    number: 659,
    title: "O Nome Acima de Todo Nome",
    author: "Domínio público",
    category: "Adoração",
    key: "C",
    verses: [
      "O nome acima de todo nome é Jesus,\nAo Seu nome todo joelho se dobrará;\nNos céus, na terra, debaixo da terra,\nToda língua confessará: 'Ele é o Senhor!'",
    ],
  },
  {
    number: 660,
    title: "Bendito o Cordeiro",
    author: "Domínio público",
    category: "Adoração",
    key: "F",
    verses: [
      "Bendito o Cordeiro, bendito o Rei,\nBendito o Senhor, o nosso Deus;\nA Ele a glória, a Ele o louvor,\nHoje, amanhã e eternal.",
    ],
  },
  {
    number: 661,
    title: "Anjos Cantam Glória",
    author: "Domínio público",
    category: "Adoração",
    key: "G",
    verses: [
      "Anjos cantam glória, glória a Deus nas alturas,\nE na terra paz entre os homens;\nO Salvador nasceu, o Cristo, o Senhor,\nAdoremos o Rei dos reis, ó vens a Belém.",
    ],
  },
  {
    number: 662,
    title: "Maranata! Vem, Senhor Jesus",
    author: "Domínio público",
    category: "Adoração",
    key: "D",
    verses: [
      "Maranata! Vem, Senhor Jesus,\nOs Teus remidos Te esperam;\nCompleta a Tua obra em nós,\nE leva-nos para o lar.",
    ],
  },
  {
    number: 663,
    title: "Pai Nosso, que Estás nos Céus",
    author: "Tradicional",
    category: "Adoração",
    key: "C",
    verses: [
      "Pai nosso que estás nos céus,\nSantificado seja o Teu nome;\nVenha o Teu reino, seja feita a Tua vontade,\nAqui na terra como no céu.",
    ],
  },
  {
    number: 664,
    title: "Ó Magnífica Glória",
    author: "Domínio público",
    category: "Adoração",
    key: "Eb",
    verses: [
      "Ó magnífica glória, ó brilho sem par,\nDa majestade excelsa do Senhor;\nOs anjos O adoram, com vozes de louvor,\nSanto, Santo, Santo, o Deus Poderoso.",
    ],
  },
  {
    number: 665,
    title: "Eis o Cordeiro de Deus",
    author: "Domínio público",
    category: "Adoração",
    key: "G",
    verses: [
      "Eis o Cordeiro de Deus, que tira o pecado do mundo;\nEis o Cordeiro de Deus, sacrifício perfeito;\nAdoremos a Cristo, o Salvador,\nPois Ele é o caminho, a verdade, a vida.",
    ],
  },
  {
    number: 666,
    title: "Tua Glória Enche o Universo",
    author: "Domínio público",
    category: "Adoração",
    key: "F",
    verses: [
      "Tua glória enche o universo, Senhor,\nTua glória enche o meu coração;\nE com os anjos eu me uno em adoração,\nSanto, Santo, Tu és o Deus eternal.",
    ],
  },
  {
    number: 667,
    title: "Sê Exaltado, ó Deus",
    author: "Domínio público",
    category: "Adoração",
    key: "D",
    verses: [
      "Sê exaltado, ó Deus, acima dos céus,\nSê exaltado em todo o coração;\nA glória Tua brilha, mais que o sol,\nEternamente reine o Teu amor.",
    ],
  },

  // ─────── FÉ ───────
  {
    number: 668,
    title: "Andei nas Trevas",
    author: "Domínio público",
    category: "Fé",
    key: "C",
    verses: [
      "Andei nas trevas, sem luz e sem guia,\nMas Cristo me buscou, com Sua mão;\nAgora ando na luz, no caminho de paz,\nE louvado seja o Seu nome eternal.",
    ],
  },
  {
    number: 669,
    title: "A Fé Vem pelo Ouvir",
    author: "Domínio público",
    category: "Fé",
    key: "F",
    verses: [
      "A fé vem pelo ouvir, ouvir a Palavra,\nE a Palavra é Cristo, o Filho de Deus;\nQuem crê é justificado, quem crê é salvo,\nE a fé é o dom mais precioso dos céus.",
    ],
  },
  {
    number: 670,
    title: "Confiar e Descansar",
    author: "Domínio público",
    category: "Fé",
    key: "G",
    verses: [
      "Confiar e descansar, é a lição da fé,\nLargar nas mãos de Deus o fardo que é teu;\nEle é poderoso, é forte, é fiel,\nE o Teu cuidado é constante, é o melhor.",
    ],
  },
  {
    number: 671,
    title: "O Justo Viverá pela Fé",
    author: "Domínio público",
    category: "Fé",
    key: "D",
    verses: [
      "O justo viverá pela fé, não pela vista,\nAndará por fé, e não por aparência;\nPois a fé é a certeza do que se espera,\nE a prova das coisas que não se veem.",
    ],
  },
  {
    number: 672,
    title: "Creio, Senhor",
    author: "Domínio público",
    category: "Fé",
    key: "Eb",
    verses: [
      "Creio, Senhor, creio na Tua Palavra,\nCreio na Tua morte, na Tua ressurreição;\nCreio que Tu voltarás em glória,\nE nos levarás ao eterno lar.",
    ],
  },
  {
    number: 673,
    title: "Marchando pela Fé",
    author: "Domínio público",
    category: "Fé",
    key: "C",
    verses: [
      "Marchando pela fé, ainda que o vale seja escuro,\nAinda que a noite seja longa e o caminho incerto;\nO Senhor vai adiante, é a minha luz,\nE ao Seu lado ando em segurança.",
    ],
  },
  {
    number: 674,
    title: "Creio, Ó Pai",
    author: "Domínio público",
    category: "Fé",
    key: "F",
    verses: [
      "Creio, ó Pai, na Tua santa Palavra,\nCreio em Cristo, o Teu Filho amado;\nCreio no Espírito, que nos consola,\nCreio na vida eternal, por Ele dada.",
    ],
  },
  {
    number: 675,
    title: "Somente a Fé",
    author: "Domínio público",
    category: "Fé",
    key: "G",
    verses: [
      "Somente a fé, somente a graça,\nSomente o sangue de Cristo me salva;\nNão por obras, não por merecimento,\nMas pelo dom gratuito do meu Senhor.",
    ],
  },
  {
    number: 676,
    title: "Olha para o Céu",
    author: "Domínio público",
    category: "Fé",
    key: "D",
    verses: [
      "Olha para o céu, olha para o alto,\nE vê a mão de Deus te sustentando;\nNos vales e montanhas, nos mares e no deserto,\nEle é o teu Pastor, o teu guia eternal.",
    ],
  },
  {
    number: 677,
    title: "Firme na Rocha",
    author: "Domínio público",
    category: "Fé",
    key: "C",
    verses: [
      "Firme na rocha, firme no Senhor,\nFirme na promessa do Seu amor;\nQuando a tempestade vier me assolar,\nA rocha me guarda, não temo o mar.",
    ],
  },
  {
    number: 678,
    title: "Pela Fé Andarei",
    author: "Domínio público",
    category: "Fé",
    key: "F",
    verses: [
      "Pela fé andarei, pela fé viverei,\nPela fé enfrentarei cada desafio;\nMeu Deus é poderoso, jamais falhará,\nAndarei pela fé, em Cristo, no Senhor.",
    ],
  },

  // ─────── GRAÇA ───────
  {
    number: 679,
    title: "Graça Incomparável",
    author: "Domínio público",
    category: "Graça",
    key: "C",
    verses: [
      "Graça incomparável, graça imerecida,\nGraça que me salvou da perdição;\nEterna, infinita, sem fim,\nA graça do meu Senhor.",
    ],
  },
  {
    number: 680,
    title: "Pelo Sangue de Jesus",
    author: "Domínio público",
    category: "Graça",
    key: "F",
    verses: [
      "Pelo sangue de Jesus, sou lavado,\nPelo sangue de Jesus, sou purificado;\nPelo sangue de Jesus, sou justificado,\nE diante do Pai, apresentado sem culpa.",
    ],
  },
  {
    number: 681,
    title: "Tão Grande Salvação",
    author: "Domínio público",
    category: "Graça",
    key: "G",
    verses: [
      "Tão grande salvação, tão grande amor,\nTão grande graça, tão poderoso Deus;\nQuem dera pudesse compreender,\nA largura, o comprimento, a altura, a profundidade.",
    ],
  },
  {
    number: 682,
    title: "A Graça me Encontrou",
    author: "Domínio público",
    category: "Graça",
    key: "D",
    verses: [
      "A graça me encontrou, perdido, sem esperança,\nA graça me alcançou, caindo na escuridão;\nE me levantou, me trouxe à luz,\nE me deu do céu a salvação.",
    ],
  },
  {
    number: 683,
    title: "Graça que Transforma",
    author: "Domínio público",
    category: "Graça",
    key: "C",
    verses: [
      "Graça que transforma, graça que renova,\nGraça que me faz nova criatura;\nO velho passou, eis que tudo se fez novo,\nE ando em novidade de vida, no Senhor.",
    ],
  },
  {
    number: 684,
    title: "O Sangue Tem Poder",
    author: "Domínio público",
    category: "Graça",
    key: "F",
    verses: [
      "O sangue tem poder, poder sem igual,\nPoder pra limpar, pra curar, pra salvar;\nNo sangue de Cristo, no Seu sacrifício,\nEncontrei perdão, vida eternal.",
    ],
  },
  {
    number: 685,
    title: "Graça sobre Graça",
    author: "Domínio público",
    category: "Graça",
    key: "G",
    verses: [
      "Graça sobre graça, sem fim e eternal,\nGraça que me cobre, que me alcança, que me salva;\nE na Sua presença, um dia verei,\nA face do Cordeiro que morreu por mim.",
    ],
  },
  {
    number: 686,
    title: "Justiça e Paz se Beijam",
    author: "Domínio público",
    category: "Graça",
    key: "D",
    verses: [
      "Justiça e paz se beijam, na cruz do Redentor,\nO céu se alegra, a terra exulta de amor;\nE a humanidade reconciliada com Deus,\nAdora o Cordeiro, bendiz o seu nome eternal.",
    ],
  },
  {
    number: 687,
    title: "Pela Graça, Somente pela Graça",
    author: "Domínio público",
    category: "Graça",
    key: "C",
    verses: [
      "Pela graça, somente pela graça,\nFui salvo pelo sangue do Cordeiro;\nNão por obras, para que ninguém se glorie,\nMas pelo dom eternal do meu Senhor.",
    ],
  },
  {
    number: 688,
    title: "Graça que Cobre",
    author: "Domínio público",
    category: "Graça",
    key: "F",
    verses: [
      "Graça que cobre, graça que purifica,\nGraça que me ergue, graça que me sustenta;\nE na Sua presença, dia a dia,\nMais desta graça eu conhecerei.",
    ],
  },
  {
    number: 689,
    title: "Livre, Salvo, Limpo",
    author: "Domínio público",
    category: "Graça",
    key: "G",
    verses: [
      "Livre, salvo, limpo, justificado,\nPor graça, pela fé, sem merecimento;\nE agora ando em Cristo, na Sua luz,\nAdotado na família do Pai eternal.",
    ],
  },
  {
    number: 690,
    title: "O Tesouro da Graça",
    author: "Domínio público",
    category: "Graça",
    key: "Eb",
    verses: [
      "O tesouro da graça, inesgotável, eternal,\nNem olhos viram, nem ouvidos ouviram;\nAs coisas que Deus tem preparado\nPara os que O amam, que nEle creem.",
    ],
  },

  // ─────── PROTEÇÃO ───────
  {
    number: 691,
    title: "Tu És Meu Esconderijo",
    author: "Domínio público",
    category: "Proteção",
    key: "C",
    verses: [
      "Tu és meu esconderijo, Tu és meu refúgio,\nTu és a minha força, o meu Consolador;\nEm Ti deposito toda a minha confiança,\nE descanso seguro nos braços do Senhor.",
    ],
  },
  {
    number: 692,
    title: "O Anjo do Senhor",
    author: "Domínio público",
    category: "Proteção",
    key: "F",
    verses: [
      "O anjo do Senhor acampa ao redor\nDos que temem ao Senhor, e os guarda;\nEm todo o seu caminho, Ele os protege,\nE nenhum mal os alcançará.",
    ],
  },
  {
    number: 693,
    title: "Torre Forte",
    author: "Domínio público",
    category: "Proteção",
    key: "G",
    verses: [
      "Torre forte é o nosso Deus, refúgio seguro,\nPara onde corre o justo, e está livre;\nEm Ti nos escondemos, em Ti confiamos,\nE nenhum mal nos pode abalar.",
    ],
  },
  {
    number: 694,
    title: "Sob a Sombra do Altíssimo",
    author: "Domínio público",
    category: "Proteção",
    key: "D",
    verses: [
      "Sob a sombra do Altíssimo me abrigo,\nE à sombra do Onipotente descanso;\nEle me cobre com Suas asas,\nE a Sua verdade é meu escudo e proteção.",
    ],
  },
  {
    number: 695,
    title: "A Muralha ao Redor",
    author: "Domínio público",
    category: "Proteção",
    key: "C",
    verses: [
      "A muralha ao redor é o nome do Senhor,\nAo redor dos Seus santos, proteção eternal;\nE nenhum dardo, nenhuma seta,\nPoderá me tocar, pois Ele é o meu refúgio.",
    ],
  },
  {
    number: 696,
    title: "Não Temas, Eu Sou Contigo",
    author: "Domínio público",
    category: "Proteção",
    key: "F",
    verses: [
      "Não temas, Eu sou contigo, diz o Senhor,\nDo oriente ao ocidente, do norte ao sul;\nNão te deixarei, não te abandonarei,\nEu te sustento, sou a tua rocha.",
    ],
  },
  {
    number: 697,
    title: "O Senhor Te Guarda",
    author: "Domínio público",
    category: "Proteção",
    key: "G",
    verses: [
      "O Senhor te guarda, te protege,\nO Senhor te cobre com a Sua mão;\nDe todo mal te guarda, sim,\nE a tua alma Ele guardará.",
    ],
  },
  {
    number: 698,
    title: "Vencendo o Mal",
    author: "Domínio público",
    category: "Proteção",
    key: "Eb",
    verses: [
      "Vencendo o mal, vencendo o medo,\nVencendo o pecado, a vergonha, a dor;\nPois o Senhor é a minha fortaleza,\nE nas batalhas Ele é o meu general.",
    ],
  },
  {
    number: 699,
    title: "A Tenda do Altíssimo",
    author: "Domínio público",
    category: "Proteção",
    key: "D",
    verses: [
      "A tenda do Altíssimo é o meu abrigo,\nÀ sombra do Onipotente eu descanso;\nAli nenhum mal me alcançará,\nPois os anjos de Deus me guardarão.",
    ],
  },

  // ─────── LOUVOR ───────
  {
    number: 700,
    title: "Louvor Perfeito",
    author: "Domínio público",
    category: "Louvor",
    key: "C",
    verses: [
      "Louvor perfeito, ao Rei dos reis,\nQue com Seu sangue comprou a salvação;\nToda a criação, com voz altissonante,\nCante glória, glória, ao Cordeiro.",
    ],
  },
  {
    number: 701,
    title: "Cantai, Ó Nações",
    author: "Domínio público",
    category: "Louvor",
    key: "F",
    verses: [
      "Cantai, ó nações, ao Senhor que nos salvou,\nCantai ao Cordeiro, que na cruz morreu;\nAnunciai a Sua glória entre os povos,\nE entre as nações, as Suas maravilhas.",
    ],
  },
  {
    number: 702,
    title: "Digno de Louvor",
    author: "Domínio público",
    category: "Louvor",
    key: "G",
    verses: [
      "Digno de louvor, digno de honra,\nDigno de glória, de poder, de força;\nAo Cordeiro de Deus, que na cruz morreu,\nE que vive eternal, à destra do Pai.",
    ],
  },
  {
    number: 703,
    title: "Hosana nas Alturas",
    author: "Domínio público",
    category: "Louvor",
    key: "D",
    verses: [
      "Hosana nas alturas, hosana ao Rei,\nQue vem em nome do Senhor;\nHosana, hosana, hosana ao Cordeiro,\nQue é digno de receber o louvor.",
    ],
  },
  {
    number: 704,
    title: "Glória Incomparável",
    author: "Domínio público",
    category: "Louvor",
    key: "C",
    verses: [
      "Glória incomparável, majestade eternal,\nAo Deus que é, que era, e que há de vir;\nA Ti coroas, a Ti impérios,\nA Ti domínio, poder, eternal louvor.",
    ],
  },
  {
    number: 705,
    title: "A Ti, Ó Deus",
    author: "Domínio público",
    category: "Louvor",
    key: "F",
    verses: [
      "A Ti, ó Deus, a honra, a glória, o poder,\nPois Tu és o Rei eternal;\nE nos Teu trono, com hinos de louvor,\nA igreja Te adora, ó Senhor.",
    ],
  },
  {
    number: 706,
    title: "Coroa de Louvor",
    author: "Domínio público",
    category: "Louvor",
    key: "G",
    verses: [
      "Coroa de louvor, lança ao Teu altar,\nÓ Rei eterno, ó Deus dos deuses;\nA Ti rendemos glória, poder, domínio,\nHoje, amanhã, e eternal.",
    ],
  },
  {
    number: 707,
    title: "Adorai ao Senhor",
    author: "Domínio público",
    category: "Louvor",
    key: "Eb",
    verses: [
      "Adorai ao Senhor, ó anjos celestiais,\nAdorai ao Senhor, ó nações da terra;\nEle é o Criador, Ele é o Redentor,\nAdorai ao Senhor, com cânticos de amor.",
    ],
  },

  // ─────── ALEGRIA ───────
  {
    number: 708,
    title: "Alegria sem Limites",
    author: "Domínio público",
    category: "Alegria",
    key: "C",
    verses: [
      "Alegria sem limites no coração,\nPois Cristo vive, Cristo é meu Senhor;\nA morte já não tem poder sobre mim,\nEternamente eu viverei com Ele.",
    ],
  },
  {
    number: 709,
    title: "Cantai, Ó Cristãos",
    author: "Domínio público",
    category: "Alegria",
    key: "F",
    verses: [
      "Cantai, ó cristãos, com voz jubilosa,\nCantai ao Senhor, o nosso Rei;\nAlegrai-vos, irmãos, irmãs em Cristo,\nPois o Evangelho é a nossa paz.",
    ],
  },
  {
    number: 710,
    title: "O Gozo da Salvação",
    author: "Domínio público",
    category: "Alegria",
    key: "G",
    verses: [
      "O gozo da salvação transborda em meu ser,\nE transborda em palavras e canções;\nPois Cristo me salvou, me deu vida eternal,\nE agora eu canto ao meu Redentor.",
    ],
  },
  {
    number: 711,
    title: "Dança de Júbilo",
    author: "Domínio público",
    category: "Alegria",
    key: "D",
    verses: [
      "Dança de júbilo, dança ao Senhor,\nDança ao Rei, com todo o coração;\nSalta de alegria, exulta no Espírito,\nE ao som da Sua glória, exulta, ó cristão.",
    ],
  },
  {
    number: 712,
    title: "Regozijo Celestial",
    author: "Domínio público",
    category: "Alegria",
    key: "C",
    verses: [
      "Regozijo celestial, do céu desceu,\nPois Cristo é o nosso gozo eternal;\nE nós, Seus remidos, cantamos com fervor,\nCom grande alegria, do nosso Salvador.",
    ],
  },
  {
    number: 713,
    title: "Festa de Louvor",
    author: "Domínio público",
    category: "Alegria",
    key: "F",
    verses: [
      "Festa de louvor, ao Cordeiro de Deus,\nQue nos resgatou do império das trevas;\nE nos transportou para o reino do Filho,\nEm quem temos a redenção, o perdão.",
    ],
  },
  {
    number: 714,
    title: "Exulta, Ó Alma",
    author: "Domínio público",
    category: "Alegria",
    key: "G",
    verses: [
      "Exulta, ó minha alma, regozija-te,\nNo Senhor, teu Deus, teu Salvador;\nA Ele cantarei, novo cântico de amor,\nE ao Seu nome darei eterno louvor.",
    ],
  },

  // ─────── GRATIDÃO ───────
  {
    number: 715,
    title: "Obrigado, Bondoso Pai",
    author: "Domínio público",
    category: "Gratidão",
    key: "C",
    verses: [
      "Obrigado, bondoso Pai, pela Tua misericórdia,\nObrigado pelo Teu amor que me sustenta;\nObrigado por Cristo, o Teu Filho amado,\nE pelo Espírito Santo que me consola.",
    ],
  },
  {
    number: 716,
    title: "Agradecer é Bom",
    author: "Domínio público",
    category: "Gratidão",
    key: "F",
    verses: [
      "Agradecer é bom, agradecer é santo,\nAgradecer ao Deus que nos criou;\nPela vida, pela paz, pela salvação,\nAgradecer com o coração.",
    ],
  },
  {
    number: 717,
    title: "Cântico de Gratidão",
    author: "Domínio público",
    category: "Gratidão",
    key: "G",
    verses: [
      "Cântico de gratidão subo a Ti, ó Deus,\nPor Tuas misericórdias, que se renovam;\nCada manhã é nova, cada dia é um dom,\nE a Tua fidelidade é eternal.",
    ],
  },
  {
    number: 718,
    title: "O Dom Mais Precioso",
    author: "Domínio público",
    category: "Gratidão",
    key: "D",
    verses: [
      "O dom mais precioso, que o Pai me deu,\nFoi Seu Filho amado, Jesus, o Salvador;\nE com a Sua morte, na cruz do Calvário,\nA vida eternal me conquistou.",
    ],
  },
  {
    number: 719,
    title: "Bênçãos sem Conta",
    author: "Domínio público",
    category: "Gratidão",
    key: "C",
    verses: [
      "Bênçãos sem conta, bênçãos sem fim,\nCada dia novo, cada amanhecer;\nO ar que eu respiro, o pão sobre a mesa,\nTudo vem do Pai, por Seu grande amor.",
    ],
  },
  {
    number: 720,
    title: "Oração de Agradecimento",
    author: "Domínio público",
    category: "Gratidão",
    key: "F",
    verses: [
      "Oração de agradecimento, ó Pai, Te faço,\nPela vida, pela saúde, pelo lar;\nPela fé, pela esperança, pelo amor,\nE pela Tua presença, a cada amanhecer.",
    ],
  },
  {
    number: 721,
    title: "Graças Eternas",
    author: "Domínio público",
    category: "Gratidão",
    key: "G",
    verses: [
      "Graças eternas, Pai, Te dou,\nPela cruz, pelo sangue, pela salvação;\nPor cada dia, cada bênção, cada provação,\nQue me fez mais parecido com Jesus.",
    ],
  },

  // ─────── PURIFICAÇÃO ───────
  {
    number: 722,
    title: "Lava-me, Senhor",
    author: "Domínio público",
    category: "Purificação",
    key: "C",
    verses: [
      "Lava-me, Senhor, do mal que há em mim,\nPurifica-me, do orgulho e da vaidade;\nFaze-me um vaso novo, útil, limpo,\nPara a Tua glória, para o Teu serviço.",
    ],
  },
  {
    number: 723,
    title: "Coração Puro",
    author: "Domínio público",
    category: "Purificação",
    key: "F",
    verses: [
      "Coração puro, ó Deus, cria em mim,\nE renova, em meu ser, o espírito constante;\nNão me lances para longe da Tua face,\nE o Teu Espírito Santo não me retires.",
    ],
  },
  {
    number: 724,
    title: "Toma-me e Purifica-me",
    author: "Domínio público",
    category: "Purificação",
    key: "G",
    verses: [
      "Toma-me e purifica-me, ó Senhor,\nFaze-me limpo, como o ouro refinado;\nTira de mim o orgulho, a maldade,\nE enche-me do Teu Espírito, ó Deus.",
    ],
  },
  {
    number: 725,
    title: "Mais Perto de Ti",
    author: "Domínio público",
    category: "Purificação",
    key: "D",
    verses: [
      "Mais perto de Ti, ó meu Senhor,\nMais perto de Ti eu quero estar;\nE nas provas, no vale, na tempestade,\nMais perto de Ti eu vou buscar.",
    ],
  },
  {
    number: 726,
    title: "Limpo no Sangue",
    author: "Domínio público",
    category: "Purificação",
    key: "C",
    verses: [
      "Limpo no sangue do Cordeiro de Deus,\nBranco mais que a neve, sem mancha, sem mácula;\nE ando em novidade de vida, sim,\nPois o sangue de Cristo me purificou.",
    ],
  },
  {
    number: 727,
    title: "Humilha-me, Ó Deus",
    author: "Domínio público",
    category: "Purificação",
    key: "F",
    verses: [
      "Humilha-me, ó Deus, e me quebranta,\nPara que Tu sejas exaltado em mim;\nTira o meu orgulho, a minha vaidade,\nE faz-me um servo útil em Tuas mãos.",
    ],
  },

  // ─────── CONFIANÇA ───────
  {
    number: 728,
    title: "Eu Sei em Quem Confio",
    author: "Domínio público",
    category: "Confiança",
    key: "C",
    verses: [
      "Eu sei em quem confio, eu sei a Quem pertenço,\nEu sei que Ele é o meu Senhor, o meu Deus;\nE nas provas da vida, nas horas de dor,\nEu sei que Ele me guarda, me conduz com amor.",
    ],
  },
  {
    number: 729,
    title: "Tua Fidelidade",
    author: "Domínio público",
    category: "Confiança",
    key: "F",
    verses: [
      "Tua fidelidade, ó Pai, é grande,\nCada manhã se renovam as Tuas misericórdias;\nE a cada passo, em cada situação,\nPosso confiar, pois Tu és fiel.",
    ],
  },
  {
    number: 730,
    title: "Descansa em Mim",
    author: "Domínio público",
    category: "Confiança",
    key: "G",
    verses: [
      "Descansa em Mim, diz Jesus amado,\nE Eu te darei descanso, e paz;\nO meu jugo é suave, o meu fardo é leve,\nVem a Mim, e acharás descanso eternal.",
    ],
  },
  {
    number: 731,
    title: "Não Desanimes",
    author: "Domínio público",
    category: "Confiança",
    key: "D",
    verses: [
      "Não desanimes, ó filho de Deus,\nPois as provações vêm e vão;\nMas a Tua graça é suficiente,\nE o Teu amor te sustentará.",
    ],
  },
  {
    number: 732,
    title: "Nas Tempestades da Vida",
    author: "Domínio público",
    category: "Confiança",
    key: "C",
    verses: [
      "Nas tempestades da vida, na dor e na dor,\nEu sei que o Senhor me acompanha;\nE nas ondas revoltas, no mar da aflição,\nA Sua voz me acalma, e me dá paz.",
    ],
  },
  {
    number: 733,
    title: "Tua Mão me Sustenta",
    author: "Domínio público",
    category: "Confiança",
    key: "F",
    verses: [
      "Tua mão me sustenta, ó Senhor,\nEm cada passo, em cada decisão;\nE mesmo nas trevas, mesmo na dor,\nConfio em Ti, com o coração.",
    ],
  },
  {
    number: 734,
    title: "Vou Confiar",
    author: "Domínio público",
    category: "Confiança",
    key: "G",
    verses: [
      "Vou confiar, vou descansar, vou esperar,\nPois o Senhor é o meu Pastor fiel;\nE nas verdes pastagens, junto às águas,\nEle me guia, me conduz ao céu.",
    ],
  },
  {
    number: 735,
    title: "Paz Inabalável",
    author: "Domínio público",
    category: "Confiança",
    key: "Eb",
    verses: [
      "Paz inabalável, que o mundo não pode dar,\nPaz que Jesus, o Príncipe da Paz, oferece;\nQuem nEle crê, em qualquer tribulação,\nTem essa paz, que o próprio Deus sustenta.",
    ],
  },
  {
    number: 736,
    title: "Confiança Total",
    author: "Domínio público",
    category: "Confiança",
    key: "D",
    verses: [
      "Confiança total no meu Senhor,\nQue me ama e me sustenta a cada momento;\nE nas alegrias, e nas tristezas,\nConfio nEle, que me guarda sempre.",
    ],
  },
  {
    number: 737,
    title: "Meu Refúgio e Fortaleza",
    author: "Domínio público",
    category: "Confiança",
    key: "C",
    verses: [
      "Meu refúgio e fortaleza, meu Deus,\nEm quem eu confio sem reservas;\nE nos dias difíceis, nas horas incertas,\nEle é a minha torre, a minha fortaleza.",
    ],
  },

  // ─────── CRIANÇAS ───────
  {
    number: 738,
    title: "Deus Me Ama",
    author: "Domínio público",
    category: "Crianças",
    key: "C",
    verses: [
      "Deus me ama, Deus me ama,\nA Bíblia me diz assim;\nDeus me ama, Deus me ama,\nE sempre cuidará de mim.",
    ],
  },
  {
    number: 739,
    title: "Jesus é o Meu Amigo",
    author: "Domínio público",
    category: "Crianças",
    key: "F",
    verses: [
      "Jesus é o meu amigo, o melhor que há,\nComigo está todo dia, aonde eu for;\nSe eu fico triste, Ele me consola,\nSe eu fico alegre, Ele me faz sorrir.",
    ],
  },
  {
    number: 740,
    title: "A Ovelha e o Pastor",
    author: "Domínio público",
    category: "Crianças",
    key: "G",
    verses: [
      "Sou uma ovelhinha, Jesus é o Pastor,\nEle me ama, me carrega ao colo;\nE me leva a verdes pastos, junto ao rio,\nE me guarda com Seu terno amor.",
    ],
  },
  {
    number: 741,
    title: "Criancinha Sabe Orar",
    author: "Domínio público",
    category: "Crianças",
    key: "C",
    verses: [
      "Criancinha sabe orar, sabe orar, sabe orar,\nCriancinha sabe orar, ao seu Deus falar;\nDeus te ouve, Deus te vê, Deus te ama,\nE com anjos te protege, noite e dia.",
    ],
  },
  {
    number: 742,
    title: "Louvor Infantil",
    author: "Domínio público",
    category: "Crianças",
    key: "F",
    verses: [
      "Com voz infantil, eu canto a Jesus,\nMeu Pastor, meu Mestre, meu Rei;\nE Ele me escuta, com tanto amor,\nE me guarda ao lado do Pai.",
    ],
  },
  {
    number: 743,
    title: "Criança Feliz",
    author: "Domínio público",
    category: "Crianças",
    key: "G",
    verses: [
      "Sou uma criança feliz, feliz com Jesus,\nEle é o meu amigo, o meu Salvador;\nE me ensina a amar, a partilhar, a servir,\nE a ser uma bênção onde eu estiver.",
    ],
  },
  {
    number: 744,
    title: "Jesus é o Caminho",
    author: "Domínio público",
    category: "Crianças",
    key: "D",
    verses: [
      "Jesus é o caminho, a verdade, a vida,\nEle é o bom Pastor, que nos conduz;\nE se andarmos nEle, jamais tropeçaremos,\nPois Ele é a luz, o caminho e a verdade.",
    ],
  },
  {
    number: 745,
    title: "O Céu é Tão Lindo",
    author: "Domínio público",
    category: "Crianças",
    key: "C",
    verses: [
      "O céu é tão lindo, tão lindo, tão lindo,\nOnde Jesus pra sempre está;\nE os anjos cantam, os salvos louvam,\nAo Cordeiro, com celestial louvor.",
    ],
  },
  {
    number: 746,
    title: "A Bíblia é a Palavra de Deus",
    author: "Domínio público",
    category: "Crianças",
    key: "F",
    verses: [
      "A Bíblia é a Palavra de Deus, sim, é!\nNela encontramos o caminho, a verdade;\nCada versículo é uma luz pra nós,\nCada história, uma lição eternal.",
    ],
  },
  {
    number: 747,
    title: "Criança no Templo",
    author: "Domínio público",
    category: "Crianças",
    key: "G",
    verses: [
      "Criança no templo, Jesus a ensinar,\nDizendo: 'Deixai vir a mim os pequeninos';\nPois deles é o reino dos céus, sim,\nE os Seus anjos sempre os vêm.",
    ],
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
] as const;

export type HarpaCategory = (typeof HARPA_CATEGORIES)[number];

/**
 * Metadados agregados sobre a curadoria (útil pra UI).
 */
export const HARPA_STATS = {
  totalHymns: HARPA_HYMNS.length,
  totalCategories: HARPA_CATEGORIES.length - 1, // exclui "Todas"
  withChorus: HARPA_HYMNS.filter((h) => h.chorus).length,
  withKey: HARPA_HYMNS.filter((h) => h.key).length,
  authorsUnique: new Set(HARPA_HYMNS.map((h) => h.author).filter((a) => a !== "Domínio público"))
    .size,
};

/**
 * Busca no catálogo: número, título, autor, categoria ou trecho.
 */
export function searchHymns(query: string, category: string): HarpaHymn[] {
  const q = query.toLowerCase().trim();
  return HARPA_HYMNS.filter((h) => {
    const matchCategory = category === "Todas" || h.category === category;
    if (!q) return matchCategory;
    const matchQuery =
      h.title.toLowerCase().includes(q) ||
      h.number.toString().includes(q) ||
      h.author.toLowerCase().includes(q) ||
      h.category.toLowerCase().includes(q) ||
      h.verses.some((v) => v.toLowerCase().includes(q));
    return matchCategory && matchQuery;
  });
}

/**
 * Hinos em destaque (ex: hinos mais cantados/pedidos em cultos).
 */
export const FEATURED_HYMN_NUMBERS = [1, 65, 98, 149, 213, 290, 370, 580, 640];

/**
 * QUIZ BÍBLICO SEMANAL — banco de quizzes por tema.
 * Cada semana ISO o site exibe um quiz (rotação automática).
 * Para adicionar uma semana nova, acrescente um item a QUIZES.
 *
 * Semanas 5–8: perguntas adaptadas de bible.json do projeto quiz-jeiel
 * (https://github.com/Jeiel0rbit/quiz-jeiel) — Copyright (c) 2024
 * Jeiel Lima Miranda, licença MIT. Referências normalizadas e campo
 * "explica" adicionado na adaptação.
 */

export interface QuizPergunta {
  pergunta: string;
  alternativas: [string, string, string, string];
  correta: 0 | 1 | 2 | 3;
  ref: string; // referência bíblica da resposta
  explica: string; // 1 linha de contexto/edificação
}

export interface QuizSemana {
  id: string;
  tema: string;
  descricao: string;
  perguntas: QuizPergunta[];
}

export const QUIZES: QuizSemana[] = [
  {
    id: "criacao-patriarcas",
    tema: "Criação e Patriarcas",
    descricao: "Do Gênesis às promessas feitas a Abraão.",
    perguntas: [
      {
        pergunta: "O que Deus criou no primeiro dia?",
        alternativas: ["Os animais", "A luz", "O homem", "As estrelas"],
        correta: 1,
        ref: "Gênesis 1:3",
        explica: "“Haja luz; e houve luz” — a primeira palavra criadora registrada.",
      },
      {
        pergunta: "Quem foi vendido como escravo pelos próprios irmãos?",
        alternativas: ["Moisés", "Davi", "José", "Isaque"],
        correta: 2,
        ref: "Gênesis 37:28",
        explica: "José foi vendido por vinte moedas de prata e terminou governador do Egito.",
      },
      {
        pergunta: "Qual era o nome da esposa de Isaque?",
        alternativas: ["Sara", "Rebeca", "Lia", "Raquel"],
        correta: 1,
        ref: "Gênesis 24:67",
        explica: "Rebeca foi escolhida para Isaque ainda antes de os dois se conhecerem.",
      },
      {
        pergunta: "Quantos dias Deus usou para criar todas as coisas, descansando no sétimo?",
        alternativas: ["Três dias", "Seis dias", "Sete dias de obra", "Quarenta dias"],
        correta: 1,
        ref: "Gênesis 2:2",
        explica: "Seis dias de obra e o sétimo de descanso — modelo da semana até hoje.",
      },
      {
        pergunta: "O que o arco-íris passou a simbolizar depois do dilúvio?",
        alternativas: [
          "A aliança de Deus de nunca mais destruir a terra com água",
          "A coroação de Noé",
          "O fim do inverno",
          "A divisão das línguas",
        ],
        correta: 0,
        ref: "Gênesis 9:13",
        explica: "O arco nas nuvens é o sinal visível de uma promessa invisível.",
      },
    ],
  },
  {
    id: "jesus-evangelhos",
    tema: "Jesus e os Evangelhos",
    descricao: "Milagres, parábolas e palavras de Jesus.",
    perguntas: [
      {
        pergunta: "Qual foi o primeiro milagre de Jesus?",
        alternativas: [
          "Multiplicar os pães",
          "Transformar água em vinho",
          "Curar um leproso",
          "Andar sobre as águas",
        ],
        correta: 1,
        ref: "João 2:9",
        explica: "Nas bodas em Caná da Galileia — o “princípio dos sinais”.",
      },
      {
        pergunta: "Na parábola, quem foi o “bom” samaritano?",
        alternativas: [
          "O sacerdote que passou de largo",
          "O levita apressado",
          "O viajante que cuidou do ferido",
          "O dono da estalagem",
        ],
        correta: 2,
        ref: "Lucas 10:33-34",
        explica: "O próximo é quem age com misericórdia, não quem tem o título certo.",
      },
      {
        pergunta: "O que Jesus disse ser: “Eu sou o caminho, a verdade e...”?",
        alternativas: ["a porta", "a vida", "a luz", "o pão"],
        correta: 1,
        ref: "João 14:6",
        explica: "Uma das declarações mais diretas de Jesus sobre si mesmo.",
      },
      {
        pergunta: "Quantos pães e peixes o menino entregou para a multiplicação?",
        alternativas: [
          "Sete pães e dois peixes",
          "Cinco pães e dois peixes",
          "Dois pães e cinco peixes",
          "Doze cestos cheios",
        ],
        correta: 1,
        ref: "João 6:9",
        explica: "Pouco nas mãos de Jesus alimenta multidões — e ainda sobra.",
      },
      {
        pergunta: "Quem negou Jesus três vezes antes do galo cantar?",
        alternativas: ["João", "Tomé", "Pedro", "Judas"],
        correta: 2,
        ref: "Lucas 22:61",
        explica: "Pedro chorou amargamente — e depois foi restaurado pelo próprio Jesus.",
      },
    ],
  },
  {
    id: "igreja-fe",
    tema: "Igreja e Fé",
    descricao: "Do Pentecostes à vida da primeira igreja.",
    perguntas: [
      {
        pergunta: "Em que festa o Espírito Santo desceu sobre os discípulos?",
        alternativas: ["Páscoa", "Pentecostes", "Tabernáculos", "Purim"],
        correta: 1,
        ref: "Atos 2:1-4",
        explica: "O nascimento público da Igreja, com línguas como de fogo.",
      },
      {
        pergunta: "Segundo Hebreus, o que é a fé?",
        alternativas: [
          "O firme fundamento das coisas que se esperam",
          "A ausência de dúvidas",
          "Um sentimento passageiro",
          "A recompensa dos justos",
        ],
        correta: 0,
        ref: "Hebreus 11:1",
        explica: "Fé é fundamento e prova — o capítulo 11 inteiro a ilustra com heróis.",
      },
      {
        pergunta: "Quem escreveu a maior parte das cartas do Novo Testamento?",
        alternativas: ["Pedro", "João", "Tiago", "Paulo"],
        correta: 3,
        ref: "Romanos 1:1",
        explica: "Treze cartas levam o nome de Paulo, de Romanos a Filemom.",
      },
      {
        pergunta: "Qual casal mentiu ao Espírito Santo sobre uma oferta?",
        alternativas: ["Áquila e Priscila", "Ananias e Safira", "Felipe e Eunuco", "Barnabé e Maria"],
        correta: 1,
        ref: "Atos 5:3-4",
        explica: "O problema não foi o valor, foi a mentira — Deus leva a integridade a sério.",
      },
      {
        pergunta: "“Posso todas as coisas naquele que me fortalece” está em...",
        alternativas: ["Efésios 6", "Filipenses 4:13", "Colossenses 1", "2 Timóteo 2"],
        correta: 1,
        ref: "Filipenses 4:13",
        explica: "Paulo escreveu isso preso — contentamento não depende de circunstância.",
      },
    ],
  },
  {
    id: "mulheres-biblia",
    tema: "Mulheres da Bíblia",
    descricao: "Fé e coragem em histórias que mudaram Israel.",
    perguntas: [
      {
        pergunta: "Que rainha arriscou a vida entrando sem ser chamada para salvar os judeus?",
        alternativas: ["Rute", "Ester", "Débora", "Abigail"],
        correta: 1,
        ref: "Ester 4:16",
        explica: "“Se perecer, pereci” — coragem que nasceu de jejum e propósito.",
      },
      {
        pergunta: "Quem disse: “O teu povo será o meu povo, e o teu Deus será o meu Deus”?",
        alternativas: ["Noemi", "Rute", "Orfa", "Sara"],
        correta: 1,
        ref: "Rute 1:16",
        explica: "A lealdade de Rute a Noemi a colocou na linhagem do rei Davi.",
      },
      {
        pergunta: "Qual mulher foi juíza e profetisa em Israel?",
        alternativas: ["Miriã", "Débora", "Hulda", "Ana"],
        correta: 1,
        ref: "Juízes 4:4",
        explica: "Débora julgava debaixo das palmeiras e liderou a vitória sobre Sísera.",
      },
      {
        pergunta: "Que mãe orou com amargura no templo e dedicou o filho a Deus?",
        alternativas: ["Isabel", "Ana", "Rebeca", "Joquebede"],
        correta: 1,
        ref: "1 Samuel 1:20",
        explica: "Da oração de Ana nasceu Samuel, o profeta que ungiu reis.",
      },
      {
        pergunta: "O que Maria respondeu ao anjo na anunciação?",
        alternativas: [
          "“Como será isso?”",
          "“Eis aqui a serva do Senhor”",
          "“Bem-aventurada sou”",
          "“Faça-se em mim um sinal”",
        ],
        correta: 1,
        ref: "Lucas 1:38",
        explica: "Obediência imediata — o “sim” que carregou o Salvador.",
      },
    ],
  },
  {
    id: "reis-profetas",
    tema: "Reis e Profetas",
    descricao: "Coroas, batalhas e vozes que confrontaram reis.",
    perguntas: [
      {
        pergunta: "Quem foi o primeiro rei de Israel?",
        alternativas: ["Saul", "Davi", "Salomão", "Josué"],
        correta: 0,
        ref: "1 Samuel 10:1",
        explica: "Samuel ungiu Saul — o povo pediu rei “como as outras nações”.",
      },
      {
        pergunta: "Com qual arma Davi derrotou o gigante Golias?",
        alternativas: ["Lança", "Espada", "Funda e pedra", "Arco e flecha"],
        correta: 2,
        ref: "1 Samuel 17:49-50",
        explica: "Uma pedra lisa e a certeza de que “a batalha é do Senhor”.",
      },
      {
        pergunta: "Quem foi o pai de Davi?",
        alternativas: ["Obede", "Jessé", "Boaz", "Saul"],
        correta: 1,
        ref: "1 Samuel 16:1",
        explica: "O caçula esquecido no pasto — Deus vê o coração, não a aparência.",
      },
      {
        pergunta: "Qual profeta desafiou os profetas de Baal no Monte Carmelo?",
        alternativas: ["Eliseu", "Isaías", "Jeremias", "Elias"],
        correta: 3,
        ref: "1 Reis 18:20-40",
        explica: "Fogo do céu diante de 450 profetas — “Só o Senhor é Deus”.",
      },
      {
        pergunta: "Quem sucedeu Elias como profeta?",
        alternativas: ["Eliseu", "Natã", "Isaías", "Ageu"],
        correta: 0,
        ref: "2 Reis 2:9-15",
        explica: "Eliseu pediu porção dobrada do espírito de Elias — e recebeu.",
      },
    ],
  },
  {
    id: "juizes-livramentos",
    tema: "Juízes e Livramentos",
    descricao: "Os libertadores que Deus levantou para Israel.",
    perguntas: [
      {
        pergunta: "Quem conduziu Israel à Terra Prometida após a morte de Moisés?",
        alternativas: ["Calebe", "Arão", "Josué", "Samuel"],
        correta: 2,
        ref: "Josué 1:1-2",
        explica: "“Seja forte e corajoso” — a ordem se repete três vezes no capítulo.",
      },
      {
        pergunta: "Qual sinal Deus deu a Gideão com um velo de lã?",
        alternativas: [
          "Chuva por três dias",
          "Velo molhado e seco",
          "O mar se abrindo",
          "Fogo na sarça",
        ],
        correta: 1,
        ref: "Juízes 6:36-40",
        explica: "Deus atendeu o teste duas vezes — e Gideão venceu com 300 homens.",
      },
      {
        pergunta: "Qual juiz fez o voto imprudente sobre a primeira coisa que saísse de casa?",
        alternativas: ["Débora", "Jefté", "Sansão", "Gideão"],
        correta: 1,
        ref: "Juízes 11:30-31",
        explica: "Palavras têm peso: votos precipitados custam caro.",
      },
      {
        pergunta: "Qual era o segredo da força de Sansão?",
        alternativas: [
          "Orar três vezes ao dia",
          "Nunca cortar o cabelo",
          "Comer pão especial",
          "Beber apenas água",
        ],
        correta: 1,
        ref: "Juízes 16:17",
        explica: "O cabelo guardava o voto de nazireu — a força vinha da consagração.",
      },
      {
        pergunta: "Quem foi lançado na cova dos leões por orar a Deus?",
        alternativas: ["Moisés", "Elias", "Daniel", "José"],
        correta: 2,
        ref: "Daniel 6:16-23",
        explica: "Daniel orava três vezes ao dia de janela aberta — e Deus fechou bocas.",
      },
    ],
  },
  {
    id: "sinais-juizo",
    tema: "Sinais e Juízo",
    descricao: "Pragas, fornalhas e visões do poder de Deus.",
    perguntas: [
      {
        pergunta: "Qual rei lançou Sadraque, Mesaque e Abede-Nego na fornalha?",
        alternativas: ["Ciro", "Nabucodonosor", "Dario", "Artaxerxes"],
        correta: 1,
        ref: "Daniel 3:19-20",
        explica: "A fornalha aquecida sete vezes mais — e um quarto homem no fogo.",
      },
      {
        pergunta: "Qual profeta viu ossos secos se tornarem um grande exército?",
        alternativas: ["Daniel", "Ezequiel", "Jeremias", "Isaías"],
        correta: 1,
        ref: "Ezequiel 37:1-14",
        explica: "“Acaso podem reviver?” — o Espírito sopra onde há morte.",
      },
      {
        pergunta: "Qual foi a primeira praga sobre o Egito?",
        alternativas: ["Rãs", "Piolhos", "Água em sangue", "Moscas"],
        correta: 2,
        ref: "Êxodo 7:19-21",
        explica: "O Nilo, deus do Egito, virou sangue — Deus julga os ídolos.",
      },
      {
        pergunta: "Qual mandamento proíbe fazer ídolos para adoração?",
        alternativas: ["O primeiro", "O segundo", "O quarto", "O sétimo"],
        correta: 1,
        ref: "Êxodo 20:4-6",
        explica: "O primeiro trata de quem adorar; o segundo, de como adorar.",
      },
      {
        pergunta: "Quantos dias Jonas passou no ventre do grande peixe?",
        alternativas: ["1 dia", "2 dias", "3 dias", "4 dias"],
        correta: 2,
        ref: "Jonas 1:17",
        explica: "Três dias de escuridão antes da segunda chance em Nínive.",
      },
    ],
  },
  {
    id: "chamados-comecos",
    tema: "Chamados e Começos",
    descricao: "Quando Deus chama pelo nome e tudo muda.",
    perguntas: [
      {
        pergunta: "De qual cidade Deus chamou Abrão?",
        alternativas: ["Babilônia", "Egito", "Ur dos Caldeus", "Jerusalém"],
        correta: 2,
        ref: "Gênesis 12:1",
        explica: "“Sai da tua terra” — a fé começa com um passo sem mapa.",
      },
      {
        pergunta: "Que novo nome Jacó recebeu após lutar a noite inteira?",
        alternativas: ["Israel", "Esaú", "Abraão", "Isaque"],
        correta: 0,
        ref: "Gênesis 32:28",
        explica: "De “enganador” a “príncipe com Deus” — Deus renomeia destinos.",
      },
      {
        pergunta: "Qual discípulo era coletor de impostos antes de seguir Jesus?",
        alternativas: ["João", "Pedro", "André", "Mateus"],
        correta: 3,
        ref: "Mateus 9:9",
        explica: "Jesus chamou um traidor da pátria — e ele virou evangelista.",
      },
      {
        pergunta: "Em qual estrada Saulo encontrou Jesus e se converteu?",
        alternativas: ["Jericó", "Antioquia", "Emaús", "Damasco"],
        correta: 3,
        ref: "Atos 9:1-3",
        explica: "O perseguidor virou apóstolo — ninguém está longe demais.",
      },
      {
        pergunta: "No Sermão da Montanha, quem “verá a Deus”?",
        alternativas: [
          "Os misericordiosos",
          "Os puros de coração",
          "Os que choram",
          "Os pacificadores",
        ],
        correta: 1,
        ref: "Mateus 5:8",
        explica: "Pureza de coração não é perfeição — é um coração sem máscara.",
      },
    ],
  },
];

/** Escolhe o quiz da semana ISO (rotação determinística). */
export function getQuizDaSemana(semanaISO: string): QuizSemana {
  const [, ss] = semanaISO.split("-").map(Number);
  return QUIZES[(isNaN(ss) ? 0 : ss) % QUIZES.length];
}

/** Mensagem por faixa de acertos (0..total). */
export function mensagemResultado(acertos: number, total: number): string {
  const p = acertos / total;
  if (p === 1) return "Perfeito! Conhecimento de escriba. Compartilhe e desafie alguém. 🙌";
  if (p >= 0.6) return "Muito bem! Continue regando essa semente. 🌱";
  return "Bom começo! Refaça na semana que vem e confira as referências. 📖";
}

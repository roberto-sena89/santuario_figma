export interface Devotional {
  title: string;
  verse: string;
  verseRef: string;
  body: string;
  prayer: string;
  theme: string;
}

const DEVOTIONALS: Devotional[] = [
  {
    title: "A Graça que Nos Sustenta",
    verse:
      "Porque pela graça vocês são salvos, mediante a fé, e isso não vem de vocês, é dom de Deus.",
    verseRef: "Efésios 2:8",
    body: `A graça de Deus é o fundamento de tudo o que somos e temos como crentes. Não foi por mérito próprio que fomos alcançados pelo amor de Deus — foi pela sua infinita misericórdia e bondade.

Muitas vezes carregamos o peso de achar que precisamos "merecer" a presença de Deus, que nossas falhas nos tornam indignos de sua atenção. Mas a Palavra nos ensina algo radicalmente diferente: a salvação é um presente, não uma conquista.

Hoje, permita-se receber esse dom sem reservas. Deus não ama quem você ainda vai ser — ele ama quem você é agora, com todas as imperfeições. É a partir desse amor incondicional que a transformação acontece. Não nos tornamos melhores para merecer o amor de Deus; o amor de Deus é o que nos torna melhores.

Descanse nessa certeza: você não precisa fazer nada para ser aceito pelo Pai. Cristo já fez tudo na cruz. Sua graça é suficiente para hoje, para amanhã e para sempre.`,
    prayer:
      "Senhor, obrigado pela sua graça imerecida. Ajuda-me a parar de tentar merecer o que você já concedeu gratuitamente. Que eu viva cada dia como resposta ao seu amor e não como tentativa de ganhá-lo. Em nome de Jesus, amém.",
    theme: "Graça",
  },
  {
    title: "Renovados a Cada Manhã",
    verse:
      "As misericórdias do Senhor não têm fim; as suas bondades não se esgotam. Renovam-se cada manhã; grande é a tua fidelidade!",
    verseRef: "Lamentações 3:22-23",
    body: `Cada amanhecer é um recomeço. Quando o sol nasce, ele traz consigo a certeza de que Deus nunca desiste de nós — suas misericórdias são renovadas com a mesma regularidade com que o dia sucede a noite.

O profeta Jeremias escreveu estas palavras em um dos momentos mais sombrios da história de Israel. Mesmo diante da destruição de Jerusalém, ele encontrou esperança não nas circunstâncias, mas na fidelidade do Deus que não muda.

Você pode estar passando por uma fase difícil hoje. Talvez os erros do ontem pesem sobre seus ombros. Mas a misericórdia de Deus não guarda registro dos fracassos — ela se renova. Hoje é um novo dia, com novas misericórdias, um novo começo.

A fidelidade de Deus não depende da nossa. Ele permanece fiel mesmo quando somos infiéis. Essa é a rocha sobre a qual construímos nossa esperança: não a perfeição de nossa caminhada, mas a inabalável fidelidade do nosso Deus.`,
    prayer:
      "Pai, obrigado por cada novo amanhecer como prova da sua misericórdia. Que eu comece este dia com o coração voltado para ti, confiante na tua fidelidade. Perdoa o que ficou para trás e me guia nos próximos passos. Amém.",
    theme: "Misericórdia",
  },
  {
    title: "Força na Fraqueza",
    verse: "Posso tudo naquele que me fortalece.",
    verseRef: "Filipenses 4:13",
    body: `Este versículo é frequentemente citado como encorajamento para realizar grandes feitos. Mas Paulo o escreveu de dentro de uma prisão, não de um pódio de vitória. O contexto é de aprender a estar contente em qualquer situação — na abundância e na necessidade.

Às vezes confundimos "posso tudo" com invencibilidade humana. Mas Paulo estava dizendo algo muito mais profundo: a capacidade de passar por qualquer circunstância — boa ou má — com paz e contentamento vem de Cristo, e não de nós.

Você não precisa ser forte por conta própria hoje. Na verdade, é na nossa fraqueza que o poder de Deus se aperfeiçoa (2 Coríntios 12:9). Quando finalmente paramos de depender exclusivamente de nossas próprias forças, abrimos espaço para que a força de Deus opere em nós.

Entregue hoje suas limitações ao Senhor. Diga a ele: "Não consigo por conta própria, mas tu podes em mim." Essa é a oração que abre as comportas da força divina.`,
    prayer:
      "Senhor Jesus, reconheço minha fraqueza diante dos desafios de hoje. Mas coloco minha confiança na tua força. Que não seja eu, mas Cristo em mim. Capacita-me para fazer o que é certo, com amor e fidelidade. Amém.",
    theme: "Força",
  },
  {
    title: "Não Tema, Pois Estou Contigo",
    verse:
      "Não tema, pois estou com você; não se apavore, pois sou o seu Deus. Eu o fortalecerei e o ajudarei; eu o sustentarei com a minha mão direita justa.",
    verseRef: "Isaías 41:10",
    body: `O medo é uma das emoções mais paralisantes que o ser humano experimenta. Medo do futuro, do fracasso, da doença, da rejeição — essas sombras podem transformar nossos dias em prisões invisíveis.

Mas eis o que Deus diz ao seu povo através de Isaías: "Não tema." Não porque as circunstâncias sejam perfeitas, mas porque Deus está presente. Sua presença transforma o campo de batalha.

Note a promessa tripla neste versículo: Deus fortalecerá, Deus ajudará, Deus sustentará. Três garantias divinas para cada sombra que o medo projeta. Não estamos sozinhos no que enfrentamos.

Há algo que você está temendo hoje? Traga isso para a presença de Deus. Não é fraqueza admitir o medo — é sabedoria entregá-lo ao único que pode substituí-lo pela paz que excede todo entendimento. Permita que a mão direita justa de Deus o sustente quando suas próprias forças vacilarem.`,
    prayer:
      "Deus de toda consolação, há medos que carrego e não sei como resolver. Hoje os coloco nas tuas mãos. Tu prometeste estar comigo — escolho crer nessa promessa. Afasta o medo e enche meu coração da tua paz. Em nome de Jesus, amém.",
    theme: "Encorajamento",
  },
  {
    title: "Busquei o Senhor e Ele Me Respondeu",
    verse: "Busquei o Senhor, e ele me respondeu; livrou-me de todos os meus temores.",
    verseRef: "Salmos 34:4",
    body: `A oração não é um monólogo religioso — é um diálogo com o Deus vivo. Davi sabia disso. Em situações de perigo real, com inimigos ao redor, ele buscou o Senhor e encontrou resposta.

"Busquei" é uma palavra ativa. Não é uma espera passiva, mas uma busca intencional. Às vezes passamos meses angustiados por situações que nunca trouxemos a Deus de forma genuína — com honestidade, persistência e fé.

O resultado? Deus respondeu. E não apenas com palavras — mas com libertação de todos os temores. Não de algumas circunstâncias, mas de todos os medos que aprisionavam o coração do salmista.

Hoje é um convite para buscá-lo de verdade. Não uma oração protocolar antes de dormir, mas uma busca genuína — com tempo, com silêncio, com honestidade. Diga a ele o que está no fundo do seu coração. Ele responde àqueles que o buscam de verdade.`,
    prayer:
      "Pai, hoje me disponho a te buscar de verdade. Que a minha oração não seja rotina, mas encontro real contigo. Responde-me como respondeste a Davi. Livra-me do que me aprisiona e enche meu coração da tua presença. Amém.",
    theme: "Oração",
  },
  {
    title: "Uma Nova Criação",
    verse:
      "Se alguém está em Cristo, é nova criação. As coisas antigas já passaram; eis que surgiram coisas novas!",
    verseRef: "2 Coríntios 5:17",
    body: `Um dos maiores privilégios da vida cristã é saber que o passado não define o futuro. Em Cristo, há uma ruptura radical com o que fomos — nascemos de novo para uma nova identidade.

"As coisas antigas já passaram" não significa que as memórias desaparecem ou que as consequências se apagam instantaneamente. Significa que o poder delas sobre você foi quebrado. Você não é mais definido pelos seus erros, fracassos, ou pela forma como os outros o viram.

Eis que surgiram coisas novas! Este é o tempo verbal do amanhecer — algo que acabou de acontecer e tem efeitos contínuos. Sua nova criação em Cristo não é apenas um evento passado; é uma realidade presente e crescente.

Você talvez carregue hoje uma identidade velha que não lhe pertence mais — o fracassado, o que nunca muda, o que não tem futuro. Escute o que Deus diz sobre você: nova criação. Habitada pelo Espírito Santo. Chamada e amada. Essa é a sua verdadeira identidade.`,
    prayer:
      "Pai, obrigado por me fazer nova criação. Ajuda-me a andar segundo essa verdade e não segundo os rótulos do passado. Que eu viva hoje como filho(a) seu(sua), com liberdade e propósito. Em nome de Jesus, amém.",
    theme: "Nova Vida",
  },
  {
    title: "O Pastor e a Ovelha",
    verse: "O Senhor é o meu pastor; nada me faltará.",
    verseRef: "Salmos 23:1",
    body: `Poucas imagens da Bíblia são mais conhecidas e amadas que essa: Deus como pastor, e nós como ovelhas. Mas não um pastor distante e impessoal — é o meu pastor. Uma relação particular, íntima, contínua.

O que significa ter o Senhor como pastor? Significa que você é conduzido, não empurrado. Que há descanso nos pastos verdes e águas tranquilas mesmo em dias agitados. Que mesmo no "vale da sombra da morte" há presença e consolo.

"Nada me faltará" não é uma promessa de riqueza material, mas de provisão completa para o que é essencial. Deus conhece cada uma de suas ovelhas, conhece suas necessidades, e cuida com atenção individual.

Existe algo em que você sente falta hoje — paz, direção, força, cura, relação restaurada? Traga isso ao seu Pastor. Ele não perdeu nenhuma ovelha que colocou sob seus cuidados, e não vai começar por você. Você está em boas mãos.`,
    prayer:
      "Senhor, tu és o meu pastor. Hoje eu deposito nas tuas mãos as necessidades que parecem grandes demais para mim. Confio que nada me faltará, pois tu cuidas de mim. Guia meus passos hoje segundo a tua bondade. Amém.",
    theme: "Provisão",
  },
];

export function getDailyDevotional(): Devotional {
  const dayOfWeek = new Date().getDay();
  return DEVOTIONALS[dayOfWeek];
}

export function getDevotionalByDate(date: Date): Devotional {
  const start = new Date(2024, 0, 1);
  const dayOfYear = Math.floor(
    (date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  return DEVOTIONALS[Math.abs(dayOfYear) % DEVOTIONALS.length];
}

export function getAllDevotionals(): Array<Devotional & { date: string; index: number }> {
  return DEVOTIONALS.map((d, i) => ({
    ...d,
    index: i,
    date: getDayLabel(i),
  }));
}

function getDayLabel(index: number): string {
  const days = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  return days[index] || `Dia ${index + 1}`;
}

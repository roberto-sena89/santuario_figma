/**
 * Coleções temáticas e mapa de temas/emoções para a Bíblia.
 *
 * Cada coleção é uma experiência editorial curada com:
 *  - Introdução pastoral
 *  - Subtemas (5-7) com hero verse, versículos complementares, reflexão e oração
 *  - Identidade visual própria (paleta, decoração)
 */

import { useState, useEffect } from "react";

export interface CuratedVerse {
  book: number; // 1..66 (id do BIBLE_BOOKS)
  chapter: number;
  verse: number;
  theme?: string;
}

export interface Subtema {
  id: string;
  titulo: string;
  descricao: string;
  versiculoDestaque: {
    texto: string;
    referencia: string;
  };
  versiculos: { texto: string; referencia: string }[];
  reflexao: string;
  oracao: string;
}

export type CollectionStyle = "mulher" | "homem" | "generico";

export interface CuratedCollection {
  id: string;
  slug: string; // usado na URL: /mulher/fe-e-coragem
  label: string;
  emoji: string;
  style: CollectionStyle;
  subtitulo: string;
  description: string;
  curator: string;
  intro: string;
  subtemas: Subtema[];
  /** Versículos curados simples (para coleções sem subtemas, ex: Jovens/Família). */
  verses?: CuratedVerse[];
}

export const CURATED_COLLECTIONS: CuratedCollection[] = [
  // ============================================================
  // 👩 BÍBLIA PARA A MULHER
  // ============================================================
  {
    id: "mulher",
    slug: "mulher",
    label: "Bíblia para a Mulher",
    emoji: "👩",
    style: "mulher",
    subtitulo:
      "Uma jornada pelas Escrituras que fortalecem, consolam e inspiram a mulher segundo o coração de Deus",
    description:
      "Para a mulher que busca ser edificada pela Palavra em cada papel que vive.",
    curator: "Pra. Karina Oliveira",
    intro:
      "Querida irmã, esta coleção não é uma lista de versículos — é um convite. Cada subtema foi cuidadosamente selecionado para falar com a mulher que você é hoje: filha, mãe, esposa, profissional, amiga. Que a Palavra de Deus encontre o lugar exato onde você precisa ouvir e o que você precisa viver hoje.",
    subtemas: [
      {
        id: "mulher-virtuosa",
        titulo: "Mulher Virtuosa",
        descricao:
          "A mulher que teme ao Senhor, sua força, sabedoria e cuidado com a casa.",
        versiculoDestaque: {
          texto:
            "A mulher que teme ao Senhor, essa será louvada.",
          referencia: "Provérbios 31:30",
        },
        versiculos: [
          {
            texto:
              "Mulher virtuosa, quem a achará? O seu valor muito excede o de rubis.",
            referencia: "Provérbios 31:10",
          },
          {
            texto:
              "A força e a honra são o seu vestido; e se ri do dia vindouro.",
            referencia: "Provérbios 31:25",
          },
          {
            texto:
              "Enganosa é a graça, e vã é a formosura; a mulher que teme ao Senhor, essa será louvada.",
            referencia: "Provérbios 31:30",
          },
          {
            texto:
              "Fala com sabedoria, e na sua língua há a lei da bondade.",
            referencia: "Provérbios 31:26",
          },
        ],
        reflexao:
          "Ser virtuosa não é perfeição — é presença. É a mulher que se levanta com propósito, que estende a mão com sabedoria, que não teme porque confia. Sua beleza mais duradoura é o caráter que Deus constrói em você a cada manhã.",
        oracao:
          "Senhor, molda em mim uma mulher segundo o teu coração. Que eu não busque aplausos do mundo, mas a aprovação que vem de ti. Reveste-me de força, honra e temor santo. Em nome de Jesus, amém.",
      },
      {
        id: "fe-e-coragem",
        titulo: "Fé e Coragem",
        descricao:
          "Mulheres que ousaram confiar em Deus em momentos decisivos.",
        versiculoDestaque: {
          texto:
            "Porque se te calares totalmente neste tempo, socorro e livramento virá de outro lugar para os judeus; mas tu e a casa de teu pai perecereis.",
          referencia: "Ester 4:14",
        },
        versiculos: [
          {
            texto:
              "Sê forte e corajoso; não pasmes, nem te espantes, porque o Senhor, teu Deus, é contigo, por onde quer que andares.",
            referencia: "Josué 1:9",
          },
          {
            texto:
              "Ora, a fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.",
            referencia: "Hebreus 11:1",
          },
          {
            texto:
              "E não vos amedronteis por causa deste grande número; porque a peleja não é vossa, mas de Deus.",
            referencia: "2 Crônicas 20:15",
          },
        ],
        reflexao:
          "Ester não tinha voz política — tinha posicionamento. Débora não era aceita como líder — era chamada. Fé é avançar quando a lógica diz para recuar. Sua coragem não precisa ser barulhenta: precisa ser constante.",
        oracao:
          "Pai, tira de mim o medo que paralisa e dá-me a coragem que constrói. Onde o mundo diz que não dá, que tu me lembres que contigo tudo é possível. Aumento a minha fé. Amém.",
      },
      {
        id: "maternidade",
        titulo: "Maternidade",
        descricao:
          "A bênção e a responsabilidade de ser mãe segundo a Palavra.",
        versiculoDestaque: {
          texto:
            "Eis que os filhos são herança do Senhor, e o fruto do ventre o seu galardão.",
          referencia: "Salmos 127:3",
        },
        versiculos: [
          {
            texto:
              "Instrui o menino no caminho em que deve andar, e até quando envelhecer não se desviará dele.",
            referencia: "Provérbios 22:6",
          },
          {
            texto:
              "Como alguém a quem sua mãe consola, assim eu vos consolarei; e em Jerusalém sereis consolados.",
            referencia: "Isaías 66:13",
          },
          {
            texto:
              "A mulhergrávida dará à luz e alegrar-se-á com seus filhos.",
            referencia: "Salmos 113:9",
          },
        ],
        reflexao:
          "Maternidade é vocação, não categoria. Não importa se seus filhos ainda estão no ventre, na infância, na adolescência ou se sua maternidade se estende a outros que não são seus por sangue — o chamado é o mesmo: amar, ensinar, apontar para o Céu.",
        oracao:
          "Senhor, abençoa os filhos que me foram confiados. Dá-me sabedoria para educá-los, paciência para esperá-los e graça para amá-los como tu nos amas. Guarda-os sob tuas asas. Amém.",
      },
      {
        id: "relacionamentos",
        titulo: "Relacionamentos",
        descricao:
          "Amor, aliança e sabedoria nos relacionamentos segundo o coração de Deus.",
        versiculoDestaque: {
          texto:
            "Onde tu fores, irei eu; e onde tu quedares, ali quedarei eu; o teu povo será o meu povo, e o teu Deus será o meu Deus.",
          referencia: "Rute 1:16",
        },
        versiculos: [
          {
            texto:
              "Coloca-me como selo sobre o teu coração, como selo sobre o teu braço; porque o amor é forte como a morte.",
            referencia: "Cantares 8:6",
          },
          {
            texto:
              "As muitas águas não podem apagar o amor, nem os rios afogá-lo.",
            referencia: "Cantares 8:7",
          },
          {
            texto:
              "Revesti-vos de toda a armadura de Deus, para que possais estar firmes contra as astutas ciladas do diabo.",
            referencia: "Efésios 6:11",
          },
        ],
        reflexao:
          "Rute escolheu Noemi; a aliança era diária, não só no altar. Nos seus relacionamentos, Deus te chama pra ser presença, não só presença pontual. Amar é decidir ficar, é tratar o outro como aliado de Deus.",
        oracao:
          "Pai, ensina-me a amar como Cristo amou a Igreja. Que eu seja paciente nas esperas, fiel nas pequenas coisas e generosa no perdão. Guia meus relacionamentos e guarda meu coração. Amém.",
      },
      {
        id: "forca-interior",
        titulo: "Força Interior",
        descricao:
          "Ânimo, resiliência e descanso em Deus nos dias mais duros.",
        versiculoDestaque: {
          texto:
            "Posso todas as coisas naquele que me fortalece.",
          referencia: "Filipenses 4:13",
        },
        versiculos: [
          {
            texto:
              "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",
            referencia: "Salmos 46:1",
          },
          {
            texto:
              "A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.",
            referencia: "2 Coríntios 12:9",
          },
          {
            texto:
              "O Senhor é a minha força e o meu escudo; nele o meu coração confia.",
            referencia: "Salmos 28:7",
          },
        ],
        reflexao:
          "Força em Deus não é ausência de fraqueza — é presença dEle na fraqueza. Você não precisa dar conta de tudo; precisa dar conta do que Ele te pediu hoje. O resto, Ele sustenta.",
        oracao:
          "Senhor, quando a minha força acabar, que a tua comece em mim. Renova o meu ânimo, sustenta o meu caminhar e lembra-me que em ti eu sou mais do que venço. Amém.",
      },
      {
        id: "proposito-e-identidade",
        titulo: "Propósito e Identidade",
        descricao: "Quem a mulher é em Cristo e o seu chamado.",
        versiculoDestaque: {
          texto:
            "Eu te louvarei, porque de um modo assombroso e maravilhoso fui feito.",
          referencia: "Salmos 139:14",
        },
        versiculos: [
          {
            texto:
              "Porque eu bem sei os pensamentos que penso de vós, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais.",
            referencia: "Jeremias 29:11",
          },
          {
            texto:
              "Vós, porém, sois geração eleita, sacerdócio real, nação santa, povo de propriedade exclusiva de Deus.",
            referencia: "1 Pedro 2:9",
          },
          {
            texto:
              "Eu sou a videira, vós as varas; quem está em mim, e eu nele, esse dá muito fruto.",
            referencia: "João 15:5",
          },
        ],
        reflexao:
          "Antes do mundo te rotular, Deus te nomeou. Antes de alguém te diminuir, Ele te coroou. Sua identidade não está no espelho, no currículo ou no feed — está no que Ele diz sobre você.",
        oracao:
          "Pai, revela-me quem tu me chamaste para ser. Tira de mim toda identidade que o mundo tentou me dar e reveste-me da tua. Mostra-me o meu propósito em ti. Amém.",
      },
      {
        id: "oracao-e-adoracao",
        titulo: "Oração e Adoração",
        descricao:
          "Vida de oração, louvor e intimidade com Deus.",
        versiculoDestaque: {
          texto:
            "A minha alma engrandece ao Senhor, e o meu espírito se alegrou em Deus, meu Salvador.",
          referencia: "Lucas 1:46-47",
        },
        versiculos: [
          {
            texto:
              "Bendize, ó minha alma, ao Senhor, e tudo o que há em mim bendiga o seu santo nome.",
            referencia: "Salmos 103:1",
          },
          {
            texto:
              "Orai sem cessar. Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.",
            referencia: "1 Tessalonicenses 5:17-18",
          },
          {
            texto:
              "Louvai ao Senhor, porque ele é bom; porque a sua benignidade dura para sempre.",
            referencia: "Salmos 136:1",
          },
        ],
        reflexao:
          "Oração não é falar bonito — é falar verdade. Adoração não é performance — é presença. Há uma estação em que você não precisa pedir nada, apenas ficar diante dEle. É ali que o seu coração aprende a respirar.",
        oracao:
          "Senhor, ensina-me a orar. Que minha vida seja uma conversa contínua contigo — sem fórmulas, sem medo, sem pressa. Que eu te adore em espírito e em verdade. Amém.",
      },
    ],
  },

  // ============================================================
  // 👨 BÍBLIA PARA O HOMEM
  // ============================================================
  {
    id: "homem",
    slug: "homem",
    label: "Bíblia para o Homem",
    emoji: "👨",
    style: "homem",
    subtitulo:
      "Para o homem que foi chamado a conduzir, proteger e servir com integridade",
    description:
      "Para o homem que busca cumprir o propósito de Deus com coragem e fidelidade.",
    curator: "Pr. Wellington Mendes",
    intro:
      "Irmão, esta coleção não é um manual — é um chamado. Cada subtema fala ao homem que você é e ao homem que Deus quer formar em você: líder, pai, provedor, servo. Que o Espírito Santo te desafie e te fortaleça enquanto você lê.",
    subtemas: [
      {
        id: "lideranca-espiritual",
        titulo: "Liderança Espiritual",
        descricao:
          "O homem como líder do lar e exemplo segundo o coração de Deus.",
        versiculoDestaque: {
          texto:
            "Porém eu e a minha casa serviremos ao Senhor.",
          referencia: "Josué 24:15",
        },
        versiculos: [
          {
            texto:
              "Esta é uma palavra fiel: se alguém deseja o episcopado, excelente obra deseja.",
            referencia: "1 Timóteo 3:1",
          },
          {
            texto:
              "E vós, pais, não provoqueis a ira a vossos filhos, mas criai-os na doutrina e admoestação do Senhor.",
            referencia: "Efésios 6:4",
          },
          {
            texto:
              "Apascenta as minhas ovelhas.",
            referencia: "João 21:17",
          },
        ],
        reflexao:
          "Liderar não é mandar — é servir primeiro. O exemplo mais alto é Cristo lavando os pés dos discípulos. O homem de Deus não é o mais forte da sala; é o que se ajoelha primeiro em oração pela sua casa.",
        oracao:
          "Senhor, faz de mim um líder segundo o teu coração. Tira de mim a soberba e reveste-me de servo. Que a minha casa te reconheça primeiro em mim, e o meu povo veja Cristo em mim. Amém.",
      },
      {
        id: "coragem-e-batalha",
        titulo: "Coragem e Batalha",
        descricao:
          "Força, coragem e a armadura de Deus nos dias de guerra.",
        versiculoDestaque: {
          texto:
            "Sê forte e corajoso; não pasmes, nem te espantes, porque o Senhor, teu Deus, é contigo, por onde quer que andares.",
          referencia: "Josué 1:9",
        },
        versiculos: [
          {
            texto:
              "Não seja fraco, nem covarde, sofra as aflições comigo, como bom soldado de Jesus Cristo.",
            referencia: "2 Timóteo 2:3",
          },
          {
            texto:
              "Revesti-vos de toda a armadura de Deus, para que possais estar firmes contra as astutas ciladas do diabo.",
            referencia: "Efésios 6:11",
          },
          {
            texto:
              "Portanto, tomai toda a armadura de Deus, para que possais resistir no dia mau.",
            referencia: "Efésios 6:13",
          },
        ],
        reflexao:
          "A batalha existe, mas a vitória já tem dono. Você não está lutando sozinho — o Espírito Santo peleja por você. Vista a armadura de Deus todas as manhãs: verdade, justiça, evangelho, fé, salvação, Palavra.",
        oracao:
          "Senhor, levanta-me quando a carne quiser fugir. Reveste-me da tua armadura. Que eu não tema a batalha, porque sei quem é o meu general. Fortalece a minha coragem. Amém.",
      },
      {
        id: "paternidade",
        titulo: "Paternidade",
        descricao: "O coração do pai segundo as Escrituras.",
        versiculoDestaque: {
          texto:
            "Como um pai se compadece de seus filhos, assim o Senhor se compadece dos que o temem.",
          referencia: "Salmos 103:13",
        },
        versiculos: [
          {
            texto:
              "Filho meu, não rejeites a disciplina do Senhor, nem te enfades da sua repreensão.",
            referencia: "Provérbios 3:11",
          },
          {
            texto:
              "Instrui o menino no caminho em que deve andar, e até quando envelhecer não se desviará dele.",
            referencia: "Provérbios 22:6",
          },
          {
            texto:
              "E vós, pais, não provoqueis a ira a vossos filhos, mas criai-os na doutrina e admoestação do Senhor.",
            referencia: "Efésios 6:4",
          },
        ],
        reflexao:
          "Ser pai é uma das maiores responsabilidades dadas a um homem. Não é sobre prover só pão — é sobre prover presença, princípio e propósito. O mundo precisa de pais que não desistam da próxima geração.",
        oracao:
          "Pai celestial, ensina-me a ser pai como tu és pai. Dá-me paciência nos dias difíceis, graça para corrigir com amor, e coragem para apontar meus filhos sempre para ti. Amém.",
      },
      {
        id: "pureza-e-fidelidade",
        titulo: "Pureza e Fidelidade",
        descricao:
          "Integridade moral, pureza sexual e fidelidade no pacto.",
        versiculoDestaque: {
          texto:
              "Como pode o jovem guardar puro o seu caminho? Observando-o segundo a tua palavra.",
          referencia: "Salmos 119:9",
        },
        versiculos: [
          {
            texto:
              "Bebe das águas da tua própria cisterna, e das correntes do teu poço.",
            referencia: "Provérbios 5:15",
          },
          {
            texto:
              "Fugi da impureza. Todo o pecado que o homem comete é fora do corpo; mas o que se entrega à impureza, peca contra o seu próprio corpo.",
            referencia: "1 Coríntios 6:18",
          },
          {
            texto:
              "Acima de tudo guarda o teu coração, porque dele procedem as fontes da vida.",
            referencia: "Provérbios 4:23",
          },
        ],
        reflexao:
          "Pureza não é sobre não sentir — é sobre escolher. Você será tentado; isso é certo. A questão não é se, mas o que você faz quando. Fidelidade é uma decisão diária — e Deus dá força pra isso.",
        oracao:
          "Senhor, guarda o meu coração e os meus olhos. Onde a carne quer dominar, que o Espírito prevaleça. Renova em mim a integridade, a pureza e a fidelidade ao teu pacto. Amém.",
      },
      {
        id: "trabalho-e-provimento",
        titulo: "Trabalho e Provimento",
        descricao:
          "O valor do trabalho, honestidade e sustento da família.",
        versiculoDestaque: {
          texto:
            "O que lavra a sua terra se fartará de pão; mas o que segue os ociosos se fartará de pobreza.",
          referencia: "Provérbios 12:11",
        },
        versiculos: [
          {
            texto:
              "E tudo quanto fizerdes, fazei-o de todo o coração, como ao Senhor, e não aos homens.",
            referencia: "Colossenses 3:23",
          },
          {
            texto:
              "Porque, quando ainda estávamos convosco, isto vos mandamos: que, se alguém não quiser trabalhar, não coma também.",
            referencia: "2 Tessalonicenses 3:10",
          },
          {
            texto:
              "O homem fiel abundará em bênçãos; mas o que se apressa a enriquecer não ficará impune.",
            referencia: "Provérbios 28:20",
          },
        ],
        reflexao:
          "O trabalho é parte do projeto de Deus. Não é maldição — é vocação. Quando você trabalha como se trabalhasse para Deus, até o cansaço ganha propósito. Proveja com honestidade, excelência e fé.",
        oracao:
          "Senhor, abençoa o trabalho das minhas mãos. Onde há escassez, abre caminho. Onde há desânimo, renova a força. Que eu proveja a minha casa com honra e com a tua provisão. Amém.",
      },
      {
        id: "amizades-e-irmandade",
        titulo: "Amizades e Irmandade",
        descricao:
          "A importância da comunhão e da irmandade entre homens.",
        versiculoDestaque: {
          texto:
            "O ferro com ferro se aguça; e o homem afia o rosto do seu amigo.",
          referencia: "Provérbios 27:17",
        },
        versiculos: [
          {
            texto:
              "Melhor é serem dois do que um... Porque se caírem, um levanta o companheiro.",
            referencia: "Eclesiastes 4:9-10",
          },
          {
            texto:
              "E era a alma de Jônatas ligada com a alma de Davi; e Jônatas o amou como à sua própria alma.",
            referencia: "1 Samuel 18:1",
          },
          {
            texto:
              "Ninguém tem maior amor do que aquele que dá a sua vida pelos seus amigos.",
            referencia: "João 15:13",
          },
        ],
        reflexao:
          "Homens foram feitos para caminhar juntos. A solidão é perigosa, a irmandade é salvadora. Tenha irmãos que te confrontem com verdade, te levantem nos dias ruins e te chamem pra mais de Deus.",
        oracao:
          "Senhor,送我 irmãos que me edifiquem e que eu também possa edificar. Acaba com a soberba que me isola e ensina-me a caminhar com transparência e amor. Amém.",
      },
      {
        id: "descanso-e-confianca",
        titulo: "Descanso e Confiança",
        descricao: "O homem que confia no Senhor e encontra descanso.",
        versiculoDestaque: {
          texto:
            "Descansa no Senhor e espera nele.",
          referencia: "Salmos 37:7",
        },
        versiculos: [
          {
            texto:
              "Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.",
            referencia: "Mateus 11:28",
          },
          {
            texto:
              "Tomai sobre vós o meu jugo e aprendei de mim... e encontrareis descanso para as vossas almas.",
            referencia: "Mateus 11:29-30",
          },
          {
            texto:
              "Mas os que esperam no Senhor renovarão as suas forças; subirão com asas como águias.",
            referencia: "Isaías 40:31",
          },
        ],
        reflexao:
          "Descansar não é fraqueza — é fé. O mundo vai dizer que você precisa correr mais, produzir mais, dar conta de mais. Deus te convida a parar: parar de correr, parar de controlar, parar de se virar sozinho. Confie.",
        oracao:
          "Pai, ensina-me a descansar em ti. Onde o mundo me pressiona, que o teu Espírito me acalme. Renova as minhas forças. Que a minha paz não venha do que eu controlo, mas de ti. Amém.",
      },
    ],
  },

  // ============================================================
  // COLEÇÕES COMPACTAS (mantidas do escopo anterior)
  // ============================================================
  {
    id: "jovens",
    slug: "jovens",
    label: "Jovens",
    emoji: "🌱",
    style: "generico",
    subtitulo: "Direção, coragem e identidade em Deus pra essa geração",
    description: "Para jovens que estão firmando a fé e o propósito.",
    curator: "Rede de Jovens — Santuário da Adoração",
    intro:
      "Jovem, Deus não te chama pra esperar a vida passar — Ele te chama pra ser luz agora. Esta coleção reúne versículos que inflamam coragem, clareza e direção pra quem está no fogo da decisão.",
    subtemas: [],
    verses: [
      { book: 27, chapter: 1, verse: 8, theme: "Propósito" },
      { book: 50, chapter: 4, verse: 13, theme: "Força" },
      { book: 60, chapter: 1, verse: 15, theme: "Santidade" },
      { book: 19, chapter: 119, verse: 9, theme: "Pureza" },
      { book: 19, chapter: 119, verse: 11, theme: "Palavra" },
      { book: 49, chapter: 5, verse: 1, theme: "Imitação" },
      { book: 49, chapter: 5, verse: 16, theme: "Propósito" },
      { book: 45, chapter: 12, verse: 2, theme: "Transformação" },
      { book: 19, chapter: 25, verse: 4, theme: "Direção" },
      { book: 19, chapter: 25, verse: 5, theme: "Direção" },
    ],
  },
  {
    id: "familia",
    slug: "familia",
    label: "Família",
    emoji: "👨‍👩‍👧",
    style: "generico",
    subtitulo: "Edificação, amor e presença de Deus pra cada lar",
    description: "Para cada lar que quer ser edificado pela Palavra.",
    curator: "Ministério da Família — Santuário da Adoração",
    intro:
      "A família é a primeira igreja. Cada lar é chamado a ser lugar de ensino, de presença e de graça. Esta seleção aponta para o que a Palavra diz sobre casamentos, filhos, amor e presença diária de Deus.",
    subtemas: [],
    verses: [
      { book: 19, chapter: 127, verse: 1, theme: "Lar" },
      { book: 19, chapter: 128, verse: 3, theme: "Filhos" },
      { book: 20, chapter: 22, verse: 6, theme: "Filhos" },
      { book: 45, chapter: 12, verse: 5, theme: "Comunidade" },
      { book: 49, chapter: 5, verse: 21, theme: "Casamento" },
      { book: 49, chapter: 5, verse: 25, theme: "Casamento" },
      { book: 49, chapter: 5, verse: 33, theme: "Casamento" },
      { book: 45, chapter: 12, verse: 9, theme: "Amor" },
      { book: 46, chapter: 13, verse: 4, theme: "Amor" },
      { book: 46, chapter: 13, verse: 7, theme: "Amor" },
    ],
  },
  {
    id: "consolo-e-esperanca",
    slug: "consolo-e-esperanca",
    label: "Consolo e Esperança",
    emoji: "🕊️",
    style: "generico",
    subtitulo: "Onde a alma encontra refúgio e a esperança é restaurada",
    description: "Para momentos de dor, luto, cansaço e ansiedade.",
    curator: "Ministério de Intercessão — Santuário da Adoração",
    intro:
      "Para os dias em que o coração está pesado. A Palavra de Deus é refúgio — onde a dor é ouvida, a esperança é restaurada e a presença dEle é o bastante.",
    subtemas: [],
    verses: [
      { book: 19, chapter: 23, verse: 4, theme: "Consolo" },
      { book: 19, chapter: 34, verse: 18, theme: "Consolo" },
      { book: 23, chapter: 41, verse: 10, theme: "Consolo" },
      { book: 24, chapter: 29, verse: 11, theme: "Esperança" },
      { book: 45, chapter: 15, verse: 13, theme: "Esperança" },
      { book: 49, chapter: 2, verse: 14, theme: "Esperança" },
      { book: 19, chapter: 46, verse: 1, theme: "Refúgio" },
      { book: 19, chapter: 46, verse: 10, theme: "Refúgio" },
      { book: 23, chapter: 43, verse: 2, theme: "Refúgio" },
      { book: 45, chapter: 8, verse: 28, theme: "Confiança" },
      { book: 19, chapter: 91, verse: 1, theme: "Proteção" },
      { book: 19, chapter: 91, verse: 11, theme: "Proteção" },
    ],
  },
];

/** Look-up rápido por id. */
export const COLLECTIONS_BY_ID = Object.fromEntries(
  CURATED_COLLECTIONS.map((c) => [c.id, c])
);

/** Look-up rápido por slug. */
export const COLLECTIONS_BY_SLUG = Object.fromEntries(
  CURATED_COLLECTIONS.map((c) => [c.slug, c])
);

/** ============================================================
 *  Temas/emoções (busca por sentimento)
 *  ============================================================ */
export interface CuratedVerseRef {
  book: number;
  chapter: number;
  verse: number;
}

export interface ThemeMap {
  id: string;
  label: string;
  emoji: string;
  verses: CuratedVerseRef[];
}

export const THEME_MAP: ThemeMap[] = [
  {
    id: "esperanca",
    label: "Esperança",
    emoji: "🌅",
    verses: [
      { book: 24, chapter: 29, verse: 11 },
      { book: 45, chapter: 15, verse: 13 },
      { book: 25, chapter: 3, verse: 24 },
      { book: 19, chapter: 42, verse: 11 },
      { book: 19, chapter: 71, verse: 5 },
      { book: 19, chapter: 130, verse: 7 },
      { book: 19, chapter: 33, verse: 20 },
      { book: 58, chapter: 11, verse: 1 },
      { book: 60, chapter: 1, verse: 3 },
      { book: 56, chapter: 2, verse: 13 },
    ],
  },
  {
    id: "ansiedade",
    label: "Ansiedade",
    emoji: "💭",
    verses: [
      { book: 50, chapter: 4, verse: 6 },
      { book: 50, chapter: 4, verse: 7 },
      { book: 60, chapter: 5, verse: 7 },
      { book: 19, chapter: 55, verse: 22 },
      { book: 40, chapter: 6, verse: 34 },
      { book: 40, chapter: 6, verse: 33 },
      { book: 19, chapter: 94, verse: 19 },
      { book: 20, chapter: 12, verse: 25 },
      { book: 23, chapter: 41, verse: 10 },
    ],
  },
  {
    id: "gratidao",
    label: "Gratidão",
    emoji: "🙏",
    verses: [
      { book: 52, chapter: 5, verse: 18 },
      { book: 19, chapter: 103, verse: 2 },
      { book: 19, chapter: 100, verse: 4 },
      { book: 51, chapter: 3, verse: 17 },
      { book: 49, chapter: 5, verse: 20 },
      { book: 19, chapter: 107, verse: 1 },
      { book: 19, chapter: 118, verse: 24 },
      { book: 47, chapter: 9, verse: 15 },
      { book: 46, chapter: 10, verse: 31 },
    ],
  },
  {
    id: "forca",
    label: "Força",
    emoji: "💪",
    verses: [
      { book: 50, chapter: 4, verse: 13 },
      { book: 23, chapter: 40, verse: 31 },
      { book: 19, chapter: 46, verse: 1 },
      { book: 49, chapter: 6, verse: 10 },
      { book: 47, chapter: 12, verse: 9 },
      { book: 47, chapter: 12, verse: 10 },
      { book: 16, chapter: 8, verse: 10 },
      { book: 19, chapter: 18, verse: 32 },
      { book: 2, chapter: 15, verse: 2 },
    ],
  },
  {
    id: "perdao",
    label: "Perdão",
    emoji: "🕊️",
    verses: [
      { book: 62, chapter: 1, verse: 9 },
      { book: 49, chapter: 4, verse: 32 },
      { book: 51, chapter: 3, verse: 13 },
      { book: 19, chapter: 103, verse: 12 },
      { book: 40, chapter: 6, verse: 14 },
      { book: 41, chapter: 11, verse: 25 },
      { book: 33, chapter: 7, verse: 18 },
      { book: 42, chapter: 6, verse: 37 },
      { book: 23, chapter: 1, verse: 18 },
      { book: 40, chapter: 18, verse: 21 },
    ],
  },
  {
    id: "consolo",
    label: "Consolo",
    emoji: "🤍",
    verses: [
      { book: 47, chapter: 1, verse: 3 },
      { book: 47, chapter: 1, verse: 4 },
      { book: 40, chapter: 5, verse: 4 },
      { book: 19, chapter: 34, verse: 18 },
      { book: 19, chapter: 147, verse: 3 },
      { book: 19, chapter: 23, verse: 4 },
      { book: 24, chapter: 31, verse: 13 },
      { book: 43, chapter: 16, verse: 33 },
      { book: 66, chapter: 21, verse: 4 },
      { book: 23, chapter: 66, verse: 13 },
      { book: 19, chapter: 56, verse: 8 },
    ],
  },
  {
    id: "coragem",
    label: "Coragem",
    emoji: "🦁",
    verses: [
      { book: 6, chapter: 1, verse: 9 },
      { book: 55, chapter: 1, verse: 7 },
      { book: 19, chapter: 27, verse: 14 },
      { book: 5, chapter: 31, verse: 6 },
      { book: 46, chapter: 16, verse: 13 },
      { book: 19, chapter: 31, verse: 24 },
      { book: 23, chapter: 41, verse: 13 },
      { book: 20, chapter: 28, verse: 1 },
    ],
  },
  {
    id: "paz",
    label: "Paz",
    emoji: "🕊️",
    verses: [
      { book: 43, chapter: 14, verse: 27 },
      { book: 23, chapter: 26, verse: 3 },
      { book: 45, chapter: 5, verse: 1 },
      { book: 49, chapter: 2, verse: 14 },
      { book: 19, chapter: 4, verse: 8 },
      { book: 19, chapter: 29, verse: 11 },
      { book: 19, chapter: 119, verse: 165 },
      { book: 40, chapter: 11, verse: 28 },
      { book: 53, chapter: 3, verse: 16 },
      { book: 45, chapter: 15, verse: 33 },
    ],
  },
];

export const THEMES_BY_ID = Object.fromEntries(THEME_MAP.map((t) => [t.id, t]));

// ============================================================
// PROGRESSO DE LEITURA
// ============================================================

const PROGRESS_KEY = "iegv_bible_collection_progress";

/** Lê o Set de IDs de subtemas já lidos pelo usuário. */
function readReadSubtemas(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

/** Salva o Set de IDs lidos no localStorage. */
function writeReadSubtemas(ids: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(Array.from(ids)));
  } catch {
    /* ignore */
  }
}

export interface CollectionProgress {
  /** IDs de subtemas já lidos (persiste no localStorage) */
  readIds: Set<string>;
  /** Quantos subtemas já foram lidos (0..total) */
  readCount: number;
  /** Total de subtemas da coleção */
  total: number;
  /** Percentual de progresso (0-100) */
  percent: number;
  /** Se o subtema ativo foi lido */
  isCurrentRead: boolean;
  /** Marca o subtema como lido e retorna o novo Set */
  markAsRead: (id: string) => void;
  /** Reseta o progresso da coleção */
  reset: () => void;
}

/**
 * Hook que gerencia o progresso de leitura de uma coleção.
 * Lê/escreve no localStorage automaticamente.
 */
export function useCollectionProgress(
  collectionId: string,
  subtemas: Subtema[],
  activeSubtemaId: string
): CollectionProgress {
  const [readIds, setReadIds] = useState<Set<string>>(() => {
    const all = readReadSubtemas();
    // Filtra só IDs que pertencem a esta coleção
    return new Set(
      Array.from(all).filter((id) => subtemas.some((s) => s.id === id))
    );
  });

  // Salva no localStorage sempre que muda
  useEffect(() => {
    // Mescla com outros IDs de outras coleções
    const all = readReadSubtemas();
    subtemas.forEach((s) => all.add(s.id));
    // Remove os antigos que não estão em nenhuma coleção
    const validIds = new Set<string>();
    for (const id of all) {
      if (subtemas.some((s) => s.id === id)) {
        validIds.add(id);
      }
    }
    writeReadSubtemas(validIds);
  }, [readIds, subtemas]);

  const total = subtemas.length;
  const readCount = subtemas.filter((s) => readIds.has(s.id)).length;
  const percent = total > 0 ? Math.round((readCount / total) * 100) : 0;
  const isCurrentRead = readIds.has(activeSubtemaId);

  const markAsRead = (id: string) => {
    setReadIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const reset = () => {
    setReadIds(new Set());
  };

  return { readIds, readCount, total, percent, isCurrentRead, markAsRead, reset };
}

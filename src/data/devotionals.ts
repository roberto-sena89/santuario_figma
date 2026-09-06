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
    "title": "A Graça que Nos Sustenta",
    "verse": "Porque pela graça vocês são salvos, mediante a fé, e isso não vem de vocês, é dom de Deus.",
    "verseRef": "Efésios 2:8",
    "body": "A graça de Deus é o fundamento de tudo o que somos e temos como crentes. Não foi por mérito próprio que fomos alcançados pelo amor de Deus — foi pela sua infinita misericórdia e bondade.\n\nMuitas vezes carregamos o peso de achar que precisamos \"merecer\" a presença de Deus, que nossas falhas nos tornam indignos de sua atenção. Mas a Palavra nos ensina algo radicalmente diferente: a salvação é um presente, não uma conquista.\n\nHoje, permita-se receber esse dom sem reservas. Deus não ama quem você ainda vai ser — ele ama quem você é agora, com todas as imperfeições. É a partir desse amor incondicional que a transformação acontece. Não nos tornamos melhores para merecer o amor de Deus; o amor de Deus é o que nos torna melhores.\n\nDescanse nessa certeza: você não precisa fazer nada para ser aceito pelo Pai. Cristo já fez tudo na cruz. Sua graça é suficiente para hoje, para amanhã e para sempre.",
    "prayer": "Senhor, obrigado pela sua graça imerecida. Ajuda-me a parar de tentar merecer o que você já concedeu gratuitamente. Que eu viva cada dia como resposta ao seu amor e não como tentativa de ganhá-lo. Em nome de Jesus, amém.",
    "theme": "Graça"
  },
  {
    "title": "Renovados a Cada Manhã",
    "verse": "As misericórdias do Senhor não têm fim; as suas bondades não se esgotam. Renovam-se cada manhã; grande é a tua fidelidade!",
    "verseRef": "Lamentações 3:22-23",
    "body": "Cada amanhecer é um recomeço. Quando o sol nasce, ele traz consigo a certeza de que Deus nunca desiste de nós — suas misericórdias são renovadas com a mesma regularidade com que o dia sucede a noite.\n\nO profeta Jeremias escreveu estas palavras em um dos momentos mais sombrios da história de Israel. Mesmo diante da destruição de Jerusalém, ele encontrou esperança não nas circunstâncias, mas na fidelidade do Deus que não muda.\n\nVocê pode estar passando por uma fase difícil hoje. Talvez os erros do ontem pesem sobre seus ombros. Mas a misericórdia de Deus não guarda registro dos fracassos — ela se renova. Hoje é um novo dia, com novas misericórdias, um novo começo.\n\nA fidelidade de Deus não depende da nossa. Ele permanece fiel mesmo quando somos infiéis. Essa é a rocha sobre a qual construímos nossa esperança: não a perfeição de nossa caminhada, mas a inabalável fidelidade do nosso Deus.",
    "prayer": "Pai, obrigado por cada novo amanhecer como prova da sua misericórdia. Que eu comece este dia com o coração voltado para ti, confiante na tua fidelidade. Perdoa o que ficou para trás e me guia nos próximos passos. Amém.",
    "theme": "Misericórdia"
  },
  {
    "title": "Força na Fraqueza",
    "verse": "Posso tudo naquele que me fortalece.",
    "verseRef": "Filipenses 4:13",
    "body": "Este versículo é frequentemente citado como encorajamento para realizar grandes feitos. Mas Paulo o escreveu de dentro de uma prisão, não de um pódio de vitória. O contexto é de aprender a estar contente em qualquer situação — na abundância e na necessidade.\n\nÀs vezes confundimos \"posso tudo\" com invencibilidade humana. Mas Paulo estava dizendo algo muito mais profundo: a capacidade de passar por qualquer circunstância — boa ou má — com paz e contentamento vem de Cristo, e não de nós.\n\nVocê não precisa ser forte por conta própria hoje. Na verdade, é na nossa fraqueza que o poder de Deus se aperfeiçoa (2 Coríntios 12:9). Quando finalmente paramos de depender exclusivamente de nossas próprias forças, abrimos espaço para que a força de Deus opere em nós.\n\nEntregue hoje suas limitações ao Senhor. Diga a ele: \"Não consigo por conta própria, mas tu podes em mim.\" Essa é a oração que abre as comportas da força divina.",
    "prayer": "Senhor Jesus, reconheço minha fraqueza diante dos desafios de hoje. Mas coloco minha confiança na tua força. Que não seja eu, mas Cristo em mim. Capacita-me para fazer o que é certo, com amor e fidelidade. Amém.",
    "theme": "Força"
  },
  {
    "title": "Não Tema, Pois Estou Contigo",
    "verse": "Não tema, pois estou com você; não se apavore, pois sou o seu Deus. Eu o fortalecerei e o ajudarei; eu o sustentarei com a minha mão direita justa.",
    "verseRef": "Isaías 41:10",
    "body": "O medo é uma das emoções mais paralisantes que o ser humano experimenta. Medo do futuro, do fracasso, da doença, da rejeição — essas sombras podem transformar nossos dias em prisões invisíveis.\n\nMas eis o que Deus diz ao seu povo através de Isaías: \"Não tema.\" Não porque as circunstâncias sejam perfeitas, mas porque Deus está presente. Sua presença transforma o campo de batalha.\n\nNote a promessa tripla neste versículo: Deus fortalecerá, Deus ajudará, Deus sustentará. Três garantias divinas para cada sombra que o medo projeta. Não estamos sozinhos no que enfrentamos.\n\nHá algo que você está temendo hoje? Traga isso para a presença de Deus. Não é fraqueza admitir o medo — é sabedoria entregá-lo ao único que pode substituí-lo pela paz que excede todo entendimento. Permita que a mão direita justa de Deus o sustente quando suas próprias forças vacilarem.",
    "prayer": "Deus de toda consolação, há medos que carrego e não sei como resolver. Hoje os coloco nas tuas mãos. Tu prometeste estar comigo — escolho crer nessa promessa. Afasta o medo e enche meu coração da tua paz. Em nome de Jesus, amém.",
    "theme": "Encorajamento"
  },
  {
    "title": "Busquei o Senhor e Ele Me Respondeu",
    "verse": "Busquei o Senhor, e ele me respondeu; livrou-me de todos os meus temores.",
    "verseRef": "Salmos 34:4",
    "body": "A oração não é um monólogo religioso — é um diálogo com o Deus vivo. Davi sabia disso. Em situações de perigo real, com inimigos ao redor, ele buscou o Senhor e encontrou resposta.\n\n\"Busquei\" é uma palavra ativa. Não é uma espera passiva, mas uma busca intencional. Às vezes passamos meses angustiados por situações que nunca trouxemos a Deus de forma genuína — com honestidade, persistência e fé.\n\nO resultado? Deus respondeu. E não apenas com palavras — mas com libertação de todos os temores. Não de algumas circunstâncias, mas de todos os medos que aprisionavam o coração do salmista.\n\nHoje é um convite para buscá-lo de verdade. Não uma oração protocolar antes de dormir, mas uma busca genuína — com tempo, com silêncio, com honestidade. Diga a ele o que está no fundo do seu coração. Ele responde àqueles que o buscam de verdade.",
    "prayer": "Pai, hoje me disponho a te buscar de verdade. Que a minha oração não seja rotina, mas encontro real contigo. Responde-me como respondeste a Davi. Livra-me do que me aprisiona e enche meu coração da tua presença. Amém.",
    "theme": "Oração"
  },
  {
    "title": "Uma Nova Criação",
    "verse": "Se alguém está em Cristo, é nova criação. As coisas antigas já passaram; eis que surgiram coisas novas!",
    "verseRef": "2 Coríntios 5:17",
    "body": "Um dos maiores privilégios da vida cristã é saber que o passado não define o futuro. Em Cristo, há uma ruptura radical com o que fomos — nascemos de novo para uma nova identidade.\n\n\"As coisas antigas já passaram\" não significa que as memórias desaparecem ou que as consequências se apagam instantaneamente. Significa que o poder delas sobre você foi quebrado. Você não é mais definido pelos seus erros, fracassos, ou pela forma como os outros o viram.\n\nEis que surgiram coisas novas! Este é o tempo verbal do amanhecer — algo que acabou de acontecer e tem efeitos contínuos. Sua nova criação em Cristo não é apenas um evento passado; é uma realidade presente e crescente.\n\nVocê talvez carregue hoje uma identidade velha que não lhe pertence mais — o fracassado, o que nunca muda, o que não tem futuro. Escute o que Deus diz sobre você: nova criação. Habitada pelo Espírito Santo. Chamada e amada. Essa é a sua verdadeira identidade.",
    "prayer": "Pai, obrigado por me fazer nova criação. Ajuda-me a andar segundo essa verdade e não segundo os rótulos do passado. Que eu viva hoje como filho(a) seu(sua), com liberdade e propósito. Em nome de Jesus, amém.",
    "theme": "Nova Vida"
  },
  {
    "title": "O Pastor e a Ovelha",
    "verse": "O Senhor é o meu pastor; nada me faltará.",
    "verseRef": "Salmos 23:1",
    "body": "Poucas imagens da Bíblia são mais conhecidas e amadas que essa: Deus como pastor, e nós como ovelhas. Mas não um pastor distante e impessoal — é o meu pastor. Uma relação particular, íntima, contínua.\n\nO que significa ter o Senhor como pastor? Significa que você é conduzido, não empurrado. Que há descanso nos pastos verdes e águas tranquilas mesmo em dias agitados. Que mesmo no \"vale da sombra da morte\" há presença e consolo.\n\n\"Nada me faltará\" não é uma promessa de riqueza material, mas de provisão completa para o que é essencial. Deus conhece cada uma de suas ovelhas, conhece suas necessidades, e cuida com atenção individual.\n\nExiste algo em que você sente falta hoje — paz, direção, força, cura, relação restaurada? Traga isso ao seu Pastor. Ele não perdeu nenhuma ovelha que colocou sob seus cuidados, e não vai começar por você. Você está em boas mãos.",
    "prayer": "Senhor, tu és o meu pastor. Hoje eu deposito nas tuas mãos as necessidades que parecem grandes demais para mim. Confio que nada me faltará, pois tu cuidas de mim. Guia meus passos hoje segundo a tua bondade. Amém.",
    "theme": "Provisão"
  },
  {
    "title": "O Amor que Não Falha",
    "verse": "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    "verseRef": "João 3:16",
    "body": "O amor de Deus revelado em \"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.\" — João 3:16 — não é sentimento passageiro, é aliança. Quando a Palavra diz que Deus nos amou primeiro, ela desfaz a lógica de merecimento que carregamos.\n\nVivemos tentando provar valor, mas o evangelho inverte a ordem: somos amados, por isso nos tornamos capazes de amar. O amor humano cansa; o amor divino sustenta. Ele não é invejoso, não se ensoberbece, cobre multidão de pecados.\n\nHoje, deixe esse amor curar a comparação e a autocobrança. Ame alguém sem esperar retorno — um gesto simples, uma palavra que edifica, um perdão liberado. É assim que o amor de Deus se torna visível através de nós.",
    "prayer": "Pai, ensina-me a amar como Tu amaste em João 3:16. Que meu amor não seja reativo, mas reflexo do Teu. Cura minhas durezas e faz de mim canal do Teu amor hoje. Em nome de Jesus, amém.",
    "theme": "Amor"
  },
  {
    "title": "Amados para Amar",
    "verse": "Mas Deus prova o seu amor para conosco em que Cristo morreu por nós, sendo nós ainda pecadores.",
    "verseRef": "Romanos 5:8",
    "body": "O amor de Deus revelado em \"Mas Deus prova o seu amor para conosco em que Cristo morreu por nós, sendo nós ainda pecadores.\" — Romanos 5:8 — não é sentimento passageiro, é aliança. Quando a Palavra diz que Deus nos amou primeiro, ela desfaz a lógica de merecimento que carregamos.\n\nVivemos tentando provar valor, mas o evangelho inverte a ordem: somos amados, por isso nos tornamos capazes de amar. O amor humano cansa; o amor divino sustenta. Ele não é invejoso, não se ensoberbece, cobre multidão de pecados.\n\nHoje, deixe esse amor curar a comparação e a autocobrança. Ame alguém sem esperar retorno — um gesto simples, uma palavra que edifica, um perdão liberado. É assim que o amor de Deus se torna visível através de nós.",
    "prayer": "Pai, ensina-me a amar como Tu amaste em Romanos 5:8. Que meu amor não seja reativo, mas reflexo do Teu. Cura minhas durezas e faz de mim canal do Teu amor hoje. Em nome de Jesus, amém.",
    "theme": "Amor"
  },
  {
    "title": "Firme Fundamento",
    "verse": "Ora, a fé é o firme fundamento das coisas que se esperam e a prova das coisas que se não veem.",
    "verseRef": "Hebreus 11:1",
    "body": "A fé descrita em \"Ora, a fé é o firme fundamento das coisas que se esperam e a prova das coisas que se não veem.\" (Hebreus 11:1) não é otimismo, é certeza do invisível. O negociante da parábola vendeu tudo por uma pérola porque reconheceu valor incomparável — assim é Cristo para quem crê.\n\nFé não é negar a realidade difícil, é enxergar além dela. É ouvir a Palavra até que a confiança em Deus pese mais que o medo. Sem fé é impossível agradar a Deus, porque fé é a forma que escolhemos habitar o mundo: por vista ou por confiança.\n\nExercite a fé hoje em algo prático: ore por aquilo que parece travado, dê o passo que o temor adiou, confesse a promessa em voz alta. A fé cresce quando é praticada, não quando é apenas sentida.",
    "prayer": "Senhor, aumenta minha fé diante de Hebreus 11:1. Que eu não ande por vista, mas por confiança em Ti. Ajuda-me a vender o que me prende para ganhar a pérola que é Cristo. Amém.",
    "theme": "Fé"
  },
  {
    "title": "Viver por Fé",
    "verse": "De sorte que a fé é pelo ouvir, e o ouvir pela palavra de Deus.",
    "verseRef": "Romanos 10:17",
    "body": "A fé descrita em \"De sorte que a fé é pelo ouvir, e o ouvir pela palavra de Deus.\" (Romanos 10:17) não é otimismo, é certeza do invisível. O negociante da parábola vendeu tudo por uma pérola porque reconheceu valor incomparável — assim é Cristo para quem crê.\n\nFé não é negar a realidade difícil, é enxergar além dela. É ouvir a Palavra até que a confiança em Deus pese mais que o medo. Sem fé é impossível agradar a Deus, porque fé é a forma que escolhemos habitar o mundo: por vista ou por confiança.\n\nExercite a fé hoje em algo prático: ore por aquilo que parece travado, dê o passo que o temor adiou, confesse a promessa em voz alta. A fé cresce quando é praticada, não quando é apenas sentida.",
    "prayer": "Senhor, aumenta minha fé diante de Romanos 10:17. Que eu não ande por vista, mas por confiança em Ti. Ajuda-me a vender o que me prende para ganhar a pérola que é Cristo. Amém.",
    "theme": "Fé"
  },
  {
    "title": "Esperar com Alegria",
    "verse": "Porque eu bem sei os pensamentos que penso de vós, diz o SENHOR; pensamentos de paz e não de mal, para vos dar o fim que esperais.",
    "verseRef": "Jeremias 29:11",
    "body": "A esperança bíblica em \"Porque eu bem sei os pensamentos que penso de vós, diz o SENHOR; pensamentos de paz e não de mal, para vos dar o fim que esperais.\" (Jeremias 29:11) não é wishful thinking, é âncora. Deus diz \"eu sei os pensamentos que penso de vós, pensamentos de paz\". Mesmo quando o cenário aponta para escassez, Ele já preparou futuro.\n\nJeremias escreveu sobre esperança no meio de ruínas — prova de que esperança não depende de cenário favorável. Ela se renova cada manhã porque a fidelidade de Deus se renova. Sua alma pode estar abatida hoje (Salmos 42), mas a ordem é: espera em Deus.\n\nTransforme espera em oração: escreva hoje uma expectativa e entregue a Deus como semente. A esperança amadurece na paciência e floresce na perseverança.",
    "prayer": "Deus de esperança, renova hoje minha expectativa em Jeremias 29:11. Quando a alma se abater, lembra-me que Tu tens pensamentos de paz. Espero em Ti. Amém.",
    "theme": "Esperança"
  },
  {
    "title": "Esperança que Não Envergonha",
    "verse": "As misericórdias do Senhor não têm fim; renovam-se cada manhã; grande é a tua fidelidade!",
    "verseRef": "Lamentações 3:22-23",
    "body": "A esperança bíblica em \"As misericórdias do Senhor não têm fim; renovam-se cada manhã; grande é a tua fidelidade!\" (Lamentações 3:22-23) não é wishful thinking, é âncora. Deus diz \"eu sei os pensamentos que penso de vós, pensamentos de paz\". Mesmo quando o cenário aponta para escassez, Ele já preparou futuro.\n\nJeremias escreveu sobre esperança no meio de ruínas — prova de que esperança não depende de cenário favorável. Ela se renova cada manhã porque a fidelidade de Deus se renova. Sua alma pode estar abatida hoje (Salmos 42), mas a ordem é: espera em Deus.\n\nTransforme espera em oração: escreva hoje uma expectativa e entregue a Deus como semente. A esperança amadurece na paciência e floresce na perseverança.",
    "prayer": "Deus de esperança, renova hoje minha expectativa em Lamentações 3:22-23. Quando a alma se abater, lembra-me que Tu tens pensamentos de paz. Espero em Ti. Amém.",
    "theme": "Esperança"
  },
  {
    "title": "Mente Firme em Deus",
    "verse": "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.",
    "verseRef": "João 14:27",
    "body": "Jesus prometeu em \"Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.\" (João 14:27) uma paz diferente da que o mundo oferece. O mundo dá paz quando tudo está calmo; Cristo dá paz quando tudo está em guerra, porque Ele mesmo é a nossa paz.\n\nA paz não é ausência de luta, é presença de Cristo na luta. \"Tu conservarás em paz aquele cuja mente está firme em ti\" — paz é disciplina de mente ancorada, não emoção flutuante. Justificados pela fé, temos paz com Deus; agora aprendemos a ter a paz de Deus.\n\nHoje, guarde sua mente: ao surgir a ansiedade, respire e ore. Troque a reclamação por gratidão, o controle por entrega. A paz vem quando confiamos o peso a quem já carregou a cruz.",
    "prayer": "Jesus, Tua paz prometida em João 14:27 aquiete meu coração. Guarda minha mente firme em Ti e afasta todo temor. Que Tua paz reine hoje em minha casa. Amém.",
    "theme": "Paz"
  },
  {
    "title": "A Paz que Jesus Deixa",
    "verse": "Tu conservarás em paz aquele cuja mente está firme em ti; porque ele confia em ti.",
    "verseRef": "Isaías 26:3",
    "body": "Jesus prometeu em \"Tu conservarás em paz aquele cuja mente está firme em ti; porque ele confia em ti.\" (Isaías 26:3) uma paz diferente da que o mundo oferece. O mundo dá paz quando tudo está calmo; Cristo dá paz quando tudo está em guerra, porque Ele mesmo é a nossa paz.\n\nA paz não é ausência de luta, é presença de Cristo na luta. \"Tu conservarás em paz aquele cuja mente está firme em ti\" — paz é disciplina de mente ancorada, não emoção flutuante. Justificados pela fé, temos paz com Deus; agora aprendemos a ter a paz de Deus.\n\nHoje, guarde sua mente: ao surgir a ansiedade, respire e ore. Troque a reclamação por gratidão, o controle por entrega. A paz vem quando confiamos o peso a quem já carregou a cruz.",
    "prayer": "Jesus, Tua paz prometida em Isaías 26:3 aquiete meu coração. Guarda minha mente firme em Ti e afasta todo temor. Que Tua paz reine hoje em minha casa. Amém.",
    "theme": "Paz"
  },
  {
    "title": "Força na Fraqueza",
    "verse": "Posso todas as coisas naquele que me fortalece.",
    "verseRef": "Filipenses 4:13",
    "body": "Paulo escreveu \"Posso todas as coisas naquele que me fortalece.\" (Filipenses 4:13) da prisão. Não era slogan motivacional, era testemunho de contentamento: sei estar humilhado e honrado, com fartura e fome — tudo posso naquele que me fortalece.\n\nForça não é nunca cair; é levantar com Cristo quando caímos. Deus não promete estrada sem pedras, promete pernas para caminhar sobre elas. \"Os que esperam no Senhor renovarão as forças\" — esperar aqui é entrelaçar, como cordas que ganham resistência.\n\nEntregue hoje sua fraqueza sem vergonha. Diga: \"Senhor, não consigo, mas Tu podes em mim\". É nessa confissão que o poder se aperfeiçoa e a força divina encontra espaço.",
    "prayer": "Pai, confesso minha fraqueza e recebo Tua força prometida em Filipenses 4:13. Fortalece-me para o que hoje exige de mim. Em Cristo sou capaz. Amém.",
    "theme": "Força"
  },
  {
    "title": "Renovando as Forças",
    "verse": "Mas os que esperam no SENHOR renovarão as suas forças e subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.",
    "verseRef": "Isaías 40:31",
    "body": "Paulo escreveu \"Mas os que esperam no SENHOR renovarão as suas forças e subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.\" (Isaías 40:31) da prisão. Não era slogan motivacional, era testemunho de contentamento: sei estar humilhado e honrado, com fartura e fome — tudo posso naquele que me fortalece.\n\nForça não é nunca cair; é levantar com Cristo quando caímos. Deus não promete estrada sem pedras, promete pernas para caminhar sobre elas. \"Os que esperam no Senhor renovarão as forças\" — esperar aqui é entrelaçar, como cordas que ganham resistência.\n\nEntregue hoje sua fraqueza sem vergonha. Diga: \"Senhor, não consigo, mas Tu podes em mim\". É nessa confissão que o poder se aperfeiçoa e a força divina encontra espaço.",
    "prayer": "Pai, confesso minha fraqueza e recebo Tua força prometida em Isaías 40:31. Fortalece-me para o que hoje exige de mim. Em Cristo sou capaz. Amém.",
    "theme": "Força"
  },
  {
    "title": "Espera e Anima-te",
    "verse": "Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes, porque o SENHOR, teu Deus, é contigo, por onde quer que andares.",
    "verseRef": "Josué 1:9",
    "body": "Deus ordena coragem em \"Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes, porque o SENHOR, teu Deus, é contigo, por onde quer que andares.\" (Josué 1:9) não porque o medo não exista, mas porque Sua presença é maior que ele. \"Não pasmes, porque o Senhor teu Deus é contigo por onde quer que andares\" — coragem é memória de companhia.\n\nCoragem não é ausência de tremor, é obediência apesar dele. O salmista diz \"espera no Senhor, anima-te\" — coragem se alimenta de esperança. O justo é ousado como o leão porque sabe quem vai à frente.\n\nEncare hoje um medo com um ato de coragem: uma conversa adiada, um pedido de perdão, um passo de fé. Deus toma sua mão direita e diz: não temas, eu te ajudo.",
    "prayer": "Senhor, diante de Josué 1:9, escolho coragem. Toma minha mão direita, afasta o pânico e guia meus passos. Contigo vou sem medo. Amém.",
    "theme": "Coragem"
  },
  {
    "title": "Ousadia do Justo",
    "verse": "Espera no SENHOR, anima-te, e ele fortalecerá o teu coração; espera, pois, no SENHOR.",
    "verseRef": "Salmos 27:14",
    "body": "Deus ordena coragem em \"Espera no SENHOR, anima-te, e ele fortalecerá o teu coração; espera, pois, no SENHOR.\" (Salmos 27:14) não porque o medo não exista, mas porque Sua presença é maior que ele. \"Não pasmes, porque o Senhor teu Deus é contigo por onde quer que andares\" — coragem é memória de companhia.\n\nCoragem não é ausência de tremor, é obediência apesar dele. O salmista diz \"espera no Senhor, anima-te\" — coragem se alimenta de esperança. O justo é ousado como o leão porque sabe quem vai à frente.\n\nEncare hoje um medo com um ato de coragem: uma conversa adiada, um pedido de perdão, um passo de fé. Deus toma sua mão direita e diz: não temas, eu te ajudo.",
    "prayer": "Senhor, diante de Salmos 27:14, escolho coragem. Toma minha mão direita, afasta o pânico e guia meus passos. Contigo vou sem medo. Amém.",
    "theme": "Coragem"
  },
  {
    "title": "Coração Grato",
    "verse": "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.",
    "verseRef": "1 Tessalonicenses 5:18",
    "body": "Gratidão em \"Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.\" (1 Tessalonicenses 5:18) é mandamento, não sugestão: em tudo dai graças. Não é agradecer pelo mal, mas em meio a ele reconhecer a mão que sustenta.\n\nGratidão muda a lente. Quem entra \"pelas portas com louvor\" vê o mesmo dia com outros olhos. O coração grato serve de bom remédio; o ingrato adoece a alma. \"Este é o dia que fez o Senhor\" — hoje, não amanhã, é o dia de se alegrar.\n\nPratique hoje: liste três dádivas concretas deste dia — uma pequena, uma relacional, uma espiritual. Agradeça em voz alta. A gratidão abre comportas para mais graça.",
    "prayer": "Obrigado, Pai, por 1 Tessalonicenses 5:18. Abre meus olhos para Tuas bondades diárias. Que minha boca hoje seja cheia de louvor. Amém.",
    "theme": "Gratidão"
  },
  {
    "title": "Entrai com Louvor",
    "verse": "Entrai pelas portas dele com louvor e em seus átrios, com hinos; louvai-o e bendizei o seu nome.",
    "verseRef": "Salmos 100:4",
    "body": "Gratidão em \"Entrai pelas portas dele com louvor e em seus átrios, com hinos; louvai-o e bendizei o seu nome.\" (Salmos 100:4) é mandamento, não sugestão: em tudo dai graças. Não é agradecer pelo mal, mas em meio a ele reconhecer a mão que sustenta.\n\nGratidão muda a lente. Quem entra \"pelas portas com louvor\" vê o mesmo dia com outros olhos. O coração grato serve de bom remédio; o ingrato adoece a alma. \"Este é o dia que fez o Senhor\" — hoje, não amanhã, é o dia de se alegrar.\n\nPratique hoje: liste três dádivas concretas deste dia — uma pequena, uma relacional, uma espiritual. Agradeça em voz alta. A gratidão abre comportas para mais graça.",
    "prayer": "Obrigado, Pai, por Salmos 100:4. Abre meus olhos para Tuas bondades diárias. Que minha boca hoje seja cheia de louvor. Amém.",
    "theme": "Gratidão"
  },
  {
    "title": "Longe como o Oriente",
    "verse": "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.",
    "verseRef": "1 João 1:9",
    "body": "O perdão em \"Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.\" (1 João 1:9) revela o coração de Deus: fiel e justo para perdoar e purificar. Não é indulgência barata, é justiça satisfeita na cruz. Por isso podemos perdoar como fomos perdoados.\n\nReter ofensa é beber veneno esperando que o outro morra. O perdão liberta primeiro quem perdoa. \"Quanto está longe o oriente do ocidente\" — assim Deus afasta nossas transgressões. Se Ele nos tratou assim, como reter?\n\nHoje, escolha liberar alguém — não porque a dor foi pequena, mas porque a graça recebida foi grande. Ore por quem te feriu. O perdão é caminho de cura.",
    "prayer": "Deus fiel, obrigado pelo perdão em 1 João 1:9. Lava-me, purifica-me e ensina-me a perdoar como fui perdoado. Amém.",
    "theme": "Perdão"
  },
  {
    "title": "Graça que Limpa",
    "verse": "Antes, sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo.",
    "verseRef": "Efésios 4:32",
    "body": "O perdão em \"Antes, sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo.\" (Efésios 4:32) revela o coração de Deus: fiel e justo para perdoar e purificar. Não é indulgência barata, é justiça satisfeita na cruz. Por isso podemos perdoar como fomos perdoados.\n\nReter ofensa é beber veneno esperando que o outro morra. O perdão liberta primeiro quem perdoa. \"Quanto está longe o oriente do ocidente\" — assim Deus afasta nossas transgressões. Se Ele nos tratou assim, como reter?\n\nHoje, escolha liberar alguém — não porque a dor foi pequena, mas porque a graça recebida foi grande. Ore por quem te feriu. O perdão é caminho de cura.",
    "prayer": "Deus fiel, obrigado pelo perdão em Efésios 4:32. Lava-me, purifica-me e ensina-me a perdoar como fui perdoado. Amém.",
    "theme": "Perdão"
  },
  {
    "title": "Perto dos Quebrantados",
    "verse": "Perto está o SENHOR dos que têm o coração quebrantado e salva os contritos de espírito.",
    "verseRef": "Salmos 34:18",
    "body": "O consolo de \"Perto está o SENHOR dos que têm o coração quebrantado e salva os contritos de espírito.\" (Salmos 34:18) é para corações quebrantados. Deus não visita de longe; Ele se aproxima, conta nossas vagueações, recolhe lágrimas em Seu odre. Nenhuma dor é invisível para Ele.\n\nJesus leu Isaías 61 para dizer: vim restaurar contritos, proclamar liberdade. O choro pode durar uma noite, mas a alegria vem pela manhã — não porque a noite foi curta, mas porque Deus a transforma. Ele torna pranto em dança.\n\nSe hoje o coração dói, não esconda. Entregue a Deus a ferida com nome. Peça: \"sara-me, Senhor\". O Deus de toda consolação sabe consolar como mãe consola filho — com presença terna e braços que não soltam.",
    "prayer": "Deus que consola, toca meu coração com Salmos 34:18. Recolhe minhas lágrimas e transforma pranto em alegria. Consola-me como mãe consola filho. Amém.",
    "theme": "Consolo"
  },
  {
    "title": "O Deus que Consola",
    "verse": "bem-aventurados os que choram, porque eles serão consolados;",
    "verseRef": "Mateus 5:4",
    "body": "O consolo de \"bem-aventurados os que choram, porque eles serão consolados;\" (Mateus 5:4) é para corações quebrantados. Deus não visita de longe; Ele se aproxima, conta nossas vagueações, recolhe lágrimas em Seu odre. Nenhuma dor é invisível para Ele.\n\nJesus leu Isaías 61 para dizer: vim restaurar contritos, proclamar liberdade. O choro pode durar uma noite, mas a alegria vem pela manhã — não porque a noite foi curta, mas porque Deus a transforma. Ele torna pranto em dança.\n\nSe hoje o coração dói, não esconda. Entregue a Deus a ferida com nome. Peça: \"sara-me, Senhor\". O Deus de toda consolação sabe consolar como mãe consola filho — com presença terna e braços que não soltam.",
    "prayer": "Deus que consola, toca meu coração com Mateus 5:4. Recolhe minhas lágrimas e transforma pranto em alegria. Consola-me como mãe consola filho. Amém.",
    "theme": "Consolo"
  },
  {
    "title": "Temor que Ensina",
    "verse": "Confia no SENHOR de todo o teu coração e não te estribes no teu próprio entendimento.",
    "verseRef": "Provérbios 3:5",
    "body": "A sabedoria em \"Confia no SENHOR de todo o teu coração e não te estribes no teu próprio entendimento.\" (Provérbios 3:5) começa no temor do Senhor, não no acúmulo de informação. É lamparina para os pés: não ilumina a rodovia inteira, mas o próximo passo. E isso basta para caminhar sem tropeçar.\n\nTiago diz: se tem falta de sabedoria, peça a Deus que dá liberalmente. Deus não lança em rosto a limitação; Ele se alegra em conceder discernimento. Sabedoria é ouvir antes de falar, ponderar antes de decidir, apartar-se do mal.\n\nHoje, antes de uma decisão, pare e ore: \"Senhor, dá-me coração entendido\". Anote o conselho que a Palavra traz e pratique um. Sabedoria é obediência aplicada.",
    "prayer": "Pai, dá-me sabedoria conforme Provérbios 3:5. Que eu tema Teu nome e escolha o caminho prudente. Guia minha decisão de hoje. Amém.",
    "theme": "Sabedoria"
  },
  {
    "title": "Lâmpada para os Pés",
    "verse": "E, se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente e não o lança em rosto; e ser-lhe-á dada.",
    "verseRef": "Tiago 1:5",
    "body": "A sabedoria em \"E, se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente e não o lança em rosto; e ser-lhe-á dada.\" (Tiago 1:5) começa no temor do Senhor, não no acúmulo de informação. É lamparina para os pés: não ilumina a rodovia inteira, mas o próximo passo. E isso basta para caminhar sem tropeçar.\n\nTiago diz: se tem falta de sabedoria, peça a Deus que dá liberalmente. Deus não lança em rosto a limitação; Ele se alegra em conceder discernimento. Sabedoria é ouvir antes de falar, ponderar antes de decidir, apartar-se do mal.\n\nHoje, antes de uma decisão, pare e ore: \"Senhor, dá-me coração entendido\". Anote o conselho que a Palavra traz e pratique um. Sabedoria é obediência aplicada.",
    "prayer": "Pai, dá-me sabedoria conforme Tiago 1:5. Que eu tema Teu nome e escolha o caminho prudente. Guia minha decisão de hoje. Amém.",
    "theme": "Sabedoria"
  },
  {
    "title": "Alegria Perpétua",
    "verse": "Regozijai-vos, sempre, no Senhor; outra vez digo: regozijai-vos.",
    "verseRef": "Filipenses 4:4",
    "body": "A alegria bíblica em \"Regozijai-vos, sempre, no Senhor; outra vez digo: regozijai-vos.\" (Filipenses 4:4) não depende de cenário. \"Regozijai-vos sempre no Senhor\" foi escrito da prisão. Alegria é fruto do Espírito, não termômetro de circunstâncias.\n\nEla nasce da presença: \"na tua presença há alegria\". Quando vemos a vereda da vida, o coração se alegra porque vê sentido. O choro dura uma noite, a alegria vem pela manhã — Deus é especialista em virar lamentos em cânticos.\n\nEscolha hoje um motivo para se alegrar em Deus, não nos fatos. Cante, ainda que baixo; agradeça, ainda que com lágrimas. A alegria do Senhor é força.",
    "prayer": "Senhor, enche-me de alegria por Filipenses 4:4. Que eu me regozije em Ti hoje, independentemente do cenário. Tua alegria é minha força. Amém.",
    "theme": "Alegria"
  },
  {
    "title": "Regozijo na Presença",
    "verse": "Far-me-ás ver a vereda da vida; na tua presença há abundância de alegrias; à tua mão direita há delícias perpetuamente.",
    "verseRef": "Salmos 16:11",
    "body": "A alegria bíblica em \"Far-me-ás ver a vereda da vida; na tua presença há abundância de alegrias; à tua mão direita há delícias perpetuamente.\" (Salmos 16:11) não depende de cenário. \"Regozijai-vos sempre no Senhor\" foi escrito da prisão. Alegria é fruto do Espírito, não termômetro de circunstâncias.\n\nEla nasce da presença: \"na tua presença há alegria\". Quando vemos a vereda da vida, o coração se alegra porque vê sentido. O choro dura uma noite, a alegria vem pela manhã — Deus é especialista em virar lamentos em cânticos.\n\nEscolha hoje um motivo para se alegrar em Deus, não nos fatos. Cante, ainda que baixo; agradeça, ainda que com lágrimas. A alegria do Senhor é força.",
    "prayer": "Senhor, enche-me de alegria por Salmos 16:11. Que eu me regozije em Ti hoje, independentemente do cenário. Tua alegria é minha força. Amém.",
    "theme": "Alegria"
  },
  {
    "title": "Nada nos Faltará",
    "verse": "O SENHOR é o meu pastor; nada me faltará.",
    "verseRef": "Salmos 23:1",
    "body": "A provisão em \"O SENHOR é o meu pastor; nada me faltará.\" (Salmos 23:1) é promessa de pastor: nada faltará. Não é convite à passividade, é descanso de filho que sabe que o Pai conhece a necessidade antes do pedido.\n\nDeus abre a mão e satisfaz desejos dos viventes; supre segundo Suas riquezas em glória. Ele alimentou no deserto, multiplicou pouco, nunca deixou justo mendigar pão. Sua misericórdia é razão de não sermos consumidos.\n\nApresente hoje sua necessidade com simplicidade: pão, saúde, direção, reconciliação. Confie que o mesmo Deus que veste lírios cuidará de você com ainda mais zelo.",
    "prayer": "Pastor fiel, obrigado por Salmos 23:1. Supre hoje o que me falta — pão, paz, direção. Em Ti nada me faltará. Amém.",
    "theme": "Provisão"
  },
  {
    "title": "Mão que Abre e Satisfaz",
    "verse": "O meu Deus, segundo as suas riquezas, suprirá todas as vossas necessidades em glória, por Cristo Jesus.",
    "verseRef": "Filipenses 4:19",
    "body": "A provisão em \"O meu Deus, segundo as suas riquezas, suprirá todas as vossas necessidades em glória, por Cristo Jesus.\" (Filipenses 4:19) é promessa de pastor: nada faltará. Não é convite à passividade, é descanso de filho que sabe que o Pai conhece a necessidade antes do pedido.\n\nDeus abre a mão e satisfaz desejos dos viventes; supre segundo Suas riquezas em glória. Ele alimentou no deserto, multiplicou pouco, nunca deixou justo mendigar pão. Sua misericórdia é razão de não sermos consumidos.\n\nApresente hoje sua necessidade com simplicidade: pão, saúde, direção, reconciliação. Confie que o mesmo Deus que veste lírios cuidará de você com ainda mais zelo.",
    "prayer": "Pastor fiel, obrigado por Filipenses 4:19. Supre hoje o que me falta — pão, paz, direção. Em Ti nada me faltará. Amém.",
    "theme": "Provisão"
  },
  {
    "title": "Buscar e Encontrar",
    "verse": "Orai sem cessar.",
    "verseRef": "1 Tessalonicenses 5:17",
    "body": "A oração em \"Orai sem cessar.\" (1 Tessalonicenses 5:17) é convite insistente: pedi e dar-se-vos-á, buscai e encontrareis, batei e abrir-se-vos-á. Deus não se cansa de ser buscado; Ele se agrada da perseverança.\n\nOração não é performance, é relacionamento. \"Orai sem cessar\" é viver em conversa contínua com o Pai — no trânsito, na cozinha, no secreto. Quando buscamos de todo coração, somos encontrados.\n\nReserve hoje tempo sem pressa: silencie, leia o versículo em voz alta, ore com honestidade. Deus responde àqueles que O buscam com fé, não com fórmulas.",
    "prayer": "Pai, atende meu clamor em 1 Tessalonicenses 5:17. Ensina-me a buscar sem cessar e a bater até que se abra. Que minha oração seja encontro real contigo. Amém.",
    "theme": "Oração"
  },
  {
    "title": "Oração que Move o Céu",
    "verse": "Pedi, e dar-se-vos-á; buscai e encontrareis; batei, e abrir-se-vos-á.",
    "verseRef": "Mateus 7:7",
    "body": "A oração em \"Pedi, e dar-se-vos-á; buscai e encontrareis; batei, e abrir-se-vos-á.\" (Mateus 7:7) é convite insistente: pedi e dar-se-vos-á, buscai e encontrareis, batei e abrir-se-vos-á. Deus não se cansa de ser buscado; Ele se agrada da perseverança.\n\nOração não é performance, é relacionamento. \"Orai sem cessar\" é viver em conversa contínua com o Pai — no trânsito, na cozinha, no secreto. Quando buscamos de todo coração, somos encontrados.\n\nReserve hoje tempo sem pressa: silencie, leia o versículo em voz alta, ore com honestidade. Deus responde àqueles que O buscam com fé, não com fórmulas.",
    "prayer": "Pai, atende meu clamor em Mateus 7:7. Ensina-me a buscar sem cessar e a bater até que se abra. Que minha oração seja encontro real contigo. Amém.",
    "theme": "Oração"
  },
  {
    "title": "O Deus que Restaura",
    "verse": "O espírito do Senhor DEUS está sobre mim; porque o SENHOR me ungiu, para pregar boas novas aos mansos; enviou-me a restaurar os contritos de coração, a proclamar liberdade aos cativos, e a abertura de prisão aos presos.",
    "verseRef": "Isaías 61:1",
    "body": "A esperança bíblica em \"O espírito do Senhor DEUS está sobre mim; porque o SENHOR me ungiu, para pregar boas novas aos mansos; enviou-me a restaurar os contritos de coração, a proclamar liberdade aos cativos, e a abertura de prisão aos presos.\" (Isaías 61:1) não é wishful thinking, é âncora. Deus diz \"eu sei os pensamentos que penso de vós, pensamentos de paz\". Mesmo quando o cenário aponta para escassez, Ele já preparou futuro.\n\nJeremias escreveu sobre esperança no meio de ruínas — prova de que esperança não depende de cenário favorável. Ela se renova cada manhã porque a fidelidade de Deus se renova. Sua alma pode estar abatida hoje (Salmos 42), mas a ordem é: espera em Deus.\n\nTransforme espera em oração: escreva hoje uma expectativa e entregue a Deus como semente. A esperança amadurece na paciência e floresce na perseverança.",
    "prayer": "Deus de esperança, renova hoje minha expectativa em Isaías 61:1. Quando a alma se abater, lembra-me que Tu tens pensamentos de paz. Espero em Ti. Amém.",
    "theme": "Esperança"
  },
  {
    "title": "Firme Fundamento",
    "verse": "O reino dos céus é também semelhante a um que negocia e procura boas pérolas; e, tendo achado uma pérola de grande valor, vende tudo o que possui e a compra.",
    "verseRef": "Mateus 13:45-46",
    "body": "A fé descrita em \"O reino dos céus é também semelhante a um que negocia e procura boas pérolas; e, tendo achado uma pérola de grande valor, vende tudo o que possui e a compra.\" (Mateus 13:45-46) não é otimismo, é certeza do invisível. O negociante da parábola vendeu tudo por uma pérola porque reconheceu valor incomparável — assim é Cristo para quem crê.\n\nFé não é negar a realidade difícil, é enxergar além dela. É ouvir a Palavra até que a confiança em Deus pese mais que o medo. Sem fé é impossível agradar a Deus, porque fé é a forma que escolhemos habitar o mundo: por vista ou por confiança.\n\nExercite a fé hoje em algo prático: ore por aquilo que parece travado, dê o passo que o temor adiou, confesse a promessa em voz alta. A fé cresce quando é praticada, não quando é apenas sentida.",
    "prayer": "Senhor, aumenta minha fé diante de Mateus 13:45-46. Que eu não ande por vista, mas por confiança em Ti. Ajuda-me a vender o que me prende para ganhar a pérola que é Cristo. Amém.",
    "theme": "Fé"
  },
  {
    "title": "Paz que Excede o Entendimento",
    "verse": "Sendo, pois, justificados pela fé, temos paz com Deus por nosso Senhor Jesus Cristo;",
    "verseRef": "Romanos 5:1",
    "body": "Jesus prometeu em \"Sendo, pois, justificados pela fé, temos paz com Deus por nosso Senhor Jesus Cristo;\" (Romanos 5:1) uma paz diferente da que o mundo oferece. O mundo dá paz quando tudo está calmo; Cristo dá paz quando tudo está em guerra, porque Ele mesmo é a nossa paz.\n\nA paz não é ausência de luta, é presença de Cristo na luta. \"Tu conservarás em paz aquele cuja mente está firme em ti\" — paz é disciplina de mente ancorada, não emoção flutuante. Justificados pela fé, temos paz com Deus; agora aprendemos a ter a paz de Deus.\n\nHoje, guarde sua mente: ao surgir a ansiedade, respire e ore. Troque a reclamação por gratidão, o controle por entrega. A paz vem quando confiamos o peso a quem já carregou a cruz.",
    "prayer": "Jesus, Tua paz prometida em Romanos 5:1 aquiete meu coração. Guarda minha mente firme em Ti e afasta todo temor. Que Tua paz reine hoje em minha casa. Amém.",
    "theme": "Paz"
  },
  {
    "title": "Esperar com Alegria",
    "verse": "Por que estás abatida, ó minha alma, e por que te perturbas dentro de mim? Espera em Deus, pois ainda o louvarei.",
    "verseRef": "Salmos 42:11",
    "body": "A esperança bíblica em \"Por que estás abatida, ó minha alma, e por que te perturbas dentro de mim? Espera em Deus, pois ainda o louvarei.\" (Salmos 42:11) não é wishful thinking, é âncora. Deus diz \"eu sei os pensamentos que penso de vós, pensamentos de paz\". Mesmo quando o cenário aponta para escassez, Ele já preparou futuro.\n\nJeremias escreveu sobre esperança no meio de ruínas — prova de que esperança não depende de cenário favorável. Ela se renova cada manhã porque a fidelidade de Deus se renova. Sua alma pode estar abatida hoje (Salmos 42), mas a ordem é: espera em Deus.\n\nTransforme espera em oração: escreva hoje uma expectativa e entregue a Deus como semente. A esperança amadurece na paciência e floresce na perseverança.",
    "prayer": "Deus de esperança, renova hoje minha expectativa em Salmos 42:11. Quando a alma se abater, lembra-me que Tu tens pensamentos de paz. Espero em Ti. Amém.",
    "theme": "Esperança"
  },
  {
    "title": "Amados para Amar",
    "verse": "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    "verseRef": "João 3:16",
    "body": "O amor de Deus revelado em \"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.\" — João 3:16 — não é sentimento passageiro, é aliança. Quando a Palavra diz que Deus nos amou primeiro, ela desfaz a lógica de merecimento que carregamos.\n\nVivemos tentando provar valor, mas o evangelho inverte a ordem: somos amados, por isso nos tornamos capazes de amar. O amor humano cansa; o amor divino sustenta. Ele não é invejoso, não se ensoberbece, cobre multidão de pecados.\n\nHoje, deixe esse amor curar a comparação e a autocobrança. Ame alguém sem esperar retorno — um gesto simples, uma palavra que edifica, um perdão liberado. É assim que o amor de Deus se torna visível através de nós.",
    "prayer": "Pai, ensina-me a amar como Tu amaste em João 3:16. Que meu amor não seja reativo, mas reflexo do Teu. Cura minhas durezas e faz de mim canal do Teu amor hoje. Em nome de Jesus, amém.",
    "theme": "Amor"
  },
  {
    "title": "O Vínculo da Perfeição",
    "verse": "Mas Deus prova o seu amor para conosco em que Cristo morreu por nós, sendo nós ainda pecadores.",
    "verseRef": "Romanos 5:8",
    "body": "O amor de Deus revelado em \"Mas Deus prova o seu amor para conosco em que Cristo morreu por nós, sendo nós ainda pecadores.\" — Romanos 5:8 — não é sentimento passageiro, é aliança. Quando a Palavra diz que Deus nos amou primeiro, ela desfaz a lógica de merecimento que carregamos.\n\nVivemos tentando provar valor, mas o evangelho inverte a ordem: somos amados, por isso nos tornamos capazes de amar. O amor humano cansa; o amor divino sustenta. Ele não é invejoso, não se ensoberbece, cobre multidão de pecados.\n\nHoje, deixe esse amor curar a comparação e a autocobrança. Ame alguém sem esperar retorno — um gesto simples, uma palavra que edifica, um perdão liberado. É assim que o amor de Deus se torna visível através de nós.",
    "prayer": "Pai, ensina-me a amar como Tu amaste em Romanos 5:8. Que meu amor não seja reativo, mas reflexo do Teu. Cura minhas durezas e faz de mim canal do Teu amor hoje. Em nome de Jesus, amém.",
    "theme": "Amor"
  },
  {
    "title": "Viver por Fé",
    "verse": "Ora, a fé é o firme fundamento das coisas que se esperam e a prova das coisas que se não veem.",
    "verseRef": "Hebreus 11:1",
    "body": "A fé descrita em \"Ora, a fé é o firme fundamento das coisas que se esperam e a prova das coisas que se não veem.\" (Hebreus 11:1) não é otimismo, é certeza do invisível. O negociante da parábola vendeu tudo por uma pérola porque reconheceu valor incomparável — assim é Cristo para quem crê.\n\nFé não é negar a realidade difícil, é enxergar além dela. É ouvir a Palavra até que a confiança em Deus pese mais que o medo. Sem fé é impossível agradar a Deus, porque fé é a forma que escolhemos habitar o mundo: por vista ou por confiança.\n\nExercite a fé hoje em algo prático: ore por aquilo que parece travado, dê o passo que o temor adiou, confesse a promessa em voz alta. A fé cresce quando é praticada, não quando é apenas sentida.",
    "prayer": "Senhor, aumenta minha fé diante de Hebreus 11:1. Que eu não ande por vista, mas por confiança em Ti. Ajuda-me a vender o que me prende para ganhar a pérola que é Cristo. Amém.",
    "theme": "Fé"
  },
  {
    "title": "O Dom da Fé",
    "verse": "De sorte que a fé é pelo ouvir, e o ouvir pela palavra de Deus.",
    "verseRef": "Romanos 10:17",
    "body": "A fé descrita em \"De sorte que a fé é pelo ouvir, e o ouvir pela palavra de Deus.\" (Romanos 10:17) não é otimismo, é certeza do invisível. O negociante da parábola vendeu tudo por uma pérola porque reconheceu valor incomparável — assim é Cristo para quem crê.\n\nFé não é negar a realidade difícil, é enxergar além dela. É ouvir a Palavra até que a confiança em Deus pese mais que o medo. Sem fé é impossível agradar a Deus, porque fé é a forma que escolhemos habitar o mundo: por vista ou por confiança.\n\nExercite a fé hoje em algo prático: ore por aquilo que parece travado, dê o passo que o temor adiou, confesse a promessa em voz alta. A fé cresce quando é praticada, não quando é apenas sentida.",
    "prayer": "Senhor, aumenta minha fé diante de Romanos 10:17. Que eu não ande por vista, mas por confiança em Ti. Ajuda-me a vender o que me prende para ganhar a pérola que é Cristo. Amém.",
    "theme": "Fé"
  },
  {
    "title": "Esperança que Não Envergonha",
    "verse": "Porque eu bem sei os pensamentos que penso de vós, diz o SENHOR; pensamentos de paz e não de mal, para vos dar o fim que esperais.",
    "verseRef": "Jeremias 29:11",
    "body": "A esperança bíblica em \"Porque eu bem sei os pensamentos que penso de vós, diz o SENHOR; pensamentos de paz e não de mal, para vos dar o fim que esperais.\" (Jeremias 29:11) não é wishful thinking, é âncora. Deus diz \"eu sei os pensamentos que penso de vós, pensamentos de paz\". Mesmo quando o cenário aponta para escassez, Ele já preparou futuro.\n\nJeremias escreveu sobre esperança no meio de ruínas — prova de que esperança não depende de cenário favorável. Ela se renova cada manhã porque a fidelidade de Deus se renova. Sua alma pode estar abatida hoje (Salmos 42), mas a ordem é: espera em Deus.\n\nTransforme espera em oração: escreva hoje uma expectativa e entregue a Deus como semente. A esperança amadurece na paciência e floresce na perseverança.",
    "prayer": "Deus de esperança, renova hoje minha expectativa em Jeremias 29:11. Quando a alma se abater, lembra-me que Tu tens pensamentos de paz. Espero em Ti. Amém.",
    "theme": "Esperança"
  },
  {
    "title": "O Deus que Restaura",
    "verse": "As misericórdias do Senhor não têm fim; renovam-se cada manhã; grande é a tua fidelidade!",
    "verseRef": "Lamentações 3:22-23",
    "body": "A esperança bíblica em \"As misericórdias do Senhor não têm fim; renovam-se cada manhã; grande é a tua fidelidade!\" (Lamentações 3:22-23) não é wishful thinking, é âncora. Deus diz \"eu sei os pensamentos que penso de vós, pensamentos de paz\". Mesmo quando o cenário aponta para escassez, Ele já preparou futuro.\n\nJeremias escreveu sobre esperança no meio de ruínas — prova de que esperança não depende de cenário favorável. Ela se renova cada manhã porque a fidelidade de Deus se renova. Sua alma pode estar abatida hoje (Salmos 42), mas a ordem é: espera em Deus.\n\nTransforme espera em oração: escreva hoje uma expectativa e entregue a Deus como semente. A esperança amadurece na paciência e floresce na perseverança.",
    "prayer": "Deus de esperança, renova hoje minha expectativa em Lamentações 3:22-23. Quando a alma se abater, lembra-me que Tu tens pensamentos de paz. Espero em Ti. Amém.",
    "theme": "Esperança"
  },
  {
    "title": "Justificados para Ter Paz",
    "verse": "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.",
    "verseRef": "João 14:27",
    "body": "Jesus prometeu em \"Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.\" (João 14:27) uma paz diferente da que o mundo oferece. O mundo dá paz quando tudo está calmo; Cristo dá paz quando tudo está em guerra, porque Ele mesmo é a nossa paz.\n\nA paz não é ausência de luta, é presença de Cristo na luta. \"Tu conservarás em paz aquele cuja mente está firme em ti\" — paz é disciplina de mente ancorada, não emoção flutuante. Justificados pela fé, temos paz com Deus; agora aprendemos a ter a paz de Deus.\n\nHoje, guarde sua mente: ao surgir a ansiedade, respire e ore. Troque a reclamação por gratidão, o controle por entrega. A paz vem quando confiamos o peso a quem já carregou a cruz.",
    "prayer": "Jesus, Tua paz prometida em João 14:27 aquiete meu coração. Guarda minha mente firme em Ti e afasta todo temor. Que Tua paz reine hoje em minha casa. Amém.",
    "theme": "Paz"
  },
  {
    "title": "Mente Firme em Deus",
    "verse": "Tu conservarás em paz aquele cuja mente está firme em ti; porque ele confia em ti.",
    "verseRef": "Isaías 26:3",
    "body": "Jesus prometeu em \"Tu conservarás em paz aquele cuja mente está firme em ti; porque ele confia em ti.\" (Isaías 26:3) uma paz diferente da que o mundo oferece. O mundo dá paz quando tudo está calmo; Cristo dá paz quando tudo está em guerra, porque Ele mesmo é a nossa paz.\n\nA paz não é ausência de luta, é presença de Cristo na luta. \"Tu conservarás em paz aquele cuja mente está firme em ti\" — paz é disciplina de mente ancorada, não emoção flutuante. Justificados pela fé, temos paz com Deus; agora aprendemos a ter a paz de Deus.\n\nHoje, guarde sua mente: ao surgir a ansiedade, respire e ore. Troque a reclamação por gratidão, o controle por entrega. A paz vem quando confiamos o peso a quem já carregou a cruz.",
    "prayer": "Jesus, Tua paz prometida em Isaías 26:3 aquiete meu coração. Guarda minha mente firme em Ti e afasta todo temor. Que Tua paz reine hoje em minha casa. Amém.",
    "theme": "Paz"
  },
  {
    "title": "Quando Somos Fracos",
    "verse": "Posso todas as coisas naquele que me fortalece.",
    "verseRef": "Filipenses 4:13",
    "body": "Paulo escreveu \"Posso todas as coisas naquele que me fortalece.\" (Filipenses 4:13) da prisão. Não era slogan motivacional, era testemunho de contentamento: sei estar humilhado e honrado, com fartura e fome — tudo posso naquele que me fortalece.\n\nForça não é nunca cair; é levantar com Cristo quando caímos. Deus não promete estrada sem pedras, promete pernas para caminhar sobre elas. \"Os que esperam no Senhor renovarão as forças\" — esperar aqui é entrelaçar, como cordas que ganham resistência.\n\nEntregue hoje sua fraqueza sem vergonha. Diga: \"Senhor, não consigo, mas Tu podes em mim\". É nessa confissão que o poder se aperfeiçoa e a força divina encontra espaço.",
    "prayer": "Pai, confesso minha fraqueza e recebo Tua força prometida em Filipenses 4:13. Fortalece-me para o que hoje exige de mim. Em Cristo sou capaz. Amém.",
    "theme": "Força"
  },
  {
    "title": "Força na Fraqueza",
    "verse": "Mas os que esperam no SENHOR renovarão as suas forças e subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.",
    "verseRef": "Isaías 40:31",
    "body": "Paulo escreveu \"Mas os que esperam no SENHOR renovarão as suas forças e subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.\" (Isaías 40:31) da prisão. Não era slogan motivacional, era testemunho de contentamento: sei estar humilhado e honrado, com fartura e fome — tudo posso naquele que me fortalece.\n\nForça não é nunca cair; é levantar com Cristo quando caímos. Deus não promete estrada sem pedras, promete pernas para caminhar sobre elas. \"Os que esperam no Senhor renovarão as forças\" — esperar aqui é entrelaçar, como cordas que ganham resistência.\n\nEntregue hoje sua fraqueza sem vergonha. Diga: \"Senhor, não consigo, mas Tu podes em mim\". É nessa confissão que o poder se aperfeiçoa e a força divina encontra espaço.",
    "prayer": "Pai, confesso minha fraqueza e recebo Tua força prometida em Isaías 40:31. Fortalece-me para o que hoje exige de mim. Em Cristo sou capaz. Amém.",
    "theme": "Força"
  },
  {
    "title": "Não Temas, Eu Sou Contigo",
    "verse": "Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes, porque o SENHOR, teu Deus, é contigo, por onde quer que andares.",
    "verseRef": "Josué 1:9",
    "body": "Deus ordena coragem em \"Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes, porque o SENHOR, teu Deus, é contigo, por onde quer que andares.\" (Josué 1:9) não porque o medo não exista, mas porque Sua presença é maior que ele. \"Não pasmes, porque o Senhor teu Deus é contigo por onde quer que andares\" — coragem é memória de companhia.\n\nCoragem não é ausência de tremor, é obediência apesar dele. O salmista diz \"espera no Senhor, anima-te\" — coragem se alimenta de esperança. O justo é ousado como o leão porque sabe quem vai à frente.\n\nEncare hoje um medo com um ato de coragem: uma conversa adiada, um pedido de perdão, um passo de fé. Deus toma sua mão direita e diz: não temas, eu te ajudo.",
    "prayer": "Senhor, diante de Josué 1:9, escolho coragem. Toma minha mão direita, afasta o pânico e guia meus passos. Contigo vou sem medo. Amém.",
    "theme": "Coragem"
  },
  {
    "title": "Espera e Anima-te",
    "verse": "Espera no SENHOR, anima-te, e ele fortalecerá o teu coração; espera, pois, no SENHOR.",
    "verseRef": "Salmos 27:14",
    "body": "Deus ordena coragem em \"Espera no SENHOR, anima-te, e ele fortalecerá o teu coração; espera, pois, no SENHOR.\" (Salmos 27:14) não porque o medo não exista, mas porque Sua presença é maior que ele. \"Não pasmes, porque o Senhor teu Deus é contigo por onde quer que andares\" — coragem é memória de companhia.\n\nCoragem não é ausência de tremor, é obediência apesar dele. O salmista diz \"espera no Senhor, anima-te\" — coragem se alimenta de esperança. O justo é ousado como o leão porque sabe quem vai à frente.\n\nEncare hoje um medo com um ato de coragem: uma conversa adiada, um pedido de perdão, um passo de fé. Deus toma sua mão direita e diz: não temas, eu te ajudo.",
    "prayer": "Senhor, diante de Salmos 27:14, escolho coragem. Toma minha mão direita, afasta o pânico e guia meus passos. Contigo vou sem medo. Amém.",
    "theme": "Coragem"
  },
  {
    "title": "Gratidão que Transforma",
    "verse": "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.",
    "verseRef": "1 Tessalonicenses 5:18",
    "body": "Gratidão em \"Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.\" (1 Tessalonicenses 5:18) é mandamento, não sugestão: em tudo dai graças. Não é agradecer pelo mal, mas em meio a ele reconhecer a mão que sustenta.\n\nGratidão muda a lente. Quem entra \"pelas portas com louvor\" vê o mesmo dia com outros olhos. O coração grato serve de bom remédio; o ingrato adoece a alma. \"Este é o dia que fez o Senhor\" — hoje, não amanhã, é o dia de se alegrar.\n\nPratique hoje: liste três dádivas concretas deste dia — uma pequena, uma relacional, uma espiritual. Agradeça em voz alta. A gratidão abre comportas para mais graça.",
    "prayer": "Obrigado, Pai, por 1 Tessalonicenses 5:18. Abre meus olhos para Tuas bondades diárias. Que minha boca hoje seja cheia de louvor. Amém.",
    "theme": "Gratidão"
  },
  {
    "title": "Coração Grato",
    "verse": "Entrai pelas portas dele com louvor e em seus átrios, com hinos; louvai-o e bendizei o seu nome.",
    "verseRef": "Salmos 100:4",
    "body": "Gratidão em \"Entrai pelas portas dele com louvor e em seus átrios, com hinos; louvai-o e bendizei o seu nome.\" (Salmos 100:4) é mandamento, não sugestão: em tudo dai graças. Não é agradecer pelo mal, mas em meio a ele reconhecer a mão que sustenta.\n\nGratidão muda a lente. Quem entra \"pelas portas com louvor\" vê o mesmo dia com outros olhos. O coração grato serve de bom remédio; o ingrato adoece a alma. \"Este é o dia que fez o Senhor\" — hoje, não amanhã, é o dia de se alegrar.\n\nPratique hoje: liste três dádivas concretas deste dia — uma pequena, uma relacional, uma espiritual. Agradeça em voz alta. A gratidão abre comportas para mais graça.",
    "prayer": "Obrigado, Pai, por Salmos 100:4. Abre meus olhos para Tuas bondades diárias. Que minha boca hoje seja cheia de louvor. Amém.",
    "theme": "Gratidão"
  },
  {
    "title": "O Deus que Perdoa",
    "verse": "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.",
    "verseRef": "1 João 1:9",
    "body": "O perdão em \"Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.\" (1 João 1:9) revela o coração de Deus: fiel e justo para perdoar e purificar. Não é indulgência barata, é justiça satisfeita na cruz. Por isso podemos perdoar como fomos perdoados.\n\nReter ofensa é beber veneno esperando que o outro morra. O perdão liberta primeiro quem perdoa. \"Quanto está longe o oriente do ocidente\" — assim Deus afasta nossas transgressões. Se Ele nos tratou assim, como reter?\n\nHoje, escolha liberar alguém — não porque a dor foi pequena, mas porque a graça recebida foi grande. Ore por quem te feriu. O perdão é caminho de cura.",
    "prayer": "Deus fiel, obrigado pelo perdão em 1 João 1:9. Lava-me, purifica-me e ensina-me a perdoar como fui perdoado. Amém.",
    "theme": "Perdão"
  },
  {
    "title": "Longe como o Oriente",
    "verse": "Antes, sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo.",
    "verseRef": "Efésios 4:32",
    "body": "O perdão em \"Antes, sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo.\" (Efésios 4:32) revela o coração de Deus: fiel e justo para perdoar e purificar. Não é indulgência barata, é justiça satisfeita na cruz. Por isso podemos perdoar como fomos perdoados.\n\nReter ofensa é beber veneno esperando que o outro morra. O perdão liberta primeiro quem perdoa. \"Quanto está longe o oriente do ocidente\" — assim Deus afasta nossas transgressões. Se Ele nos tratou assim, como reter?\n\nHoje, escolha liberar alguém — não porque a dor foi pequena, mas porque a graça recebida foi grande. Ore por quem te feriu. O perdão é caminho de cura.",
    "prayer": "Deus fiel, obrigado pelo perdão em Efésios 4:32. Lava-me, purifica-me e ensina-me a perdoar como fui perdoado. Amém.",
    "theme": "Perdão"
  },
  {
    "title": "Lágrimas no Odre",
    "verse": "Perto está o SENHOR dos que têm o coração quebrantado e salva os contritos de espírito.",
    "verseRef": "Salmos 34:18",
    "body": "O consolo de \"Perto está o SENHOR dos que têm o coração quebrantado e salva os contritos de espírito.\" (Salmos 34:18) é para corações quebrantados. Deus não visita de longe; Ele se aproxima, conta nossas vagueações, recolhe lágrimas em Seu odre. Nenhuma dor é invisível para Ele.\n\nJesus leu Isaías 61 para dizer: vim restaurar contritos, proclamar liberdade. O choro pode durar uma noite, mas a alegria vem pela manhã — não porque a noite foi curta, mas porque Deus a transforma. Ele torna pranto em dança.\n\nSe hoje o coração dói, não esconda. Entregue a Deus a ferida com nome. Peça: \"sara-me, Senhor\". O Deus de toda consolação sabe consolar como mãe consola filho — com presença terna e braços que não soltam.",
    "prayer": "Deus que consola, toca meu coração com Salmos 34:18. Recolhe minhas lágrimas e transforma pranto em alegria. Consola-me como mãe consola filho. Amém.",
    "theme": "Consolo"
  },
  {
    "title": "Perto dos Quebrantados",
    "verse": "bem-aventurados os que choram, porque eles serão consolados;",
    "verseRef": "Mateus 5:4",
    "body": "O consolo de \"bem-aventurados os que choram, porque eles serão consolados;\" (Mateus 5:4) é para corações quebrantados. Deus não visita de longe; Ele se aproxima, conta nossas vagueações, recolhe lágrimas em Seu odre. Nenhuma dor é invisível para Ele.\n\nJesus leu Isaías 61 para dizer: vim restaurar contritos, proclamar liberdade. O choro pode durar uma noite, mas a alegria vem pela manhã — não porque a noite foi curta, mas porque Deus a transforma. Ele torna pranto em dança.\n\nSe hoje o coração dói, não esconda. Entregue a Deus a ferida com nome. Peça: \"sara-me, Senhor\". O Deus de toda consolação sabe consolar como mãe consola filho — com presença terna e braços que não soltam.",
    "prayer": "Deus que consola, toca meu coração com Mateus 5:4. Recolhe minhas lágrimas e transforma pranto em alegria. Consola-me como mãe consola filho. Amém.",
    "theme": "Consolo"
  },
  {
    "title": "Caminho de Prudência",
    "verse": "Confia no SENHOR de todo o teu coração e não te estribes no teu próprio entendimento.",
    "verseRef": "Provérbios 3:5",
    "body": "A sabedoria em \"Confia no SENHOR de todo o teu coração e não te estribes no teu próprio entendimento.\" (Provérbios 3:5) começa no temor do Senhor, não no acúmulo de informação. É lamparina para os pés: não ilumina a rodovia inteira, mas o próximo passo. E isso basta para caminhar sem tropeçar.\n\nTiago diz: se tem falta de sabedoria, peça a Deus que dá liberalmente. Deus não lança em rosto a limitação; Ele se alegra em conceder discernimento. Sabedoria é ouvir antes de falar, ponderar antes de decidir, apartar-se do mal.\n\nHoje, antes de uma decisão, pare e ore: \"Senhor, dá-me coração entendido\". Anote o conselho que a Palavra traz e pratique um. Sabedoria é obediência aplicada.",
    "prayer": "Pai, dá-me sabedoria conforme Provérbios 3:5. Que eu tema Teu nome e escolha o caminho prudente. Guia minha decisão de hoje. Amém.",
    "theme": "Sabedoria"
  },
  {
    "title": "Temor que Ensina",
    "verse": "E, se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente e não o lança em rosto; e ser-lhe-á dada.",
    "verseRef": "Tiago 1:5",
    "body": "A sabedoria em \"E, se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente e não o lança em rosto; e ser-lhe-á dada.\" (Tiago 1:5) começa no temor do Senhor, não no acúmulo de informação. É lamparina para os pés: não ilumina a rodovia inteira, mas o próximo passo. E isso basta para caminhar sem tropeçar.\n\nTiago diz: se tem falta de sabedoria, peça a Deus que dá liberalmente. Deus não lança em rosto a limitação; Ele se alegra em conceder discernimento. Sabedoria é ouvir antes de falar, ponderar antes de decidir, apartar-se do mal.\n\nHoje, antes de uma decisão, pare e ore: \"Senhor, dá-me coração entendido\". Anote o conselho que a Palavra traz e pratique um. Sabedoria é obediência aplicada.",
    "prayer": "Pai, dá-me sabedoria conforme Tiago 1:5. Que eu tema Teu nome e escolha o caminho prudente. Guia minha decisão de hoje. Amém.",
    "theme": "Sabedoria"
  },
  {
    "title": "Coração Alegre",
    "verse": "Regozijai-vos, sempre, no Senhor; outra vez digo: regozijai-vos.",
    "verseRef": "Filipenses 4:4",
    "body": "A alegria bíblica em \"Regozijai-vos, sempre, no Senhor; outra vez digo: regozijai-vos.\" (Filipenses 4:4) não depende de cenário. \"Regozijai-vos sempre no Senhor\" foi escrito da prisão. Alegria é fruto do Espírito, não termômetro de circunstâncias.\n\nEla nasce da presença: \"na tua presença há alegria\". Quando vemos a vereda da vida, o coração se alegra porque vê sentido. O choro dura uma noite, a alegria vem pela manhã — Deus é especialista em virar lamentos em cânticos.\n\nEscolha hoje um motivo para se alegrar em Deus, não nos fatos. Cante, ainda que baixo; agradeça, ainda que com lágrimas. A alegria do Senhor é força.",
    "prayer": "Senhor, enche-me de alegria por Filipenses 4:4. Que eu me regozije em Ti hoje, independentemente do cenário. Tua alegria é minha força. Amém.",
    "theme": "Alegria"
  },
  {
    "title": "Alegria Perpétua",
    "verse": "Far-me-ás ver a vereda da vida; na tua presença há abundância de alegrias; à tua mão direita há delícias perpetuamente.",
    "verseRef": "Salmos 16:11",
    "body": "A alegria bíblica em \"Far-me-ás ver a vereda da vida; na tua presença há abundância de alegrias; à tua mão direita há delícias perpetuamente.\" (Salmos 16:11) não depende de cenário. \"Regozijai-vos sempre no Senhor\" foi escrito da prisão. Alegria é fruto do Espírito, não termômetro de circunstâncias.\n\nEla nasce da presença: \"na tua presença há alegria\". Quando vemos a vereda da vida, o coração se alegra porque vê sentido. O choro dura uma noite, a alegria vem pela manhã — Deus é especialista em virar lamentos em cânticos.\n\nEscolha hoje um motivo para se alegrar em Deus, não nos fatos. Cante, ainda que baixo; agradeça, ainda que com lágrimas. A alegria do Senhor é força.",
    "prayer": "Senhor, enche-me de alegria por Salmos 16:11. Que eu me regozije em Ti hoje, independentemente do cenário. Tua alegria é minha força. Amém.",
    "theme": "Alegria"
  },
  {
    "title": "Deus Suprirá",
    "verse": "O SENHOR é o meu pastor; nada me faltará.",
    "verseRef": "Salmos 23:1",
    "body": "A provisão em \"O SENHOR é o meu pastor; nada me faltará.\" (Salmos 23:1) é promessa de pastor: nada faltará. Não é convite à passividade, é descanso de filho que sabe que o Pai conhece a necessidade antes do pedido.\n\nDeus abre a mão e satisfaz desejos dos viventes; supre segundo Suas riquezas em glória. Ele alimentou no deserto, multiplicou pouco, nunca deixou justo mendigar pão. Sua misericórdia é razão de não sermos consumidos.\n\nApresente hoje sua necessidade com simplicidade: pão, saúde, direção, reconciliação. Confie que o mesmo Deus que veste lírios cuidará de você com ainda mais zelo.",
    "prayer": "Pastor fiel, obrigado por Salmos 23:1. Supre hoje o que me falta — pão, paz, direção. Em Ti nada me faltará. Amém.",
    "theme": "Provisão"
  },
  {
    "title": "Nada nos Faltará",
    "verse": "O meu Deus, segundo as suas riquezas, suprirá todas as vossas necessidades em glória, por Cristo Jesus.",
    "verseRef": "Filipenses 4:19",
    "body": "A provisão em \"O meu Deus, segundo as suas riquezas, suprirá todas as vossas necessidades em glória, por Cristo Jesus.\" (Filipenses 4:19) é promessa de pastor: nada faltará. Não é convite à passividade, é descanso de filho que sabe que o Pai conhece a necessidade antes do pedido.\n\nDeus abre a mão e satisfaz desejos dos viventes; supre segundo Suas riquezas em glória. Ele alimentou no deserto, multiplicou pouco, nunca deixou justo mendigar pão. Sua misericórdia é razão de não sermos consumidos.\n\nApresente hoje sua necessidade com simplicidade: pão, saúde, direção, reconciliação. Confie que o mesmo Deus que veste lírios cuidará de você com ainda mais zelo.",
    "prayer": "Pastor fiel, obrigado por Filipenses 4:19. Supre hoje o que me falta — pão, paz, direção. Em Ti nada me faltará. Amém.",
    "theme": "Provisão"
  },
  {
    "title": "Perseverar em Oração",
    "verse": "Orai sem cessar.",
    "verseRef": "1 Tessalonicenses 5:17",
    "body": "A oração em \"Orai sem cessar.\" (1 Tessalonicenses 5:17) é convite insistente: pedi e dar-se-vos-á, buscai e encontrareis, batei e abrir-se-vos-á. Deus não se cansa de ser buscado; Ele se agrada da perseverança.\n\nOração não é performance, é relacionamento. \"Orai sem cessar\" é viver em conversa contínua com o Pai — no trânsito, na cozinha, no secreto. Quando buscamos de todo coração, somos encontrados.\n\nReserve hoje tempo sem pressa: silencie, leia o versículo em voz alta, ore com honestidade. Deus responde àqueles que O buscam com fé, não com fórmulas.",
    "prayer": "Pai, atende meu clamor em 1 Tessalonicenses 5:17. Ensina-me a buscar sem cessar e a bater até que se abra. Que minha oração seja encontro real contigo. Amém.",
    "theme": "Oração"
  },
  {
    "title": "Buscar e Encontrar",
    "verse": "Pedi, e dar-se-vos-á; buscai e encontrareis; batei, e abrir-se-vos-á.",
    "verseRef": "Mateus 7:7",
    "body": "A oração em \"Pedi, e dar-se-vos-á; buscai e encontrareis; batei, e abrir-se-vos-á.\" (Mateus 7:7) é convite insistente: pedi e dar-se-vos-á, buscai e encontrareis, batei e abrir-se-vos-á. Deus não se cansa de ser buscado; Ele se agrada da perseverança.\n\nOração não é performance, é relacionamento. \"Orai sem cessar\" é viver em conversa contínua com o Pai — no trânsito, na cozinha, no secreto. Quando buscamos de todo coração, somos encontrados.\n\nReserve hoje tempo sem pressa: silencie, leia o versículo em voz alta, ore com honestidade. Deus responde àqueles que O buscam com fé, não com fórmulas.",
    "prayer": "Pai, atende meu clamor em Mateus 7:7. Ensina-me a buscar sem cessar e a bater até que se abra. Que minha oração seja encontro real contigo. Amém.",
    "theme": "Oração"
  },
  {
    "title": "Bom Futuro nas Mãos de Deus",
    "verse": "O espírito do Senhor DEUS está sobre mim; porque o SENHOR me ungiu, para pregar boas novas aos mansos; enviou-me a restaurar os contritos de coração, a proclamar liberdade aos cativos, e a abertura de prisão aos presos.",
    "verseRef": "Isaías 61:1",
    "body": "A esperança bíblica em \"O espírito do Senhor DEUS está sobre mim; porque o SENHOR me ungiu, para pregar boas novas aos mansos; enviou-me a restaurar os contritos de coração, a proclamar liberdade aos cativos, e a abertura de prisão aos presos.\" (Isaías 61:1) não é wishful thinking, é âncora. Deus diz \"eu sei os pensamentos que penso de vós, pensamentos de paz\". Mesmo quando o cenário aponta para escassez, Ele já preparou futuro.\n\nJeremias escreveu sobre esperança no meio de ruínas — prova de que esperança não depende de cenário favorável. Ela se renova cada manhã porque a fidelidade de Deus se renova. Sua alma pode estar abatida hoje (Salmos 42), mas a ordem é: espera em Deus.\n\nTransforme espera em oração: escreva hoje uma expectativa e entregue a Deus como semente. A esperança amadurece na paciência e floresce na perseverança.",
    "prayer": "Deus de esperança, renova hoje minha expectativa em Isaías 61:1. Quando a alma se abater, lembra-me que Tu tens pensamentos de paz. Espero em Ti. Amém.",
    "theme": "Esperança"
  },
  {
    "title": "Viver por Fé",
    "verse": "O reino dos céus é também semelhante a um que negocia e procura boas pérolas; e, tendo achado uma pérola de grande valor, vende tudo o que possui e a compra.",
    "verseRef": "Mateus 13:45-46",
    "body": "A fé descrita em \"O reino dos céus é também semelhante a um que negocia e procura boas pérolas; e, tendo achado uma pérola de grande valor, vende tudo o que possui e a compra.\" (Mateus 13:45-46) não é otimismo, é certeza do invisível. O negociante da parábola vendeu tudo por uma pérola porque reconheceu valor incomparável — assim é Cristo para quem crê.\n\nFé não é negar a realidade difícil, é enxergar além dela. É ouvir a Palavra até que a confiança em Deus pese mais que o medo. Sem fé é impossível agradar a Deus, porque fé é a forma que escolhemos habitar o mundo: por vista ou por confiança.\n\nExercite a fé hoje em algo prático: ore por aquilo que parece travado, dê o passo que o temor adiou, confesse a promessa em voz alta. A fé cresce quando é praticada, não quando é apenas sentida.",
    "prayer": "Senhor, aumenta minha fé diante de Mateus 13:45-46. Que eu não ande por vista, mas por confiança em Ti. Ajuda-me a vender o que me prende para ganhar a pérola que é Cristo. Amém.",
    "theme": "Fé"
  },
  {
    "title": "A Paz que Jesus Deixa",
    "verse": "Sendo, pois, justificados pela fé, temos paz com Deus por nosso Senhor Jesus Cristo;",
    "verseRef": "Romanos 5:1",
    "body": "Jesus prometeu em \"Sendo, pois, justificados pela fé, temos paz com Deus por nosso Senhor Jesus Cristo;\" (Romanos 5:1) uma paz diferente da que o mundo oferece. O mundo dá paz quando tudo está calmo; Cristo dá paz quando tudo está em guerra, porque Ele mesmo é a nossa paz.\n\nA paz não é ausência de luta, é presença de Cristo na luta. \"Tu conservarás em paz aquele cuja mente está firme em ti\" — paz é disciplina de mente ancorada, não emoção flutuante. Justificados pela fé, temos paz com Deus; agora aprendemos a ter a paz de Deus.\n\nHoje, guarde sua mente: ao surgir a ansiedade, respire e ore. Troque a reclamação por gratidão, o controle por entrega. A paz vem quando confiamos o peso a quem já carregou a cruz.",
    "prayer": "Jesus, Tua paz prometida em Romanos 5:1 aquiete meu coração. Guarda minha mente firme em Ti e afasta todo temor. Que Tua paz reine hoje em minha casa. Amém.",
    "theme": "Paz"
  },
  {
    "title": "Esperança que Não Envergonha",
    "verse": "Por que estás abatida, ó minha alma, e por que te perturbas dentro de mim? Espera em Deus, pois ainda o louvarei.",
    "verseRef": "Salmos 42:11",
    "body": "A esperança bíblica em \"Por que estás abatida, ó minha alma, e por que te perturbas dentro de mim? Espera em Deus, pois ainda o louvarei.\" (Salmos 42:11) não é wishful thinking, é âncora. Deus diz \"eu sei os pensamentos que penso de vós, pensamentos de paz\". Mesmo quando o cenário aponta para escassez, Ele já preparou futuro.\n\nJeremias escreveu sobre esperança no meio de ruínas — prova de que esperança não depende de cenário favorável. Ela se renova cada manhã porque a fidelidade de Deus se renova. Sua alma pode estar abatida hoje (Salmos 42), mas a ordem é: espera em Deus.\n\nTransforme espera em oração: escreva hoje uma expectativa e entregue a Deus como semente. A esperança amadurece na paciência e floresce na perseverança.",
    "prayer": "Deus de esperança, renova hoje minha expectativa em Salmos 42:11. Quando a alma se abater, lembra-me que Tu tens pensamentos de paz. Espero em Ti. Amém.",
    "theme": "Esperança"
  },
  {
    "title": "O Vínculo da Perfeição",
    "verse": "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    "verseRef": "João 3:16",
    "body": "O amor de Deus revelado em \"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.\" — João 3:16 — não é sentimento passageiro, é aliança. Quando a Palavra diz que Deus nos amou primeiro, ela desfaz a lógica de merecimento que carregamos.\n\nVivemos tentando provar valor, mas o evangelho inverte a ordem: somos amados, por isso nos tornamos capazes de amar. O amor humano cansa; o amor divino sustenta. Ele não é invejoso, não se ensoberbece, cobre multidão de pecados.\n\nHoje, deixe esse amor curar a comparação e a autocobrança. Ame alguém sem esperar retorno — um gesto simples, uma palavra que edifica, um perdão liberado. É assim que o amor de Deus se torna visível através de nós.",
    "prayer": "Pai, ensina-me a amar como Tu amaste em João 3:16. Que meu amor não seja reativo, mas reflexo do Teu. Cura minhas durezas e faz de mim canal do Teu amor hoje. Em nome de Jesus, amém.",
    "theme": "Amor"
  },
  {
    "title": "Amor que Cobre Multidões",
    "verse": "Mas Deus prova o seu amor para conosco em que Cristo morreu por nós, sendo nós ainda pecadores.",
    "verseRef": "Romanos 5:8",
    "body": "O amor de Deus revelado em \"Mas Deus prova o seu amor para conosco em que Cristo morreu por nós, sendo nós ainda pecadores.\" — Romanos 5:8 — não é sentimento passageiro, é aliança. Quando a Palavra diz que Deus nos amou primeiro, ela desfaz a lógica de merecimento que carregamos.\n\nVivemos tentando provar valor, mas o evangelho inverte a ordem: somos amados, por isso nos tornamos capazes de amar. O amor humano cansa; o amor divino sustenta. Ele não é invejoso, não se ensoberbece, cobre multidão de pecados.\n\nHoje, deixe esse amor curar a comparação e a autocobrança. Ame alguém sem esperar retorno — um gesto simples, uma palavra que edifica, um perdão liberado. É assim que o amor de Deus se torna visível através de nós.",
    "prayer": "Pai, ensina-me a amar como Tu amaste em Romanos 5:8. Que meu amor não seja reativo, mas reflexo do Teu. Cura minhas durezas e faz de mim canal do Teu amor hoje. Em nome de Jesus, amém.",
    "theme": "Amor"
  },
  {
    "title": "O Dom da Fé",
    "verse": "Ora, a fé é o firme fundamento das coisas que se esperam e a prova das coisas que se não veem.",
    "verseRef": "Hebreus 11:1",
    "body": "A fé descrita em \"Ora, a fé é o firme fundamento das coisas que se esperam e a prova das coisas que se não veem.\" (Hebreus 11:1) não é otimismo, é certeza do invisível. O negociante da parábola vendeu tudo por uma pérola porque reconheceu valor incomparável — assim é Cristo para quem crê.\n\nFé não é negar a realidade difícil, é enxergar além dela. É ouvir a Palavra até que a confiança em Deus pese mais que o medo. Sem fé é impossível agradar a Deus, porque fé é a forma que escolhemos habitar o mundo: por vista ou por confiança.\n\nExercite a fé hoje em algo prático: ore por aquilo que parece travado, dê o passo que o temor adiou, confesse a promessa em voz alta. A fé cresce quando é praticada, não quando é apenas sentida.",
    "prayer": "Senhor, aumenta minha fé diante de Hebreus 11:1. Que eu não ande por vista, mas por confiança em Ti. Ajuda-me a vender o que me prende para ganhar a pérola que é Cristo. Amém.",
    "theme": "Fé"
  },
  {
    "title": "Fé que Move Montanhas",
    "verse": "De sorte que a fé é pelo ouvir, e o ouvir pela palavra de Deus.",
    "verseRef": "Romanos 10:17",
    "body": "A fé descrita em \"De sorte que a fé é pelo ouvir, e o ouvir pela palavra de Deus.\" (Romanos 10:17) não é otimismo, é certeza do invisível. O negociante da parábola vendeu tudo por uma pérola porque reconheceu valor incomparável — assim é Cristo para quem crê.\n\nFé não é negar a realidade difícil, é enxergar além dela. É ouvir a Palavra até que a confiança em Deus pese mais que o medo. Sem fé é impossível agradar a Deus, porque fé é a forma que escolhemos habitar o mundo: por vista ou por confiança.\n\nExercite a fé hoje em algo prático: ore por aquilo que parece travado, dê o passo que o temor adiou, confesse a promessa em voz alta. A fé cresce quando é praticada, não quando é apenas sentida.",
    "prayer": "Senhor, aumenta minha fé diante de Romanos 10:17. Que eu não ande por vista, mas por confiança em Ti. Ajuda-me a vender o que me prende para ganhar a pérola que é Cristo. Amém.",
    "theme": "Fé"
  },
  {
    "title": "O Deus que Restaura",
    "verse": "Porque eu bem sei os pensamentos que penso de vós, diz o SENHOR; pensamentos de paz e não de mal, para vos dar o fim que esperais.",
    "verseRef": "Jeremias 29:11",
    "body": "A esperança bíblica em \"Porque eu bem sei os pensamentos que penso de vós, diz o SENHOR; pensamentos de paz e não de mal, para vos dar o fim que esperais.\" (Jeremias 29:11) não é wishful thinking, é âncora. Deus diz \"eu sei os pensamentos que penso de vós, pensamentos de paz\". Mesmo quando o cenário aponta para escassez, Ele já preparou futuro.\n\nJeremias escreveu sobre esperança no meio de ruínas — prova de que esperança não depende de cenário favorável. Ela se renova cada manhã porque a fidelidade de Deus se renova. Sua alma pode estar abatida hoje (Salmos 42), mas a ordem é: espera em Deus.\n\nTransforme espera em oração: escreva hoje uma expectativa e entregue a Deus como semente. A esperança amadurece na paciência e floresce na perseverança.",
    "prayer": "Deus de esperança, renova hoje minha expectativa em Jeremias 29:11. Quando a alma se abater, lembra-me que Tu tens pensamentos de paz. Espero em Ti. Amém.",
    "theme": "Esperança"
  },
  {
    "title": "Bom Futuro nas Mãos de Deus",
    "verse": "As misericórdias do Senhor não têm fim; renovam-se cada manhã; grande é a tua fidelidade!",
    "verseRef": "Lamentações 3:22-23",
    "body": "A esperança bíblica em \"As misericórdias do Senhor não têm fim; renovam-se cada manhã; grande é a tua fidelidade!\" (Lamentações 3:22-23) não é wishful thinking, é âncora. Deus diz \"eu sei os pensamentos que penso de vós, pensamentos de paz\". Mesmo quando o cenário aponta para escassez, Ele já preparou futuro.\n\nJeremias escreveu sobre esperança no meio de ruínas — prova de que esperança não depende de cenário favorável. Ela se renova cada manhã porque a fidelidade de Deus se renova. Sua alma pode estar abatida hoje (Salmos 42), mas a ordem é: espera em Deus.\n\nTransforme espera em oração: escreva hoje uma expectativa e entregue a Deus como semente. A esperança amadurece na paciência e floresce na perseverança.",
    "prayer": "Deus de esperança, renova hoje minha expectativa em Lamentações 3:22-23. Quando a alma se abater, lembra-me que Tu tens pensamentos de paz. Espero em Ti. Amém.",
    "theme": "Esperança"
  },
  {
    "title": "Paz que Excede o Entendimento",
    "verse": "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.",
    "verseRef": "João 14:27",
    "body": "Jesus prometeu em \"Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.\" (João 14:27) uma paz diferente da que o mundo oferece. O mundo dá paz quando tudo está calmo; Cristo dá paz quando tudo está em guerra, porque Ele mesmo é a nossa paz.\n\nA paz não é ausência de luta, é presença de Cristo na luta. \"Tu conservarás em paz aquele cuja mente está firme em ti\" — paz é disciplina de mente ancorada, não emoção flutuante. Justificados pela fé, temos paz com Deus; agora aprendemos a ter a paz de Deus.\n\nHoje, guarde sua mente: ao surgir a ansiedade, respire e ore. Troque a reclamação por gratidão, o controle por entrega. A paz vem quando confiamos o peso a quem já carregou a cruz.",
    "prayer": "Jesus, Tua paz prometida em João 14:27 aquiete meu coração. Guarda minha mente firme em Ti e afasta todo temor. Que Tua paz reine hoje em minha casa. Amém.",
    "theme": "Paz"
  },
  {
    "title": "Justificados para Ter Paz",
    "verse": "Tu conservarás em paz aquele cuja mente está firme em ti; porque ele confia em ti.",
    "verseRef": "Isaías 26:3",
    "body": "Jesus prometeu em \"Tu conservarás em paz aquele cuja mente está firme em ti; porque ele confia em ti.\" (Isaías 26:3) uma paz diferente da que o mundo oferece. O mundo dá paz quando tudo está calmo; Cristo dá paz quando tudo está em guerra, porque Ele mesmo é a nossa paz.\n\nA paz não é ausência de luta, é presença de Cristo na luta. \"Tu conservarás em paz aquele cuja mente está firme em ti\" — paz é disciplina de mente ancorada, não emoção flutuante. Justificados pela fé, temos paz com Deus; agora aprendemos a ter a paz de Deus.\n\nHoje, guarde sua mente: ao surgir a ansiedade, respire e ore. Troque a reclamação por gratidão, o controle por entrega. A paz vem quando confiamos o peso a quem já carregou a cruz.",
    "prayer": "Jesus, Tua paz prometida em Isaías 26:3 aquiete meu coração. Guarda minha mente firme em Ti e afasta todo temor. Que Tua paz reine hoje em minha casa. Amém.",
    "theme": "Paz"
  },
  {
    "title": "O Senhor é Nossa Fortaleza",
    "verse": "Posso todas as coisas naquele que me fortalece.",
    "verseRef": "Filipenses 4:13",
    "body": "Paulo escreveu \"Posso todas as coisas naquele que me fortalece.\" (Filipenses 4:13) da prisão. Não era slogan motivacional, era testemunho de contentamento: sei estar humilhado e honrado, com fartura e fome — tudo posso naquele que me fortalece.\n\nForça não é nunca cair; é levantar com Cristo quando caímos. Deus não promete estrada sem pedras, promete pernas para caminhar sobre elas. \"Os que esperam no Senhor renovarão as forças\" — esperar aqui é entrelaçar, como cordas que ganham resistência.\n\nEntregue hoje sua fraqueza sem vergonha. Diga: \"Senhor, não consigo, mas Tu podes em mim\". É nessa confissão que o poder se aperfeiçoa e a força divina encontra espaço.",
    "prayer": "Pai, confesso minha fraqueza e recebo Tua força prometida em Filipenses 4:13. Fortalece-me para o que hoje exige de mim. Em Cristo sou capaz. Amém.",
    "theme": "Força"
  },
  {
    "title": "Quando Somos Fracos",
    "verse": "Mas os que esperam no SENHOR renovarão as suas forças e subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.",
    "verseRef": "Isaías 40:31",
    "body": "Paulo escreveu \"Mas os que esperam no SENHOR renovarão as suas forças e subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.\" (Isaías 40:31) da prisão. Não era slogan motivacional, era testemunho de contentamento: sei estar humilhado e honrado, com fartura e fome — tudo posso naquele que me fortalece.\n\nForça não é nunca cair; é levantar com Cristo quando caímos. Deus não promete estrada sem pedras, promete pernas para caminhar sobre elas. \"Os que esperam no Senhor renovarão as forças\" — esperar aqui é entrelaçar, como cordas que ganham resistência.\n\nEntregue hoje sua fraqueza sem vergonha. Diga: \"Senhor, não consigo, mas Tu podes em mim\". É nessa confissão que o poder se aperfeiçoa e a força divina encontra espaço.",
    "prayer": "Pai, confesso minha fraqueza e recebo Tua força prometida em Isaías 40:31. Fortalece-me para o que hoje exige de mim. Em Cristo sou capaz. Amém.",
    "theme": "Força"
  },
  {
    "title": "Coragem para Avançar",
    "verse": "Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes, porque o SENHOR, teu Deus, é contigo, por onde quer que andares.",
    "verseRef": "Josué 1:9",
    "body": "Deus ordena coragem em \"Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes, porque o SENHOR, teu Deus, é contigo, por onde quer que andares.\" (Josué 1:9) não porque o medo não exista, mas porque Sua presença é maior que ele. \"Não pasmes, porque o Senhor teu Deus é contigo por onde quer que andares\" — coragem é memória de companhia.\n\nCoragem não é ausência de tremor, é obediência apesar dele. O salmista diz \"espera no Senhor, anima-te\" — coragem se alimenta de esperança. O justo é ousado como o leão porque sabe quem vai à frente.\n\nEncare hoje um medo com um ato de coragem: uma conversa adiada, um pedido de perdão, um passo de fé. Deus toma sua mão direita e diz: não temas, eu te ajudo.",
    "prayer": "Senhor, diante de Josué 1:9, escolho coragem. Toma minha mão direita, afasta o pânico e guia meus passos. Contigo vou sem medo. Amém.",
    "theme": "Coragem"
  },
  {
    "title": "Não Temas, Eu Sou Contigo",
    "verse": "Espera no SENHOR, anima-te, e ele fortalecerá o teu coração; espera, pois, no SENHOR.",
    "verseRef": "Salmos 27:14",
    "body": "Deus ordena coragem em \"Espera no SENHOR, anima-te, e ele fortalecerá o teu coração; espera, pois, no SENHOR.\" (Salmos 27:14) não porque o medo não exista, mas porque Sua presença é maior que ele. \"Não pasmes, porque o Senhor teu Deus é contigo por onde quer que andares\" — coragem é memória de companhia.\n\nCoragem não é ausência de tremor, é obediência apesar dele. O salmista diz \"espera no Senhor, anima-te\" — coragem se alimenta de esperança. O justo é ousado como o leão porque sabe quem vai à frente.\n\nEncare hoje um medo com um ato de coragem: uma conversa adiada, um pedido de perdão, um passo de fé. Deus toma sua mão direita e diz: não temas, eu te ajudo.",
    "prayer": "Senhor, diante de Salmos 27:14, escolho coragem. Toma minha mão direita, afasta o pânico e guia meus passos. Contigo vou sem medo. Amém.",
    "theme": "Coragem"
  },
  {
    "title": "Em Tudo Dai Graças",
    "verse": "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.",
    "verseRef": "1 Tessalonicenses 5:18",
    "body": "Gratidão em \"Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.\" (1 Tessalonicenses 5:18) é mandamento, não sugestão: em tudo dai graças. Não é agradecer pelo mal, mas em meio a ele reconhecer a mão que sustenta.\n\nGratidão muda a lente. Quem entra \"pelas portas com louvor\" vê o mesmo dia com outros olhos. O coração grato serve de bom remédio; o ingrato adoece a alma. \"Este é o dia que fez o Senhor\" — hoje, não amanhã, é o dia de se alegrar.\n\nPratique hoje: liste três dádivas concretas deste dia — uma pequena, uma relacional, uma espiritual. Agradeça em voz alta. A gratidão abre comportas para mais graça.",
    "prayer": "Obrigado, Pai, por 1 Tessalonicenses 5:18. Abre meus olhos para Tuas bondades diárias. Que minha boca hoje seja cheia de louvor. Amém.",
    "theme": "Gratidão"
  },
  {
    "title": "Gratidão que Transforma",
    "verse": "Entrai pelas portas dele com louvor e em seus átrios, com hinos; louvai-o e bendizei o seu nome.",
    "verseRef": "Salmos 100:4",
    "body": "Gratidão em \"Entrai pelas portas dele com louvor e em seus átrios, com hinos; louvai-o e bendizei o seu nome.\" (Salmos 100:4) é mandamento, não sugestão: em tudo dai graças. Não é agradecer pelo mal, mas em meio a ele reconhecer a mão que sustenta.\n\nGratidão muda a lente. Quem entra \"pelas portas com louvor\" vê o mesmo dia com outros olhos. O coração grato serve de bom remédio; o ingrato adoece a alma. \"Este é o dia que fez o Senhor\" — hoje, não amanhã, é o dia de se alegrar.\n\nPratique hoje: liste três dádivas concretas deste dia — uma pequena, uma relacional, uma espiritual. Agradeça em voz alta. A gratidão abre comportas para mais graça.",
    "prayer": "Obrigado, Pai, por Salmos 100:4. Abre meus olhos para Tuas bondades diárias. Que minha boca hoje seja cheia de louvor. Amém.",
    "theme": "Gratidão"
  },
  {
    "title": "Perdoados para Perdoar",
    "verse": "Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.",
    "verseRef": "1 João 1:9",
    "body": "O perdão em \"Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.\" (1 João 1:9) revela o coração de Deus: fiel e justo para perdoar e purificar. Não é indulgência barata, é justiça satisfeita na cruz. Por isso podemos perdoar como fomos perdoados.\n\nReter ofensa é beber veneno esperando que o outro morra. O perdão liberta primeiro quem perdoa. \"Quanto está longe o oriente do ocidente\" — assim Deus afasta nossas transgressões. Se Ele nos tratou assim, como reter?\n\nHoje, escolha liberar alguém — não porque a dor foi pequena, mas porque a graça recebida foi grande. Ore por quem te feriu. O perdão é caminho de cura.",
    "prayer": "Deus fiel, obrigado pelo perdão em 1 João 1:9. Lava-me, purifica-me e ensina-me a perdoar como fui perdoado. Amém.",
    "theme": "Perdão"
  },
  {
    "title": "O Deus que Perdoa",
    "verse": "Antes, sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo.",
    "verseRef": "Efésios 4:32",
    "body": "O perdão em \"Antes, sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus vos perdoou em Cristo.\" (Efésios 4:32) revela o coração de Deus: fiel e justo para perdoar e purificar. Não é indulgência barata, é justiça satisfeita na cruz. Por isso podemos perdoar como fomos perdoados.\n\nReter ofensa é beber veneno esperando que o outro morra. O perdão liberta primeiro quem perdoa. \"Quanto está longe o oriente do ocidente\" — assim Deus afasta nossas transgressões. Se Ele nos tratou assim, como reter?\n\nHoje, escolha liberar alguém — não porque a dor foi pequena, mas porque a graça recebida foi grande. Ore por quem te feriu. O perdão é caminho de cura.",
    "prayer": "Deus fiel, obrigado pelo perdão em Efésios 4:32. Lava-me, purifica-me e ensina-me a perdoar como fui perdoado. Amém.",
    "theme": "Perdão"
  },
  {
    "title": "Choro que Vira Dança",
    "verse": "Perto está o SENHOR dos que têm o coração quebrantado e salva os contritos de espírito.",
    "verseRef": "Salmos 34:18",
    "body": "O consolo de \"Perto está o SENHOR dos que têm o coração quebrantado e salva os contritos de espírito.\" (Salmos 34:18) é para corações quebrantados. Deus não visita de longe; Ele se aproxima, conta nossas vagueações, recolhe lágrimas em Seu odre. Nenhuma dor é invisível para Ele.\n\nJesus leu Isaías 61 para dizer: vim restaurar contritos, proclamar liberdade. O choro pode durar uma noite, mas a alegria vem pela manhã — não porque a noite foi curta, mas porque Deus a transforma. Ele torna pranto em dança.\n\nSe hoje o coração dói, não esconda. Entregue a Deus a ferida com nome. Peça: \"sara-me, Senhor\". O Deus de toda consolação sabe consolar como mãe consola filho — com presença terna e braços que não soltam.",
    "prayer": "Deus que consola, toca meu coração com Salmos 34:18. Recolhe minhas lágrimas e transforma pranto em alegria. Consola-me como mãe consola filho. Amém.",
    "theme": "Consolo"
  },
  {
    "title": "Lágrimas no Odre",
    "verse": "bem-aventurados os que choram, porque eles serão consolados;",
    "verseRef": "Mateus 5:4",
    "body": "O consolo de \"bem-aventurados os que choram, porque eles serão consolados;\" (Mateus 5:4) é para corações quebrantados. Deus não visita de longe; Ele se aproxima, conta nossas vagueações, recolhe lágrimas em Seu odre. Nenhuma dor é invisível para Ele.\n\nJesus leu Isaías 61 para dizer: vim restaurar contritos, proclamar liberdade. O choro pode durar uma noite, mas a alegria vem pela manhã — não porque a noite foi curta, mas porque Deus a transforma. Ele torna pranto em dança.\n\nSe hoje o coração dói, não esconda. Entregue a Deus a ferida com nome. Peça: \"sara-me, Senhor\". O Deus de toda consolação sabe consolar como mãe consola filho — com presença terna e braços que não soltam.",
    "prayer": "Deus que consola, toca meu coração com Mateus 5:4. Recolhe minhas lágrimas e transforma pranto em alegria. Consola-me como mãe consola filho. Amém.",
    "theme": "Consolo"
  },
  {
    "title": "Sabedoria do Alto",
    "verse": "Confia no SENHOR de todo o teu coração e não te estribes no teu próprio entendimento.",
    "verseRef": "Provérbios 3:5",
    "body": "A sabedoria em \"Confia no SENHOR de todo o teu coração e não te estribes no teu próprio entendimento.\" (Provérbios 3:5) começa no temor do Senhor, não no acúmulo de informação. É lamparina para os pés: não ilumina a rodovia inteira, mas o próximo passo. E isso basta para caminhar sem tropeçar.\n\nTiago diz: se tem falta de sabedoria, peça a Deus que dá liberalmente. Deus não lança em rosto a limitação; Ele se alegra em conceder discernimento. Sabedoria é ouvir antes de falar, ponderar antes de decidir, apartar-se do mal.\n\nHoje, antes de uma decisão, pare e ore: \"Senhor, dá-me coração entendido\". Anote o conselho que a Palavra traz e pratique um. Sabedoria é obediência aplicada.",
    "prayer": "Pai, dá-me sabedoria conforme Provérbios 3:5. Que eu tema Teu nome e escolha o caminho prudente. Guia minha decisão de hoje. Amém.",
    "theme": "Sabedoria"
  },
  {
    "title": "Caminho de Prudência",
    "verse": "E, se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente e não o lança em rosto; e ser-lhe-á dada.",
    "verseRef": "Tiago 1:5",
    "body": "A sabedoria em \"E, se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente e não o lança em rosto; e ser-lhe-á dada.\" (Tiago 1:5) começa no temor do Senhor, não no acúmulo de informação. É lamparina para os pés: não ilumina a rodovia inteira, mas o próximo passo. E isso basta para caminhar sem tropeçar.\n\nTiago diz: se tem falta de sabedoria, peça a Deus que dá liberalmente. Deus não lança em rosto a limitação; Ele se alegra em conceder discernimento. Sabedoria é ouvir antes de falar, ponderar antes de decidir, apartar-se do mal.\n\nHoje, antes de uma decisão, pare e ore: \"Senhor, dá-me coração entendido\". Anote o conselho que a Palavra traz e pratique um. Sabedoria é obediência aplicada.",
    "prayer": "Pai, dá-me sabedoria conforme Tiago 1:5. Que eu tema Teu nome e escolha o caminho prudente. Guia minha decisão de hoje. Amém.",
    "theme": "Sabedoria"
  },
  {
    "title": "Choro que Vira Manhã",
    "verse": "Regozijai-vos, sempre, no Senhor; outra vez digo: regozijai-vos.",
    "verseRef": "Filipenses 4:4",
    "body": "A alegria bíblica em \"Regozijai-vos, sempre, no Senhor; outra vez digo: regozijai-vos.\" (Filipenses 4:4) não depende de cenário. \"Regozijai-vos sempre no Senhor\" foi escrito da prisão. Alegria é fruto do Espírito, não termômetro de circunstâncias.\n\nEla nasce da presença: \"na tua presença há alegria\". Quando vemos a vereda da vida, o coração se alegra porque vê sentido. O choro dura uma noite, a alegria vem pela manhã — Deus é especialista em virar lamentos em cânticos.\n\nEscolha hoje um motivo para se alegrar em Deus, não nos fatos. Cante, ainda que baixo; agradeça, ainda que com lágrimas. A alegria do Senhor é força.",
    "prayer": "Senhor, enche-me de alegria por Filipenses 4:4. Que eu me regozije em Ti hoje, independentemente do cenário. Tua alegria é minha força. Amém.",
    "theme": "Alegria"
  },
  {
    "title": "Coração Alegre",
    "verse": "Far-me-ás ver a vereda da vida; na tua presença há abundância de alegrias; à tua mão direita há delícias perpetuamente.",
    "verseRef": "Salmos 16:11",
    "body": "A alegria bíblica em \"Far-me-ás ver a vereda da vida; na tua presença há abundância de alegrias; à tua mão direita há delícias perpetuamente.\" (Salmos 16:11) não depende de cenário. \"Regozijai-vos sempre no Senhor\" foi escrito da prisão. Alegria é fruto do Espírito, não termômetro de circunstâncias.\n\nEla nasce da presença: \"na tua presença há alegria\". Quando vemos a vereda da vida, o coração se alegra porque vê sentido. O choro dura uma noite, a alegria vem pela manhã — Deus é especialista em virar lamentos em cânticos.\n\nEscolha hoje um motivo para se alegrar em Deus, não nos fatos. Cante, ainda que baixo; agradeça, ainda que com lágrimas. A alegria do Senhor é força.",
    "prayer": "Senhor, enche-me de alegria por Salmos 16:11. Que eu me regozije em Ti hoje, independentemente do cenário. Tua alegria é minha força. Amém.",
    "theme": "Alegria"
  },
  {
    "title": "O Pastor que Não Falta",
    "verse": "O SENHOR é o meu pastor; nada me faltará.",
    "verseRef": "Salmos 23:1",
    "body": "A provisão em \"O SENHOR é o meu pastor; nada me faltará.\" (Salmos 23:1) é promessa de pastor: nada faltará. Não é convite à passividade, é descanso de filho que sabe que o Pai conhece a necessidade antes do pedido.\n\nDeus abre a mão e satisfaz desejos dos viventes; supre segundo Suas riquezas em glória. Ele alimentou no deserto, multiplicou pouco, nunca deixou justo mendigar pão. Sua misericórdia é razão de não sermos consumidos.\n\nApresente hoje sua necessidade com simplicidade: pão, saúde, direção, reconciliação. Confie que o mesmo Deus que veste lírios cuidará de você com ainda mais zelo.",
    "prayer": "Pastor fiel, obrigado por Salmos 23:1. Supre hoje o que me falta — pão, paz, direção. Em Ti nada me faltará. Amém.",
    "theme": "Provisão"
  }
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
  return days[index % 7] || `Dia ${index + 1}`;
}

export function getDevotionalsByMonth(year: number, month: number): Array<Devotional & { dateObj: Date; index: number }> {
  // month 1-12
  const out: Array<Devotional & { dateObj: Date; index: number }> = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d);
    const dev = getDevotionalByDate(date);
    out.push({ ...dev, dateObj: date, index: Math.abs(Math.floor((date.getTime() - new Date(2024,0,1).getTime())/86400000)) % DEVOTIONALS.length });
  }
  return out;
}

export function getDevotionalCount(): number {
  return DEVOTIONALS.length;
}

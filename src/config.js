// ============================================================
// CONFIGURAÇÃO DA IGREJA — edite aqui antes de publicar
// ============================================================
export const IGREJA = {
  nome: 'Igreja Evangélica Santuário da Adoração',
  slogan: 'App da igreja · Playbacks Gospel',
  descricao:
    'Uma comunidade de fé acolhedora, onde pessoas encontram esperança, propósito e família.',
  missao: 'Levar o amor de Deus a todas as pessoas, aproximando vidas e transformando histórias.',
  visao:
    'Ser uma igreja relevante, acolhedora e apaixonada por pessoas, multiplicando discípulos na cidade e além.',
  valores: ['Fé', 'Acolhimento', 'Comunidade', 'Esperança', 'Excelência'],
  endereco: 'Avenida Manoel Ferreira de Sousa — Saboeiro/CE, CEP 63590-000',
  // URL oficial publicada (usada no share/SEO — mantenha igual ao domínio real)
  siteUrl: 'https://santuariodaadoracao.lovable.app',
  telefone: '(88) 98110-2012',
  email: 'roberto_sena10@hotmail.com',
  whatsapp: '5588981102012', // somente números, com DDI (55)
  instagram: 'https://instagram.com/roberto_sena89',
  youtube: '', // canal não informado — oculto até ser definido
  facebook: 'https://facebook.com/robertosena89',
  versiculo: 'Cantai ao Senhor um cântico novo; cantai ao Senhor, toda a terra. — Salmos 96:1',
  horariosCultos: [
    {
      dia: 'Domingo',
      horarios: ['09h00 — Escola Bíblica Dominical', '18h00 — Culto de Celebração'],
      icon: '🕊️',
    },
    { dia: 'Terça-feira', horarios: ['20h00 — Culto de Oração'], icon: '🙏' },
    { dia: 'Quarta-feira', horarios: ['20h00 — Estudo Bíblico'], icon: '📖' },
    { dia: 'Sexta-feira', horarios: ['20h00 — Culto de Jovens'], icon: '🔥' },
    { dia: 'Sábado', horarios: ['19h00 — Ensaio do Ministério de Música'], icon: '🎤' },
  ],
  // Fotos reais da igreja (coloque os arquivos em public/fotos/ e referencie aqui).
  // Deixe vazio ('') para usar o placeholder decorativo.
  fotos: {
    hero: '/fotos/homepage/hero-homepage.jfif', // ex.: '/fotos/hero.jpg' (fundo do topo, ideal 1600x900)
    sobre: '', // ex.: '/fotos/sobre.jpg' (seção Sobre, ideal 4:3)
  },
  // Formulário de contato (Formspree, gratuito): crie em https://formspree.io
  // e cole o ID (ex.: 'xabc1234'). Vazio = formulário desabilitado.
  formspreeId: '',
  // Analytics (Google Analytics 4): cole o ID de medição (ex.: 'G-XXXXXXXXXX').
  // Vazio = analytics desabilitado. Dados de busca ajudam a curadoria.
  analytics: {
    ga4: '',
  },
};

// Menu principal (âncoras). Ordem: Início | Programação | Palavra |
// Mídia | Playbacks | Ministérios | Contato | Sobre.
export const nav = [
  { id: 'inicio', label: 'Início', href: '#topo' },
  { id: 'devocional', label: 'Devocional Diário', href: '#devocional' },
  { id: 'programacao', label: 'Programação', href: '#programacao' },
  { id: 'biblia', label: 'Bíblia Sagrada', href: '#biblia' },
  { id: 'playbacks', label: 'Playbacks', href: '#catalogo' },
  { id: 'ministerios', label: 'Ministérios', href: '#ministerios' },
  { id: 'contato', label: 'Contato', href: '#contato' },
  { id: 'sobre', label: 'Sobre', href: '#sobre' },
];

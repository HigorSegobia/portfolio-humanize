import type { Categoria, IconeMarca } from './tipos.ts'

export const site = {
  nome: 'Agência Humanize',
  /**
   * Endereço final do site (sem barra no fim). Usado no sitemap, Open Graph e schema.org,
   * e também define a subpasta do build: no GitHub Pages o site fica em /portfolio-humanize/.
   * Ao usar um domínio próprio, troque para algo como 'https://www.agenciahumanize.com.br'.
   */
  url: 'https://higorsegobia.github.io/portfolio-humanize',

  /**
   * Faixa "versão de demonstração" no topo de todas as páginas.
   * Mude para false quando os cases e números forem reais.
   */
  demo: false,
  demoTexto:
    'Versão de demonstração: cases e números marcados como “exemplo” são fictícios e serão trocados pelos resultados reais.',

  descricao:
    'Agência de publicidade e marketing em Ribeirão Preto. Audiovisual com estratégia, social media, cobertura de eventos e tráfego pago para moda, saúde, gastronomia, farmácias, agro e indústria em Ribeirão Preto, Monte Alto e região.',
  bio: 'Conteúdo nasce de gente, não de tendência. Audiovisual com estratégia.',

  contato: {
    whatsapp: '5516999944333',
    whatsappExibicao: '(16) 99994-4333',
    instagram: 'agenciahumanize_',
    instagramUrl: 'https://www.instagram.com/agenciahumanize_/',
    liderInstagram: 'byjuliaribeiro',
    email: '',
  },

  endereco: {
    cidade: 'Ribeirão Preto',
    estado: 'SP',
    pais: 'BR',
    regiao: 'Ribeirão Preto, Monte Alto e região',
    areasAtendidas: ['Ribeirão Preto', 'Monte Alto', 'Sertãozinho', 'Jaboticabal', 'Barretos', 'Franca'],
    geo: { lat: -21.1775, lng: -47.8103 },
  },

  /** Mensagem do botão de WhatsApp (botão flutuante e links diretos). */
  mensagemWhatsapp: 'Oi, Humanize! Vim pelo site e queria conversar sobre a minha marca.',

  menu: [
    { rotulo: 'Trabalhos', href: '/trabalhos' },
    { rotulo: 'Serviços', href: '/#servicos' },
    { rotulo: 'Resultados', href: '/#resultados' },
    { rotulo: 'Sobre', href: '/sobre' },
  ],
} as const

export const categorias: Record<Categoria, string> = {
  audiovisual: 'Audiovisual',
  eventos: 'Eventos',
  storymaker: 'Storymaker',
  'social-media': 'Social media',
  moda: 'Moda',
  fitness: 'Fitness',
  agro: 'Agro',
  odontologia: 'Odontologia',
  gastronomia: 'Gastronomia',
  farmacia: 'Farmácia',
  saude: 'Saúde',
}

/** Faixa animada "quem já trabalha com a gente" na home. */
export const clientes = ['Folk', 'Almad', 'Mello e Pinelli', 'Saguta Burgers', 'Kamzu', 'Boxpark', 'Poupe Já', 'Biomagistral', 'Dra. Raissa Martins', 'Dr. Sérgio Sanchini', 'Dra. Jaque Pereira', 'Dr. Bruno Barbosa', 'Três Guris', 'Nanana']

/** Textos da página inicial. */
export const home = {
  hero: {
    titulo: 'Conteúdo nasce de gente',
    tituloManuscrito: 'não de tendência.',
    texto:
      'Agência de publicidade e marketing com audiovisual no centro de tudo. A gente vai até a sua empresa, encontra as pessoas e as histórias, e transforma isso em estratégia.',
    ctaPrincipal: 'Quero um diagnóstico gratuito',
    ctaSecundario: 'Ver trabalhos',
    colagem: [
      { foto: 'camera', alt: 'Gravação de vídeo com cliente', legenda: 'dia de gravação' },
      { foto: 'sofa', alt: 'Integrante da equipe comemorando no escritório', legenda: 'a gente ama isso aqui' },
      { foto: 'equipe-barretos', alt: 'Equipe de audiovisual da Humanize em evento sertanejo', legenda: 'cobertura em Barretos' },
    ],
    bilhete: 'Audiovisual com estratégia',
  },
  trabalhos: {
    titulo: 'O que a gente',
    tituloManuscrito: 'anda fazendo',
    texto: 'Reels de verdade, feitos para clientes de moda, saúde, odontologia, gastronomia e farmácia. Toque em um card para assistir sem sair do site.',
  },
  servicos: {
    titulo: 'Como a gente ajuda',
    tituloManuscrito: 'a sua marca',
    texto: 'Do roteiro ao relatório. Dá para contratar uma frente só ou montar um plano completo.',
  },
  resultados: {
    titulo: 'Resultados',
    tituloManuscrito: 'que dá pra medir',
    texto: 'Conteúdo bonito é o começo. Estes são números reais, tirados do Instagram dos nossos clientes.',
  },
  quemSomos: {
    titulo: 'Quem está por trás',
    tituloManuscrito: 'da Humanize',
    paragrafos: [
      'A Humanize é uma agência de publicidade e marketing de Ribeirão Preto, sob a visão de Julia Ribeiro. A gente acredita que toda marca já tem as melhores histórias para contar: as das pessoas que fazem ela acontecer.',
      'Por isso o nosso trabalho começa fora do computador, com câmera na mão, dentro da empresa, da loja, do evento. A estratégia vem junto, para cada vídeo ter um motivo de existir.',
    ],
    assinatura: 'Julia Ribeiro e equipe',
    fotos: [
      { foto: 'quem', alt: 'Julia Ribeiro, à frente da Humanize' },
      { foto: 'escritorio', alt: 'Equipe trabalhando no escritório da agência' },
    ],
  },
  depoimentos: {
    titulo: 'Quem já trabalhou',
    tituloManuscrito: 'com a gente',
  },
  contato: {
    titulo: 'Bora conversar?',
    texto:
      'Conte um pouco da sua marca. Em até 3 dias úteis a gente devolve um diagnóstico da sua presença digital, sem custo.',
  },
}

export const processo: { titulo: string; texto: string; icone: IconeMarca }[] = [
  {
    titulo: 'Diagnóstico gratuito',
    texto: 'Analisamos suas redes, Google e anúncios e mostramos onde estão as oportunidades.',
    icone: 'busca',
  },
  {
    titulo: 'Plano de 90 dias',
    texto: 'Objetivos claros: mais contatos, mais vendas, mais alcance ou mais candidatos.',
    icone: 'alvo',
  },
  {
    titulo: 'Gravação e criação',
    texto: 'A equipe vai até você para gravar, fotografar e conhecer quem faz o negócio.',
    icone: 'video',
  },
  {
    titulo: 'Relatório mensal',
    texto: 'Uma reunião por mês com os números e os próximos passos.',
    icone: 'notificacao',
  },
]

/** Opções do campo "objetivo" do formulário de diagnóstico. */
export const objetivos = [
  'Vídeos e conteúdo para as redes',
  'Mais contatos e vendas',
  'Cobertura de um evento',
  'Storymaker para um evento',
  'Organizar a marca e o posicionamento',
  'Ainda não sei',
]

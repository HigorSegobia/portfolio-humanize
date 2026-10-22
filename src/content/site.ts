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
    whatsapp: '5516997619684',
    whatsappExibicao: '(16) 99761-9684',
    instagram: 'agenciahumanize_',
    instagramUrl: 'https://www.instagram.com/agenciahumanize_/',
    liderInstagram: 'byjuliaribeiro',
    /** Telefone da agência (formato 55 + DDD + número). Hoje é o mesmo número do WhatsApp. */
    telefone: '5516997619684',
    telefoneExibicao: '(16) 99761-9684',
    email: 'agenciahumanize1@gmail.com',
  },

  /** Endereço do escritório (aparece no contato, no rodapé e no Google via schema.org) */
  endereco: {
    rua: 'R. Nhonhô Livramento, 1685, Sala 7',
    bairro: 'Centro',
    cidade: 'Monte Alto',
    estado: 'SP',
    cep: '15910-000',
    pais: 'BR',
    /** Região atendida (texto curto usado no topo da home e no contato) */
    regiao: 'Ribeirão Preto, Monte Alto e região',
    areasAtendidas: ['Monte Alto', 'Ribeirão Preto', 'Sertãozinho', 'Jaboticabal', 'Barretos', 'Franca'],
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
      { foto: 'cobertura-barretos', alt: 'Estátua do peão no parque do Circuito Sertanejo em Barretos, com a roda-gigante ao fundo', legenda: 'cobertura em Barretos' },
      { foto: 'reuniao-briefing', alt: 'Integrante da Humanize em reunião de briefing com cliente, em frente ao notebook', legenda: 'reunião de briefing' },
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

import type { Case } from './tipos.ts'

// ATENÇÃO: os cases abaixo são EXEMPLOS FICTÍCIOS (ficticio: true) para a demonstração.
// Troque pelos cases reais e mude ficticio para false.

export const cases: Case[] = [
  {
    slug: 'industria-implementos-monte-alto',
    titulo: 'Da fábrica para o LinkedIn: orçamentos de outros estados',
    cliente: 'Indústria de implementos agrícolas',
    segmento: 'Agro e indústria',
    cidade: 'Monte Alto',
    resumo: 'Vídeos da fábrica com quem faz as máquinas, LinkedIn ativo e anúncios para produtores de outros estados.',
    destaque: { valor: '+212%', legenda: 'pedidos de orçamento em 6 meses' },
    desafio:
      'A empresa vendia bem na região, mas era desconhecida fora dela. O Instagram estava parado havia um ano e os representantes não tinham material para mostrar a fábrica aos clientes.',
    feito: [
      'Duas diárias de gravação na fábrica, com operadores e engenheiros explicando cada máquina',
      'Série de vídeos curtos para Instagram e LinkedIn',
      'Vídeo institucional para os representantes usarem em visitas',
      'Anúncios para produtores rurais em MT, GO e MS, com contato direto no WhatsApp',
    ],
    numeros: [
      { valor: '+212%', legenda: 'pedidos de orçamento' },
      { valor: '38', legenda: 'orçamentos por mês' },
      { valor: 'R$ 41', legenda: 'custo por contato' },
    ],
    galeria: [
      { foto: 'camera', alt: 'Câmera da equipe durante a gravação na fábrica' },
      { foto: 'escritorio', alt: 'Reunião de planejamento do conteúdo' },
      { foto: 'novos', alt: 'Gravação de depoimento' },
    ],
    servicos: ['audiovisual', 'trafego-pago', 'estrategia-de-marca'],
    cor: 'laranja',
    ficticio: true,
  },
  {
    slug: 'clinica-odontologica-ribeirao',
    titulo: 'Dentistas de verdade nos reels, agenda cheia na clínica',
    cliente: 'Clínica odontológica com 3 unidades',
    segmento: 'Saúde',
    cidade: 'Ribeirão Preto',
    resumo: 'Reels com os próprios dentistas, rotina de avaliações no Google e anúncios por bairro direto para o WhatsApp.',
    destaque: { valor: '+67%', legenda: 'agendamentos em uma clínica com 3 unidades' },
    desafio:
      'Os posts eram imagens de banco e não mostravam a equipe. Os anúncios levavam para um formulário que quase ninguém preenchia.',
    feito: [
      'Reels mensais gravados com os próprios dentistas, tirando dúvidas reais de pacientes',
      'Rotina para pedir avaliações no Google depois de cada atendimento',
      'Anúncios separados por unidade e bairro, levando direto para o WhatsApp da recepção',
    ],
    numeros: [
      { valor: '+67%', legenda: 'agendamentos' },
      { valor: '4,1 → 4,9', legenda: 'nota no Google' },
      { valor: '6,2×', legenda: 'retorno sobre o investimento' },
    ],
    galeria: [
      { foto: 'quem', alt: 'Profissional gravando reels' },
      { foto: 'sofa', alt: 'Bastidores da gravação' },
      { foto: 'gym', alt: 'Exemplo de vídeo vertical' },
    ],
    servicos: ['audiovisual', 'social-media', 'trafego-pago'],
    cor: 'coral',
    ficticio: true,
  },
  {
    slug: 'evento-sertanejo-barretos',
    titulo: 'Quatro dias de rodeio, 1,8 milhão de visualizações',
    cliente: 'Evento sertanejo',
    segmento: 'Eventos',
    cidade: 'Região de Barretos',
    resumo: 'Equipe de audiovisual no local, storymaker e reels publicados no mesmo dia para o evento e os patrocinadores.',
    destaque: { valor: '1,8 mi', legenda: 'visualizações na cobertura de um evento de 4 dias' },
    desafio:
      'O evento precisava de conteúdo diário para o próprio perfil e para os patrocinadores, que cobravam entregas de imagem.',
    feito: [
      'Equipe de quatro pessoas no parque durante os quatro dias',
      'Storymaker publicando nos stories em tempo real',
      'Reels editados e publicados no mesmo dia',
      'Pacote de fotos e vídeos para cada patrocinador',
    ],
    numeros: [
      { valor: '1,8 mi', legenda: 'visualizações' },
      { valor: '42', legenda: 'reels publicados' },
      { valor: '+9 mil', legenda: 'seguidores novos' },
    ],
    galeria: [
      { foto: 'barretos', alt: 'Apresentadora no parque do evento' },
      { foto: 'equipe-barretos', alt: 'Equipe da Humanize no evento' },
      { foto: 'storymaker', alt: 'Registro de storymaker' },
    ],
    servicos: ['cobertura-de-eventos', 'storymaker'],
    cor: 'roxo',
    ficticio: true,
  },
]

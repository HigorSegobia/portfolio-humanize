// Tipos de todo o conteúdo editável do site.
// Fotos são referenciadas pelo NOME do arquivo em media/fotos/, sem extensão
// (ex.: "barretos" para media/fotos/barretos.jpg).

export type Cor = 'coral' | 'laranja' | 'menta' | 'roxo'

export type Categoria =
  | 'audiovisual'
  | 'eventos'
  | 'storymaker'
  | 'social-media'
  | 'moda'
  | 'fitness'
  | 'agro'
  | 'odontologia'
  | 'gastronomia'
  | 'farmacia'
  | 'saude'
  | 'automotivo'
  | 'pet'
  | 'atelie'
  | 'varejo'

export type IconeMarca =
  | 'coracao'
  | 'video'
  | 'lampada'
  | 'brilho'
  | 'foto'
  | 'alvo'
  | 'notificacao'
  | 'perfil'
  | 'busca'

/** Vídeo local (arquivo em public/videos/) ou reel do Instagram. */
export type Midia =
  | { tipo: 'video'; src: string; poster: string }
  | { tipo: 'instagram'; url: string }

export interface Numero {
  valor: string
  legenda: string
}

export interface Trabalho {
  slug: string
  /** Nome do cliente, em destaque no card */
  titulo: string
  /** Linha de apoio (segmento, cidade...) */
  cliente: string
  categoria: Categoria
  /** Capa opcional (nome do arquivo em media/fotos/). Sem foto, o card usa uma capa nas cores da marca. */
  foto?: string
  alt?: string
  /** Cor da capa da marca quando não há foto */
  cor?: Cor
  /** 'reel' (vídeo) ou 'post' (carrossel/foto) */
  formato?: 'reel' | 'post'
  midia: Midia
  /** Se existir, o card também leva para /cases/:slug */
  caseSlug?: string
  ficticio: boolean
}

export interface Case {
  slug: string
  titulo: string
  cliente: string
  segmento?: string
  cidade?: string
  /** Período dos números (ex.: "Março de 2026") */
  periodo?: string
  resumo: string
  destaque: Numero
  desafio: string
  feito: string[]
  numeros: Numero[]
  /** Números extras em destaque (ex.: visualizações por tipo de conteúdo) */
  destaques?: Numero[]
  galeria: { foto: string; alt: string; midia?: Midia }[]
  /** Comparação antes x depois da Humanize (mesma métrica nos dois lados) */
  comparacao?: { metrica: string; antes: { periodo: string; valor: string }; depois: { periodo: string; valor: string } }[]
  /** Evolução mês a mês de uma métrica (vira gráfico de barras). "antes: true" marca meses antes da Humanize. */
  evolucao?: { metrica: string; pontos: { rotulo: string; valor: number; antes?: boolean }[] }
  /** Slugs de trabalhos.ts que aparecem na página do case */
  trabalhos?: string[]
  /** De onde vieram os números (aparece em letra pequena) */
  fonte?: string
  servicos: string[]
  cor: Cor
  ficticio: boolean
}

export interface Servico {
  slug: string
  nome: string
  icone: IconeMarca
  cor: Cor
  chamada: string
  resumo: string
  descricao: string
  inclui: string[]
  paraQuem: string[]
  /** slugs de trabalhos usados como exemplo */
  exemplos: string[]
  foto: string
  alt: string
}

export interface Pessoa {
  nome: string
  cargo: string
  foto?: string
  alt?: string
  bio: string
  instagram?: string
}

export interface Depoimento {
  texto: string
  nome: string
  cargo: string
  empresa: string
  foto?: string
}

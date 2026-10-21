// Elementos da identidade visual: logos, ícones, rabiscos, selos e ilustrações.
// Todos vêm de src/assets/brand/, gerado a partir de brand/ por scripts/brand.mjs.
import type { Cor, IconeMarca } from '@/content/tipos'
import logoCompleto from '@/assets/brand/logo-completo.svg?raw'
import logoVertical from '@/assets/brand/logo-vertical.svg?raw'
import logoHorizontal from '@/assets/brand/logo-horizontal.svg?raw'
import simbolo from '@/assets/brand/simbolo.svg?raw'
import dimensoes from '@/assets/brand/dimensoes.json'

const icones = import.meta.glob<string>('../assets/brand/icones/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
})
const rabiscos = import.meta.glob<string>('../assets/brand/rabiscos/*.webp', {
  query: '?url',
  import: 'default',
  eager: true,
})
const selos = import.meta.glob<string>('../assets/brand/selos/*.svg', {
  query: '?url',
  import: 'default',
  eager: true,
})
const ilustracoes = import.meta.glob<string>('../assets/brand/ilustracoes/*.svg', {
  query: '?url',
  import: 'default',
  eager: true,
})

function pegar(mapa: Record<string, string>, nome: string) {
  const chave = Object.keys(mapa).find((k) => k.endsWith(`/${nome}`))
  if (!chave) throw new Error(`Elemento da marca não encontrado: ${nome}`)
  return mapa[chave]
}

/** width/height reais do arquivo (gerados por scripts/brand.mjs). */
function tamanho(arquivo: string) {
  const [width, height] = (dimensoes as Record<string, number[]>)[arquivo] ?? []
  return { width, height }
}

/** SVG inline que herda a cor do texto (currentColor). */
function SvgInline({ svg, className = '', label }: { svg: string; className?: string; label?: string }) {
  return (
    <span
      className={`inline-block [&>svg]:block [&>svg]:h-full [&>svg]:w-full ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

const logos = { completo: logoCompleto, vertical: logoVertical, horizontal: logoHorizontal, simbolo }

export function Logo({
  versao = 'completo',
  className = '',
  label = 'Agência Humanize',
}: {
  versao?: keyof typeof logos
  className?: string
  label?: string
}) {
  return <SvgInline svg={logos[versao]} className={className} label={label} />
}

export function Icone({ nome, className = '' }: { nome: IconeMarca; className?: string }) {
  return <SvgInline svg={pegar(icones, `${nome}.svg`)} className={className} />
}

export type FormaRabisco = 'sublinhado' | 'traco' | 'zigue' | 'arco' | 'canto' | 'diagonal' | 'linha-ondulada'

export function Rabisco({
  forma,
  cor,
  className = '',
}: {
  forma: FormaRabisco
  cor: Cor | 'creme'
  className?: string
}) {
  return (
    <img
      src={pegar(rabiscos, `${forma}-${cor}.webp`)}
      {...tamanho(`rabiscos/${forma}-${cor}.webp`)}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={`pointer-events-none select-none ${className}`}
    />
  )
}

/**
 * Sublinhado à mão (rabisco da marca) esticado sob um texto.
 * Usa background para poder deformar o traço sem distorcer uma <img>.
 * É "desenhado" da esquerda para a direita quando aparece na tela.
 */
export function Sublinhado({ cor, className = '' }: { cor: Cor | 'creme'; className?: string }) {
  return (
    <span
      aria-hidden="true"
      data-revelar="desenhar"
      className={`pointer-events-none absolute left-0 h-3 w-full bg-[length:100%_100%] bg-no-repeat ${className}`}
      style={{ backgroundImage: `url(${pegar(rabiscos, `sublinhado-${cor}.webp`)})` }}
    />
  )
}

export type NomeSelo =
  | 'certificado-conteudo-unico'
  | 'certificado-toque-humanizado'
  | 'huma-nize'
  | 'coracao-coral'
  | 'coracao-laranja'
  | 'coracao-roxo'
  | 'coracao-menta'
  | 'laptop'
  | 'made-in-humanize'
  | 'bastidores'
  | 'criatividade-sob-medida'
  | 'post-novo'
  | 'megafone'
  | 'celular'

/** Adesivos oficiais da marca. Decorativos: sem texto alternativo. */
export function Selo({ nome, className = '' }: { nome: NomeSelo; className?: string }) {
  return (
    <img
      src={pegar(selos, `${nome}.svg`)}
      {...tamanho(`selos/${nome}.svg`)}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={`pointer-events-none select-none drop-shadow-[0_8px_10px_rgb(42_16_60_/_0.18)] ${className}`}
    />
  )
}

export type NomeIlustracao = 'megafone' | 'celular' | 'maleta' | 'laptop'

/**
 * Ilustrações de linha da marca.
 * estilo "linha": traço colorido, para fundo creme. "creme": traço creme, para fundo de cor.
 */
export function Ilustracao({
  nome,
  cor,
  estilo = 'linha',
  className = '',
}: {
  nome: NomeIlustracao
  cor: Cor
  estilo?: 'linha' | 'creme'
  className?: string
}) {
  return (
    <img
      src={pegar(ilustracoes, `${nome}-${cor}-${estilo}.svg`)}
      {...tamanho(`ilustracoes/${nome}-${cor}-${estilo}.svg`)}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={`pointer-events-none select-none ${className}`}
    />
  )
}

import imagens from '@/content/imagens.gen.json'
import { site } from '@/content/site'
import { caminho } from '@/lib/base'

type InfoImagem = { largura: number; altura: number; larguras: number[]; cor: string }
const manifest = imagens as Record<string, InfoImagem>

function srcset(nome: string, larguras: number[], formato: 'avif' | 'webp') {
  return larguras.map((w) => `${caminho(`/img/fotos/${nome}-${w}.${formato}`)} ${w}w`).join(', ')
}

export function temFoto(nome?: string) {
  return !!nome && nome in manifest
}

export function urlFoto(nome: string) {
  const info = manifest[nome]
  if (!info) return undefined
  return caminho(`/img/fotos/${nome}-${info.larguras[info.larguras.length - 1]}.webp`)
}

/** Foto para Open Graph: só se tiver tamanho suficiente (senão usa a imagem padrão). */
export function urlFotoCompartilhamento(nome?: string) {
  const info = nome ? manifest[nome] : undefined
  if (!info || info.largura < 600) return undefined
  // endereço completo (site.url já inclui a subpasta)
  return `${site.url}/img/fotos/${nome}-${info.larguras[info.larguras.length - 1]}.webp`
}

/**
 * Foto responsiva (AVIF + WebP em vários tamanhos), gerada por scripts/images.mjs
 * a partir de media/fotos/<nome>.jpg.
 */
export function Foto({
  nome,
  alt,
  sizes = '100vw',
  className = '',
  prioridade = false,
}: {
  nome: string
  alt: string
  sizes?: string
  className?: string
  /** true para imagens do topo da página (carrega na hora, sem lazy). */
  prioridade?: boolean
}) {
  const info = manifest[nome]
  if (!info) {
    if (import.meta.env.DEV) console.warn(`Foto "${nome}" não existe em media/fotos/`)
    return <div className={`bg-areia ${className}`} role="img" aria-label={alt} />
  }
  const maior = info.larguras[info.larguras.length - 1]
  return (
    <picture>
      <source type="image/avif" srcSet={srcset(nome, info.larguras, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(nome, info.larguras, 'webp')} sizes={sizes} />
      <img
        src={caminho(`/img/fotos/${nome}-${maior}.webp`)}
        alt={alt}
        width={info.largura}
        height={info.altura}
        loading={prioridade ? 'eager' : 'lazy'}
        decoding="async"
        className={className}
        style={{ backgroundColor: info.cor }}
      />
    </picture>
  )
}

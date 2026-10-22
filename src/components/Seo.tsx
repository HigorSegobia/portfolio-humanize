import { createContext, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '@/content/site'

export interface DadosSeo {
  titulo: string
  descricao: string
  url: string
  imagem: string
  robots: string
}

/** Na pré-renderização (scripts/prerender.mjs) o Seo grava aqui os dados da página. */
export const ColetorSeo = createContext<{ dados?: DadosSeo } | null>(null)

function definirMeta(atributo: 'name' | 'property', chave: string, valor: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${atributo}="${chave}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(atributo, chave)
    document.head.appendChild(el)
  }
  el.content = valor
}

function definirLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

/**
 * Título, descrição, canonical e Open Graph de cada página.
 * No build, cada página é pré-renderizada com essas tags já no HTML (scripts/prerender.mjs).
 */
export function Seo({
  titulo,
  descricao = site.descricao,
  imagem = '/og.png',
  semIndice = false,
}: {
  titulo?: string
  descricao?: string
  imagem?: string
  semIndice?: boolean
}) {
  const { pathname } = useLocation()
  const dados: DadosSeo = {
    titulo: titulo ? `${titulo} | ${site.nome}` : `${site.nome} | Publicidade, marketing e audiovisual em Ribeirão Preto`,
    descricao,
    url: site.url + (pathname === '/' ? '/' : pathname.replace(/\/$/, '')),
    imagem: imagem.startsWith('http') ? imagem : site.url + imagem,
    robots: semIndice ? 'noindex, follow' : 'index, follow',
  }
  const coletor = useContext(ColetorSeo)
  if (coletor) coletor.dados = dados

  useEffect(() => {
    document.title = dados.titulo
    definirMeta('name', 'description', dados.descricao)
    definirMeta('name', 'robots', dados.robots)
    definirMeta('property', 'og:title', dados.titulo)
    definirMeta('property', 'og:description', dados.descricao)
    definirMeta('property', 'og:url', dados.url)
    definirMeta('property', 'og:image', dados.imagem)
    definirLink('canonical', dados.url)
  }, [dados.titulo, dados.descricao, dados.url, dados.imagem, dados.robots])
  return null
}

/** Dados estruturados LocalBusiness (schema.org) da agência. */
export function SchemaLocalBusiness() {
  const dados = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${site.url}/#agencia`,
    name: site.nome,
    description: site.descricao,
    slogan: site.bio,
    url: site.url,
    image: `${site.url}/og.png`,
    logo: `${site.url}/favicon.svg`,
    telephone: `+${site.contato.telefone}`,
    email: site.contato.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.endereco.rua,
      addressLocality: site.endereco.cidade,
      addressRegion: site.endereco.estado,
      postalCode: site.endereco.cep,
      addressCountry: site.endereco.pais,
    },
    areaServed: site.endereco.areasAtendidas.map((name) => ({ '@type': 'City', name })),
    sameAs: [site.contato.instagramUrl],
    founder: { '@type': 'Person', name: 'Julia Ribeiro', sameAs: `https://www.instagram.com/${site.contato.liderInstagram}/` },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }} />
}

// Gera o HTML final de cada página (dist/<rota>/index.html) a partir do build de servidor.
// Assim o conteúdo e as tags de SEO/Open Graph já chegam prontos, sem esperar o JavaScript.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { rotas } from './rotas.ts'

const raiz = path.resolve(import.meta.dirname, '..')
const dist = path.join(raiz, 'dist')
const ssr = path.join(raiz, 'dist-ssr')
const modulo = fs.readdirSync(ssr).find((f) => /^entry-server\.m?js$/.test(f))
if (!modulo) throw new Error('Build de servidor não encontrado em dist-ssr/')
const { renderizar } = await import(pathToFileURL(path.join(ssr, modulo)).href)
const modelo = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function montar(html: string, seo?: { titulo: string; descricao: string; url: string; imagem: string; robots: string }) {
  let saida = modelo.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  if (seo) {
    saida = saida
      .replace(/<title>[^<]*<\/title>/, `<title>${escapar(seo.titulo)}</title>\n    <meta name="robots" content="${seo.robots}" />`)
      .replace(/(<meta name="description" content=")[^"]*/, `$1${escapar(seo.descricao)}`)
      .replace(/(<link rel="canonical" href=")[^"]*/, `$1${seo.url}`)
      .replace(/(<meta property="og:title" content=")[^"]*/, `$1${escapar(seo.titulo)}`)
      .replace(/(<meta property="og:description" content=")[^"]*/, `$1${escapar(seo.descricao)}`)
      .replace(/(<meta property="og:url" content=")[^"]*/, `$1${seo.url}`)
      .replace(/(<meta property="og:image" content=")[^"]*/, `$1${seo.imagem}`)
  }
  return saida
}

for (const { caminho } of rotas) {
  const { html, seo } = await renderizar(caminho)
  const destino = caminho === '/' ? path.join(dist, 'index.html') : path.join(dist, caminho, 'index.html')
  fs.mkdirSync(path.dirname(destino), { recursive: true })
  fs.writeFileSync(destino, montar(html, seo))
}

// Página 404 (servida pela Vercel e pela Netlify para endereços que não existem)
const nf = await renderizar('/404')
fs.writeFileSync(path.join(dist, '404.html'), montar(nf.html, nf.seo))

fs.rmSync(ssr, { recursive: true, force: true })
console.log(`pré-renderização ok (${rotas.length} páginas + 404)`)

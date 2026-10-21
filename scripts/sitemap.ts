// Gera public/sitemap.xml e public/robots.txt a partir do conteúdo do site.
// Roda sozinho antes do build (Node 22.18+ executa TypeScript direto).
import fs from 'node:fs'
import path from 'node:path'
import { site } from '../src/content/site.ts'
import { rotas } from './rotas.ts'

const publico = path.resolve(import.meta.dirname, '..', 'public')
const hoje = new Date().toISOString().slice(0, 10)


const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rotas
  .map((r) => `  <url><loc>${site.url}${r.caminho}</loc><lastmod>${hoje}</lastmod><priority>${r.prioridade}</priority></url>`)
  .join('\n')}
</urlset>
`
fs.writeFileSync(path.join(publico, 'sitemap.xml'), xml)
fs.writeFileSync(path.join(publico, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`)
console.log(`sitemap ok (${rotas.length} páginas)`)

// Converte as fotos de media/fotos/ em AVIF + WebP em vários tamanhos.
// Saída: public/img/fotos/<nome>-<largura>.<formato> e src/content/imagens.gen.json
// Roda sozinho antes de `npm run dev` e `npm run build`. Só reprocessa o que mudou.
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const srcDir = path.join(root, 'media/fotos')
const outDir = path.join(root, 'public/img/fotos')
const manifestFile = path.join(root, 'src/content/imagens.gen.json')
const LARGURAS = [320, 480, 768, 1080, 1600]

fs.mkdirSync(outDir, { recursive: true })
fs.mkdirSync(path.dirname(manifestFile), { recursive: true })
const anterior = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')) : {}
const manifest = {}

for (const file of fs.readdirSync(srcDir).sort()) {
  if (!/\.(jpe?g|png|webp|avif|tiff?)$/i.test(file)) continue
  const nome = path.parse(file).name.normalize('NFC').toLowerCase().replace(/[^a-z0-9-]+/g, '-')
  const full = path.join(srcDir, file)
  const mtime = Math.round(fs.statSync(full).mtimeMs)
  const prev = anterior[nome]
  const pronto = prev?.mtime === mtime &&
    prev.larguras.every((w) => fs.existsSync(path.join(outDir, `${nome}-${w}.avif`)))
  if (pronto) {
    manifest[nome] = prev
    continue
  }

  const img = sharp(full).rotate()
  const { width = 0, height = 0 } = await img.metadata()
  // Nunca amplia: tamanhos maiores que o original não são gerados.
  const larguras = [...new Set([...LARGURAS.filter((w) => w < width), Math.min(width, 1600)])]
  for (const w of larguras) {
    const base = img.clone().resize({ width: w })
    await base.clone().avif({ quality: 55 }).toFile(path.join(outDir, `${nome}-${w}.avif`))
    await base.clone().webp({ quality: 78 }).toFile(path.join(outDir, `${nome}-${w}.webp`))
  }
  const { dominant } = await img.stats()
  const cor = '#' + [dominant.r, dominant.g, dominant.b].map((v) => v.toString(16).padStart(2, '0')).join('')
  manifest[nome] = { largura: width, altura: height, larguras, cor, mtime }
  console.log(`imagem: ${nome} (${larguras.join(', ')})`)
}

fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + '\n')

// Imagem de compartilhamento (Open Graph) 1200x630 com o logo da marca.
const og = path.join(root, 'public/og.png')
if (!fs.existsSync(og)) {
  const logo = fs.readFileSync(path.join(root, 'src/assets/brand/logo-vertical.svg'), 'utf8')
    .replace('<svg ', '<svg fill="#fff6eb" style="color:#fff6eb" ')
  const logoPng = await sharp(Buffer.from(logo), { density: 300 }).resize({ width: 560 }).png().toBuffer()
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#ff5459' } })
    .composite([{ input: logoPng, gravity: 'center' }])
    .png()
    .toFile(og)
}
console.log(`imagens ok (${Object.keys(manifest).length})`)

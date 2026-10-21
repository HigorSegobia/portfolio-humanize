// Extrai da pasta brand/ (identidade oficial) os arquivos que o site usa.
// Rode com `npm run assets` sempre que a pasta brand/ mudar.
//  - Fontes .otf/.ttf -> public/fonts/*.woff2 (com subset latino)
//  - Logos e ícones -> src/assets/brand/*.svg com a cor trocada por currentColor
//  - Ilustrações, selos e pattern -> src/assets/brand/... (cores originais)
//  - Rabiscos PNG -> src/assets/brand/rabiscos/<cor>-<n>.webp
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import subsetFont from 'subset-font'

const root = path.resolve(import.meta.dirname, '..')
const brand = path.join(root, 'brand')
const out = path.join(root, 'src/assets/brand')
const fontsOut = path.join(root, 'public/fonts')

// Os nomes vêm do Illustrator em Unicode NFD; normalizamos para achar por nome.
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name)
    return e.isDirectory() ? walk(full) : [full]
  })
}
const files = walk(brand).map((full) => ({
  full,
  rel: path.relative(brand, full).normalize('NFC').replaceAll('\\', '/'),
}))
function find(pattern) {
  const hit = files.find((f) => pattern.test(f.rel))
  if (!hit) throw new Error(`Arquivo não encontrado em brand/: ${pattern}`)
  return hit.full
}
function write(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, data)
}

// SVG de uma cor só -> currentColor, sem cabeçalho XML nem id fixo.
function monochrome(svg) {
  return svg
    .replace(/<\?xml[^>]*>\s*/, '')
    .replace(/\sid="[^"]*"/g, '')
    .replace(/fill:\s*#[0-9a-f]{6}/gi, 'fill: currentColor')
    .replace(/\s*\n\s*/g, ' ')
    .trim()
}

// ---------- Fontes ----------
const glyphs = (() => {
  let s = ''
  for (let c = 0x20; c <= 0x7e; c++) s += String.fromCharCode(c)
  for (let c = 0xa0; c <= 0xff; c++) s += String.fromCharCode(c)
  return s + 'ŒœŠšŸŽž–—‘’‚“”„•…‹›€™→←↗♥✓×'
})()

const fonts = [
  ['Author-Light.otf', 'author-300.woff2'],
  ['Author-Regular.otf', 'author-400.woff2'],
  ['Author-Italic.otf', 'author-400-italic.woff2'],
  ['Author-Medium.otf', 'author-500.woff2'],
  ['Author-Semibold.otf', 'author-600.woff2'],
  ['Author-Bold.otf', 'author-700.woff2'],
  ['Caveat-Regular.ttf', 'caveat-400.woff2'],
  ['Caveat-SemiBold.ttf', 'caveat-600.woff2'],
  ['Caveat-Bold.ttf', 'caveat-700.woff2'],
]
for (const [src, dest] of fonts) {
  const buf = fs.readFileSync(find(new RegExp(`Tipografia/.*/${src}$`)))
  write(path.join(fontsOut, dest), await subsetFont(buf, glyphs, { targetFormat: 'woff2' }))
}
console.log(`fontes: ${fonts.length}`)

// ---------- Logos ----------
const logos = {
  'logo-completo': /\(A\) Logo completo\/SVG\/.*-2\.svg$/,
  'logo-vertical': /\(B\) Vertical\/SVG\/.*-6\.svg$/,
  'logo-horizontal': /\(D\) Horizontal reduzido\/SVG\/.*-21\.svg$/,
  'logo-agencia': /\(E\) Vertical justificada\/SVG\/.*-16\.svg$/,
  simbolo: /\(C\) Símbolo\/SVG\/.*-27\.svg$/,
}
for (const [name, re] of Object.entries(logos)) {
  write(path.join(out, `${name}.svg`), monochrome(fs.readFileSync(find(re), 'utf8')))
}
// Favicon: símbolo coral original.
write(path.join(root, 'public/favicon.svg'), fs.readFileSync(find(logos.simbolo)))
await sharp(find(logos.simbolo), { density: 400 })
  .resize(180, 180, { fit: 'contain', background: '#fff6eb' })
  .flatten({ background: '#fff6eb' })
  .png()
  .toFile(path.join(root, 'public/apple-touch-icon.png'))

// ---------- Ícones ----------
const icones = {
  coracao: '01 Coração', video: '02 Vídeo', lampada: '03 Lâmpada', brilho: '04 Brilho',
  foto: '05 Foto', alvo: '06 Alvo', notificacao: '07 Notificação', perfil: '08 Perfil', busca: '09 Busca',
}
for (const [name, dir] of Object.entries(icones)) {
  const svg = fs.readFileSync(find(new RegExp(`Ícones/${dir}/SVG/.*\\.svg$`)), 'utf8')
  write(path.join(out, 'icones', `${name}.svg`), monochrome(svg))
}

// ---------- Ilustrações (traço colorido, para fundo creme; e traço creme, para fundo de cor) ----------
const ilus = {
  megafone: ['01 Mulher c_ megafone', 'Ilust1_Humanize', [5, 6, 7, 8], [1, 2, 3, 4]],
  celular: ['02 Mulher c_ celular', 'Ilust2 _Humanize', [13, 14, 15, 16], [9, 10, 11, 12]],
  maleta: ['03 Homem c_ maleta', 'Ilust3 _Humanize', [21, 22, 23, 24], [17, 18, 19, 20]],
  laptop: ['04 Mulher c_ laptop', 'Ilust4 _Humanize', [29, 30, 31, 32], [25, 26, 27, 28]],
}
const cores = ['coral', 'laranja', 'menta', 'roxo']
for (const [name, [dir, base, linha, cheia]] of Object.entries(ilus)) {
  cores.forEach((cor, i) => {
    for (const [tipo, nums] of [['linha', linha], ['creme', cheia]]) {
      const svg = fs.readFileSync(find(new RegExp(`Ilustrações/${dir}/SVG/${base}-${nums[i]}\\.svg$`)), 'utf8')
      write(path.join(out, 'ilustracoes', `${name}-${cor}-${tipo}.svg`), svg.replace(/<\?xml[^>]*>\s*/, ''))
    }
  })
}

// ---------- Selos ----------
const selos = {
  'certificado-conteudo-unico': 1, 'certificado-toque-humanizado': 2, 'huma-nize': 3,
  'coracao-coral': 4, 'coracao-laranja': 5, 'coracao-roxo': 6, 'coracao-menta': 7,
  'laptop': 17, 'made-in-humanize': 18, 'bastidores': 20, 'criatividade-sob-medida': 21,
  'post-novo': 22, 'megafone': 15, 'celular': 16,
}
for (const [name, n] of Object.entries(selos)) {
  const svg = fs.readFileSync(find(new RegExp(`Selos/SVG/Selo_Humanize-${n}\\.svg$`)), 'utf8')
  write(path.join(out, 'selos', `${name}.svg`), svg.replace(/<\?xml[^>]*>\s*/, ''))
}

// ---------- Pattern ----------
for (const n of [1, 2]) {
  await sharp(find(new RegExp(`Pattern/PNG/Pattern_Humanize-${n}\\.png$`)))
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(out, `pattern-${n}.webp`))
}

// ---------- Rabiscos ----------
// Cada cor tem as mesmas 29 formas, na mesma ordem. Guardamos só as usadas no site.
const pastas = { Branco: ['creme', 1], Rosa: ['coral', 30], Laranja: ['laranja', 59], Roxo: ['roxo', 88], 'Verde água': ['menta', 117] }
const formas = { 'linha-ondulada': 3, canto: 12, diagonal: 13, arco: 19, zigue: 21, sublinhado: 22, traco: 23 }
for (const f of fs.existsSync(path.join(out, 'rabiscos')) ? fs.readdirSync(path.join(out, 'rabiscos')) : []) fs.rmSync(path.join(out, 'rabiscos', f))
let r = 0
for (const [pasta, [cor, inicio]] of Object.entries(pastas)) {
  for (const [forma, i] of Object.entries(formas)) {
    const src = find(new RegExp(`Rabiscos/${pasta}/Ativo ${inicio + i}\.png$`))
    const dest = path.join(out, 'rabiscos', `${forma}-${cor}.webp`)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    await sharp(src).trim().resize({ width: 900, withoutEnlargement: true }).webp({ quality: 85 }).toFile(dest)
    r++
  }
}
console.log(`rabiscos: ${r}`)

// ---------- Dimensões (width/height nas <img>, evita salto de layout) ----------
const dimensoes = {}
for (const pasta of ['rabiscos', 'selos', 'ilustracoes']) {
  for (const f of fs.readdirSync(path.join(out, pasta))) {
    const { width, height } = await sharp(path.join(out, pasta, f)).metadata()
    dimensoes[`${pasta}/${f}`] = [Math.round(width), Math.round(height)]
  }
}
write(path.join(out, 'dimensoes.json'), JSON.stringify(dimensoes, null, 1) + '\n')
console.log('brand ok')

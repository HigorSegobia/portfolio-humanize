import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { site } from './src/content/site.ts'

// Subpasta tirada do endereço do site: 'https://usuario.github.io/portfolio-humanize' -> '/portfolio-humanize/'
const base = new URL(site.url).pathname.replace(/\/?$/, '/')

// `npm run preview` se comporta como a Vercel/Netlify: /trabalhos serve dist/trabalhos/index.html
// e endereços que não existem recebem dist/404.html.
function paginasPreRenderizadas(): Plugin {
  return {
    name: 'paginas-pre-renderizadas',
    configurePreviewServer(server) {
      const dist = path.resolve(server.config.root, server.config.build.outDir)
      server.middlewares.use((req, res, next) => {
        const url = decodeURIComponent((req.url ?? '/').split('?')[0])
        if (!url.startsWith(base)) return next()
        const caminho = '/' + url.slice(base.length)
        if (path.extname(caminho)) return next()
        const pagina = path.join(dist, caminho, 'index.html')
        if (fs.existsSync(pagina)) {
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end(fs.readFileSync(pagina))
        }
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(fs.readFileSync(path.join(dist, '404.html')))
      })
    },
  }
}

// O HTML já chega pronto (pré-renderizado) e os links de WhatsApp funcionam sem JavaScript.
// Por isso o JS da hidratação só é baixado depois que a página carrega, sem disputar banda
// com fontes e fotos em conexões lentas de celular.
function hidratarDepoisDoLoad(): Plugin {
  return {
    name: 'hidratar-depois-do-load',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html
          .replace(/\s*<link rel="modulepreload"[^>]*>/g, '')
          .replace(
            /<script type="module" crossorigin src="([^"]+)"><\/script>/,
            (_, src) =>
              `<script type="module">const c=()=>import("${src}");const i=()=>("requestIdleCallback" in window?requestIdleCallback(c,{timeout:1500}):setTimeout(c,200));document.readyState==="complete"?i():addEventListener("load",i,{once:true})</script>`,
          )
      },
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), paginasPreRenderizadas(), hidratarDepoisDoLoad()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    // Rabiscos e selos ficam como arquivos (não base64), já que só alguns são usados por página
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) return 'react'
          if (/node_modules\/(framer-motion|motion-dom|motion-utils)\//.test(id)) return 'motion'
        },
      },
    },
  },
})

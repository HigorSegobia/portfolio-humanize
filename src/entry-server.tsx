// Usado só no build (scripts/prerender.ts) para gerar o HTML de cada página.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom'
import { routes } from '@/routes'
import { ColetorSeo, type DadosSeo } from '@/components/Seo'
import { BASE } from '@/lib/base'

export async function renderizar(caminho: string): Promise<{ html: string; seo?: DadosSeo }> {
  const handler = createStaticHandler(routes, { basename: BASE })
  const contexto = await handler.query(new Request(`http://localhost${BASE.replace(/\/$/, '')}${caminho}`))
  if (contexto instanceof Response) throw new Error(`Rota ${caminho} redirecionou`)
  const router = createStaticRouter(handler.dataRoutes, contexto)
  const coletor: { dados?: DadosSeo } = {}
  const html = renderToString(
    <StrictMode>
      <ColetorSeo.Provider value={coletor}>
        <StaticRouterProvider router={router} context={contexto} />
      </ColetorSeo.Provider>
    </StrictMode>,
  )
  return { html, seo: coletor.dados }
}

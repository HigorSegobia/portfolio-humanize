import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, matchRoutes, RouterProvider, type HydrationState } from 'react-router-dom'
import { routes } from '@/routes'
import { BASE } from '@/lib/base'
import './index.css'

const raiz = document.getElementById('root')!

async function iniciar() {
  // Páginas pré-renderizadas no build já chegam com HTML: carregamos a rota
  // preguiçosa antes de hidratar para o React encontrar exatamente o mesmo conteúdo.
  const preRenderizado = raiz.hasChildNodes()
  if (preRenderizado) {
    const pendentes = matchRoutes(routes, window.location, BASE)?.filter((m) => m.route.lazy) ?? []
    await Promise.all(
      pendentes.map(async (m) => {
        const modulo = await (m.route.lazy as () => Promise<object>)()
        Object.assign(m.route, { ...modulo, lazy: undefined })
      }),
    )
  }

  const router = createBrowserRouter(routes, {
    basename: BASE,
    hydrationData: (window as { __staticRouterHydrationData?: HydrationState }).__staticRouterHydrationData,
  })
  const app = (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
  if (preRenderizado) hydrateRoot(raiz, app)
  else createRoot(raiz).render(app)
}

iniciar()

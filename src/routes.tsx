import type { RouteObject } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import Home from '@/pages/Home'

// A home carrega junto; as outras páginas são baixadas só quando visitadas.
export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/trabalhos', lazy: async () => ({ Component: (await import('@/pages/Trabalhos')).default }) },
      { path: '/cases/:slug', lazy: async () => ({ Component: (await import('@/pages/CasePage')).default }) },
      { path: '/servicos/:slug', lazy: async () => ({ Component: (await import('@/pages/ServicoPage')).default }) },
      { path: '/sobre', lazy: async () => ({ Component: (await import('@/pages/Sobre')).default }) },
      { path: '*', lazy: async () => ({ Component: (await import('@/pages/NotFound')).default }) },
    ],
  },
]

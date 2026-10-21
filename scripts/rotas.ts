// Lista de páginas do site, usada pelo sitemap e pela pré-renderização.
import { cases } from '../src/content/cases.ts'
import { servicos } from '../src/content/servicos.ts'

export const rotas: { caminho: string; prioridade: string }[] = [
  { caminho: '/', prioridade: '1.0' },
  { caminho: '/trabalhos', prioridade: '0.8' },
  { caminho: '/sobre', prioridade: '0.7' },
  ...servicos.map((s) => ({ caminho: `/servicos/${s.slug}`, prioridade: '0.8' })),
  ...cases.map((c) => ({ caminho: `/cases/${c.slug}`, prioridade: '0.6' })),
]

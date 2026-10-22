import type { CSSProperties } from 'react'
import type { Case } from '@/content/tipos'
import { Contador } from './animacoes'

const fmt = (v: number) => v.toLocaleString('pt-BR')

/**
 * Evolução mês a mês (uma série, barras verticais). Os meses "antes da Humanize"
 * ficam em cinza e com o texto "antes". Os valores ficam escritos sobre as barras
 * (são poucos pontos) e há uma tabela equivalente para leitores de tela.
 */
export function GraficoEvolucao({ evolucao }: { evolucao: NonNullable<Case['evolucao']> }) {
  const maximo = Math.max(...evolucao.pontos.map((p) => p.valor), 1)
  return (
    <figure className="m-0">
      <figcaption className="text-sm font-semibold uppercase tracking-[0.18em] text-roxo-claro">{evolucao.metrica}</figcaption>
      <div className="mt-6 flex h-56 items-end gap-3 border-b border-creme/25 sm:h-64 sm:gap-6" aria-hidden="true">
        {evolucao.pontos.map((p, i) => (
          <div key={p.rotulo} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end">
            <span className="mb-2 text-lg font-bold tabular-nums text-creme sm:text-2xl">{fmt(p.valor)}</span>
            <span
              data-revelar="crescer"
              style={{ height: `${Math.max(2, (p.valor / maximo) * 100)}%`, '--atraso': `${i * 160}ms` } as CSSProperties}
              className={`w-full max-w-16 rounded-t ${p.antes ? 'bg-areia' : 'bg-laranja'}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-3 sm:gap-6" aria-hidden="true">
        {evolucao.pontos.map((p) => (
          <span key={p.rotulo} className="min-w-0 flex-1 text-center text-sm leading-tight text-creme/85">
            {p.rotulo}
            {p.antes && <span className="block text-xs text-roxo-claro">antes da Humanize</span>}
          </span>
        ))}
      </div>
      <table className="sr-only">
        <caption>{evolucao.metrica}</caption>
        <tbody>
          {evolucao.pontos.map((p) => (
            <tr key={p.rotulo}>
              <th scope="row">
                {p.rotulo}
                {p.antes ? ' (antes da Humanize)' : ''}
              </th>
              <td>{fmt(p.valor)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}

/** Cartões "antes x depois" para a mesma métrica. */
export function ComparacaoAntesDepois({ itens }: { itens: NonNullable<Case['comparacao']> }) {
  return (
    <ul className="grid gap-4">
      {itens.map((c, i) => (
        <li
          key={c.metrica}
          data-revelar="zoom"
          style={{ '--atraso': `${i * 120}ms` } as CSSProperties}
          className="rounded-card bg-creme p-6 text-ameixa shadow-papel sm:p-7"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-grafite">{c.metrica}</p>
          <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
            <div>
              <p className="text-4xl font-bold leading-none tabular-nums text-grafite sm:text-5xl">{c.antes.valor}</p>
              <p className="mt-2 text-sm text-grafite">{c.antes.periodo}</p>
            </div>
            <span className="pb-6 text-3xl text-coral-escuro">
              <span aria-hidden="true">→</span>
              <span className="sr-only">passou para</span>
            </span>
            <div>
              <Contador valor={c.depois.valor} className="block text-4xl font-bold leading-none tabular-nums text-coral-escuro sm:text-5xl" />
              <p className="mt-2 text-sm font-semibold">{c.depois.periodo}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

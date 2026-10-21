import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categorias } from '@/content/site'
import { trabalhos } from '@/content/trabalhos'
import type { Categoria } from '@/content/tipos'
import { GradeTrabalhos } from '@/components/Trabalhos'
import { TituloSecao } from '@/components/ui'
import { ChamadaDiagnostico } from '@/components/Secoes'
import { Seo } from '@/components/Seo'

// Só mostra filtros de categorias que têm trabalhos publicados
const todas = (Object.keys(categorias) as Categoria[]).filter((c) => trabalhos.some((t) => t.categoria === c))

export default function Trabalhos() {
  // A categoria fica na URL (?categoria=eventos) para dar para compartilhar o filtro
  const [params, setParams] = useSearchParams()
  // O HTML pré-renderizado mostra "Todos"; o filtro da URL entra depois de montar
  const [montado, setMontado] = useState(false)
  useEffect(() => setMontado(true), [])
  const atual = montado ? (params.get('categoria') as Categoria | null) : null
  const filtro = atual && todas.includes(atual) ? atual : null
  const lista = filtro ? trabalhos.filter((t) => t.categoria === filtro) : trabalhos

  function escolher(c: Categoria | null) {
    setParams(c ? { categoria: c } : {}, { replace: true, preventScrollReset: true })
  }

  const chip = (ativo: boolean) =>
    `min-h-11 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-[background-color,color,border-color,scale,translate] hover:-translate-y-0.5 active:scale-95 ${
      ativo ? 'border-ameixa bg-ameixa text-creme' : 'border-ameixa/25 hover:border-ameixa'
    }`

  return (
    <>
      <Seo
        titulo="Trabalhos"
        descricao="Reels e conteúdos feitos pela Agência Humanize para clientes de moda, odontologia, gastronomia e farmácia em Ribeirão Preto, Monte Alto, Franca e região."
      />
      <section className="container-site pb-12 pt-12 sm:pt-16" aria-labelledby="titulo-pagina">
        <TituloSecao
          id="titulo-pagina"
          nivel={1}
          titulo="Trabalhos"
          manuscrito="feitos de perto"
          texto="Reels feitos para clientes reais de moda, odontologia, gastronomia e farmácia. Toque em um trabalho para assistir aqui mesmo."
        />

        <div className="mt-10" role="group" aria-label="Filtrar por categoria" data-revelar="subir">
          <ul className="flex flex-wrap gap-2">
            <li>
              <button type="button" className={chip(!filtro)} aria-pressed={!filtro} onClick={() => escolher(null)}>
                Todos
              </button>
            </li>
            {todas.map((c) => (
              <li key={c}>
                <button type="button" className={chip(filtro === c)} aria-pressed={filtro === c} onClick={() => escolher(c)}>
                  {categorias[c]}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p className="sr-only" aria-live="polite">
          {lista.length} {lista.length === 1 ? 'trabalho' : 'trabalhos'}
          {filtro ? ` em ${categorias[filtro]}` : ''}
        </p>

        <div className="mt-8">
          {lista.length > 0 ? (
            <GradeTrabalhos trabalhos={lista} prioridade={3} />
          ) : (
            <p className="rounded-card bg-laranja-claro/50 p-8 text-lg">Ainda não temos trabalhos publicados nessa categoria.</p>
          )}
        </div>
      </section>
      <ChamadaDiagnostico />
    </>
  )
}

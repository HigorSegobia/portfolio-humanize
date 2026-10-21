import type { CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Contador } from '@/components/animacoes'
import { cases } from '@/content/cases'
import { servicos } from '@/content/servicos'
import { Foto, urlFotoCompartilhamento } from '@/components/Foto'
import { Rabisco } from '@/components/marca'
import { fundoCor, SeloExemplo } from '@/components/ui'
import { CardResultado, ChamadaDiagnostico } from '@/components/Secoes'
import { Seo } from '@/components/Seo'
import NotFound from './NotFound'

export default function CasePage() {
  const { slug } = useParams()
  const item = cases.find((c) => c.slug === slug)
  if (!item) return <NotFound />

  const relacionados = servicos.filter((s) => item.servicos.includes(s.slug))
  const outros = cases.filter((c) => c.slug !== item.slug)

  return (
    <article>
      <Seo titulo={item.titulo} descricao={`${item.cliente}, ${item.cidade}: ${item.destaque.valor} ${item.destaque.legenda}. ${item.resumo}`} imagem={urlFotoCompartilhamento(item.galeria[0]?.foto)} />

      <header className={`relative overflow-hidden text-ameixa ${fundoCor[item.cor]}`}>
        <Rabisco forma="canto" cor="creme" className="absolute -right-2 bottom-6 hidden w-32 animate-flutuar md:block" />
        <div className="container-site grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <nav aria-label="Navegação estrutural" className="text-sm font-semibold">
              <Link to="/trabalhos" className="underline underline-offset-4">Trabalhos</Link> <span aria-hidden="true">/</span> Case
            </nav>
            <p className="mt-6 flex flex-wrap items-center gap-2 text-sm font-semibold uppercase tracking-wider">
              {item.segmento} · {item.cidade}
              {item.ficticio && <SeloExemplo />}
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl">{item.titulo}</h1>
            <p className="mt-5 max-w-[48ch] text-lg font-medium">{item.cliente}</p>
          </div>
          <div data-revelar="girar" className="rounded-card bg-creme p-6 shadow-papel sm:p-8">
            <p className="text-6xl font-bold leading-none tracking-tight text-coral-escuro tabular-nums sm:text-7xl">{item.destaque.valor}</p>
            <p className="mt-3 text-lg font-semibold">{item.destaque.legenda}</p>
          </div>
        </div>
      </header>

      <div className="container-site grid gap-14 py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section aria-labelledby="desafio" data-revelar="esquerda">
          <h2 id="desafio" className="text-3xl sm:text-4xl">
            O desafio
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-grafite">{item.desafio}</p>
        </section>
        <section aria-labelledby="feito" data-revelar="direita">
          <h2 id="feito" className="text-3xl sm:text-4xl">
            O que a gente fez
          </h2>
          <ul className="mt-4 grid gap-3">
            {item.feito.map((f, i) => (
              <li key={f} data-revelar="subir" style={{ '--atraso': `${i * 110}ms` } as CSSProperties} className="flex gap-3 text-lg leading-relaxed">
                <span className="mt-2.5 size-2.5 shrink-0 rounded-full bg-coral" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          {relacionados.length > 0 && (
            <p className="mt-6 text-grafite">
              Serviços:{' '}
              {relacionados.map((s, i) => (
                <span key={s.slug}>
                  {i > 0 && ', '}
                  <Link to={`/servicos/${s.slug}`} className="font-semibold text-coral-escuro underline underline-offset-4">
                    {s.nome}
                  </Link>
                </span>
              ))}
            </p>
          )}
        </section>
      </div>

      <section className="bg-ameixa py-16 text-creme sm:py-20 em-fundo-escuro" aria-labelledby="numeros">
        <div className="container-site">
          <h2 id="numeros" className="text-3xl sm:text-4xl">
            Os números <span className="manuscrito text-[1.2em] text-laranja">depois</span>
          </h2>
          <dl className="mt-10 grid gap-8 sm:grid-cols-3">
            {item.numeros.map((n, i) => (
              <div key={n.legenda} data-revelar="subir" style={{ '--atraso': `${i * 110}ms` } as CSSProperties} className="border-t-4 border-laranja pt-5">
                <dt className="sr-only">{n.legenda}</dt>
                <dd>
                  <Contador valor={n.valor} className="block text-5xl font-bold leading-none tabular-nums sm:text-6xl" />
                  <span className="mt-2 block text-lg text-creme/85">{n.legenda}</span>
                </dd>
              </div>
            ))}
          </dl>
          {item.ficticio && <p className="mt-10 text-sm text-roxo-claro">Case fictício para demonstração: números ilustrativos.</p>}
        </div>
      </section>

      <section className="container-site py-16 sm:py-20" aria-labelledby="galeria">
        <h2 id="galeria" className="text-3xl sm:text-4xl">
          Galeria
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
          {item.galeria.map((g, i) => (
            <li key={g.foto + i} data-revelar="girar" style={{ '--atraso': `${i * 110}ms` } as CSSProperties} className={`bg-creme p-2 pb-8 shadow-papel transition-transform duration-500 hover:rotate-0 hover:scale-[1.03] ${i % 2 ? 'rotate-1' : '-rotate-1'}`}>
              <Foto nome={g.foto} alt={g.alt} sizes="(min-width: 640px) 33vw, 50vw" className="aspect-[4/5] w-full object-cover" />
            </li>
          ))}
        </ul>
      </section>

      {outros.length > 0 && (
        <section className="bg-laranja-claro/40 py-16 sm:py-20" aria-labelledby="outros">
          <div className="container-site">
            <h2 id="outros" className="text-3xl sm:text-4xl">
              Outros cases
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {outros.map((c, i) => (
                <CardResultado key={c.slug} item={c} indice={i} />
              ))}
            </ul>
          </div>
        </section>
      )}

      <ChamadaDiagnostico titulo="Quer um resultado assim?" />
    </article>
  )
}

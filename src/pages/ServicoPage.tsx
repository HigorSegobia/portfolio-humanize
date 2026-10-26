import type { CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import { servicos } from '@/content/servicos'
import { trabalhos } from '@/content/trabalhos'
import { Foto, urlFotoCompartilhamento } from '@/components/Foto'
import { Icone, Rabisco } from '@/components/marca'
import { Botao, fundoCor, fundoCorClaro, textoCorEscuro } from '@/components/ui'
import { GradeTrabalhos } from '@/components/Trabalhos'
import { CardServico, ChamadaDiagnostico } from '@/components/Secoes'
import { Seo } from '@/components/Seo'
import NotFound from './NotFound'

export default function ServicoPage() {
  const { slug } = useParams()
  const servico = servicos.find((s) => s.slug === slug)
  if (!servico) return <NotFound />

  const exemplos = servico.exemplos
    .map((s) => trabalhos.find((t) => t.slug === s))
    .filter((t) => t !== undefined)
  const outros = servicos.filter((s) => s.slug !== servico.slug).slice(0, 3)

  return (
    <>
      <Seo titulo={`${servico.nome} em Ribeirão Preto`} descricao={`${servico.resumo} Agência Humanize, Ribeirão Preto e região.`} imagem={urlFotoCompartilhamento(servico.foto)} />

      <section className={`relative overflow-hidden text-ameixa ${fundoCor[servico.cor]}`} aria-labelledby="titulo-servico">
        <div className="container-site grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <nav aria-label="Navegação estrutural" className="text-sm font-semibold">
              <Link to="/#servicos" className="underline underline-offset-4">Serviços</Link> <span aria-hidden="true">/</span> {servico.nome}
            </nav>
            <span className="mt-6 grid size-16 place-items-center rounded-full bg-creme">
              <Icone nome={servico.icone} className={`size-8 ${textoCorEscuro[servico.cor]}`} />
            </span>
            <h1 id="titulo-servico" className="mt-5 text-5xl sm:text-6xl lg:text-7xl">
              {servico.nome}
            </h1>
            <p className="mt-3 manuscrito text-3xl sm:text-4xl">{servico.chamada}</p>
            <p className="mt-6 max-w-[52ch] text-lg font-medium leading-relaxed">{servico.descricao}</p>
            <Botao href="/#contato" variante="escuro" className="mt-8">
              Quero um diagnóstico
            </Botao>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div data-revelar="girar" className="rotate-2 bg-creme p-2.5 pb-12 shadow-papel transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]">
              <Foto nome={servico.foto} alt={servico.alt} prioridade sizes="(min-width: 1024px) 380px, 90vw" className="aspect-[4/5] w-full object-cover" />
            </div>
            <Rabisco forma="zigue" cor="creme" className="absolute -bottom-6 -left-6 w-24 animate-balanco" />
          </div>
        </div>
      </section>

      <section className="container-site grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]" aria-labelledby="inclui">
        <div>
          <h2 id="inclui" className="text-3xl sm:text-4xl">
            O que está incluso
          </h2>
          <ul className="mt-6 grid gap-3">
            {servico.inclui.map((item, i) => (
              <li key={item} data-revelar="esquerda" style={{ '--atraso': `${i * 110}ms` } as CSSProperties} className="flex gap-3 rounded-card bg-laranja-claro/35 px-5 py-4 text-lg transition-transform hover:translate-x-1.5">
                <svg viewBox="0 0 24 24" className="mt-1 size-5 shrink-0 text-menta-escuro" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5 10 17l9-10" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div data-revelar="direita" className={`self-start rounded-card p-7 ${fundoCorClaro[servico.cor]}`}>
          <h2 className="text-2xl">Para quem é</h2>
          <ul className="mt-4 grid gap-2 text-lg">
            {servico.paraQuem.map((p) => (
              <li key={p} className="flex gap-2">
                <span aria-hidden="true">♥</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {exemplos.length > 0 && (
        <section className="em-fundo-escuro bg-ameixa py-16 text-creme sm:py-20" aria-labelledby="exemplos">
          <div className="container-site">
            <h2 id="exemplos" className="text-3xl sm:text-4xl">
              Exemplos <span className="manuscrito text-[1.2em] text-laranja">de {servico.nome.toLowerCase()}</span>
            </h2>
            <div className="mt-8">
              <GradeTrabalhos trabalhos={exemplos} />
            </div>
          </div>
        </section>
      )}

      <ChamadaDiagnostico titulo={`Faz sentido ${servico.nome.toLowerCase()} para a sua marca?`} />

      <section className="container-site pb-20" aria-labelledby="outros-servicos">
        <h2 id="outros-servicos" className="text-3xl">
          Outros serviços
        </h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {outros.map((s, i) => (
            <CardServico key={s.slug} servico={s} indice={i} />
          ))}
        </ul>
      </section>
    </>
  )
}

import type { CSSProperties } from 'react'
import { equipe, historia, jeitoDeTrabalhar } from '@/content/equipe'
import { site } from '@/content/site'
import { Foto } from '@/components/Foto'
import { Ilustracao, Logo, Rabisco, Selo } from '@/components/marca'
import { TituloSecao } from '@/components/ui'
import { ChamadaDiagnostico, SecaoProcesso } from '@/components/Secoes'
import { Seo } from '@/components/Seo'
import type { Cor } from '@/content/tipos'

const cores: Cor[] = ['coral', 'laranja', 'menta', 'roxo']
const fundo: Record<Cor, string> = {
  coral: 'bg-coral-claro',
  laranja: 'bg-laranja-claro',
  menta: 'bg-menta-claro',
  roxo: 'bg-roxo-claro',
}

export default function Sobre() {
  return (
    <>
      <Seo
        titulo="Sobre"
        descricao="Conheça a Agência Humanize, de Ribeirão Preto, liderada por Julia Ribeiro. Publicidade, marketing e audiovisual que começam pelas pessoas."
      />

      <section className="relative overflow-hidden bg-roxo-claro" aria-labelledby="titulo-pagina">
        <div className="container-site grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <TituloSecao id="titulo-pagina" nivel={1} titulo="Uma agência que sai" manuscrito="do escritório" corManuscrito="text-ameixa" corRabisco="creme" className="!grid-cols-1" />
            <div className="mt-8 grid max-w-[60ch] gap-4 text-lg leading-relaxed">
              {historia.map((p, i) => (
                <p key={p} data-revelar="subir" style={{ '--atraso': `${i * 110}ms` } as CSSProperties}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <div className="mx-auto w-full max-w-[18rem] origin-bottom animate-balanco [animation-duration:6s]">
              <Ilustracao nome="celular" cor="roxo" estilo="creme" className="w-full" />
            </div>
            <span className="absolute -left-4 bottom-4 w-36 -rotate-6">
              <Selo nome="criatividade-sob-medida" className="w-full animate-flutuar" />
            </span>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24" aria-labelledby="titulo-equipe">
        <div className="container-site">
          <TituloSecao id="titulo-equipe" titulo="Julia Ribeiro" manuscrito="e equipe" texto="Gente de Ribeirão Preto que grava, escreve, planeja e mede, sempre perto do cliente." />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {equipe.map((p, i) => (
              <li key={p.nome} data-revelar="girar" style={{ '--atraso': `${i * 110}ms` } as CSSProperties} className="group flex flex-col">
                <div className={`bg-creme p-2 pb-3 shadow-papel transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.03] ${i % 2 ? 'rotate-1' : '-rotate-1'}`}>
                  {p.foto ? (
                    <Foto nome={p.foto} alt={p.alt ?? p.nome} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/5] w-full object-cover" />
                  ) : (
                    <div className={`grid aspect-[4/5] place-items-center ${fundo[cores[i % 4]]}`}>
                      <Logo versao="simbolo" className="size-24 text-creme" label="" />
                    </div>
                  )}
                </div>
                <h3 className="mt-6 text-2xl">{p.nome}</h3>
                <p className="font-semibold text-coral-escuro">{p.cargo}</p>
                <p className="mt-2 leading-relaxed text-grafite">{p.bio}</p>
                {p.instagram && (
                  <a href={`https://www.instagram.com/${p.instagram}/`} target="_blank" rel="noopener noreferrer" className="mt-2 font-semibold underline underline-offset-4">
                    @{p.instagram}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="em-fundo-escuro relative overflow-hidden bg-ameixa py-20 text-creme sm:py-24" aria-labelledby="titulo-jeito">
        <Rabisco forma="diagonal" cor="menta" className="absolute -right-4 top-10 hidden w-40 animate-flutuar md:block" />
        <div className="container-site relative">
          <TituloSecao id="titulo-jeito" titulo="Nosso jeito" manuscrito="de trabalhar" corManuscrito="text-menta" corRabisco="menta" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {jeitoDeTrabalhar.map((j, i) => (
              <li key={j.titulo} data-revelar="zoom" style={{ '--atraso': `${i * 110}ms` } as CSSProperties} className={`rounded-card p-7 text-ameixa transition-[translate,rotate] duration-300 hover:-translate-y-1.5 ${i % 2 ? 'hover:rotate-1' : 'hover:-rotate-1'} ${fundo[cores[i % 4]]}`}>
                <h3 className="text-2xl">{j.titulo}</h3>
                <p className="mt-2 text-lg leading-relaxed">{j.texto}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[50ch] text-lg text-creme/90">
            Atendemos {site.endereco.regiao}: {site.endereco.areasAtendidas.join(', ')}.
          </p>
        </div>
      </section>

      <SecaoProcesso />
      <ChamadaDiagnostico />
    </>
  )
}

import { home } from '@/content/site'
import { trabalhos } from '@/content/trabalhos'
import { Hero } from '@/components/Hero'
import { FaixaClientes } from '@/components/animacoes'
import { GradeTrabalhos } from '@/components/Trabalhos'
import { Rabisco } from '@/components/marca'
import { Botao, TituloSecao } from '@/components/ui'
import { Seo } from '@/components/Seo'
import {
  SecaoContato,
  SecaoDepoimentos,
  SecaoProcesso,
  SecaoQuemSomos,
  SecaoResultados,
  SecaoServicos,
} from '@/components/Secoes'

export default function Home() {
  const t = home.trabalhos
  return (
    <>
      <Seo />
      <Hero />
      <FaixaClientes />

      <section id="trabalhos" className="em-fundo-escuro relative overflow-hidden bg-ameixa py-20 text-creme sm:py-28" aria-labelledby="titulo-trabalhos">
        <Rabisco forma="linha-ondulada" cor="laranja" className="absolute right-0 top-10 hidden w-64 animate-flutuar lg:block" />
        <div className="container-site relative">
          <TituloSecao
            id="titulo-trabalhos"
            titulo={t.titulo}
            manuscrito={t.tituloManuscrito}
            texto={t.texto}
            corManuscrito="text-laranja"
            corRabisco="laranja"
          />
          <div className="mt-12">
            <GradeTrabalhos trabalhos={trabalhos.slice(0, 6)} />
          </div>
          <div data-revelar="subir" className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Botao href="/trabalhos" variante="primario">
              Ver todos os trabalhos
            </Botao>
          </div>
        </div>
      </section>

      <SecaoServicos />
      <SecaoResultados />
      <SecaoQuemSomos />
      <SecaoProcesso />
      <SecaoDepoimentos />
      <SecaoContato />
    </>
  )
}

import padrao from '@/assets/brand/pattern-2.webp'
import { Ilustracao, Sublinhado } from '@/components/marca'
import { Botao } from '@/components/ui'
import { Seo } from '@/components/Seo'
import { linkWhatsapp } from '@/lib/whatsapp'

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-coral" aria-labelledby="titulo-404">
      <Seo titulo="Página não encontrada" semIndice />
      <div
        className="absolute inset-0 bg-[length:520px] bg-repeat opacity-25"
        style={{ backgroundImage: `url(${padrao})` }}
        aria-hidden="true"
      />
      <div className="container-site relative grid min-h-[70vh] items-center gap-10 py-16 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="rounded-bloco bg-creme p-8 shadow-papel sm:p-12">
          <p className="text-7xl font-bold leading-none text-coral-escuro sm:text-8xl">404</p>
          <h1 id="titulo-404" className="mt-4 text-4xl sm:text-5xl">
            Essa página saiu
            <span className="relative mt-1 block w-fit -rotate-2 pb-2 manuscrito text-[1.15em] text-roxo-escuro">
              do roteiro.
              <Sublinhado cor="roxo" className="-bottom-1" />
            </span>
          </h1>
          <p className="mt-5 max-w-[42ch] text-lg text-grafite">
            O link pode estar errado ou o conteúdo mudou de lugar. Mas a gente continua aqui, pronta para conversar.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Botao href="/" variante="escuro">
              Voltar para o início
            </Botao>
            <Botao href={linkWhatsapp()} variante="contorno">
              Falar no WhatsApp
            </Botao>
          </div>
        </div>
        <Ilustracao nome="maleta" cor="laranja" estilo="creme" className="mx-auto hidden w-full max-w-[16rem] md:block" />
      </div>
    </section>
  )
}

import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { home, processo, site } from '@/content/site'
import { servicos } from '@/content/servicos'
import { cases } from '@/content/cases'
import { depoimentos } from '@/content/depoimentos'
import type { Case, Cor, Servico } from '@/content/tipos'
import { linkWhatsapp } from '@/lib/whatsapp'
import { registrarLead } from '@/lib/analytics'
import { Foto } from './Foto'
import { Icone, Ilustracao, Logo, Rabisco, Selo, Sublinhado } from './marca'
import { Botao, fundoCorClaro, SeloExemplo, TituloSecao, textoCorEscuro } from './ui'
import { FormularioDiagnostico } from './FormularioDiagnostico'
import { IconeWhatsapp } from './Layout'
import { Contador } from './animacoes'

const atraso = (i: number, passo = 90) => ({ '--atraso': `${i * passo}ms` }) as CSSProperties

export function CardServico({ servico, indice = 0 }: { servico: Servico; indice?: number }) {
  return (
    <li data-revelar="zoom" style={atraso(indice % 3)}>
      <Link
        to={`/servicos/${servico.slug}`}
        className={`group flex h-full flex-col gap-4 rounded-card p-6 text-ameixa transition-[translate,rotate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-card sm:p-7 ${indice % 2 ? 'hover:rotate-1' : 'hover:-rotate-1'} ${fundoCorClaro[servico.cor]}`}
      >
        <span className="grid size-14 place-items-center rounded-full bg-creme transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
          <Icone nome={servico.icone} className={`size-7 ${textoCorEscuro[servico.cor]}`} />
        </span>
        <h3 className="text-2xl">{servico.nome}</h3>
        <p className="flex-1 leading-relaxed">{servico.resumo}</p>
        <span className="inline-flex items-center gap-1 font-semibold underline decoration-2 underline-offset-4 group-hover:no-underline">
          Saiba mais <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1.5">→</span>
          <span className="sr-only">sobre {servico.nome}</span>
        </span>
      </Link>
    </li>
  )
}

export function SecaoServicos() {
  const t = home.servicos
  return (
    <section id="servicos" className="py-20 sm:py-28" aria-labelledby="titulo-servicos">
      <div className="container-site">
        <TituloSecao id="titulo-servicos" titulo={t.titulo} manuscrito={t.tituloManuscrito} texto={t.texto} corRabisco="laranja" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {servicos.map((s, i) => (
            <CardServico key={s.slug} servico={s} indice={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export function CardResultado({ item, indice = 0 }: { item: Case; indice?: number }) {
  return (
    <li
      data-revelar="girar"
      style={atraso(indice, 120)}
      className="relative flex flex-col gap-4 rounded-card bg-creme p-6 text-ameixa shadow-card transition-[translate,rotate] duration-300 hover:-translate-y-1.5 hover:rotate-1 sm:p-7"
    >
      {item.ficticio && <SeloExemplo className="absolute right-5 top-5" />}
      <Contador valor={item.destaque.valor} className="text-[3.5rem] font-bold leading-none tracking-tight text-coral-escuro tabular-nums sm:text-6xl" />
      <p className="text-lg font-semibold leading-snug">{item.destaque.legenda}</p>
      <p className="text-sm text-grafite">
        {item.cliente} · {item.cidade}
      </p>
      <p className="flex-1 leading-relaxed text-grafite">{item.resumo}</p>
      <ul className="flex flex-wrap gap-2">
        {item.numeros.slice(1).map((n) => (
          <li key={n.legenda} className="rounded-full bg-laranja-claro px-3 py-1 text-sm font-semibold">
            {n.valor} {n.legenda}
          </li>
        ))}
      </ul>
      <Link to={`/cases/${item.slug}`} className="font-semibold text-coral-escuro underline decoration-2 underline-offset-4 hover:no-underline">
        Ver o case completo <span aria-hidden="true">→</span>
      </Link>
    </li>
  )
}

export function SecaoResultados() {
  const t = home.resultados
  const temFicticio = cases.some((c) => c.ficticio)
  return (
    <section id="resultados" className="relative overflow-hidden bg-coral py-20 text-ameixa sm:py-28" aria-labelledby="titulo-resultados">
      <Rabisco forma="arco" cor="creme" className="absolute -right-2 top-16 hidden h-48 w-auto animate-balanco lg:block" />
      <div className="container-site relative">
        <TituloSecao
          id="titulo-resultados"
          titulo={t.titulo}
          manuscrito={t.tituloManuscrito}
          texto={t.texto}
          corManuscrito="text-ameixa"
          corRabisco="creme"
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-5">
          {cases.map((c, i) => (
            <CardResultado key={c.slug} item={c} indice={i} />
          ))}
        </ul>
        {temFicticio && (
          <p className="mt-6 text-sm font-medium">
            Os cases marcados com “exemplo” são fictícios e serão substituídos pelos resultados reais de clientes da Humanize.
          </p>
        )}
      </div>
    </section>
  )
}

export function SecaoQuemSomos() {
  const t = home.quemSomos
  return (
    <section id="quem-somos" className="py-20 sm:py-28" aria-labelledby="titulo-quem">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="relative mx-auto grid w-full max-w-md grid-cols-2 items-start gap-4">
          {t.fotos.map((f, i) => (
            <div
              key={f.foto}
              data-revelar="girar"
              style={atraso(i, 200)}
              className={`bg-creme p-2 shadow-papel transition-transform duration-500 hover:rotate-0 hover:scale-[1.03] ${i === 0 ? '-rotate-3' : 'mt-14 rotate-2'}`}
            >
              <Foto nome={f.foto} alt={f.alt} sizes="(min-width: 1024px) 220px, 45vw" className="aspect-[3/4] w-full object-cover" />
            </div>
          ))}
          <span className="absolute -top-6 left-[20%] rotate-12 text-roxo">
            <Logo versao="simbolo" className="block size-12 animate-batida" label="" />
          </span>
          <span className="absolute -bottom-8 -left-3 w-28 -rotate-12">
            <Selo nome="made-in-humanize" className="w-full animate-flutuar" />
          </span>
        </div>
        <div>
          <h2 id="titulo-quem" data-revelar="subir" className="text-[2.5rem] sm:text-5xl lg:text-[3.75rem]">
            {t.titulo}
            <span className="relative mt-1 block w-fit -rotate-2 pb-2 manuscrito text-[1.15em] text-roxo-escuro">
              {t.tituloManuscrito}
              <Sublinhado cor="roxo" className="-bottom-1" />
            </span>
          </h2>
          {t.paragrafos.map((p, i) => (
            <p key={p} data-revelar="subir" style={atraso(i + 1, 120)} className="mt-5 max-w-[52ch] text-lg leading-relaxed text-grafite">
              {p}
            </p>
          ))}
          <p data-revelar="esquerda" style={atraso(4, 120)} className="mt-6 w-fit -rotate-2 manuscrito text-4xl text-coral-escuro">
            {t.assinatura}
          </p>
          <Botao href="/sobre" variante="contorno" className="mt-8">
            Conhecer a Humanize
          </Botao>
        </div>
      </div>
    </section>
  )
}

const coresEtapas: Cor[] = ['coral', 'laranja', 'menta', 'roxo']
const bordaEtapa: Record<Cor, string> = {
  coral: 'border-coral',
  laranja: 'border-laranja',
  menta: 'border-menta',
  roxo: 'border-roxo',
}

export function SecaoProcesso() {
  return (
    <section id="como-funciona" className="bg-laranja-claro/40 py-20 sm:py-28" aria-labelledby="titulo-processo">
      <div className="container-site">
        <TituloSecao
          id="titulo-processo"
          titulo="Como funciona"
          manuscrito="em 4 etapas"
          texto="Um processo simples, para você saber o que esperar em cada etapa."
          corManuscrito="text-roxo-escuro"
          corRabisco="roxo"
        />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {processo.map((p, i) => {
            const cor = coresEtapas[i % coresEtapas.length]
            return (
              <li key={p.titulo} data-revelar="subir" style={atraso(i, 140)} className="group relative flex flex-col gap-3 pt-6">
                <span
                  aria-hidden="true"
                  data-revelar="desenhar"
                  style={atraso(i, 140)}
                  className={`absolute inset-x-0 top-0 border-t-4 ${bordaEtapa[cor]}`}
                />
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-bold leading-none tabular-nums text-ameixa/90" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Icone nome={p.icone} className={`size-10 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-125 ${textoCorEscuro[cor]}`} />
                </div>
                <h3 className="text-2xl">
                  <span className="sr-only">Etapa {i + 1}: </span>
                  {p.titulo}
                </h3>
                <p className="leading-relaxed text-grafite">{p.texto}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

/** Só aparece quando houver depoimentos em src/content/depoimentos.ts */
export function SecaoDepoimentos() {
  if (depoimentos.length === 0) return null
  const t = home.depoimentos
  return (
    <section id="depoimentos" className="py-20 sm:py-28" aria-labelledby="titulo-depoimentos">
      <div className="container-site">
        <TituloSecao id="titulo-depoimentos" titulo={t.titulo} manuscrito={t.tituloManuscrito} corRabisco="menta" corManuscrito="text-menta-escuro" />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {depoimentos.map((d, i) => (
            <li key={d.nome + d.empresa} data-revelar="zoom" style={atraso(i % 3)}>
              <figure className="flex h-full flex-col gap-5 rounded-card bg-menta-claro p-7">
                <blockquote className="flex-1 text-lg leading-relaxed">“{d.texto}”</blockquote>
                <figcaption className="flex items-center gap-3">
                  {d.foto && <Foto nome={d.foto} alt="" sizes="48px" className="size-12 rounded-full object-cover" />}
                  <span>
                    <strong className="block">{d.nome}</strong>
                    <span className="text-sm">
                      {d.cargo}, {d.empresa}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function SecaoContato() {
  const t = home.contato
  return (
    <section id="contato" className="relative overflow-hidden bg-laranja py-20 text-ameixa sm:py-28" aria-labelledby="titulo-contato">
      <div className="container-site relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="relative">
          <h2 id="titulo-contato" data-revelar="esquerda" className="text-5xl sm:text-6xl lg:text-7xl">
            {t.titulo}
          </h2>
          <p data-revelar="esquerda" style={atraso(1, 120)} className="mt-5 max-w-[40ch] text-lg font-medium leading-relaxed sm:text-xl">
            {t.texto}
          </p>
          <dl data-revelar="esquerda" style={atraso(2, 120)} className="mt-8 grid gap-3 text-lg">
            <div className="flex flex-wrap items-baseline gap-x-4">
              <dt className="w-24 text-sm font-semibold uppercase tracking-wider">WhatsApp</dt>
              <dd>
                <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-2 underline-offset-4" onClick={() => registrarLead('contato-direto')}>
                  {site.contato.whatsappExibicao}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-4">
              <dt className="w-24 text-sm font-semibold uppercase tracking-wider">Instagram</dt>
              <dd>
                <a href={site.contato.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-2 underline-offset-4">
                  @{site.contato.instagram}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-4">
              <dt className="w-24 text-sm font-semibold uppercase tracking-wider">Onde</dt>
              <dd className="font-semibold">{site.endereco.regiao}</dd>
            </div>
          </dl>
          <div className="mt-10 hidden w-56 origin-bottom animate-balanco [animation-duration:5s] lg:block">
            <Ilustracao nome="megafone" cor="coral" estilo="creme" className="w-full" />
          </div>
        </div>
        <div data-revelar="direita" style={atraso(1, 150)} className="self-start">
          <FormularioDiagnostico />
        </div>
      </div>
    </section>
  )
}

/** Faixa de chamada para o diagnóstico (páginas internas). */
export function ChamadaDiagnostico({ titulo = 'Vamos olhar para a sua marca?', texto }: { titulo?: string; texto?: string }) {
  return (
    <section className="container-site py-16 sm:py-20" aria-label="Pedir diagnóstico">
      <div data-revelar="zoom" className="relative overflow-hidden rounded-bloco bg-ameixa px-6 py-12 text-creme sm:px-12 sm:py-16 em-fundo-escuro">
        <Rabisco forma="zigue" cor="laranja" className="absolute -right-4 -top-4 w-28 animate-balanco sm:w-36" />
        <span className="absolute -bottom-10 right-10 hidden text-coral/30 md:block" aria-hidden="true">
          <Logo versao="simbolo" className="block size-48 animate-girar-lento" label="" />
        </span>
        <div className="relative max-w-2xl">
          <h2 className="text-4xl sm:text-5xl">{titulo}</h2>
          <p className="mt-4 text-lg text-creme/90">
            {texto ?? 'Em até 3 dias úteis a gente devolve um diagnóstico gratuito das suas redes, do Google e dos anúncios, com as oportunidades que encontramos.'}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Botao href="/#contato" variante="primario">
              Quero um diagnóstico gratuito
            </Botao>
            <a
              href={linkWhatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => registrarLead('chamada-diagnostico')}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-creme px-6 py-3 font-semibold transition-[background-color,color,translate,scale] hover:-translate-y-0.5 hover:bg-creme hover:text-ameixa active:scale-95"
            >
              <IconeWhatsapp className="size-5" />
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

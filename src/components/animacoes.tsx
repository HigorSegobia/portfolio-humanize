import { Fragment, useEffect, useRef } from 'react'
import { clientes } from '@/content/site'
import { servicos } from '@/content/servicos'
import { Logo } from './marca'

const escapar = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

/**
 * Número que conta de 0 até o valor quando aparece na tela ("+212%", "1,8 mi", "R$ 41").
 * O HTML já sai com o valor final; textos com mais de um número ("4,1 → 4,9") ficam parados.
 */
export function Contador({ valor, className = '' }: { valor: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    const partes = valor.match(/^(\D*)(\d+(?:,\d+)?)(\D*)$/)
    if (!el || !partes || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) return // já está na tela: não volta para zero

    const [, antes, numero, depois] = partes
    const casas = numero.includes(',') ? numero.split(',')[1].length : 0
    const alvo = Number(numero.replace(',', '.'))
    const formatar = (v: number) =>
      antes + v.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas }) + depois

    el.textContent = formatar(0)
    let quadro = 0
    const io = new IntersectionObserver(
      ([item]) => {
        if (!item.isIntersecting) return
        io.disconnect()
        const inicio = performance.now()
        const passo = (agora: number) => {
          const p = Math.min(1, (agora - inicio) / 1400)
          el.textContent = formatar(alvo * (1 - Math.pow(1 - p, 3)))
          if (p < 1) quadro = requestAnimationFrame(passo)
        }
        quadro = requestAnimationFrame(passo)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(quadro)
      el.textContent = valor
    }
  }, [valor])

  return (
    <span className={className}>
      <span className="sr-only">{valor}</span>
      <span ref={ref} aria-hidden="true" dangerouslySetInnerHTML={{ __html: escapar(valor) }} />
    </span>
  )
}

function Fita({ itens, classe, animacao, rotacao }: { itens: string[]; classe: string; animacao: string; rotacao: string }) {
  const lista = (oculto: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={oculto || undefined}>
      {itens.map((item) => (
        <Fragment key={item}>
          <li className="whitespace-nowrap px-5 text-2xl font-bold tracking-tight sm:px-7 sm:text-3xl">{item}</li>
          <li aria-hidden="true" className="shrink-0">
            <Logo versao="simbolo" className="size-6 sm:size-7" label="" />
          </li>
        </Fragment>
      ))}
    </ul>
  )
  return (
    <div className={`relative -mx-4 overflow-hidden py-3 shadow-card sm:py-4 ${classe} ${rotacao}`}>
      <div className={`flex w-max hover:[animation-play-state:paused] ${animacao}`}>
        {lista(false)}
        {lista(true)}
      </div>
    </div>
  )
}

/** Duas fitas cruzadas em movimento: clientes reais e serviços. */
export function FaixaClientes() {
  return (
    <section
      aria-label="Clientes que confiam na Humanize"
      className="relative overflow-hidden bg-linear-to-b from-laranja from-50% to-ameixa to-50% py-6 sm:py-8"
    >
      <h2 className="sr-only">Clientes que confiam na Humanize</h2>
      <Fita itens={clientes} classe="z-10 bg-coral text-ameixa [&_svg]:text-creme" animacao="animate-faixa" rotacao="-rotate-2" />
      <Fita
        itens={servicos.map((s) => s.nome)}
        classe="-mt-2 bg-menta text-ameixa [&_svg]:text-roxo-escuro sm:-mt-3"
        animacao="animate-faixa-reversa"
        rotacao="rotate-1"
      />
    </section>
  )
}

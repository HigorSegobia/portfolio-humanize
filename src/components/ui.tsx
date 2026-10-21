import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Cor } from '@/content/tipos'
import { Sublinhado } from './marca'

type Variante = 'primario' | 'escuro' | 'claro' | 'contorno'

const variantes: Record<Variante, string> = {
  primario: 'bg-coral text-ameixa hover:bg-coral-claro',
  escuro: 'bg-ameixa text-creme hover:bg-roxo-escuro',
  claro: 'bg-creme text-ameixa hover:bg-laranja-claro',
  contorno: 'border-2 border-current bg-transparent hover:bg-ameixa hover:text-creme hover:border-ameixa',
}

export function classesBotao(variante: Variante = 'primario', extra = '') {
  return `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold leading-tight transition-[background-color,color,border-color,translate,scale,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-card active:translate-y-0 active:scale-95 ${variantes[variante]} ${extra}`
}

/** Botão/link no estilo da marca. Links externos (http, wa.me) abrem em nova aba. */
export function Botao({
  href,
  children,
  variante = 'primario',
  className = '',
  onClick,
}: {
  href: string
  children: ReactNode
  variante?: Variante
  className?: string
  onClick?: () => void
}) {
  const cls = classesBotao(variante, className)
  if (/^https?:/.test(href)) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <Link to={href} className={cls} onClick={onClick}>
      {children}
    </Link>
  )
}

/** Selo discreto para conteúdo fictício. */
export function SeloExemplo({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-ameixa/85 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-creme ${className}`}
      title="Conteúdo fictício para demonstração"
    >
      exemplo
    </span>
  )
}

const corRabisco: Record<string, Cor | 'creme'> = {
  coral: 'coral',
  laranja: 'laranja',
  menta: 'menta',
  roxo: 'roxo',
  creme: 'creme',
}

/**
 * Título de seção: parte em Author Bold + parte manuscrita (Caveat) com rabisco da marca.
 */
export function TituloSecao({
  titulo,
  manuscrito,
  texto,
  corManuscrito = 'text-coral-escuro',
  corRabisco: rabisco = 'coral',
  nivel = 2,
  className = '',
  id,
}: {
  titulo: string
  manuscrito?: string
  texto?: ReactNode
  corManuscrito?: string
  corRabisco?: keyof typeof corRabisco
  nivel?: 1 | 2
  className?: string
  id?: string
}) {
  const Tag = nivel === 1 ? 'h1' : 'h2'
  return (
    <div className={`grid gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-end md:gap-10 ${className}`}>
      <Tag id={id} data-revelar="subir" className="text-[2.5rem] sm:text-5xl lg:text-[4rem]">
        {titulo}
        {manuscrito && (
          <span className={`relative mt-1 block w-fit -rotate-2 pb-2 manuscrito text-[1.15em] ${corManuscrito}`}>
            {manuscrito}
            <Sublinhado cor={corRabisco[rabisco]} className="-bottom-1" />
          </span>
        )}
      </Tag>
      {texto && (
        <div data-revelar="subir" style={{ '--atraso': '150ms' } as CSSProperties} className="max-w-[46ch] text-lg leading-relaxed opacity-90">
          {texto}
        </div>
      )}
    </div>
  )
}

export const fundoCor: Record<Cor, string> = {
  coral: 'bg-coral',
  laranja: 'bg-laranja',
  menta: 'bg-menta',
  roxo: 'bg-roxo-claro',
}

export const fundoCorClaro: Record<Cor, string> = {
  coral: 'bg-coral-claro',
  laranja: 'bg-laranja-claro',
  menta: 'bg-menta-claro',
  roxo: 'bg-roxo-claro',
}

export const textoCor: Record<Cor, string> = {
  coral: 'text-coral',
  laranja: 'text-laranja',
  menta: 'text-menta',
  roxo: 'text-roxo',
}

export const textoCorEscuro: Record<Cor, string> = {
  coral: 'text-coral-escuro',
  laranja: 'text-caramelo',
  menta: 'text-menta-escuro',
  roxo: 'text-roxo-escuro',
}

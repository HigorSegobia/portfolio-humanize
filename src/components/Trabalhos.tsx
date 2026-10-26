import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import type { Cor, IconeMarca, Trabalho } from '@/content/tipos'
import { categorias } from '@/content/site'
import { Foto, temFoto, urlFoto } from './Foto'
import { Icone, Logo, Rabisco } from './marca'
import { classesBotao, fundoCor, SeloExemplo } from './ui'
import { caminho } from '@/lib/base'

const iconeCategoria: Partial<Record<Trabalho['categoria'], IconeMarca>> = {
  moda: 'brilho',
  odontologia: 'coracao',
  gastronomia: 'lampada',
  farmacia: 'alvo',
  eventos: 'notificacao',
  storymaker: 'foto',
  'social-media': 'coracao',
  fitness: 'alvo',
  agro: 'lampada',
  audiovisual: 'video',
  saude: 'coracao',
  automotivo: 'alvo',
  pet: 'coracao',
  atelie: 'brilho',
  varejo: 'notificacao',
}
const rabiscoCapa: Record<Cor, Cor | 'creme'> = { coral: 'creme', laranja: 'coral', menta: 'roxo', roxo: 'creme' }

/** Endereço do embed oficial do Instagram para um reel ou post. */
export function embedInstagram(url: string) {
  const achou = url.match(/instagram\.com\/(reel|reels|p|tv)\/([\w-]+)/)
  if (!achou) return null
  const tipo = achou[1] === 'reels' ? 'reel' : achou[1]
  return `https://www.instagram.com/${tipo}/${achou[2]}/embed/`
}

/** Capa nas cores da marca, para trabalhos ainda sem foto. */
function CapaMarca({ trabalho, indice }: { trabalho: Trabalho; indice: number }) {
  const cor = trabalho.cor ?? (['coral', 'laranja', 'menta', 'roxo'] as Cor[])[indice % 4]
  const icone = iconeCategoria[trabalho.categoria] ?? 'video'
  return (
    <span className={`absolute inset-0 overflow-hidden text-ameixa ${fundoCor[cor]}`} aria-hidden="true">
      <Icone
        nome={icone}
        className="absolute -right-6 -top-4 size-36 rotate-12 opacity-25 transition-transform duration-700 group-hover:rotate-[30deg] group-hover:scale-110 sm:size-44"
      />
      <Rabisco
        forma={indice % 2 ? 'zigue' : 'arco'}
        cor={rabiscoCapa[cor]}
        className="absolute -left-2 bottom-1/3 h-16 w-auto opacity-80 transition-transform duration-700 group-hover:translate-x-2 group-hover:-rotate-6"
      />
      <Logo versao="simbolo" className="absolute bottom-4 right-4 size-8 text-creme/90" label="" />
    </span>
  )
}

function CardTrabalho({
  trabalho,
  indice,
  onAbrir,
  prioridade,
}: {
  trabalho: Trabalho
  indice: number
  onAbrir: (el: HTMLButtonElement) => void
  prioridade?: boolean
}) {
  const comFoto = temFoto(trabalho.foto)
  const tipo = trabalho.formato === 'post' ? 'post' : 'reel'
  return (
    <li data-revelar="subir" style={{ '--atraso': `${(indice % 3) * 90}ms` } as CSSProperties}>
      <button
        type="button"
        onClick={(e) => onAbrir(e.currentTarget)}
        aria-haspopup="dialog"
        className={`group relative block aspect-[4/5] w-full overflow-hidden rounded-card text-left shadow-card transition-transform duration-300 ease-out hover:-translate-y-1.5 active:scale-[0.98] ${
          indice % 2 ? 'hover:rotate-1' : 'hover:-rotate-1'
        } ${comFoto ? 'bg-ameixa text-creme' : 'text-ameixa'}`}
      >
        {comFoto ? (
          <>
            <Foto
              nome={trabalho.foto!}
              alt=""
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 33vw, 50vw"
              prioridade={prioridade}
              className="absolute inset-0 size-full object-cover object-[50%_35%] transition-transform duration-700 group-hover:scale-[1.06]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ameixa/90 via-ameixa/20 to-transparent" aria-hidden="true" />
          </>
        ) : (
          <CapaMarca trabalho={trabalho} indice={indice} />
        )}

        <span className="absolute left-3 right-14 top-3 flex flex-wrap items-start gap-1.5">
          <span className="rounded-full bg-creme px-2.5 py-0.5 text-xs font-semibold text-ameixa">{categorias[trabalho.categoria]}</span>
          {trabalho.ficticio && <SeloExemplo />}
        </span>

        {/* botão de play com pulso */}
        <span
          className={`absolute left-1/2 top-[42%] grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full shadow-papel transition-transform duration-300 group-hover:scale-110 sm:size-16 ${
            comFoto ? 'bg-creme text-ameixa' : 'bg-ameixa text-creme'
          }`}
        >
          <span className={`absolute inset-0 animate-pulso rounded-full ${comFoto ? 'bg-creme/50' : 'bg-ameixa/40'}`} aria-hidden="true" />
          <svg viewBox="0 0 24 24" className="relative ml-0.5 size-6 sm:size-7" fill="currentColor" aria-hidden="true">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.87l11-6.5a1 1 0 0 0 0-1.74l-11-6.5A1 1 0 0 0 8 5.5Z" />
          </svg>
        </span>

        <span className="absolute inset-x-3 bottom-3 grid gap-0.5 sm:inset-x-4 sm:bottom-4">
          <span className="manuscrito text-lg leading-none sm:text-xl">{tipo === 'post' ? 'post' : 'reel'}</span>
          <span className="text-xl font-bold leading-tight sm:text-2xl">{trabalho.titulo}</span>
          {trabalho.cliente !== categorias[trabalho.categoria] && (
            <span className={`text-sm leading-snug ${comFoto ? 'text-creme/85' : 'text-ameixa'}`}>{trabalho.cliente}</span>
          )}
          <span className="sr-only">, abrir {tipo === 'post' ? 'post' : 'vídeo'}</span>
        </span>
      </button>
    </li>
  )
}

/** Reel/post do Instagram dentro do site, carregado só quando o modal abre. */
function EmbedInstagram({ trabalho, url }: { trabalho: Trabalho; url: string }) {
  const [carregado, setCarregado] = useState(false)
  const [altura, setAltura] = useState<number | null>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const embed = embedInstagram(url)

  // O Instagram avisa a altura do conteúdo ({"type":"MEASURE","details":{"height":...}}):
  // assim o iframe fica do tamanho exato, sem barra de rolagem interna.
  useEffect(() => {
    function mensagem(e: MessageEvent) {
      if (e.origin !== 'https://www.instagram.com' || e.source !== iframeRef.current?.contentWindow) return
      try {
        const dados = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
        if (dados?.type === 'MEASURE' && dados.details?.height > 0) setAltura(Math.ceil(dados.details.height))
      } catch {
        // mensagem que não é do embed: ignora
      }
    }
    window.addEventListener('message', mensagem)
    return () => window.removeEventListener('message', mensagem)
  }, [])

  if (!embed) return null
  // Até a medida chegar, uma estimativa: mídia vertical + cabeçalho e rodapé do embed
  const estimativa = 'calc((min(28rem, 100vw) - 1.5rem) * 1.25 + 220px)'
  return (
    <div className="relative mx-3 overflow-hidden rounded-card bg-creme">
      {!carregado && (
        <div className="absolute inset-0 grid place-items-center overflow-hidden" aria-hidden="true">
          {/* enquanto o Instagram carrega, mostra a capa do reel desfocada */}
          {temFoto(trabalho.foto) && (
            <Foto nome={trabalho.foto!} alt="" sizes="448px" className="absolute inset-0 size-full scale-110 object-cover opacity-60 blur-md" />
          )}
          <Logo versao="simbolo" className="relative size-14 animate-batida text-coral" label="" />
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={embed}
        title={`${trabalho.formato === 'post' ? 'Post' : 'Reel'} de ${trabalho.titulo} no Instagram`}
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
        allowFullScreen
        onLoad={() => setCarregado(true)}
        className={`relative block w-full border-0 transition-opacity duration-500 ${carregado ? 'opacity-100' : 'opacity-0'}`}
        scrolling="no"
        style={{ height: altura ?? estimativa }}
      />
    </div>
  )
}

/** Modal acessível: foco preso, Esc fecha, devolve o foco ao card. */
function ModalVideo({ trabalho, onFechar }: { trabalho: Trabalho; onFechar: () => void }) {
  const tituloId = useId()
  const caixaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const caixa = caixaRef.current
    caixa?.querySelector<HTMLElement>('[data-foco-inicial]')?.focus()
    const anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function teclado(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onFechar()
        return
      }
      if (e.key !== 'Tab' || !caixa) return
      const focaveis = [...caixa.querySelectorAll<HTMLElement>('a[href], button, iframe, video[controls], [tabindex]:not([tabindex="-1"])')]
      if (!focaveis.length) return
      const primeiro = focaveis[0]
      const ultimo = focaveis[focaveis.length - 1]
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primeiro.focus()
      }
    }
    document.addEventListener('keydown', teclado)
    return () => {
      document.removeEventListener('keydown', teclado)
      document.body.style.overflow = anterior
    }
  }, [onFechar])

  const { midia } = trabalho
  return (
    <m.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ameixa/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => e.target === e.currentTarget && onFechar()}
    >
      <m.div
        ref={caixaRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        className="relative flex max-h-[100dvh] w-full max-w-[28rem] flex-col overflow-y-auto overscroll-contain rounded-t-bloco bg-creme text-ameixa shadow-papel sm:max-h-[94dvh] sm:rounded-bloco"
        initial={{ y: 60, opacity: 0, scale: 0.96, rotate: -1.5 }}
        animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
        exit={{ y: 30, opacity: 0, scale: 0.98, transition: { duration: 0.18 } }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-creme px-5 pb-3 pt-4">
          <div className="min-w-0">
            <h2 id={tituloId} className="truncate text-xl">
              {trabalho.titulo}
            </h2>
            <p className="truncate text-sm text-grafite">
              {trabalho.cliente}
              {trabalho.ficticio && <SeloExemplo className="ml-2 align-middle" />}
            </p>
          </div>
          <button
            type="button"
            onClick={onFechar}
            data-foco-inicial
            className="grid size-11 shrink-0 place-items-center rounded-full bg-ameixa text-creme transition-transform hover:rotate-90 hover:bg-roxo-escuro"
            aria-label="Fechar"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {midia.tipo === 'video' ? (
          <div className="relative mx-3 aspect-[9/16] max-h-[70dvh] overflow-hidden rounded-card bg-ameixa">
            <video className="size-full object-cover" src={midia.src.startsWith('/') ? caminho(midia.src) : midia.src} poster={urlFoto(midia.poster)} controls playsInline autoPlay preload="none">
              <track kind="captions" />
            </video>
          </div>
        ) : (
          <EmbedInstagram trabalho={trabalho} url={midia.url} />
        )}

        <div className="flex flex-col gap-2 p-5 sm:flex-row">
          {midia.tipo === 'instagram' && (
            <a href={midia.url} target="_blank" rel="noopener noreferrer" className={classesBotao('contorno', 'flex-1')}>
              <Icone nome="foto" className="size-5" />
              Abrir no Instagram
            </a>
          )}
          {trabalho.caseSlug && (
            <Link to={`/cases/${trabalho.caseSlug}`} className={classesBotao('primario', 'flex-1')}>
              Ver o case
            </Link>
          )}
          <Link to="/#contato" onClick={onFechar} className={classesBotao('primario', 'flex-1')}>
            Quero um assim
          </Link>
        </div>
      </m.div>
    </m.div>
  )
}

export function GradeTrabalhos({ trabalhos, prioridade = 0 }: { trabalhos: Trabalho[]; prioridade?: number }) {
  const [aberto, setAberto] = useState<Trabalho | null>(null)
  const origemRef = useRef<HTMLButtonElement | null>(null)

  const fechar = useCallback(() => {
    setAberto(null)
    origemRef.current?.focus()
  }, [])

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5">
        {trabalhos.map((t, i) => (
          <CardTrabalho
            key={t.slug}
            trabalho={t}
            indice={i}
            prioridade={i < prioridade}
            onAbrir={(el) => {
              origemRef.current = el
              setAberto(t)
            }}
          />
        ))}
      </ul>
      <AnimatePresence>{aberto && <ModalVideo key={aberto.slug} trabalho={aberto} onFechar={fechar} />}</AnimatePresence>
    </>
  )
}

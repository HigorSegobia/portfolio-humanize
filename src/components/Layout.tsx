import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { domAnimation, LazyMotion, m, MotionConfig } from 'framer-motion'
import { site } from '@/content/site'
import { servicos } from '@/content/servicos'
import { enderecoCompleto, linkMapa, linkTelefone, linkWhatsapp } from '@/lib/whatsapp'
import { iniciarAnalytics, registrarLead, registrarPagina } from '@/lib/analytics'
import { Logo, Rabisco } from './marca'
import { classesBotao } from './ui'
import { SchemaLocalBusiness } from './Seo'

function GerenciarRolagem() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // espera a página renderizar antes de rolar até a âncora
      const id = decodeURIComponent(hash.slice(1))
      const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 50)
      return () => window.clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  useEffect(() => {
    iniciarAnalytics()
  }, [])
  useEffect(() => {
    // depois que a página atualiza o título
    const t = window.setTimeout(() => registrarPagina(pathname), 0)
    return () => window.clearTimeout(t)
  }, [pathname])
  return null
}

function FaixaDemo() {
  if (!site.demo) return null
  return (
    <div className="bg-ameixa text-creme">
      <p className="container-site py-2 text-center text-sm leading-snug">{site.demoTexto}</p>
    </div>
  )
}

function IconeWhatsapp({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.16-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.06.89.9-2.98-.2-.31a8.2 8.2 0 1 1 6.86 3.73Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-1.98-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.77 4.77 0 0 0 1 2.53 10.9 10.9 0 0 0 4.18 3.7c.58.25 1.04.4 1.4.51.58.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.15-1.17-.06-.1-.22-.17-.47-.29Z" />
    </svg>
  )
}

function ItemMenu({ href, rotulo, movel = false }: { href: string; rotulo: string; movel?: boolean }) {
  const base = `font-medium transition-colors hover:text-coral-escuro ${movel ? 'block py-2' : 'py-2'}`
  // Âncoras da home (/#servicos) não têm estado "ativo"
  if (href.includes('#')) {
    return <Link to={href} className={base}>{rotulo}</Link>
  }
  return (
    <NavLink to={href} className={({ isActive }) => `${base} ${isActive ? 'text-coral-escuro underline decoration-2 underline-offset-8' : ''}`}>
      {rotulo}
    </NavLink>
  )
}

function Cabecalho() {
  const [aberto, setAberto] = useState(false)
  const { pathname, hash } = useLocation()
  const botaoRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setAberto(false), [pathname, hash])
  useEffect(() => {
    if (!aberto) return
    const fechar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAberto(false)
        botaoRef.current?.focus()
      }
    }
    window.addEventListener('keydown', fechar)
    return () => window.removeEventListener('keydown', fechar)
  }, [aberto])

  return (
    <header className="sticky top-0 z-50 border-b border-ameixa/10 bg-creme/95 backdrop-blur supports-[backdrop-filter]:bg-creme/85">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ameixa focus:px-4 focus:py-2 focus:text-creme"
      >
        Pular para o conteúdo
      </a>
      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link to="/" className="shrink-0 text-coral transition-transform duration-300 hover:-rotate-2 hover:scale-105" aria-label="Agência Humanize, página inicial">
          <Logo versao="completo" className="h-9 w-auto aspect-[4024/1469] md:h-11" label="" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {site.menu.map((item) => (
              <li key={item.href}>
                <ItemMenu href={item.href} rotulo={item.rotulo} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <Link to="/#contato" className={classesBotao('primario', '!min-h-11 !px-5 !py-2')}>
              Diagnóstico gratuito
            </Link>
          </span>
          <button
            ref={botaoRef}
            type="button"
            className="grid size-11 place-items-center rounded-full text-ameixa hover:bg-ameixa/10 lg:hidden"
            aria-expanded={aberto}
            aria-controls="menu-movel"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setAberto((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              {aberto ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
            </svg>
          </button>
        </div>
      </div>

      <div id="menu-movel" hidden={!aberto} className="border-t border-ameixa/10 bg-creme lg:hidden">
        <nav aria-label="Menu" className="container-site py-4">
          <ul className="grid gap-1 text-xl">
            {site.menu.map((item) => (
              <li key={item.href}>
                <ItemMenu href={item.href} rotulo={item.rotulo} movel />
              </li>
            ))}
          </ul>
          <Link to="/#contato" className={classesBotao('primario', 'mt-4 w-full')}>
            Quero um diagnóstico gratuito
          </Link>
        </nav>
      </div>
    </header>
  )
}

function Rodape() {
  return (
    <footer className="em-fundo-escuro relative overflow-hidden bg-ameixa text-creme">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.2fr_1fr_1fr] md:py-20">
        <div>
          <Link to="/" className="inline-block text-coral" aria-label="Agência Humanize, página inicial">
            <Logo versao="vertical" className="h-24 w-auto aspect-[2023/1384]" label="" />
          </Link>
          <p className="mt-6 max-w-[34ch] text-creme/85">{site.bio}</p>
          <p className="mt-4 manuscrito text-3xl text-laranja">feito com gente, em Ribeirão Preto</p>
        </div>
        <nav aria-label="Serviços">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-roxo-claro">Serviços</h2>
          <ul className="mt-4 grid gap-2">
            {servicos.map((s) => (
              <li key={s.slug}>
                <Link to={`/servicos/${s.slug}`} className="hover:text-laranja">
                  {s.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-roxo-claro">Fale com a gente</h2>
          <ul className="mt-4 grid gap-2">
            <li>
              <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="hover:text-laranja" onClick={() => registrarLead('rodape')}>
                WhatsApp {site.contato.whatsappExibicao}
              </a>
            </li>
            <li>
              <a href={site.contato.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-laranja">
                Instagram @{site.contato.instagram}
              </a>
            </li>
            {site.contato.telefone !== site.contato.whatsapp && (
              <li>
                <a href={linkTelefone()} className="hover:text-laranja">
                  Telefone {site.contato.telefoneExibicao}
                </a>
              </li>
            )}
            <li className="break-all">
              <a href={`mailto:${site.contato.email}`} className="hover:text-laranja">
                {site.contato.email}
              </a>
            </li>
            <li>
              <a href={linkMapa()} target="_blank" rel="noopener noreferrer" className="hover:text-laranja">
                <address className="not-italic">{enderecoCompleto()}</address>
              </a>
            </li>
            <li>
              <Link to="/trabalhos" className="hover:text-laranja">Trabalhos</Link>
              {' · '}
              <Link to="/sobre" className="hover:text-laranja">Sobre</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-creme/15">
        <p className="container-site py-6 text-sm text-creme/75">
          © {new Date().getFullYear()} {site.nome} · Publicidade, marketing e audiovisual · {site.endereco.cidade}, {site.endereco.estado}
        </p>
      </div>
      <Rabisco forma="zigue" cor="coral" className="absolute -right-6 top-10 hidden w-40 opacity-90 md:block" />
    </footer>
  )
}

/** Botão flutuante de WhatsApp, só no celular. */
function BotaoWhatsapp() {
  return (
    <a
      href={linkWhatsapp()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => registrarLead('botao-flutuante')}
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex size-14 items-center justify-center rounded-full bg-menta text-ameixa shadow-card ring-4 ring-creme transition-transform active:scale-90 md:hidden"
      aria-label={`Conversar no WhatsApp ${site.contato.whatsappExibicao}`}
    >
      <span className="absolute inset-0 animate-pulso rounded-full bg-menta" aria-hidden="true" />
      <IconeWhatsapp className="relative size-7" />
    </a>
  )
}

/** Troca de página com um leve "deslizar"; a primeira página (já pré-renderizada) não anima. */
function TransicaoDePagina() {
  const { pathname } = useLocation()
  const primeira = useRef(true)
  useEffect(() => {
    primeira.current = false
  }, [])
  return (
    <m.div
      key={pathname}
      initial={primeira.current ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <Outlet />
    </m.div>
  )
}

export function Layout() {
  return (
    // LazyMotion carrega só o necessário do Framer Motion (hero e modal).
    // reducedMotion="user": quem pede menos movimento no sistema não vê deslocamentos.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
      <GerenciarRolagem />
      <SchemaLocalBusiness />
      <FaixaDemo />
      <Cabecalho />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <TransicaoDePagina />
      </main>
      <Rodape />
      <BotaoWhatsapp />
      </MotionConfig>
    </LazyMotion>
  )
}

export { IconeWhatsapp }

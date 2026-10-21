import { useRef, type PointerEvent, type ReactNode } from 'react'
import { m, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { home, site } from '@/content/site'
import { Foto } from './Foto'
import { Logo, Rabisco, Selo, Sublinhado } from './marca'
import { Botao } from './ui'

// Posição de cada foto da colagem (esquerda, topo, rotação, camada, profundidade do parallax)
const posicoes = [
  { cls: 'left-[1%] top-[9%] w-[47%]', rot: -7, z: 'z-10', prof: 0.6 },
  { cls: 'left-[29%] top-0 w-[46%]', rot: 3, z: 'z-30', prof: 1 },
  { cls: 'left-[52%] top-[30%] w-[46%]', rot: -2.5, z: 'z-20', prof: 1.5 },
]

type Movimento = { rolagem: MotionValue<number>; mouseX: MotionValue<number>; mouseY: MotionValue<number> }

/** Cada foto se move numa velocidade diferente com a rolagem e com o mouse (efeito de profundidade). */
function Camada({ prof, mov, className, children }: { prof: number; mov: Movimento; className: string; children: ReactNode }) {
  const yRolagem = useTransform(mov.rolagem, [0, 1], [0, -90 * prof])
  const yMouse = useTransform(mov.mouseY, (v) => v * 14 * prof)
  const y = useTransform(() => yRolagem.get() + yMouse.get())
  const x = useTransform(mov.mouseX, (v) => v * 18 * prof)
  return (
    <m.div className={className} style={{ x, y }}>
      {children}
    </m.div>
  )
}

function Colagem() {
  const fotos = home.hero.colagem
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const mouseX = useSpring(useMotionValue(0), { stiffness: 80, damping: 15 })
  const mouseY = useSpring(useMotionValue(0), { stiffness: 80, damping: 15 })
  const mov = { rolagem: scrollYProgress, mouseX, mouseY }

  function mover(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mouseX.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    mouseY.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }

  return (
    <div
      ref={ref}
      onPointerMove={mover}
      onPointerLeave={() => {
        mouseX.set(0)
        mouseY.set(0)
      }}
      className="relative mx-auto aspect-[1/1.22] w-full max-w-[34rem] sm:aspect-[1/1.02]"
      role="group"
      aria-label="Bastidores da Humanize"
    >
      {fotos.map((f, i) => {
        const p = posicoes[i % posicoes.length]
        return (
          <Camada key={f.foto} prof={p.prof} mov={mov} className={`absolute ${p.cls} ${p.z}`}>
          <m.figure
            className="group/foto relative m-0"
            initial={{ y: 40, rotate: p.rot - 8 }}
            animate={{ y: 0, rotate: p.rot }}
            whileHover={{ rotate: 0, scale: 1.04 }}
            transition={{ delay: 0.15 + i * 0.14, type: 'spring', damping: 16, stiffness: 120 }}
            style={{ rotate: p.rot }}
          >
            <div className="bg-creme p-2 pb-11 shadow-papel sm:p-2.5 sm:pb-12">
              <Foto
                nome={f.foto}
                alt={f.alt}
                prioridade
                sizes="(min-width: 1024px) 250px, 45vw"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
            <figcaption className="absolute inset-x-3 bottom-2 truncate manuscrito text-base leading-tight text-ameixa xs:text-lg sm:text-2xl">
              {f.legenda}
            </figcaption>
            {i === 1 && (
              // O clipe que prende a foto é o próprio símbolo da marca (coração-clipe)
              <span className="absolute -top-7 left-1/2 z-10 -translate-x-1/2 rotate-[-18deg] text-coral drop-shadow-[0_4px_4px_rgb(42_16_60_/_0.25)]">
                <Logo versao="simbolo" className="block size-14 origin-bottom animate-balanco sm:size-16" label="" />
              </span>
            )}
          </m.figure>
          </Camada>
        )
      })}

      <m.p
        className="absolute bottom-[1%] left-[1%] z-40 max-w-[9.5rem] -rotate-3 cursor-default bg-laranja-claro px-4 py-3 manuscrito text-xl leading-[1.05] text-ameixa shadow-papel sm:bottom-[3%] sm:max-w-[15rem] sm:px-5 sm:py-4 sm:text-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ rotate: 3, scale: 1.06 }}
        transition={{ delay: 0.65, type: 'spring', damping: 14 }}
      >
        {home.hero.bilhete} <span aria-hidden="true" className="inline-block animate-batida text-coral-escuro">♥</span>
      </m.p>

      <m.div
        className="absolute -right-1 top-[2%] z-40 w-[24%] max-w-28"
        initial={{ opacity: 0, rotate: -40, scale: 0.6 }}
        animate={{ opacity: 1, rotate: 12, scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', damping: 12 }}
      >
        <Selo nome="certificado-toque-humanizado" className="w-full animate-girar-lento" />
      </m.div>
      <m.div
        className="absolute -bottom-[4%] -right-[2%] z-40 w-[26%] max-w-32"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ delay: 0.95, type: 'spring', damping: 14 }}
      >
        <Selo nome="bastidores" className="w-full animate-flutuar" />
      </m.div>
    </div>
  )
}

export function Hero() {
  const h = home.hero
  return (
    <section className="relative overflow-hidden bg-laranja text-ameixa" aria-labelledby="titulo-hero">
      <Rabisco forma="canto" cor="creme" className="absolute -left-4 top-6 hidden w-28 opacity-80 animate-flutuar lg:block" />
      <Rabisco forma="zigue" cor="coral" className="absolute bottom-8 left-[44%] hidden w-24 animate-balanco lg:block" />
      <Rabisco forma="linha-ondulada" cor="creme" className="absolute -right-10 top-10 hidden w-56 opacity-70 animate-flutuar [animation-delay:-3s] md:block" />
      <div className="container-site grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10 lg:pb-24 lg:pt-20">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-ameixa px-3.5 py-1.5 text-sm font-semibold text-creme">
            <span className="relative grid size-3 place-items-center" aria-hidden="true">
              <span className="absolute inset-0 animate-pulso rounded-full bg-menta" />
              <span className="relative size-2.5 rounded-full bg-menta" />
            </span>
            {site.endereco.regiao}
          </p>
          <h1 id="titulo-hero" className="text-[2.75rem] leading-[0.98] xs:text-5xl sm:text-6xl lg:text-[4.6rem]">
            {h.titulo}
            <span className="relative mt-2 block w-fit -rotate-2 pb-3 manuscrito text-[1.12em] text-vinho">
              {h.tituloManuscrito}
              <Sublinhado cor="creme" className="-bottom-0.5 h-3.5" />
            </span>
          </h1>
          <p className="mt-6 max-w-[38ch] text-lg font-medium leading-relaxed sm:text-xl">{h.texto}</p>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <Botao href="/#contato" variante="escuro">
              {h.ctaPrincipal}
            </Botao>
            <Botao href="/trabalhos" variante="claro">
              {h.ctaSecundario}
            </Botao>
          </div>
        </div>
        <Colagem />
      </div>
    </section>
  )
}

import { useId, useRef, useState, type FormEvent } from 'react'
import { objetivos } from '@/content/site'
import { linkWhatsapp, mascaraTelefone, mensagemDiagnostico, telefoneValido, type PedidoDiagnostico } from '@/lib/whatsapp'
import { registrarLead } from '@/lib/analytics'
import { classesBotao } from './ui'
import { IconeWhatsapp } from './Layout'

type Campo = keyof PedidoDiagnostico
type Erros = Partial<Record<Campo, string>>

const vazio: PedidoDiagnostico = { nome: '', empresa: '', cidade: '', whatsapp: '', objetivo: '' }

function validar(d: PedidoDiagnostico): Erros {
  const e: Erros = {}
  if (d.nome.trim().length < 2) e.nome = 'Conta pra gente o seu nome.'
  if (!d.empresa.trim()) e.empresa = 'Qual é a empresa ou marca?'
  if (!d.cidade.trim()) e.cidade = 'Em qual cidade fica a empresa?'
  if (!telefoneValido(d.whatsapp)) e.whatsapp = 'Informe um WhatsApp com DDD, ex.: (16) 99999-9999.'
  if (!d.objetivo) e.objetivo = 'Escolha o que você mais precisa hoje.'
  return e
}

const ordem: Campo[] = ['nome', 'empresa', 'cidade', 'whatsapp', 'objetivo']

export function FormularioDiagnostico({ titulo = 'Pedir diagnóstico gratuito' }: { titulo?: string }) {
  const id = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [dados, setDados] = useState<PedidoDiagnostico>(vazio)
  const [erros, setErros] = useState<Erros>({})
  const [enviado, setEnviado] = useState<string | null>(null)

  function mudar(campo: Campo, valor: string) {
    const v = campo === 'whatsapp' ? mascaraTelefone(valor) : valor
    setDados((d) => ({ ...d, [campo]: v }))
    if (erros[campo]) setErros((e) => ({ ...e, [campo]: undefined }))
  }

  function enviar(ev: FormEvent) {
    ev.preventDefault()
    const e = validar(dados)
    setErros(e)
    const primeiro = ordem.find((c) => e[c])
    if (primeiro) {
      formRef.current?.querySelector<HTMLElement>(`[name="${primeiro}"]`)?.focus()
      return
    }
    const url = linkWhatsapp(mensagemDiagnostico(dados))
    registrarLead('formulario-diagnostico')
    window.open(url, '_blank', 'noopener,noreferrer')
    setEnviado(url)
  }

  const campoCls = (c: Campo) =>
    `w-full min-h-12 rounded-xl border-2 bg-creme px-4 py-3 text-base text-ameixa placeholder:text-grafite/70 transition-colors focus:border-roxo-escuro focus:outline-none ${
      erros[c] ? 'border-coral-escuro' : 'border-ameixa/20'
    }`

  function rotulo(c: Campo, texto: string) {
    return (
      <label htmlFor={`${id}-${c}`} className="text-sm font-semibold">
        {texto}
      </label>
    )
  }
  function erro(c: Campo) {
    return erros[c] ? (
      <p id={`${id}-${c}-erro`} className="text-sm font-medium text-coral-escuro">
        {erros[c]}
      </p>
    ) : null
  }
  function aria(c: Campo) {
    return {
      id: `${id}-${c}`,
      name: c,
      'aria-invalid': erros[c] ? true : undefined,
      'aria-describedby': erros[c] ? `${id}-${c}-erro` : undefined,
    }
  }

  const qtdErros = Object.values(erros).filter(Boolean).length

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={enviar}
      className="grid content-start gap-4 self-start rounded-bloco bg-creme p-6 text-ameixa shadow-papel sm:p-8"
      aria-labelledby={`${id}-titulo`}
    >
      <div>
        <h3 id={`${id}-titulo`} className="text-2xl sm:text-3xl">
          {titulo}
        </h3>
        <p className="mt-1 text-grafite">Leva 1 minuto. A conversa continua no WhatsApp.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          {rotulo('nome', 'Seu nome')}
          <input type="text" autoComplete="name" className={campoCls('nome')} value={dados.nome} onChange={(e) => mudar('nome', e.target.value)} {...aria('nome')} />
          {erro('nome')}
        </div>
        <div className="grid gap-1.5">
          {rotulo('empresa', 'Empresa ou marca')}
          <input type="text" autoComplete="organization" className={campoCls('empresa')} value={dados.empresa} onChange={(e) => mudar('empresa', e.target.value)} {...aria('empresa')} />
          {erro('empresa')}
        </div>
        <div className="grid gap-1.5">
          {rotulo('cidade', 'Cidade')}
          <input type="text" autoComplete="address-level2" className={campoCls('cidade')} value={dados.cidade} onChange={(e) => mudar('cidade', e.target.value)} {...aria('cidade')} />
          {erro('cidade')}
        </div>
        <div className="grid gap-1.5">
          {rotulo('whatsapp', 'WhatsApp com DDD')}
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(16) 99999-9999"
            className={campoCls('whatsapp')}
            value={dados.whatsapp}
            onChange={(e) => mudar('whatsapp', e.target.value)}
            {...aria('whatsapp')}
          />
          {erro('whatsapp')}
        </div>
      </div>
      <div className="grid gap-1.5">
        {rotulo('objetivo', 'O que você mais precisa hoje?')}
        <select className={`${campoCls('objetivo')} appearance-none bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat pr-12`} style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%232a103c%27 stroke-width=%272.5%27 stroke-linecap=%27round%27%3E%3Cpath d=%27M6 9l6 6 6-6%27/%3E%3C/svg%3E")' }} value={dados.objetivo} onChange={(e) => mudar('objetivo', e.target.value)} {...aria('objetivo')}>
          <option value="" disabled>
            Escolha uma opção
          </option>
          {objetivos.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {erro('objetivo')}
      </div>

      <button type="submit" className={classesBotao('primario', 'mt-1 w-full sm:w-auto sm:justify-self-start')}>
        <IconeWhatsapp className="size-5" />
        Enviar pelo WhatsApp
      </button>

      <div aria-live="polite" className="text-sm">
        {qtdErros > 0 && <p className="sr-only">O formulário tem {qtdErros} campo(s) para corrigir.</p>}
        {enviado && (
          <p className="rounded-xl border-2 border-menta-escuro bg-menta-claro/40 px-4 py-3">
            Prontinho! Abrimos o WhatsApp com a sua mensagem, é só tocar em enviar.{' '}
            <a href={enviado} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
              Não abriu? Clique aqui.
            </a>
          </p>
        )}
      </div>
    </form>
  )
}

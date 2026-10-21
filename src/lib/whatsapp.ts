import { site } from '@/content/site'

export function linkWhatsapp(mensagem: string = site.mensagemWhatsapp) {
  return `https://wa.me/${site.contato.whatsapp}?text=${encodeURIComponent(mensagem)}`
}

export interface PedidoDiagnostico {
  nome: string
  empresa: string
  cidade: string
  whatsapp: string
  objetivo: string
}

export function mensagemDiagnostico(p: PedidoDiagnostico) {
  return [
    'Oi, Humanize! Quero um diagnóstico gratuito da minha marca.',
    '',
    `*Nome:* ${p.nome}`,
    `*Empresa:* ${p.empresa}`,
    `*Cidade:* ${p.cidade}`,
    `*WhatsApp:* ${p.whatsapp}`,
    `*Objetivo:* ${p.objetivo}`,
  ].join('\n')
}

/** Máscara (16) 99999-9999 enquanto a pessoa digita. */
export function mascaraTelefone(valor: string) {
  const d = valor.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function telefoneValido(valor: string) {
  const d = valor.replace(/\D/g, '')
  return d.length === 10 || d.length === 11
}

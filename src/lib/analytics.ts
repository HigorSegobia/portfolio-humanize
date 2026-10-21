// Google Analytics 4 e Pixel da Meta, ligados só se as variáveis de ambiente estiverem preenchidas:
//   VITE_GA_ID=G-XXXXXXX
//   VITE_META_PIXEL_ID=1234567890

type Fn = (...args: unknown[]) => void
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Fn
    fbq?: Fn & { callMethod?: Fn; queue?: unknown[]; loaded?: boolean; version?: string; push?: Fn }
    _fbq?: unknown
  }
}

const GA_ID = (import.meta.env.VITE_GA_ID as string | undefined)?.trim()
const PIXEL_ID = (import.meta.env.VITE_META_PIXEL_ID as string | undefined)?.trim()
let iniciado = false

function carregarScript(src: string) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

export function iniciarAnalytics() {
  if (iniciado || typeof window === 'undefined') return
  iniciado = true

  if (GA_ID) {
    carregarScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`)
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      // gtag exige o objeto `arguments` original, não um array
      window.dataLayer!.push(arguments)
    }
    window.gtag('js', new Date())
    // page_view é enviado manualmente a cada troca de rota
    window.gtag('config', GA_ID, { send_page_view: false })
  }

  if (PIXEL_ID) {
    const fbq: NonNullable<Window['fbq']> = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args)
      else fbq.queue!.push(args)
    }
    fbq.queue = []
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.push = fbq
    window.fbq = fbq
    window._fbq = fbq
    carregarScript('https://connect.facebook.net/en_US/fbevents.js')
    window.fbq('init', PIXEL_ID)
  }
}

export function registrarPagina(caminho: string) {
  if (GA_ID && window.gtag) {
    window.gtag('event', 'page_view', { page_path: caminho, page_location: window.location.href, page_title: document.title })
  }
  if (PIXEL_ID && window.fbq) window.fbq('track', 'PageView')
}

/** Pedido de diagnóstico enviado pelo formulário ou clique no WhatsApp. */
export function registrarLead(origem: string) {
  if (GA_ID && window.gtag) window.gtag('event', 'generate_lead', { origem })
  if (PIXEL_ID && window.fbq) window.fbq('track', 'Lead', { content_name: origem })
}

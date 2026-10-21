/** Subpasta onde o site está publicado ("/" ou "/portfolio-humanize/"), definida em vite.config.ts. */
export const BASE = import.meta.env.BASE_URL

/** Prefixa um caminho da pasta public/ com a subpasta do site: caminho('/img/x.webp'). */
export function caminho(arquivo: string) {
  return BASE.replace(/\/$/, '') + (arquivo.startsWith('/') ? arquivo : '/' + arquivo)
}

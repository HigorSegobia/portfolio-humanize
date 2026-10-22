// Depois de cada publicação, os arquivos das páginas ganham nomes novos e os antigos somem.
// Quem estava com a versão anterior aberta (ou com o HTML em cache) tenta baixar um arquivo
// que não existe mais. Nesse caso recarregamos a página uma vez para pegar a versão nova.
// Quem chama: a tela de erro das rotas (ErroRota), já no endereço da página pedida,
// e o main.tsx quando o HTML pré-renderizado é de uma versão anterior.

const CHAVE = 'humanize:recarregou-versao'

/** Erro de "arquivo da página não encontrado" (cada navegador usa uma mensagem). */
export function ehErroDeVersao(erro: unknown) {
  const msg = erro instanceof Error ? erro.message : String(erro ?? '')
  return /dynamically imported module|Importing a module script failed|Failed to fetch dynamically|error loading dynamically|Unable to preload CSS/i.test(msg)
}

/** Recarrega uma vez; se já recarregou há pouco, não insiste (evita loop). Retorna true se recarregou. */
export function recarregarParaNovaVersao() {
  try {
    const ultima = Number(sessionStorage.getItem(CHAVE) || 0)
    if (Date.now() - ultima < 15000) return false
    sessionStorage.setItem(CHAVE, String(Date.now()))
  } catch {
    // sem sessionStorage (modo privado restrito): recarrega mesmo assim
  }
  window.location.reload()
  return true
}


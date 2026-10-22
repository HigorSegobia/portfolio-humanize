import { useEffect, useState } from 'react'
import { useRouteError } from 'react-router-dom'
import { ehErroDeVersao, recarregarParaNovaVersao } from '@/lib/novaVersao'
import { linkWhatsapp } from '@/lib/whatsapp'
import { caminho } from '@/lib/base'
import { Logo } from './marca'
import { classesBotao } from './ui'

/**
 * Tela de erro das rotas. Se o erro for de versão antiga do site (arquivo que sumiu depois
 * de uma publicação), recarrega sozinho; senão mostra uma mensagem com a cara da marca.
 * Usa só <a> comum (não depende do roteador, que pode estar com problema).
 */
export function ErroRota() {
  const erro = useRouteError()
  const versao = ehErroDeVersao(erro)
  const [recarregando, setRecarregando] = useState(versao)

  useEffect(() => {
    if (versao && !recarregarParaNovaVersao()) setRecarregando(false)
  }, [versao])

  if (import.meta.env.DEV) console.error(erro)

  return (
    <main className="grid min-h-dvh place-items-center bg-coral px-4 py-16 text-ameixa">
      <div className="w-full max-w-lg rounded-bloco bg-creme p-8 text-center shadow-papel sm:p-12">
        <Logo versao="simbolo" className="mx-auto block size-16 animate-batida text-coral" label="" />
        {recarregando ? (
          <>
            <h1 className="mt-6 text-3xl">Atualizando o site…</h1>
            <p className="mt-3 text-grafite">Tem novidade por aqui. Só um instante.</p>
          </>
        ) : (
          <>
            <h1 className="mt-6 text-3xl sm:text-4xl">Opa, algo saiu do roteiro.</h1>
            <p className="mt-3 text-lg text-grafite">Tente recarregar a página. Se continuar, chama a gente no WhatsApp.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={() => window.location.reload()} className={classesBotao('escuro')}>
                Recarregar
              </button>
              <a href={caminho('/')} className={classesBotao('contorno')}>
                Ir para o início
              </a>
            </div>
            <a href={linkWhatsapp()} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block font-semibold underline underline-offset-4">
              Falar no WhatsApp
            </a>
          </>
        )}
      </div>
    </main>
  )
}

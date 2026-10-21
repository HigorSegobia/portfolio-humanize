import type { Pessoa } from './tipos.ts'

// Equipe exibida em /sobre. Para adicionar alguém, copie um bloco e preencha.
// "foto" é o nome do arquivo em media/fotos/ (sem extensão). Sem foto, aparece o ícone da marca.

export const equipe: Pessoa[] = [
  {
    nome: 'Julia Ribeiro',
    cargo: 'Fundadora e diretora criativa',
    foto: 'quem',
    alt: 'Julia Ribeiro sentada em uma poltrona, sorrindo',
    bio: 'À frente da Humanize, Julia cuida da estratégia e da direção criativa de cada cliente. Acredita que a melhor história de uma marca está nas pessoas que fazem ela acontecer.',
    instagram: 'byjuliaribeiro',
  },
  {
    nome: 'Equipe de audiovisual',
    cargo: 'Gravação, edição e storymaker',
    foto: 'equipe-barretos',
    alt: 'Equipe de audiovisual da Humanize em evento',
    bio: 'Quem vai até a sua empresa ou evento com câmera na mão, roteiro no bolso e prazo curto.',
  },
  {
    nome: 'Equipe de social media',
    cargo: 'Planejamento, criação e tráfego',
    foto: 'escritorio',
    alt: 'Equipe de social media trabalhando no escritório',
    bio: 'Transforma o que foi gravado em calendário, posts, anúncios e relatório com números.',
  },
]

/** Como a Humanize trabalha (página /sobre). */
export const jeitoDeTrabalhar = [
  {
    titulo: 'Gente antes de tendência',
    texto: 'A gente não começa pelo áudio do momento. Começa conhecendo quem faz o seu negócio.',
  },
  {
    titulo: 'Câmera na mão, perto de você',
    texto: 'Somos de Ribeirão Preto e atendemos a região pessoalmente. Gravamos onde a sua marca acontece.',
  },
  {
    titulo: 'Estratégia em cada vídeo',
    texto: 'Cada conteúdo tem um objetivo: contato, venda, alcance ou contratação.',
  },
  {
    titulo: 'Número na mesa todo mês',
    texto: 'Relatório e reunião mensal para mostrar o que funcionou e o que muda no próximo mês.',
  },
]

export const historia = [
  'A Humanize nasceu em Ribeirão Preto de uma inquietação de Julia Ribeiro: as empresas da região faziam coisas incríveis, mas na internet pareciam todas iguais, com imagem de banco e frase pronta.',
  'A resposta foi montar uma agência que sai do escritório. Que grava na fábrica, na clínica, na loja e no rodeio. Que conversa com quem está lá dentro e transforma isso em conteúdo com estratégia.',
  'Hoje a Humanize atende marcas de moda, clínicas odontológicas, restaurantes, farmácias, empresas do agro, da indústria e de eventos em Ribeirão Preto, Monte Alto, Franca e região.',
]

import type { Case } from './tipos.ts'

// Cases REAIS, com números tirados do Instagram Insights dos clientes.
// Para adicionar um case, copie um bloco e preencha. "trabalhos" lista slugs de trabalhos.ts
// (os reels aparecem na página do case). "ficticio: true" mostra o selo "exemplo".

export const cases: Case[] = [
  {
    slug: 'biomagistral-monte-alto',
    titulo: 'De 357 para 2,3 mil seguidores em seis meses',
    cliente: 'Biomagistral',
    segmento: 'Farmácia de manipulação',
    cidade: 'Monte Alto',
    periodo: 'Março a outubro de 2026',
    resumo:
      'Reels, posts e stories com constância: de 357 seguidores em março para 2,3 mil em setembro, e 329 mil visualizações nos últimos 90 dias.',
    destaque: { valor: '329 mil', legenda: 'visualizações em 90 dias' },
    desafio:
      'Farmácia de manipulação é um negócio de confiança: o cliente quer saber quem prepara a fórmula e como. Em março de 2026 o perfil tinha 357 seguidores. O desafio era fazer a Biomagistral ser vista em Monte Alto e mostrar o cuidado que acontece dentro do laboratório.',
    feito: [
      '4 reels e 7 posts em março',
      '8 reels, 4 posts e 190 stories em setembro',
      'Reels mostrando o processo de manipulação por dentro',
      'Conteúdo pensado para alcançar quem ainda não seguia a farmácia',
    ],
    comparacao: [
      {
        metrica: 'Seguidores',
        antes: { periodo: 'Março de 2026', valor: '357' },
        depois: { periodo: 'Setembro de 2026', valor: '2,3 mil' },
      },
    ],
    numeros: [
      { valor: '329.776', legenda: 'visualizações em 90 dias (até 21/10)' },
      { valor: '+616', legenda: 'seguidores líquidos em 90 dias' },
      { valor: '5.479', legenda: 'interações em 90 dias' },
      { valor: '22.617', legenda: 'contas alcançadas em 90 dias' },
      { valor: '89 mil', legenda: 'visualizações em setembro' },
      { valor: '+164', legenda: 'seguidores em setembro' },
      { valor: '29 mil', legenda: 'visualizações de reels e posts em março' },
      { valor: '58%', legenda: 'das visualizações de março vieram de não seguidores' },
      { valor: '+144', legenda: 'seguidores em março' },
    ],
    destaques: [
      { valor: '175 mil', legenda: 'visualizações em stories' },
      { valor: '60 mil', legenda: 'visualizações em reels' },
    ],
    galeria: [],
    trabalhos: ['biomagistral-monte-alto'],
    servicos: ['audiovisual', 'social-media'],
    fonte: 'Instagram Insights da @biomagistral_montealtosp: resumos de março e setembro de 2026 e visão de 90 dias até 21/10/2026.',
    cor: 'menta',
    ficticio: false,
  },
  {
    slug: 'tres-guris',
    titulo: 'De 38 para 353 seguidores',
    cliente: 'Três Guris',
    segmento: 'Alho de produção própria',
    cidade: 'Monte Alto',
    periodo: 'Julho e agosto de 2026',
    resumo:
      'Em outubro de 2025, antes da Humanize, o perfil tinha 38 seguidores. Em agosto de 2026 eram 353, com 20 mil visualizações no mês.',
    destaque: { valor: '20 mil', legenda: 'visualizações em agosto (+262% sobre julho)' },
    desafio:
      'A Três Guris produz o próprio alho em Monte Alto. Antes da Humanize, em outubro de 2025, o perfil tinha 38 seguidores e 343 visualizações de reels e posts no mês. Era preciso fazer a marca ser vista por gente nova.',
    feito: ['Reel mostrando o processo de rastreabilidade do alho'],
    comparacao: [
      {
        metrica: 'Seguidores',
        antes: { periodo: 'Outubro de 2025, antes da Humanize', valor: '38' },
        depois: { periodo: 'Agosto de 2026', valor: '353' },
      },
    ],
    evolucao: {
      metrica: 'Seguidores no fim de cada mês',
      pontos: [
        { rotulo: 'Out/25', valor: 38, antes: true },
        { rotulo: 'Jul/26', valor: 152 },
        { rotulo: 'Ago/26', valor: 353 },
      ],
    },
    numeros: [
      { valor: '20 mil', legenda: 'visualizações em agosto' },
      { valor: '+262%', legenda: 'visualizações em agosto, comparado a julho' },
      { valor: '+205', legenda: 'seguidores em agosto, comparado a julho' },
      { valor: '5,7 mil', legenda: 'visualizações em julho' },
      { valor: '+1.743%', legenda: 'visualizações em julho, comparado a junho' },
      { valor: '57%', legenda: 'das visualizações de agosto vieram de não seguidores' },
    ],
    galeria: [],
    trabalhos: ['tres-guris'],
    servicos: ['audiovisual'],
    fonte: 'Instagram Insights da @tres_guris: resumos de outubro de 2025, julho e agosto de 2026.',
    cor: 'roxo',
    ficticio: false,
  },
  {
    slug: 'nanana',
    titulo: 'Perfil novo, 200 seguidores em dois meses',
    cliente: 'Nanana',
    segmento: 'Loja de roupa infantil',
    periodo: 'Junho e julho de 2026',
    resumo:
      'Perfil que começou em maio: 94 seguidores em junho, 200 em julho e 14 mil visualizações no mês, quase o dobro de junho.',
    destaque: { valor: '14 mil', legenda: 'visualizações em julho (+92% sobre junho)' },
    desafio:
      'A Nanana é uma loja de roupa infantil com o perfil começando: em maio tinha só 2 seguidores. O desafio era ser descoberta por mães, pais e famílias que ainda não conheciam a loja.',
    feito: ['Reel “Cartas para o futuro”'],
    evolucao: {
      metrica: 'Seguidores no fim de cada mês',
      pontos: [
        { rotulo: 'Mai/26', valor: 2 },
        { rotulo: 'Jun/26', valor: 94 },
        { rotulo: 'Jul/26', valor: 200 },
      ],
    },
    numeros: [
      { valor: '14 mil', legenda: 'visualizações em julho' },
      { valor: '+92%', legenda: 'visualizações em julho, comparado a junho' },
      { valor: '+110', legenda: 'seguidores em julho' },
      { valor: '7,7 mil', legenda: 'visualizações em junho' },
      { valor: '72%', legenda: 'das visualizações de junho vieram de não seguidores' },
      { valor: '+92', legenda: 'seguidores em junho' },
    ],
    galeria: [],
    trabalhos: ['nanana'],
    servicos: ['audiovisual'],
    fonte: 'Instagram Insights da @nananababys: resumos de junho e julho de 2026. Maio calculado a partir do ganho informado em junho (+92).',
    cor: 'coral',
    ficticio: false,
  },
]

import type { Depoimento } from './tipos.ts'

// Depoimentos reais de clientes. A seção só aparece no site quando houver pelo menos um.
// Exemplo de item:
// {
//   texto: 'O que o cliente disse...',
//   nome: 'Nome da pessoa',
//   cargo: 'Cargo',
//   empresa: 'Empresa',
//   foto: 'nome-da-foto', // opcional, arquivo em media/fotos/
// },

export const depoimentos: Depoimento[] = []

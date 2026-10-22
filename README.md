# Site da Agência Humanize

Site-portfólio da Agência Humanize (Ribeirão Preto/SP). O objetivo principal é gerar pedidos de **diagnóstico gratuito pelo WhatsApp**.

Feito com Vite + React + TypeScript + Tailwind CSS. As páginas são **pré-renderizadas em HTML no build**: abrem rápido no celular, aparecem certinho no Google e mostram título e imagem corretos quando o link é compartilhado no WhatsApp.

---

## 1. Como rodar no computador

Precisa do **Node.js 22.18 ou mais novo** (recomendado: 24).

```bash
npm install
```

```bash
npm run dev
```

Abra http://localhost:5173/portfolio-humanize/ (a subpasta vem do `url` em `site.ts`). Cada arquivo que você salvar atualiza a página na hora.

Para ver a versão final (igual à que vai para o ar):

```bash
npm run build
```

```bash
npm run preview
```

Abra http://localhost:4173/portfolio-humanize/.

| Comando | O que faz |
|---|---|
| `npm run dev` | Site em modo de edição |
| `npm run build` | Gera o site final na pasta `dist/` (fotos, sitemap, verificação de TypeScript e pré-renderização) |
| `npm run preview` | Mostra o conteúdo de `dist/` como ficará no ar |
| `npm run images` | Converte as fotos de `media/fotos/` (roda sozinho no dev e no build) |
| `npm run assets` | Extrai de novo fontes, logos, ícones, selos e rabiscos da pasta `brand/` |

---

## 2. Onde fica cada coisa

```
brand/                 identidade visual oficial (fonte da verdade, não é publicada)
media/fotos/           FOTOS do site (originais em .jpg/.png)
public/videos/         VÍDEOS .mp4 (crie a pasta quando tiver o primeiro)
src/content/           TODOS OS TEXTOS, cases, serviços, equipe, depoimentos
src/assets/brand/      logos, ícones, selos e rabiscos gerados a partir de brand/
src/components/        peças visuais (não precisa mexer para trocar conteúdo)
src/pages/             páginas
scripts/               conversão de imagens, sitemap e pré-renderização
screenshots/           capturas da home em desktop e celular
```

---

## 3. Como trocar textos, cases, serviços e equipe

Todo o conteúdo fica em `src/content/`. São arquivos de dados: basta editar o texto entre aspas e salvar.

| Arquivo | O que tem |
|---|---|
| `site.ts` | Contatos (WhatsApp, Instagram), endereço, **faixa de demonstração**, menu, textos da home, etapas do "Como funciona", opções do formulário |
| `servicos.ts` | Os 6 serviços. Cada um vira uma página em `/servicos/<slug>` |
| `trabalhos.ts` | A grade de trabalhos com os **reels reais dos clientes**. Os 6 primeiros aparecem na home |
| `cases.ts` | Os cases com desafio, o que foi feito, galeria e números. Cada um vira `/cases/<slug>` |
| `equipe.ts` | Julia Ribeiro e equipe, história e "nosso jeito de trabalhar" (página `/sobre`) |
| `depoimentos.ts` | Depoimentos de clientes (está vazio de propósito) |
| `tipos.ts` | Formato de cada item. Se faltar um campo, o `npm run build` avisa |

Dicas:
- O **slug** é o pedaço do endereço (`/cases/meu-case`). Use só letras minúsculas, números e hífen.
- Para **adicionar** um case, serviço ou trabalho, copie um bloco `{ ... },` existente, cole logo abaixo e altere. O sitemap e a página são criados sozinhos no próximo build.
- As categorias de trabalho são: `moda`, `odontologia`, `gastronomia`, `farmacia`, `audiovisual`, `eventos`, `storymaker`, `social-media`, `fitness`, `agro`. Em /trabalhos só aparecem os filtros das categorias que têm algum trabalho.
- A faixa animada de clientes da home vem da lista `clientes` em `site.ts`.

### Conteúdo fictício e selo "exemplo"

**Tudo é real:** os trabalhos são reels de clientes, e os cases (Biomagistral Monte Alto e Franca) usam números do Instagram Insights, com a fonte indicada no campo `fonte` de cada case. Se um dia entrar algum conteúdo de exemplo, use o campo `ficticio`:

```ts
ficticio: true,   // mostra o selo discreto "exemplo"
ficticio: false,  // conteúdo real, sem selo
```

Ao trocar por um case real, preencha os dados verdadeiros e mude para `false`.

### Faixa "versão de demonstração"

Em `src/content/site.ts`:

```ts
demo: true,   // mostra a faixa no topo de todas as páginas
demo: false,  // esconde a faixa
```

O texto da faixa fica em `demoTexto`, logo abaixo. Ela está **desligada**, porque não há mais conteúdo fictício no site.

### Depoimentos

`src/content/depoimentos.ts` começa vazio para não inventarmos falas de clientes. A seção **só aparece na home quando houver pelo menos um depoimento**. O arquivo traz um exemplo comentado de como preencher.

---

## 4. Como trocar fotos

> **As fotos do protótipo são provisórias** (colagem do topo, "Quem está por trás", equipe e cases): têm só ~310 px de largura. Por isso aparecem um pouco desfocadas em telas grandes. Troque por originais com **pelo menos 1200 px de largura** (de preferência na vertical, 4:5).

1. Coloque a foto em `media/fotos/`, por exemplo `media/fotos/fabrica-monte-alto.jpg`.
2. No arquivo de conteúdo, use o nome **sem a extensão**: `foto: 'fabrica-monte-alto'`.
3. Escreva um `alt` descrevendo a foto (acessibilidade e Google).
4. Rode `npm run dev` ou `npm run build`. O script gera AVIF e WebP em 320, 480, 768, 1080 e 1600 px, sem nunca aumentar a foto original.

Para substituir uma provisória sem mexer no conteúdo, salve a nova foto **com o mesmo nome** (ex.: `media/fotos/barretos.jpg`).

Fotos usadas hoje: `barretos`, `camera`, `equipe-barretos`, `escritorio`, `gym`, `moda`, `novos`, `quem`, `sofa`, `storymaker`.
- Colagem do topo da home: `home.hero.colagem` em `site.ts`.
- Fotos da seção "Quem está por trás": `home.quemSomos.fotos` em `site.ts`.
- Foto de cada serviço: campo `foto` em `servicos.ts`.
- **Capa dos trabalhos:** cada reel usa a própria capa do Instagram, salva em `media/fotos/capa-<slug>.jpg` (ex.: `capa-folk.jpg`). Para trocar, substitua o arquivo com o mesmo nome. Num trabalho novo, salve a capa em `media/fotos/` e preencha `foto` e `alt`. Sem foto, o card usa uma capa nas cores da marca (campo `cor`).
- As páginas de serviço também usam capas de reels reais (campo `foto` em `servicos.ts`). Só "Cobertura de eventos" ainda usa foto provisória.
- Equipe: `equipe.ts`.

**Imagem de compartilhamento:** `public/og.png` (1200 × 630) aparece quando o link do site é enviado no WhatsApp ou Instagram. Ela é gerada com o logo; pode ser trocada por uma arte própria com o mesmo nome. Páginas de serviço e case usam a própria foto quando ela tem pelo menos 600 px de largura.

---

## 5. Como colocar vídeos

Cada trabalho em `trabalhos.ts` tem o campo `midia`, que pode ser de dois tipos.

**Reel ou post do Instagram.** O vídeo toca **dentro do site**, num modal, pelo embed oficial do Instagram. O embed só carrega quando a pessoa abre o card e se ajusta sozinho à altura do reel:

```ts
midia: { tipo: 'instagram', url: 'https://www.instagram.com/reel/XXXXXXXX/' },
formato: 'reel', // ou 'post' para carrossel/foto
```

Cole o link do reel sem a parte depois do `?` (ela é só rastreamento do Instagram). O reel precisa ser público e a conta precisa permitir incorporação. Os 11 trabalhos atuais foram conferidos e funcionam.

**Vídeo próprio .mp4** (toca dentro do modal):

1. Coloque o arquivo em `public/videos/`, por exemplo `public/videos/rodeio.mp4`. Use vídeo vertical, H.264, de preferência com menos de 15 MB.
2. Use uma foto de `media/fotos/` como capa (poster):

```ts
midia: { tipo: 'video', src: '/videos/rodeio.mp4', poster: 'barretos' },
```

O vídeo só começa a baixar quando a pessoa abre o modal.

---

## 6. Animações

O site usa três tipos de animação, todos desligados automaticamente para quem ativa "reduzir movimento" no celular ou no computador:

- **Revelar no scroll:** qualquer elemento com `data-revelar` entra quando aparece na tela. Variações: `subir` (padrão), `esquerda`, `direita`, `zoom`, `girar` e `desenhar` (usada nos sublinhados à mão). Para escalonar itens, use `style={{ '--atraso': '120ms' }}`. A regra fica em `src/index.css` e o observador, num script pequeno dentro de `index.html`. Sem JavaScript, tudo aparece normalmente.
- **Movimento contínuo da marca:** fitas de clientes e serviços correndo (`animate-faixa`), adesivos flutuando e girando, coração batendo, rabiscos balançando, botão do WhatsApp pulsando (`animate-flutuar`, `animate-girar-lento`, `animate-batida`, `animate-balanco`, `animate-pulso`).
- **Framer Motion:** entrada e profundidade da colagem do hero (as fotos acompanham a rolagem e o mouse), abrir e fechar do modal, transição entre páginas.
- **Contadores:** os números de resultado contam de 0 até o valor quando aparecem na tela (componente `Contador`).

## 7. Formulário e WhatsApp

- O formulário de diagnóstico (nome, empresa, cidade, WhatsApp, objetivo) é validado no navegador. Ao enviar, **abre o WhatsApp da agência com a mensagem já preenchida**. Nenhum dado fica guardado no site.
- O número fica em `site.contato.whatsapp` (`site.ts`), no formato `55 + DDD + número`, sem espaços.
- No celular aparece um botão flutuante de WhatsApp no canto da tela.
- As opções do campo "objetivo" ficam em `objetivos` (`site.ts`).

---

## 8. Google Analytics 4 e Pixel da Meta (opcionais)

Ficam **desligados** enquanto as variáveis estiverem vazias. Para ligar, crie um arquivo `.env` (copie de `.env.example`):

```
VITE_GA_ID=G-XXXXXXXXXX
VITE_META_PIXEL_ID=123456789012345
```

Na Vercel/Netlify, cadastre as mesmas variáveis no painel do projeto (Environment variables) e publique de novo.

São registradas a visualização de cada página e um evento de **lead** (`generate_lead` no GA4, `Lead` no Pixel) quando alguém envia o formulário ou clica no WhatsApp.

> Lembre de ajustar a política de privacidade/cookies conforme a LGPD ao ligar o rastreamento.

---

## 9. SEO

- Título, descrição, link canônico e Open Graph por página: cada página informa os seus no componente `<Seo>`, e eles já saem no HTML pré-renderizado.
- Dados estruturados `LocalBusiness` (schema.org) com Ribeirão Preto e cidades atendidas: gerados a partir de `site.ts`.
- `sitemap.xml` e `robots.txt` são gerados a cada build com todas as páginas de serviço e case.
- **O endereço do site fica em `url`, no `site.ts`** (hoje `https://higorsegobia.github.io/portfolio-humanize`). Ele alimenta sitemap, canonical, Open Graph e schema.org, e também define a subpasta do build.

---

## 10. Publicar no GitHub Pages (atual)

O repositório é https://github.com/HigorSegobia/portfolio-humanize e o site fica em **https://higorsegobia.github.io/portfolio-humanize/**.

A publicação é automática: o workflow `.github/workflows/deploy.yml` roda `npm run build` e publica a pasta `dist` **a cada push na branch `main`**. Também dá para rodar manualmente em **Actions → Publicar no GitHub Pages → Run workflow**.

Configuração única no GitHub:
1. **Settings → Pages → Build and deployment → Source:** escolha **GitHub Actions**.
2. (Opcional) Para ligar o Analytics, crie as variáveis `VITE_GA_ID` e `VITE_META_PIXEL_ID` em **Settings → Secrets and variables → Actions → Variables**.

**Subpasta:** como o site fica em `/portfolio-humanize/`, todos os caminhos (fotos, fontes, links) usam essa subpasta automaticamente. Ela é tirada do `url` em `src/content/site.ts`, então não precisa mexer em mais nada.

**Domínio próprio (ex.: agenciahumanize.com.br):**
1. Em `site.ts`, troque `url` para `'https://www.agenciahumanize.com.br'`. A subpasta some sozinha.
2. Crie o arquivo `public/CNAME` contendo só `www.agenciahumanize.com.br`.
3. No GitHub, em **Settings → Pages → Custom domain**, informe o domínio e ative **Enforce HTTPS**. No registro do domínio, aponte um CNAME de `www` para `higorsegobia.github.io`.

**Limitações do GitHub Pages** (nada que atrapalhe este site):
- Não permite configurar cache por arquivo (a Vercel e a Netlify permitem).
- O `robots.txt` só vale na raiz do domínio, então numa subpasta ele é ignorado pelo Google. O sitemap continua podendo ser enviado pelo Search Console.
- Com domínio próprio, tudo isso se resolve.

**O que vai para o repositório:** a pasta `brand/` (cerca de 200 MB, com arquivos .ai e as fontes originais licenciadas) e a `humanize-referencia/` ficam **fora do git** (ver `.gitignore`). O site usa só a versão já extraída em `src/assets/brand` e `public/fonts`. Se mudar algo em `brand/`, rode `npm run assets` e envie os arquivos gerados.

## 11. Publicar na Vercel ou na Netlify (alternativa)

Se um dia trocar de hospedagem, antes troque `url` em `site.ts` para o endereço final na raiz do domínio.

Os dois funcionam sem configuração extra: os arquivos `vercel.json` e `netlify.toml` já estão no projeto.

### Vercel

1. Suba o projeto para um repositório no GitHub.
2. Em vercel.com → **Add New → Project**, importe o repositório.
3. A Vercel detecta Vite sozinha: comando `npm run build`, pasta `dist`.
4. (Opcional) Cadastre `VITE_GA_ID` e `VITE_META_PIXEL_ID` em **Settings → Environment Variables**.
5. **Deploy**. Depois, em **Settings → Domains**, conecte o domínio.

### Netlify

1. Suba o projeto para um repositório no GitHub.
2. Em app.netlify.com → **Add new site → Import an existing project**, escolha o repositório.
3. O `netlify.toml` já informa build (`npm run build`), pasta (`dist`) e Node 24.
4. (Opcional) Variáveis em **Site configuration → Environment variables**.
5. **Deploy** e conecte o domínio em **Domain management**.

Endereços que não existem mostram a página 404 da marca nos dois serviços.

---

## 12. Identidade visual

Tudo vem da pasta `brand/`:

- **Cores** (`brand/Cores`): principais coral `#FF5459`, laranja `#FF9C19`, menta `#01DEBB`, roxo `#A840F1`, creme `#FFF6EB`; secundárias web vinho, ameixa, floresta, caramelo, areia e grafite. São os únicos nomes de cor disponíveis no Tailwind (`bg-coral`, `text-ameixa`…), definidos em `src/index.css`.
- **Contraste:** o coral com texto claro não atinge o contraste mínimo (AA). Por isso, botões coral usam texto ameixa e textos coloridos pequenos usam os tons escuros das próprias ilustrações da marca (`coral-escuro`, `roxo-escuro`…).
- **Fontes:** Author (principal) e Caveat (apoio, manuscrita), convertidas para `.woff2` em `public/fonts/`.
- **Logo, ícones, selos, ilustrações e rabiscos** são extraídos por `npm run assets`. Se a pasta `brand/` for atualizada, rode esse comando de novo.

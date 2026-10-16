# Microfrontend Host (Next.js)

Shell em **Next.js 16 (App Router)** que vai carregar microfrontends React em runtime.
O remote fica em [`project-react-microfrontend-remote`](https://github.com/DiguinhoLNS/project-react-microfrontend-remote).


## Stack

- Next.js 16 (Turbopack, Cache Components) + React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/turbopack`) + [shadcn/ui](https://ui.shadcn.com) (preset `radix-nova`, ícones Lucide)
- Tema claro/escuro com [`@wrksz/themes`](https://themes.wrksz.dev)
- Yarn 4 (versionado em `.yarn/releases`), ESLint, Husky + Commitlint

## Rodando local

```bash
yarn install
yarn dev
```

Abra http://localhost:3000.

## Scripts

| Comando | O que faz |
| --- | --- |
| `yarn dev` | Servidor de desenvolvimento |
| `yarn build` | Build de produção |
| `yarn start` | Sobe o build de produção |
| `yarn lint` | ESLint |
| `yarn typecheck` | Gera os tipos de rota e roda o `tsc` |

## Estrutura

Rotas finas em `app/` (só definem `metadata` e renderizam a página do módulo) e a lógica em `modules/`.

```
src/
├── app/
│   ├── layout.tsx           # html, fontes, ThemeProvider e providers globais
│   ├── not-found.tsx        # 404 -> modules/error
│   └── (app)/               # rotas com o layout de Sidebar + Header
│       └── page.tsx         # /  -> modules/home
├── components/
│   ├── app/                 # providers (ClientProvider)
│   ├── common/              # componentes reutilizáveis (ThemeToggle)
│   ├── layout/App           # SidebarProvider + Sidebar + Header + main
│   ├── page/                # partes de página (Sidebar, Header, PageHeader)
│   └── ui/                  # componentes do shadcn (gerados pela CLI)
├── hooks/                   # useMobile
├── lib/                     # `cn` do shadcn
├── modules/                 # domínios (pages, components, constants, interfaces...)
│   ├── error/
│   └── home/
└── utils/
```

O layout usa o `Sidebar` do shadcn: recolhível em modo ícone no desktop (`Ctrl+B`) e em `Sheet` no mobile.
Para adicionar um item no menu, edite [`components/page/Sidebar/constants/links.ts`](src/components/page/Sidebar/constants/links.ts);
o breadcrumb do Header usa a mesma lista.

## Tema claro / escuro

- O `ThemeProvider` de `@wrksz/themes/next` fica em [`src/app/layout.tsx`](src/app/layout.tsx), com `defaultTheme='system'`.
  Ele aplica a classe `light` ou `dark` no `<html>` antes da hidratação e guarda a escolha no `localStorage` (chave `theme`).
- As cores ficam em [`src/app/globals.css`](src/app/globals.css): variáveis em `:root` (claro) e `.dark` (escuro), expostas ao Tailwind via `@theme inline`.
- Nos componentes de cliente, use `useTheme` de `@wrksz/themes/client` (`theme` é a escolha, `resolvedTheme` é o tema efetivo).

## Adicionando componentes do shadcn

```bash
npx shadcn@latest add <componente>
```

Os arquivos são criados em `src/components/ui` (configuração em [`components.json`](components.json)).

> **Atenção:** o [`sidebar.tsx`](src/components/ui/sidebar.tsx) importa `useIsMobile` de `@/hooks/useMobile`
> (a CLI gera `@/hooks/use-mobile`). Se rodar `add sidebar --overwrite`, refaça o ajuste e apague o `use-mobile.ts` gerado.

## Commits

[Conventional Commits](https://www.conventionalcommits.org), validados pelo commitlint no hook `commit-msg`
(cabeçalho de até 120 caracteres). Ex.: `feat: adiciona página de produtos`.

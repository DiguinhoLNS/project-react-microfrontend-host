# Microfrontend Host (Next.js)

Shell em **Next.js 16 (App Router)** que vai carregar microfrontends React em runtime.
O remote fica em [`project-react-microfrontend-remote`](https://github.com/DiguinhoLNS/project-react-microfrontend-remote).


## Stack

- Next.js 16 (Turbopack, Cache Components) + React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/turbopack`)
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

## Commits

[Conventional Commits](https://www.conventionalcommits.org), validados pelo commitlint no hook `commit-msg`
(cabeçalho de até 120 caracteres). Ex.: `feat: adiciona página de produtos`.

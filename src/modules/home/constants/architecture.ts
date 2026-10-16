import { Blocks, Box, Cable, Palette } from 'lucide-react'

export const architectureCards = [
    {
        icon: Blocks,
        title: 'Host',
        description: 'Shell da aplicação: layout, navegação, tema e roteamento. Carrega os remotes em runtime, sem acoplar build.',
        tags: ['Next.js 16', 'App Router', 'shadcn/ui']
    },
    {
        icon: Box,
        title: 'Remote',
        description: 'Feature independente com deploy próprio. Publica um remote-entry.js e também roda standalone.',
        tags: ['React 19', 'Deploy independente', 'Standalone']
    },
    {
        icon: Cable,
        title: 'Contrato',
        description: 'O host só conhece mount, update e unmount. Props descem (tema, usuário) e eventos sobem via onEvent.',
        tags: ['ESM', 'Versionado', 'Agnóstico de framework']
    },
    {
        icon: Palette,
        title: 'Estilos',
        description: 'Tailwind + shadcn nos dois lados. O remote injeta CSS próprio, escopado, sem vazar para o host.',
        tags: ['Tailwind v4', 'Tokens do shadcn', 'Tema sincronizado']
    }
]

export const architectureFlow = [
    {
        step: '1',
        title: 'import()',
        description: 'O host baixa o remote-entry.js publicado no domínio do remote.'
    },
    {
        step: '2',
        title: 'mount(el, props)',
        description: 'O remote cria a própria árvore React dentro do elemento do host.'
    },
    {
        step: '3',
        title: 'onEvent(event)',
        description: 'Ações no remote viram eventos que o host consome.'
    }
]

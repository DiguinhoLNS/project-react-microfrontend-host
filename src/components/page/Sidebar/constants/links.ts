import { House, Package } from 'lucide-react'
import type { ISidebarLink } from '../interfaces/ISidebarLink'

const sidebarLinks: ISidebarLink[] = [
    {
        link: '/',
        icon: House,
        label: 'Início'
    },
    {
        link: '/produtos',
        icon: Package,
        label: 'Produtos'
    }
]

export default sidebarLinks

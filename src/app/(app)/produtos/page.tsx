import type { Metadata } from 'next'
import Products from '@/modules/products/pages/Products'

export const metadata: Metadata = {
    title: 'Produtos'
}

export default function Page() {
    return <Products />
}

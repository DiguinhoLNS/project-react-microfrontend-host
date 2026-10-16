import env from '@/env'
import type { IRemoteConfig } from '../interfaces/IRemoteConfig'

export const remotes = {
    products: {
        name: 'products',
        label: 'Produtos',
        url: env.REMOTE_PRODUCTS_URL
    }
} satisfies Record<string, IRemoteConfig>

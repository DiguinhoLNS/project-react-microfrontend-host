import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    cacheComponents: true,
    partialPrefetching: true,
    // O indicador padrão (bottom-left) fica por cima da sidebar.
    devIndicators: {
        position: 'bottom-right'
    },
    turbopack: {
        rules: {
            '*.css': {
                loaders: ['@tailwindcss/turbopack'],
                as: '*.css'
            }
        }
    }
}

export default nextConfig

const env = {
    PRODUCTION: process.env.NODE_ENV === 'production',
    REMOTE_PRODUCTS_URL: process.env.NEXT_PUBLIC_REMOTE_PRODUCTS_URL || 'http://localhost:4173/remote-entry.js'
}

export default env

import clsx from 'clsx'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@wrksz/themes/next'
import type { Metadata } from 'next'
import AppClientProvider from '@/components/app/ClientProvider'
import './globals.css'

const geist = Geist({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap'
})

const geistMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap'
})

export const metadata: Metadata = {
    title: {
        default: 'Microfrontend Host',
        template: '%s · Microfrontend Host'
    },
    description: 'Host Next.js que carrega microfrontends React em runtime.'
}

export default function RootLayout({ children }: LayoutProps<'/'>) {

    return (
        <html
            lang='pt-BR'
            className={clsx('h-svh antialiased font-sans', geist.variable, geistMono.variable)}
            suppressHydrationWarning
        >
            <body className={clsx('flex flex-1 flex-col w-full h-full')}>
                <ThemeProvider
                    defaultTheme='system'
                    disableTransitionOnChange
                >
                    <AppClientProvider>
                        {children}
                    </AppClientProvider>
                </ThemeProvider>
            </body>
        </html>
    )

}

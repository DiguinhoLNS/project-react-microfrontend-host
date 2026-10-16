import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
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
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className='flex flex-col min-h-full'>
                {children}
            </body>
        </html>
    )

}

import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/common/ThemeToggle'

export default function Page() {

    return (

        <>
            <main className={clsx('relative flex flex-1 flex-col items-center justify-center gap-6 p-8')}>
                <div className={clsx('absolute top-4 right-4')}>
                    <ThemeToggle />
                </div>

                <div className={clsx('flex flex-col items-center gap-2 text-center')}>
                    <h1 className={clsx('font-heading text-2xl font-semibold tracking-tight')}>
                        Microfrontend Host
                    </h1>

                    <p className={clsx('text-muted-foreground')}>
                        Next.js 16 + shadcn/ui (radix-nova) com tema claro/escuro
                    </p>
                </div>

                <div className={clsx('flex flex-wrap justify-center gap-2')}>
                    <Button>Default</Button>
                    <Button variant='secondary'>Secondary</Button>
                    <Button variant='outline'>Outline</Button>
                    <Button variant='destructive'>Destructive</Button>
                </div>
            </main>
        </>

    )

}

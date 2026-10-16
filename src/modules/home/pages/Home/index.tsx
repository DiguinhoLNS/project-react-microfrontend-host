import clsx from 'clsx'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import PageHeader from '@/components/page/PageHeader'
import { architectureCards, architectureFlow } from '../../constants/architecture'

export default function Home() {

    return (

        <>
            <PageHeader
                title='Microfrontends'
                description='Host em Next.js que carrega microfrontends React em runtime, cada um com deploy próprio.'
            />

            <div className={clsx('grid gap-4 md:grid-cols-2')}>
                {architectureCards.map(item => (
                    <Card key={item.title}>
                        <CardHeader>
                            <div className={clsx('flex items-center gap-2')}>
                                <div className={clsx('flex items-center justify-center size-8 rounded-lg bg-muted')}>
                                    <item.icon className={clsx('size-4')} />
                                </div>

                                <CardTitle>{item.title}</CardTitle>
                            </div>

                            <CardDescription>{item.description}</CardDescription>
                        </CardHeader>

                        <CardContent className={clsx('flex flex-wrap gap-1.5')}>
                            {item.tags.map(tag => (
                                <Badge
                                    key={tag}
                                    variant='secondary'
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <section className={clsx('flex flex-col gap-3')}>
                <h2 className={clsx('font-heading text-lg font-semibold')}>
                    Como o remote é carregado
                </h2>

                <ol className={clsx('grid gap-4 md:grid-cols-3')}>
                    {architectureFlow.map(item => (
                        <li
                            key={item.step}
                            className={clsx('flex gap-3 p-4 rounded-xl ring-1 ring-foreground/10')}
                        >
                            <span
                                className={clsx(
                                    'flex shrink-0 items-center justify-center size-6 rounded-full',
                                    'bg-primary text-xs font-semibold text-primary-foreground'
                                )}
                            >
                                {item.step}
                            </span>

                            <div className={clsx('flex flex-col gap-1')}>
                                <code className={clsx('font-mono text-sm font-medium')}>
                                    {item.title}
                                </code>

                                <p className={clsx('text-sm text-muted-foreground')}>
                                    {item.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>
        </>

    )

}

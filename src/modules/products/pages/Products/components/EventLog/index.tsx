'use client'

import clsx from 'clsx'
import { RadioTower, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import formatTime from '@/utils/formatTime'
import useRemoteEventsStore from '@/modules/microfrontends/store/remoteEventsStore'
import formatRemoteEvent from '@/modules/microfrontends/utils/formatRemoteEvent'

export default function ProductsEventLog() {

    const { events, clearEvents } = useRemoteEventsStore()

    return (

        <>
            <Card size='sm'>
                <CardHeader>
                    <CardTitle>Eventos recebidos</CardTitle>

                    <CardDescription>
                        remote → host via <code className={clsx('font-mono text-xs')}>onEvent</code>
                    </CardDescription>

                    <CardAction>
                        <Button
                            variant='ghost'
                            size='icon-sm'
                            aria-label='Limpar eventos'
                            disabled={events.length === 0}
                            onClick={clearEvents}
                        >
                            <Trash2 />
                        </Button>
                    </CardAction>
                </CardHeader>

                <CardContent>
                    {events.length === 0 ? (
                        <Empty className={clsx('p-4')}>
                            <EmptyHeader>
                                <EmptyMedia variant='icon'>
                                    <RadioTower />
                                </EmptyMedia>

                                <EmptyTitle>Nenhum evento ainda</EmptyTitle>
                                <EmptyDescription>Crie, edite ou exclua um produto no remote.</EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    ) : (
                        <ol className={clsx('flex flex-col gap-3 max-h-80 -mr-3 pr-3 overflow-y-auto')}>
                            {events.map(event => (
                                <li
                                    key={event.id}
                                    className={clsx('flex flex-col gap-1')}
                                >
                                    <div className={clsx('flex items-center justify-between gap-2')}>
                                        <Badge
                                            variant='outline'
                                            className={clsx('font-mono')}
                                        >
                                            {event.type}
                                        </Badge>

                                        <time
                                            dateTime={event.receivedAt}
                                            className={clsx('text-xs text-muted-foreground tabular-nums')}
                                        >
                                            {formatTime(event.receivedAt)}
                                        </time>
                                    </div>

                                    <p className={clsx('text-sm')}>
                                        {formatRemoteEvent(event)}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    )}
                </CardContent>
            </Card>
        </>

    )

}

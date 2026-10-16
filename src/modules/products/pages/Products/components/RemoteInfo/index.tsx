'use client'

import clsx from 'clsx'
import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { CONTRACT_VERSION } from '@/modules/microfrontends/constants/contract'
import type { IRemoteConfig } from '@/modules/microfrontends/interfaces/IRemoteConfig'
import type { IRemoteProps } from '@/modules/microfrontends/interfaces/IRemoteContract'
import type { TRemoteStatus } from '@/modules/microfrontends/interfaces/TRemoteStatus'

interface ProductsRemoteInfoProps {
    remote: IRemoteConfig
    status: TRemoteStatus
    props: IRemoteProps
}

const STATUS_LABEL: Record<TRemoteStatus, string> = {
    loading: 'Carregando',
    ready: 'Montado',
    error: 'Erro'
}

export default function ProductsRemoteInfo({ remote, status, props }: ProductsRemoteInfoProps) {

    const STANDALONE_URL = new URL('./', remote.url).href

    const ROWS = [
        { label: 'Contrato', value: `v${CONTRACT_VERSION}` },
        { label: 'Tema enviado', value: props.theme ?? '-' },
        { label: 'Usuário enviado', value: props.user?.name ?? '-' }
    ]

    return (

        <>
            <Card size='sm'>
                <CardHeader>
                    <CardTitle className={clsx('flex items-center gap-2')}>
                        Remote <code className={clsx('font-mono')}>{remote.name}</code>

                        <Badge variant={status === 'error' ? 'destructive' : status === 'ready' ? 'secondary' : 'outline'}>
                            <span
                                className={clsx(
                                    'size-1.5 rounded-full',
                                    status === 'ready' && 'bg-emerald-500',
                                    status === 'loading' && 'animate-pulse bg-amber-500',
                                    status === 'error' && 'bg-destructive'
                                )}
                            />
                            {STATUS_LABEL[status]}
                        </Badge>
                    </CardTitle>

                    <CardDescription className={clsx('break-all font-mono text-xs')}>
                        {remote.url}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <dl className={clsx('grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm')}>
                        {ROWS.map(row => (
                            <div
                                key={row.label}
                                className={clsx('contents')}
                            >
                                <dt className={clsx('text-muted-foreground')}>{row.label}</dt>
                                <dd className={clsx('text-right font-medium')}>{row.value}</dd>
                            </div>
                        ))}
                    </dl>
                </CardContent>

                <CardFooter>
                    <Button
                        variant='outline'
                        size='sm'
                        className={clsx('w-full')}
                        asChild
                    >
                        <a
                            href={STANDALONE_URL}
                            target='_blank'
                            rel='noreferrer'
                        >
                            Abrir remote standalone
                            <ExternalLink />
                        </a>
                    </Button>
                </CardFooter>
            </Card>
        </>

    )

}

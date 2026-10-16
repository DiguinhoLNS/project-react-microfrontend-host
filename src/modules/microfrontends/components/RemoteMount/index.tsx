'use client'

import clsx from 'clsx'
import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { CloudAlert, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
} from '@/components/ui/empty'
import RemoteLoaderService from '../../services/remoteLoaderService'
import type { IRemoteInstance, IRemoteProps } from '../../interfaces/IRemoteContract'
import type { TRemoteStatus } from '../../interfaces/TRemoteStatus'

interface RemoteMountProps {
    url: string
    props: IRemoteProps
    className?: string
    onStatusChange?: (status: TRemoteStatus) => void
}

export default function RemoteMount({ url, props, className, onStatusChange }: RemoteMountProps) {

    const elementRef = useRef<HTMLDivElement>(null)
    const instanceRef = useRef<IRemoteInstance | null>(null)

    const [status, setStatus] = useState<TRemoteStatus>('loading')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [attempt, setAttempt] = useState(0)

    const getProps = useEffectEvent(() => props)

    const changeStatus = useEffectEvent((nextStatus: TRemoteStatus) => {
        setStatus(nextStatus)
        onStatusChange?.(nextStatus)
    })

    useEffect(() => {
        const element = elementRef.current

        if (!element) return

        let cancelled = false
        let instance: IRemoteInstance | null = null

        RemoteLoaderService.load(url, attempt)
            .then(remote => {
                if (cancelled) return

                instance = remote.mount(element, getProps())
                instanceRef.current = instance

                changeStatus('ready')
            })
            .catch((error: Error) => {
                if (cancelled) return

                setErrorMessage(error.message)
                changeStatus('error')
            })

        return () => {
            cancelled = true

            instance?.unmount()
            instanceRef.current = null
        }
    }, [url, attempt])

    useEffect(() => {
        instanceRef.current?.update(props)
    }, [props])

    const retry = () => {
        setErrorMessage(null)
        setStatus('loading')
        onStatusChange?.('loading')
        setAttempt(value => value + 1)
    }

    return (

        <>
            {status === 'loading' && (
                <div
                    className={clsx('flex flex-col gap-6')}
                    aria-busy
                >
                    <div className={clsx('flex flex-col gap-2')}>
                        <Skeleton className={clsx('h-8 w-48')} />
                        <Skeleton className={clsx('h-4 w-80 max-w-full')} />
                    </div>

                    <div className={clsx('grid grid-cols-2 gap-4 lg:grid-cols-4')}>
                        {Array.from({ length: 4 }, (_, index) => (
                            <Skeleton
                                key={index}
                                className={clsx('h-24 rounded-xl')}
                            />
                        ))}
                    </div>

                    <Skeleton className={clsx('h-96 rounded-xl')} />
                </div>
            )}

            {status === 'error' && (
                <Empty className={clsx('border')}>
                    <EmptyHeader>
                        <EmptyMedia variant='icon'>
                            <CloudAlert />
                        </EmptyMedia>

                        <EmptyTitle>Microfrontend indisponível</EmptyTitle>
                        <EmptyDescription>{errorMessage}</EmptyDescription>
                    </EmptyHeader>

                    <EmptyContent>
                        <Button
                            variant='outline'
                            onClick={retry}
                        >
                            <RotateCw />
                            Tentar novamente
                        </Button>
                    </EmptyContent>
                </Empty>
            )}

            <div
                ref={elementRef}
                className={clsx(status !== 'ready' && 'hidden', className)}
                data-remote-url={url}
            />
        </>

    )

}

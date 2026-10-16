'use client'

import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { useTheme } from '@wrksz/themes/client'
import RemoteMount from '@/modules/microfrontends/components/RemoteMount'
import useRemoteEventsStore from '@/modules/microfrontends/store/remoteEventsStore'
import { remotes } from '@/modules/microfrontends/constants/remotes'
import { DEMO_USER, HOST_NAME } from '@/modules/microfrontends/constants/host'
import type { IRemoteProps } from '@/modules/microfrontends/interfaces/IRemoteContract'
import type { TRemoteStatus } from '@/modules/microfrontends/interfaces/TRemoteStatus'
import ProductsRemoteInfo from './components/RemoteInfo'
import ProductsEventLog from './components/EventLog'

export default function Products() {

    const { resolvedTheme } = useTheme()

    const pushEvent = useRemoteEventsStore(state => state.pushEvent)

    const [status, setStatus] = useState<TRemoteStatus>('loading')

    const remoteProps = useMemo<IRemoteProps>(() => ({
        hostName: HOST_NAME,
        theme: resolvedTheme === 'dark' ? 'dark' : 'light',
        user: DEMO_USER,
        onEvent: pushEvent
    }), [resolvedTheme, pushEvent])

    return (

        <>
            <div className={clsx('flex flex-col gap-6 xl:flex-row xl:items-start')}>
                <div className={clsx('flex-1 min-w-0')}>
                    <RemoteMount
                        url={remotes.products.url}
                        props={remoteProps}
                        onStatusChange={setStatus}
                    />
                </div>

                <aside className={clsx('flex flex-col gap-4 w-full xl:sticky xl:top-20 xl:w-80 xl:shrink-0')}>
                    <ProductsRemoteInfo
                        remote={remotes.products}
                        status={status}
                        props={remoteProps}
                    />

                    <ProductsEventLog />
                </aside>
            </div>
        </>

    )

}

export type TRemoteTheme = 'light' | 'dark'

export interface IRemoteUser {
    name: string
}

// remote -> host
export type TRemoteEvent =
    | { type: 'products:loaded', payload: { total: number } }
    | { type: 'product:created', payload: { id: string, name: string } }
    | { type: 'product:updated', payload: { id: string, name: string } }
    | { type: 'product:deleted', payload: { id: string, name: string } }

// host -> remote
export interface IRemoteProps {
    hostName?: string
    theme?: TRemoteTheme
    user?: IRemoteUser | null
    onEvent?: (event: TRemoteEvent) => void
}

export interface IRemoteInstance {
    update: (props: Partial<IRemoteProps>) => void
    unmount: () => void
}

export interface IRemoteModule {
    contractVersion: number
    mount: (element: HTMLElement, props?: IRemoteProps) => IRemoteInstance
}

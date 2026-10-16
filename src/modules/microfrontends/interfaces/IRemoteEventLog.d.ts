import type { TRemoteEvent } from './IRemoteContract'

export type IRemoteEventLog = TRemoteEvent & {
    id: string
    receivedAt: string
}

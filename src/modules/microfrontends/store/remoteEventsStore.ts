import { create } from 'zustand'
import type { TRemoteEvent } from '../interfaces/IRemoteContract'
import type { IRemoteEventLog } from '../interfaces/IRemoteEventLog'

const MAX_EVENTS = 30

interface IRemoteEventsState {
    events: IRemoteEventLog[]
    productsCount: number | null

    pushEvent: (event: TRemoteEvent) => void
    clearEvents: () => void
}

const useRemoteEventsStore = create<IRemoteEventsState>()((set) => ({
    events: [],
    productsCount: null,

    pushEvent: (event) => set(state => ({
        events: [
            { ...event, id: crypto.randomUUID(), receivedAt: new Date().toISOString() },
            ...state.events
        ].slice(0, MAX_EVENTS),
        productsCount: event.type === 'products:loaded' ? event.payload.total : state.productsCount
    })),
    clearEvents: () => set({ events: [] })
}))

export default useRemoteEventsStore

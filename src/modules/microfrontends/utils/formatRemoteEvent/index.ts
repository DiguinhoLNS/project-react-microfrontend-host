import type { TRemoteEvent } from '../../interfaces/IRemoteContract'

export default function formatRemoteEvent(event: TRemoteEvent) {
    switch (event.type) {
        case 'products:loaded':
            return `${event.payload.total} produtos carregados`
        case 'product:created':
            return `"${event.payload.name}" criado`
        case 'product:updated':
            return `"${event.payload.name}" atualizado`
        case 'product:deleted':
            return `"${event.payload.name}" excluído`
        default:
            return ''
    }
}

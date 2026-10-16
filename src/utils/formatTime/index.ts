const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
})

export default function formatTime(value: string | Date) {
    return timeFormatter.format(new Date(value))
}

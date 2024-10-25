export const orderBackground = (orderStatus: string) => {
    switch (orderStatus) {
        case 'pending':
            return 'bg-warning-background border-warning-text'
        case 'delivering':
            return 'bg-info-background border-info-text'
        case 'completed':
            return 'bg-success-background border-success-text'
        default:
            return 'bg-gray-200'
    }
}

export const orderStatusText = (orderStatus: string): { text: string, color: string } => {
    switch (orderStatus) {
        case 'pending':
            return { text: 'Pending', color: 'text-warning-text' }
        case 'delivering':
            return { text: 'Delivering', color: 'text-info-text' }
        case 'completed':
            return { text: 'Completed', color: 'text-success-text' }
        default:
            return { text: 'Unknown', color: 'text-gray-500' }
    }
}
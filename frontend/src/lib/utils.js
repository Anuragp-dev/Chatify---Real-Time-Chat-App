export function formatMessageTime(date) {

    return new Date(date).toLocaleString('en-US',
        {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
}
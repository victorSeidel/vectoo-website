const pad = (value: number): string => String(value).padStart(2, '0');

export function formatDatetime(rawDate: string): string
{
    const date = new Date(rawDate);
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} às ${pad(date.getHours())}h${pad(date.getMinutes())}`;
}

export function formatDistanceToNow(rawDate: string): string
{
    const date = new Date(rawDate);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffSeconds < 60) return 'há poucos segundos';

    if (diffMinutes < 60) return `há ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;

    if (diffHours < 24) return `há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;

    if (diffDays < 30) return `há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;

    if (diffMonths < 12) return `há ${diffMonths} mês${diffMonths > 1 ? 'es' : ''}`;

    return `há ${diffYears} ano${diffYears > 1 ? 's' : ''}`;
}

export function formatHour(timestampMs: number): string
{
    const date = new Date(timestampMs);
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
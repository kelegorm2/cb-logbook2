export function agoFromDate(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const months = days / 30;
    const years = months / 12;

    if (seconds < 60) {
        return `${Math.floor(seconds)} secs`;
    } else if (minutes < 60) {
        return `${Math.floor(minutes)} mins`;
    } else if (hours < 24) {
        return `${Math.floor(hours)} hour`;
    } else if (days < 30) {
        return `${Math.floor(days)} days`;
    } else if (months < 12) {
        return `${Math.floor(months)} month`;
    } else {
        return `${Math.floor(years)} years`;
    }
}
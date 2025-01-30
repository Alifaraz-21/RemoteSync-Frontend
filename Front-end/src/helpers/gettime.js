export function getTime(totalMinutes) {
    totalMinutes = Math.max(0, totalMinutes);  // Ensure non-negative values

    const days = Math.floor(totalMinutes / (24 * 60));
    const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
    const minutes = totalMinutes % 60;

    let timeString = '';

    if (days > 0) {
        timeString += `${days} days `;
    }
    if (hours > 0) {
        timeString += `${hours} hrs `;
    }
    if (minutes > 0 || (days === 0 && hours === 0)) {
        timeString += `${minutes} mins`;
    }

    return timeString.trim();
}

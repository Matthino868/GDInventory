// Convert dd/mm/yyyy string to Date object
export function parseDate(dateStr: string) {
    const [day, month, year] = dateStr.split("/");
    return new Date(+year, +month - 1, +day);
}

// Color coding for urgency
export function getStatusColor(days: number) {
    if (days === 0) return "bg-red-500";
    if (days <= 0) return "bg-orange-400";
    if (days <= 14) return "bg-yellow-400";
    return "bg-green-500";
}

export function daysUntilReorder(
    stockLeft: number,
    itemsSoldPerDay: number,
    deliveryTimeInDays: number
): number {
    const daysStockWillLast = stockLeft / itemsSoldPerDay;
    const daysLeftToOrder = daysStockWillLast - deliveryTimeInDays;
    return Math.max(0, Math.floor(daysLeftToOrder)); // never return negative, 0 means order immediately
}
export const isEqual = (a: any, b: any): boolean => {
    if (a === b) return true;

    if ((a === null || a === '') && (b === null || b === '')) return true;

    if (
        (a instanceof Date && typeof b === "string") ||
        (b instanceof Date && typeof a === "string")
    ) {
        const dateA = a instanceof Date ? a : new Date(a);
        const dateB = b instanceof Date ? b : new Date(b);
        if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
            return dateA.getTime() === dateB.getTime();
        }
        return false;
    }

    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    }

    if (typeof a !== typeof b) return false;

    if (typeof a === 'object' && a !== null && b !== null) {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);

        if (aKeys.length !== bKeys.length) return false;

        for (const key of aKeys) {
            if (!isEqual(a[key], b[key])) return false;
        }

        return true;
    }

    return false;
}
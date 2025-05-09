export const isEqual = (a: any, b: any): boolean => {
    if (a === b) return true;

    if ((a === null || a === '') && (b === null || b === '')) return true;


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
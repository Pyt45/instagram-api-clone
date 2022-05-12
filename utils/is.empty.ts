export const isEmpty = (s: string | undefined | null): boolean => {
    if (!s || typeof s == 'undefined' ||
    s.length === 0 || JSON.stringify(s) === '{}')
        return true;
    return false;
}
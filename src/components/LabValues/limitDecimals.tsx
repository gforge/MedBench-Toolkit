export const limitDecimals = (
    value?: number | string | null,
    decimals: number = 1
) => {
    if (value === undefined || value === null || value === '') {
        return '';
    }
    if (typeof value === 'string') {
        value = parseFloat(value);
    }
    if (isNaN(value)) {
        return '';
    }
    return Number(value.toFixed(decimals));
};

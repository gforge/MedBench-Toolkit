const prefix = '@@remember-';
export const getLocalItemFromRemember = <T>(key: string): T | null => {
    const item = window.localStorage.getItem(`${prefix}${key}`);
    return item ? JSON.parse(item) : null;
};

export const removeItemFromRemember = (key: string): void => {
    console.log(`${prefix}${key}`, prefix);
    window.localStorage.removeItem(`${prefix}${key}`);
};

export const setLocalItemToRemember = <T>(key: string, value: T): void =>
    window.localStorage.setItem(`${prefix}${key}`, JSON.stringify(value));

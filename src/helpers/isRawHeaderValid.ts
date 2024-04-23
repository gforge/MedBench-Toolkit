export const isRawHeaderValid = (header: string[]): boolean => {
    if (header.length !== 4) return false;

    const [date, time] = header.slice(1, 3);
    if (!/^20\d{2}-(0\d|1[0-2])-([0-2]\d|3[01])$/.test(date)) return false;

    return /^([01]\d|2[0-3])[:.][0-5]\d$/.test(time);
};

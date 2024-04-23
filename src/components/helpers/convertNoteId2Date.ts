export function convertNoteId2Date(noteId: string): Date {
    // Assert noteId is in the format of `${type}@${date}@${time}@${author}`
    const parts = noteId.split('@');
    if (parts.length !== 4) {
        throw new Error(`Invalid noteId: ${noteId}`);
    }
    const [date, time] = parts.slice(1, 3);
    // Date should be in the format of `YYYY-MM-DD`
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        throw new Error(`Invalid date: ${date}`);
    }
    // Time should be in the format of `HH:mm`
    if (!/^\d{2}:\d{2}$/.test(time)) {
        throw new Error(`Invalid time: ${time}`);
    }

    return new Date(`${date} ${time}`);
}

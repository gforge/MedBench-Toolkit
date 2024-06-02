import type { Note } from 'validators';

/**
 * Returns the note id based on the header.
 * If the header has an id, it is returned.
 * Otherwise, the id is generated from the date, time, and author.
 */
export function getNoteId(
    note: Pick<Note, 'date' | 'time' | 'author'> & { id?: string }
): string {
    if (note.id) return note.id;
    const { date, time, author } = note;
    return `${date}@${time}@${author}`;
}

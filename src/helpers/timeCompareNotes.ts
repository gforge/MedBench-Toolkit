import { getNoteDate } from './getNoteDate';

export function timeCompareNotes(): ((a: Note, b: Note) => number) | undefined {
    return (a, b) => (getNoteDate(a).isBefore(getNoteDate(b)) ? -1 : 1);
}

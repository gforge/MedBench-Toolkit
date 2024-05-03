import { ChartValue } from 'validators';

type NoteTypes =
    | {
          header: Omit<Header, 'id'> | Pick<Header, 'id'>;
      }
    | ChartValue;

export const isChartValue = (obj: NoteTypes): obj is ChartValue => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'type' in obj &&
        typeof obj.type === 'string' &&
        'date' in obj &&
        typeof obj.date === 'string' &&
        'time' in obj &&
        typeof obj.time === 'string' &&
        'author' in obj &&
        typeof obj.author === 'string' &&
        'content' in obj &&
        typeof obj.content === 'string' &&
        'timestamp' in obj &&
        obj.timestamp instanceof Date
    );
};

/**
 * Returns the note id based on the header.
 * If the header has an id, it is returned.
 * Otherwise, the id is generated from the date, time, and author.
 */
export function getNoteId(note: NoteTypes): string {
    if (isChartValue(note)) return `${note.date}@${note.time}@${note.author}`;

    const { header } = note;
    if ('id' in header) return header.id;
    const { date, time, author } = header;
    return `${date}@${time}@${author}`;
}

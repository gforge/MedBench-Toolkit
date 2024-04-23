/**
 * Returns the note id based on the header.
 * If the header has an id, it is returned.
 * Otherwise, the id is generated from the date, time, and author.
 */
export function getNoteId({
    header,
}: {
    header: Omit<Header, 'id'> | Pick<Header, 'id'>;
}): string {
    if ('id' in header) return header.id;
    const { date, time, author } = header;
    return `${date}@${time}@${author}`;
}

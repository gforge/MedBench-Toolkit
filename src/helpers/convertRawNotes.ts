import { RawConvertedNote } from './convertTextToRawNotes';
import { getNoteId } from './getNoteId';

export const convertRawNotes = (rawContent: RawConvertedNote[]): Note[] =>
    rawContent.map((note) => {
        const { header, content } = note;
        const headerBase: Omit<Note['header'], 'id'> = {
            type: header[0],
            date: header[1],
            time: header[2].replace('.', ':'),
            author: header[3],
        };

        return {
            header: {
                id: getNoteId({ header: headerBase }),
                ...headerBase,
            },
            content,
        };
    });

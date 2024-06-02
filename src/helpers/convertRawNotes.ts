import { Note, noteValidator } from 'validators';

import { RawConvertedNote } from './convertTextToRawNotes';

export const convertRawNotes = (rawContent: RawConvertedNote[]): Note[] =>
    rawContent.map((note) => {
        const { header, content } = note;
        const headerBase = {
            type: header[0],
            date: header[1],
            time: header[2].replace('.', ':'),
            author: header[3],
        };

        return noteValidator.validateSync({
            ...headerBase,
            content,
        });
    });

import {
    convertRawNotes,
    convertTextToRawNotes,
    isRawHeaderValid,
    RawConvertedNote,
} from 'helpers';
import React, { useCallback } from 'react';

export const usePasteHandler = ({
    setBadHeaders,
    onDrop,
    name,
    specialty,
}: {
    setBadHeaders: React.Dispatch<React.SetStateAction<string[]>>;
    onDrop: (args: { name: string; specialty: string; notes: Note[] }) => void;
    name: string;
    specialty: string;
}) =>
    useCallback(
        (text: string) => {
            if (!text) return;

            // Split on '# ' at the beginning of the line
            const rawNotes = convertTextToRawNotes(text);

            // Check if header is valid
            const invalidHeaders = rawNotes.filter(
                ({ header }) => !isRawHeaderValid(header)
            );
            if (invalidHeaders.length) {
                handleInvalidHeaders(invalidHeaders, setBadHeaders);
                return;
            } else {
                setBadHeaders([]);
            }

            const notes: Note[] = convertRawNotes(rawNotes);

            // Call the provided onDrop function with the extracted text
            onDrop({
                name,
                specialty,
                notes,
            });
        },
        [name, onDrop, setBadHeaders, specialty]
    );

const handleInvalidHeaders = (
    invalidHeaders: RawConvertedNote[],
    setBadHeaders: React.Dispatch<React.SetStateAction<string[]>>
) => {
    console.error(
        'Invalid headers:',
        invalidHeaders.map(({ rawHeader }) => rawHeader).join('\n')
    );

    // Warn that the first section should be a header
    if (
        invalidHeaders[0].index === 0 &&
        !invalidHeaders[0].rawHeader.startsWith('# ')
    ) {
        setBadHeaders(['First section should be a header starting with "# "']);
        return;
    }

    setBadHeaders(
        invalidHeaders.map(({ index, rawHeader }) => `[${index}]: ${rawHeader}`)
    );
};

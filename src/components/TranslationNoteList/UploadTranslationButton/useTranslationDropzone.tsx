import {
    convertRawNotes,
    convertTextToRawNotes,
    isRawHeaderValid,
} from 'helpers';
import { useDropzone } from 'react-dropzone';

export const useTranslationDropzone = ({
    setError,
    setTranslation,
    setLanguage,
}: {
    setError: (s: string | null) => void;
    setTranslation: (n: Note[]) => void;
    setLanguage: (s: string) => void;
}) => {
    return useDropzone({
        noClick: true,
        noKeyboard: true,
        accept: {
            'text/html': ['.md'],
        },
        maxFiles: 1,
        onDrop(acceptedFiles) {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = () => {
                const translation = reader.result as string;
                // Check if the file is valid
                const rawNotes = convertTextToRawNotes(translation);
                const invalidHeaders = rawNotes.filter(
                    ({ header }) => !isRawHeaderValid(header)
                );
                if (invalidHeaders.length) {
                    setError(
                        invalidHeaders
                            .map(
                                ({ index, rawHeader }) =>
                                    `[${index + 1}]: ${rawHeader}`
                            )
                            .join('\n')
                    );
                    return;
                }
                const notes = convertRawNotes(rawNotes);
                setTranslation(notes);
                // Extract language from file name, pick last element
                const sections = file.name.split('_');
                const language = sections[sections.length - 1].replace(
                    /\.md$/,
                    ''
                );
                setLanguage(language);
            };
            reader.readAsText(file);
        },
    });
};

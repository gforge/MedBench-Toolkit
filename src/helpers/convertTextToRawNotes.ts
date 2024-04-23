export type RawConvertedNote = {
    index: number;
    rawHeader: string;
    header: string[];
    content: string;
};

export const convertTextToRawNotes = (text: string): RawConvertedNote[] =>
    text
        .split(/(^|\n)# /g)
        .filter((note) => !!note && note !== '\n')
        .map((note, index) => {
            const [header, ...content] = note.split('\n');
            return {
                index,
                rawHeader: header,
                header: header
                    .trim()
                    .split(',')
                    .map((item) => item.trim()),
                content: content.join('\n').trim(),
            };
        });

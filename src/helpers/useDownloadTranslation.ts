import { useCallback } from 'react';

/**
 * Custom hook that provides a function to download a translated chart as a Markdown file.
 *
 * @param translatedRawNotes - The array of translated notes.
 * @param language - The language of the translation.
 * @param chartId - The ID of the chart.
 * @returns An object containing the `downloadTranslatedChart` function.
 */
export const useDownloadTranslation = ({
    translatedRawNotes,
    language,
    chartId,
}: {
    translatedRawNotes: Note[];
    language: string | undefined;
    chartId: string | undefined;
}) => {
    const downloadTranslatedChart = useCallback(() => {
        // Create a new chart object with the translated notes
        const translatedChart = translatedRawNotes
            .map(({ header: { type, date, time, author }, content }) => {
                const headerStr = `# ${type}, ${date}, ${time}, ${author}`;
                return `${headerStr}\n${content}`;
            })
            .join('\n\n');

        // Create a new file object
        const blob = new Blob([translatedChart], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${chartId ?? '?'}_${language ?? '?'}.md`;
        a.click();
        URL.revokeObjectURL(url);
    }, [chartId, language, translatedRawNotes]);

    return { downloadTranslatedChart };
};

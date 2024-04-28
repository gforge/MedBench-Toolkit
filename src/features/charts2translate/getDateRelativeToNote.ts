import { Dayjs } from 'dayjs';
import { getNoteDate } from 'helpers';

export function getDateRelativeToNote({
    chart,
    language,
    noteIndex,
    position,
}: {
    chart: Chart;
    language: string;
    noteIndex: number;
    position: string;
}): Dayjs {
    const existingNote = chart.translations[language][noteIndex];
    const currentDate = getNoteDate(existingNote);
    const otherNote =
        chart.translations[language][
            position === 'before' ? noteIndex - 1 : noteIndex + 1
        ];
    // Add note either before or after the existing note using dayjs
    if (!otherNote) {
        if (position === 'before') {
            return currentDate.add(-1, 'day');
        }
        return currentDate.add(1, 'day');
    }

    const otherDate = getNoteDate(otherNote);
    // Get date halfway between the two notes
    return currentDate.add(otherDate.diff(currentDate) / 2, 'millisecond');
}

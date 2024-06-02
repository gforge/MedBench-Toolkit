import { Dayjs } from 'dayjs';
import { getNoteDate } from 'helpers';
import { Chart } from 'validators';

export function getDateRelativeToNote({
    chart,
    noteIndex,
    position,
}: {
    chart: Chart;
    noteIndex: number;
    position: string;
}): Dayjs {
    const existingNote = chart.notes[noteIndex];
    const currentDate = getNoteDate(existingNote);
    const otherNote =
        chart.notes[position === 'before' ? noteIndex - 1 : noteIndex + 1];
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

import { PayloadAction } from '@reduxjs/toolkit';
import { getChartId, getNoteId, timeCompareNotes } from 'helpers';
import { Note } from 'validators';

import { ChartsState } from '../types';

export const updateChart = (
    state: ChartsState,
    action: PayloadAction<{
        note: Note;
        id: string;
    }>
) => {
    const { id, note } = action.payload;
    const chart = state.charts.find((chart) => getChartId(chart) === id);

    if (!chart) {
        return;
    }

    const noteIndex = chart.notes.findIndex(
        (n) => getNoteId(n) === getNoteId(note)
    );
    if (noteIndex === -1) {
        return;
    }
    chart.notes[noteIndex] = note;
    chart.notes.sort(timeCompareNotes());
};

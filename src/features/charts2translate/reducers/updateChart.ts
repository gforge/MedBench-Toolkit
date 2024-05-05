import { PayloadAction } from '@reduxjs/toolkit';
import { getChartId, getNoteId, timeCompareNotes } from 'helpers';

import { ChartsState } from '../types';

export const updateChart = (
    state: ChartsState,
    action: PayloadAction<{
        note: Note;
        id: string;
        language: string;
    }>
) => {
    const { id, language, note } = action.payload;
    const chart = state.charts.find((chart) => getChartId(chart) === id);

    if (!chart) {
        return;
    }

    if (!chart.translations[language]) {
        chart.translations[language] = chart.originalNotes.map((n) => ({
            header: { ...n.header },
            content: '',
        }));
    }

    const noteIndex = chart.translations[language].findIndex(
        (n) => getNoteId(n) === getNoteId(note)
    );
    if (noteIndex === -1) {
        return;
    }
    chart.translations[language][noteIndex] = note;
    chart.translations[language].sort(timeCompareNotes());
};

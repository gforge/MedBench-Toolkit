import { PayloadAction } from '@reduxjs/toolkit';
import { getChartId, getNoteId, timeCompareNotes } from 'helpers';

import { ChartsState } from '../types';

export const reInsertDeletedNote = (
    state: ChartsState,
    action: PayloadAction<{
        chartId: string;
        noteId: string;
        language: string;
    }>
) => {
    const { chartId, noteId, language } = action.payload;
    const chart = state.charts.find((c) => getChartId(c) === chartId);
    if (!chart) {
        return;
    }
    const deletedNote = chart.originalNotes.find(
        (n) => getNoteId(n) === noteId
    );
    if (!deletedNote) {
        return;
    }

    // Should not be possible
    if (!chart.translations[language]) {
        chart.translations[language] = chart.originalNotes.map((n) => ({
            header: { ...n.header },
            content: '',
        }));
        return;
    }
    const exists = chart.translations[language].find(
        (n) => getNoteId(n) === noteId
    );
    if (exists) {
        return;
    }

    chart.translations[language].push({
        header: { ...deletedNote.header },
        content: '',
    });

    chart.translations[language].sort(timeCompareNotes());
};

import { PayloadAction } from '@reduxjs/toolkit';
import { getChartId, getNoteId, timeCompareNotes } from 'helpers';

import { ChartsState } from '../types';

export const deleteChartNote = (
    state: ChartsState,
    payload: PayloadAction<{
        chartId: string;
        noteId: string;
        language: string;
    }>
) => {
    const { chartId, noteId, language } = payload.payload;
    const chart = state.charts.find((c) => getChartId(c) === chartId);
    if (!chart) {
        return;
    }
    chart.translations[language] = chart.translations[language].filter(
        (n) => getNoteId(n) !== noteId
    );
    // sort the notes by date
    chart.translations[language].sort(timeCompareNotes());
};

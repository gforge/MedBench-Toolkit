import { PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'features';
import { getChartId, getNoteId, timeCompareNotes } from 'helpers';

import type { ChartsState } from '../types';

export const deleteChartNote = (
    state: ChartsState,
    payload: PayloadAction<{
        chartId: string;
        noteId: string;
        user: User;
    }>
) => {
    const { chartId, noteId, user } = payload.payload;
    const chartIndex = state.charts.findIndex((c) => getChartId(c) === chartId);
    if (chartIndex === -1) {
        console.error('Chart not found');
        return;
    }

    const chart = state.charts[chartIndex];
    if (chart.createdBy !== user.userMainEmail && user.type !== 'admin') {
        console.error('User not allowed to delete note');
        return;
    }

    state.charts[chartIndex].notes = chart.notes
        .filter((n) => getNoteId(n) !== noteId)
        .sort(timeCompareNotes());
};

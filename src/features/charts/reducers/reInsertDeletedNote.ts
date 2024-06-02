import { PayloadAction } from '@reduxjs/toolkit';
import { getChartId, getNoteId, timeCompareNotes } from 'helpers';
import { noteValidator } from 'validators';

import type { ChartsState } from '../types';

export const reInsertDeletedNote = (
    state: ChartsState,
    action: PayloadAction<{
        targetChartId: string;
        sourceChartId: string;
        noteId: string;
    }>
) => {
    const { targetChartId, sourceChartId, noteId } = action.payload;
    const chart = state.charts.find((c) => getChartId(c) === sourceChartId);
    if (!chart) {
        console.error('Source chart not found');
        return;
    }
    const targetChartIndex = state.charts.findIndex(
        (c) => getChartId(c) === targetChartId
    );
    if (targetChartIndex === -1) {
        console.error('Target chart not found');
        return;
    }
    const deletedNote = chart.notes.find((n) => getNoteId(n) === noteId);
    if (!deletedNote) {
        console.error('Note not found');
        return;
    }

    const exists = state.charts[targetChartIndex].notes.find(
        (n) => getNoteId(n) === noteId
    );
    if (exists) {
        console.error('Note already exists');
        return;
    }

    try {
        state.charts[targetChartIndex].notes.push(
            noteValidator.validateSync({
                ...deletedNote,
                content: '',
            })
        );
        state.charts[targetChartIndex].notes.sort(timeCompareNotes());
    } catch (e) {
        console.error(`Failed to validate the new note: ${e}`);
        return;
    }
};

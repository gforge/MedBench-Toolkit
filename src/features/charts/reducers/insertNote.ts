import { PayloadAction } from '@reduxjs/toolkit';
import { getChartId, getNoteId, timeCompareNotes } from 'helpers';
import { Note, noteValidator } from 'validators';

import { getDateRelativeToNote } from '../getDateRelativeToNote';
import type { ChartsState } from '../types';

export const insertNote = (
    state: ChartsState,
    action: PayloadAction<{
        chartId: string;
        noteId: string;
        position: 'before' | 'after';
        type: string;
        author: string;
    }>
) => {
    const { chartId, noteId, position, type, author } = action.payload;
    const chart = state.charts.find((c) => getChartId(c) === chartId);
    if (!chart) {
        return;
    }
    const noteIndex = chart.notes.findIndex((n) => getNoteId(n) === noteId);
    if (noteIndex === -1) {
        return;
    }
    // Find the two notes and insert a new note between them
    const shiftedDate = getDateRelativeToNote({
        chart,
        noteIndex,
        position,
    });
    try {
        const newNote: Note = noteValidator.validateSync({
            type,
            date: shiftedDate.format('YYYY-MM-DD'),
            time: shiftedDate.format('HH:mm'),
            author,
            content: '',
        });
        chart.notes.push(newNote);
    } catch (e) {
        console.error(`Failed to validate the new note: ${e}`);
        return;
    }

    // sort the notes by date
    chart.notes.sort(timeCompareNotes());
};

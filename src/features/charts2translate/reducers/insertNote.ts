import { PayloadAction } from '@reduxjs/toolkit';
import { getChartId, getNoteId, timeCompareNotes } from 'helpers';

import { getDateRelativeToNote } from '../getDateRelativeToNote';
import { ChartsState } from '../types';

export const insertNote = (
    state: ChartsState,
    action: PayloadAction<{
        chartId: string;
        noteId: string;
        language: string;
        position: 'before' | 'after';
        type: string;
        author: string;
    }>
) => {
    const { chartId, language, noteId, position, type, author } =
        action.payload;
    const chart = state.charts.find((c) => getChartId(c) === chartId);
    if (!chart) {
        return;
    }
    const noteIndex = chart.translations[language].findIndex(
        (n) => getNoteId(n) === noteId
    );
    if (noteIndex === -1) {
        return;
    }
    // Find the two notes and insert a new note between them
    const shiftedDate = getDateRelativeToNote({
        chart,
        language,
        noteIndex,
        position,
    });
    const newNote: Note = {
        header: {
            id: `New_note_${Math.random().toString()}`,
            type,
            date: shiftedDate.format('YYYY-MM-DD'),
            time: shiftedDate.format('HH:mm'),
            author,
        },
        content: '',
    };
    chart.translations[language].push(newNote);

    // sort the notes by date
    chart.translations[language].sort(timeCompareNotes());
};

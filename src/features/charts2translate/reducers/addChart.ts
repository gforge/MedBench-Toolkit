import { PayloadAction } from '@reduxjs/toolkit';

import { ChartsState } from '../types';

export const addChart = (
    state: ChartsState,
    action: PayloadAction<{
        name: string;
        specialty: string;
        notes: Note[];
    }>
) => {
    state.charts.push({
        name: action.payload.name,
        specialty: action.payload.specialty,
        originalNotes: action.payload.notes,
        translations: {},
    });
};

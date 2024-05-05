import { PayloadAction } from '@reduxjs/toolkit';
import { getChartId } from 'helpers';

import { ChartsState } from '../types';

export const renameChart = (
    state: ChartsState,
    action: PayloadAction<{
        id: string;
        name?: string;
        specialty?: string;
    }>
) => {
    const { id, name, specialty } = action.payload;
    if (!name && !specialty) {
        return;
    }
    const chart = state.charts.find((c) => getChartId(c) === id);
    if (!chart) {
        return;
    }
    if (specialty) {
        chart.specialty = specialty;
    }
    if (name) {
        chart.name = name;
    }
};

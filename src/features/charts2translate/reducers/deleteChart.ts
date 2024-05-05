import { PayloadAction } from '@reduxjs/toolkit';
import { getChartId } from 'helpers';

import { ChartsState } from '../types';

export const deleteChart = (
    state: ChartsState,
    {
        payload: { id, language },
    }: PayloadAction<{ id: string; language?: string }>
) => {
    if (language) {
        const chart = state.charts.find((c) => getChartId(c) === id);
        if (!chart) {
            return;
        }
        delete chart.translations[language];
        return;
    }
    state.charts = state.charts.filter((c) => getChartId(c) !== id);
};

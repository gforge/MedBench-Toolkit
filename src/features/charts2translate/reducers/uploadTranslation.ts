import { PayloadAction } from '@reduxjs/toolkit';
import { getChartId } from 'helpers';

import { ChartsState } from '../types';

export const uploadTranslation = (
    state: ChartsState,
    action: PayloadAction<{
        id: string;
        language: string;
        translation: Note[];
    }>
) => {
    const { id, language, translation } = action.payload;
    const chart = state.charts.find((c) => getChartId(c) === id);
    if (!chart) {
        return;
    }
    chart.translations[language] = translation;
};

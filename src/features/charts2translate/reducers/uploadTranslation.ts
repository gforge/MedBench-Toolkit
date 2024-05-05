import { PayloadAction } from '@reduxjs/toolkit';
import { getChartId } from 'helpers';

import { ChartsState } from '../types';

export type NewTranslation = {
    id: string;
    language: string;
    translation: Note[];
};

export const uploadTranslation = (
    state: ChartsState,
    action: PayloadAction<NewTranslation>
) => {
    const { id, language, translation } = action.payload;
    const chart = state.charts.find((c) => getChartId(c) === id);
    if (!chart) {
        return;
    }
    chart.translations[language] = translation;
};

export const uploadTranslations = (
    state: ChartsState,
    action: PayloadAction<NewTranslation[]>
) => {
    action.payload.forEach(({ id, language, translation }) => {
        const chart = state.charts.find((c) => getChartId(c) === id);
        console.log(chart, id, language, translation);
        if (!chart) {
            return;
        }
        if (chart.translations[language]) {
            console.warn(
                `Chart ${id} already has a translation for language ${language}`
            );
            return;
        }
        chart.translations[language] = translation;
    });
};

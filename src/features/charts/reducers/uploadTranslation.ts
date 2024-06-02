import type { PayloadAction } from '@reduxjs/toolkit';
import { getChartId } from 'helpers';
import type { Note } from 'validators';

import type { ChartsState } from '../types';

export type NewTranslation = {
    id: string;
    language: string;
    translation: Note[];
    createdBy: string;
};

export const uploadTranslation = (
    state: ChartsState,
    action: PayloadAction<NewTranslation>
) => {
    const { id, language, translation, createdBy } = action.payload;
    const chart = state.charts.find((c) => getChartId(c) === id);
    if (!chart) {
        console.warn(`Chart ${id} not found`);
        return;
    }
    const { specialty, name } = chart;
    const newId = getChartId({ specialty, name, language });
    if (state.charts.find((c) => getChartId(c) === newId)) {
        console.warn(`Chart ${newId} already exists`);
        return;
    }
    state.charts.push({
        id: newId,
        specialty,
        name,
        language,
        notes: translation,
        medications: [],
        lab: [],
        createdBy,
    });
};

export const uploadTranslations = (
    state: ChartsState,
    action: PayloadAction<{ createdBy: string; translations: NewTranslation[] }>
) => {
    action.payload.translations.forEach(({ id, language, translation }) => {
        const chart = state.charts.find((c) => getChartId(c) === id);
        if (!chart) {
            return;
        }
        const { specialty, name } = chart;
        const newId = getChartId({ specialty, name, language });
        if (state.charts.find((c) => getChartId(c) === newId)) {
            console.warn(`Chart ${newId} already exists`);
            return;
        }
        state.charts.push({
            id: newId,
            specialty,
            name,
            language,
            notes: translation,
            medications: [],
            lab: [],
            createdBy: action.payload.createdBy,
        });
    });
};

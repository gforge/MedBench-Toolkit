import { PayloadAction } from '@reduxjs/toolkit';

import { getChartId } from '../../../helpers';
import { ChartsState } from '../types';

export type NewChart2Translate = {
    name: string;
    specialty: string;
    notes: Note[];
    translations?: Record<string, Note[]>;
};

const convertNewChartToTranslationChart = ({
    name,
    specialty,
    notes: originalNotes,
    translations = {},
}: NewChart2Translate) => ({
    name,
    specialty,
    originalNotes,
    translations,
});

export const addChart = (
    state: ChartsState,
    action: PayloadAction<NewChart2Translate>
) => {
    state.charts.push(convertNewChartToTranslationChart(action.payload));
};

export const addCharts = (
    state: ChartsState,
    action: PayloadAction<NewChart2Translate[]>
) => {
    const nonExistenceCharts = action.payload.filter(
        (c) =>
            !state.charts.some((chart) => getChartId(chart) === getChartId(c))
    );

    state.charts.push(
        ...nonExistenceCharts.map(convertNewChartToTranslationChart)
    );

    // Sort based on specialty and name
    state.charts.sort((a, b) => {
        if (a.specialty === b.specialty) {
            return a.name.localeCompare(b.name);
        }
        return a.specialty.localeCompare(b.specialty);
    });

    if (nonExistenceCharts.length !== action.payload.length) {
        console.error('Some charts already exist in the store');
    }
};

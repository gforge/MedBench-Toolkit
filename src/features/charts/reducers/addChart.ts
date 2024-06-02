import { PayloadAction } from '@reduxjs/toolkit';
import { getChartId } from 'helpers';
import { Chart, chartValidator, Note } from 'validators';

import type { ChartsState } from '../types';

export type NewChart = {
    name: string;
    specialty: string;
    notes: Note[];
    translations?: Record<string, Note[]>;
};

const convertNewChartToCharts = ({
    name,
    specialty,
    notes: originalNotes,
    translations = {},
}: NewChart): Chart[] =>
    [
        {
            name,
            specialty,
            language: 'original',
            notes: originalNotes,
        },
        ...Object.entries(translations).map(([language, notes]) => ({
            name,
            specialty,
            language,
            notes,
        })),
    ].map((chart): Chart => chartValidator.validateSync(chart));

export const addChart = (
    state: ChartsState,
    action: PayloadAction<{
        createdBy: string;
        chart2translate: NewChart;
    }>
) => {
    const { createdBy, chart2translate } = action.payload;
    state.charts.push(
        ...convertNewChartToCharts(chart2translate).map((c) => ({
            ...c,
            createdBy,
        }))
    );
};

export const addCharts = (
    state: ChartsState,
    action: PayloadAction<{
        createdBy: string;
        charts: NewChart[];
    }>
) => {
    const { createdBy, charts } = action.payload;
    const allNewCharts = charts.flatMap((c) =>
        convertNewChartToCharts(c).map((chart) => ({
            ...chart,
            createdBy,
        }))
    );
    const nonExistenceCharts = allNewCharts.filter(
        (c) =>
            !state.charts.some((chart) => getChartId(chart) === getChartId(c))
    );
    if (nonExistenceCharts.length === 0) {
        return;
    }
    state.charts.push(...nonExistenceCharts);

    // Sort based on specialty, then id, then language
    state.charts.sort((a, b) => {
        if (a.specialty === b.specialty) {
            if (a.id === b.id) {
                return a.language.localeCompare(b.language);
            }
            return a.id.localeCompare(b.id);
        }
        return a.specialty.localeCompare(b.specialty);
    });

    if (nonExistenceCharts.length !== allNewCharts.length) {
        console.error('Some charts already exist in the store');
    }
};

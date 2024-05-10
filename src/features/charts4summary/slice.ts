import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getChartId } from 'helpers';
import { FullChart2Summarise } from 'validators';

interface ChartsState {
    charts: FullChart2Summarise[];
    summary: Record<string, string>;
    version: string;
}

const initialState: ChartsState = {
    charts: [],
    summary: {},
    version: '-1',
};

export const {
    reducer: charts4summaryReducer,
    actions: charts4summaryActions,
} = createSlice({
    name: 'charts4summary',
    initialState,
    reducers: {
        initStore: (
            state,
            action: PayloadAction<{
                charts: FullChart2Summarise[];
                version: string;
            }>
        ) => {
            state.charts = action.payload.charts;
            state.version = action.payload.version;
        },
        addCharts: (state, action: PayloadAction<FullChart2Summarise[]>) => {
            const newCharts = action.payload.filter(
                (chart) =>
                    !state.charts.some(
                        (chart4summary) =>
                            getChartId(chart4summary) === getChartId(chart)
                    )
            );
            state.charts.push(...newCharts);
            if (newCharts.length !== action.payload.length) {
                console.warn('Some summary charts were not added');
            }
        },
        summarise: (
            state,
            action: PayloadAction<{ id: string; text?: string }>
        ) => {
            if (!action.payload.text) {
                delete state.summary[action.payload.id];
                return;
            }
            state.summary[action.payload.id] = action.payload.text;
        },
    },
});

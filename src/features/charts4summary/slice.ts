// features/charts/chartsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
        summarise: (
            state,
            action: PayloadAction<{ id: string; text: string }>
        ) => {
            state.summary[action.payload.id] = action.payload.text;
        },
    },
});

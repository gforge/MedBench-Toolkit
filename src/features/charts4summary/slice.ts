// features/charts/chartsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FullChart2Summarise } from 'validators';

interface ChartsState {
    charts: FullChart2Summarise[];
}

const initialState: ChartsState = {
    charts: [],
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
            action: PayloadAction<{ charts: FullChart2Summarise[] }>
        ) => {
            state.charts = action.payload.charts;
        },
    },
});

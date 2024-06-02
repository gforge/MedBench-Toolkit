import { createSlice } from '@reduxjs/toolkit';

import {
    addChart,
    addCharts,
    deleteChart,
    deleteChartNote,
    initStore,
    insertNote,
    reInsertDeletedNote,
    renameChart,
    updateChart,
    uploadTranslation,
    uploadTranslations,
} from './reducers';
import { ChartsState } from './types';

const initialState: ChartsState = {
    charts: [],
    version: '-1', // Replaced on the first load of data
};

export const chartsSlice = createSlice({
    name: 'charts',
    initialState,
    reducers: {
        addChart,
        addCharts,
        deleteChart,
        deleteChartNote,
        initStore,
        insertNote,
        reInsertDeletedNote,
        renameChart,
        updateChart,
        uploadTranslation,
        uploadTranslations,
    },
});

export const chartsActions = chartsSlice.actions;
export const chartsReducer = chartsSlice.reducer;

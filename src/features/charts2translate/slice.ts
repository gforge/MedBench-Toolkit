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
};

export const chartsSlice = createSlice({
    name: 'charts2translate',
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

export const charts2translateActions = chartsSlice.actions;
export const charts2translateReducer = chartsSlice.reducer;

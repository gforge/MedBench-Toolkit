import { createSlice } from '@reduxjs/toolkit';

import {
    addChart,
    deleteChart,
    deleteChartNote,
    initStore,
    insertNote,
    reInsertDeletedNote,
    renameChart,
    updateChart,
    uploadTranslation,
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
        deleteChart,
        deleteChartNote,
        initStore,
        insertNote,
        reInsertDeletedNote,
        renameChart,
        updateChart,
        uploadTranslation,
    },
});

export const charts2translateActions = chartsSlice.actions;
export const charts2translateReducer = chartsSlice.reducer;

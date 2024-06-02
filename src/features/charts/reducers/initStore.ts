import type { PayloadAction } from '@reduxjs/toolkit';
import type { Chart } from 'validators';

import type { ChartsState } from '../types';

export const initStore = (
    state: ChartsState,
    action: PayloadAction<{
        createdBy: string;
        charts: Chart[];
        version: string;
    }>
) => {
    state.charts = action.payload.charts.map((c) => ({
        ...c,
        createdBy: action.payload.createdBy,
    }));
    state.version = action.payload.version;
};

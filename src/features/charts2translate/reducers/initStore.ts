import { PayloadAction } from '@reduxjs/toolkit';

import { ChartsState } from '../types';

export const initStore = (
    state: ChartsState,
    action: PayloadAction<{ charts: Chart[] }>
) => {
    state.charts = action.payload.charts;
};

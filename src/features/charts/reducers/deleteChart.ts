import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'features';
import { getChartId } from 'helpers';

import type { ChartsState } from '../types';

export const deleteChart = (
    state: ChartsState,
    {
        payload: { id, user },
    }: PayloadAction<{ id: string; language?: string; user: User }>
) => {
    const chart2delete = state.charts.findIndex((c) => getChartId(c) === id);
    if (chart2delete === -1) {
        return;
    }
    const chart = state.charts[chart2delete];
    if (chart.createdBy !== user.userMainEmail && user.type !== 'admin') {
        return;
    }
    state.charts = state.charts.filter((c) => getChartId(c) !== id);
};

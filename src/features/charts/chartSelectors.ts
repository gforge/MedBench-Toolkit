// features/charts/chartsSlice.ts
import { getChartId } from 'helpers';
import type { RootState } from 'store';

export const selectCharts = (state: RootState) => state.charts.charts;
export const selectChart = (
    state: RootState,
    id: string | undefined
): Chart | null => {
    if (!id) {
        return null;
    }
    const chart = state.charts.charts.find((c) => getChartId(c) === id);
    if (!chart) {
        return null;
    }
    return chart;
};

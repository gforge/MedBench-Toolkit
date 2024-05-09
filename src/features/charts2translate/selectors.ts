import { getChartId } from 'helpers';
import type { RootState } from 'store';

export const selectTranslationCharts = (state: RootState) =>
    state.charts2translate.charts;

export const selectTranslationChart = (
    state: RootState,
    id: string | undefined
): Chart | null => {
    if (!id) {
        return null;
    }
    const chart = state.charts2translate.charts.find(
        (c) => getChartId(c) === id
    );
    if (!chart) {
        return null;
    }
    return chart;
};

// features/charts/chartsSlice.ts
import { getChartId } from 'helpers';
import { createSelector } from 'reselect';
import type { RootState } from 'store';
import { FullChart2Summarise } from 'validators';

export const selectCharts = (state: RootState) => state.charts4summary?.charts;
export const selectSummary = (state: RootState) =>
    state.charts4summary?.summary;
export const selectVersion = (state: RootState) =>
    state.charts4summary?.version;

export const selectSummaryCharts = createSelector(
    [selectCharts, selectVersion],
    (charts, version) => ({
        charts,
        version,
    })
);

type Chart4Summary = {
    chart: FullChart2Summarise;
    summary: string;
    version: string;
};

export const selectSummaryChart = createSelector(
    [
        selectCharts,
        selectSummary,
        selectVersion,
        (_, id: string | undefined) => id,
    ],
    (charts, summary, version, id): Chart4Summary | null => {
        if (!id) return null;

        const chart = charts.find((c) => getChartId(c) === id);
        if (!chart) return null;

        const chartSummary = summary[id];
        return {
            chart,
            summary: chartSummary ?? '',
            version,
        };
    }
);

// features/charts/chartsSlice.ts
import { getChartId } from 'helpers';
import type { RootState } from 'store';
import { FullChart2Summarise } from 'validators';

export const selectSummaryCharts = (state: RootState) =>
    state.charts4summary.charts;

export const selectSummaryChart =
    (id: string | undefined) =>
    (
        state: RootState
    ): { chart: FullChart2Summarise; summary: string } | null => {
        if (!id) {
            return null;
        }

        const chart = state.charts4summary.charts.find(
            (c) => getChartId(c) === id
        );
        if (!chart) {
            return null;
        }

        const summary = state.charts4summary.summary[id];
        return {
            chart,
            summary: summary ?? '',
        };
    };

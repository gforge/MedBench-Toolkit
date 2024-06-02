import { selectCharts } from 'features/charts';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import type { Chart } from 'validators';

import type { Summary } from './slice';

export const selectSummaries = (state: RootState) => state.summaries?.summaries;

export const useSummary = ({
    chartId,
    summaryId,
}: {
    chartId: string | undefined;
    summaryId: string;
}) => {
    const summaries = useSelector(selectSummaries);
    if (!chartId) return undefined;

    return summaries.find(
        (s) => s.chartId === chartId && s.summaryId === summaryId
    );
};

export const useReveiwSummaries = (): {
    chart: Chart;
    summaries: Summary[];
}[] => {
    const summaries = useSelector(selectSummaries);
    const charts = useSelector(selectCharts);

    return charts.map((chart) => ({
        chart,
        summaries: summaries.filter((s) => s.chartId === chart.id),
    }));
};

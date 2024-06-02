import type { Chart } from 'validators';

export type SummariseFn = (args: { chartId: string }) => unknown;

export interface SummaryChartListRowProps {
    chart: Chart;
    summarise: SummariseFn;
}

export interface SummaryChartListProps
    extends Omit<SummaryChartListRowProps, 'chart'> {
    charts: Chart[];
}

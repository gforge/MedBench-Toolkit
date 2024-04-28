import { FullChart2Summarise } from 'validators';

export type SummariseFn = (args: string) => unknown;
export interface SummaryChartListRowProps {
    chart: FullChart2Summarise;
    summarise: SummariseFn;
}

export interface SummaryChartListProps
    extends Omit<SummaryChartListRowProps, 'chart'> {
    charts: FullChart2Summarise[];
}

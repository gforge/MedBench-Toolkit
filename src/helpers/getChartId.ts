import { NewChart2Translate, ReviewChart } from 'features';
import { FullChart2Review, FullChart2Summarise } from 'validators';

type AnyChart =
    | Chart
    | FullChart2Summarise
    | NewChart2Translate
    | FullChart2Review
    | ReviewChart;
/**
 * Chart has a language property
 *
 * @param chart
 * @returns
 */
const isLanguageChart = (
    chart: AnyChart
): chart is FullChart2Summarise | FullChart2Review => {
    return (
        Object.hasOwn(chart, 'case_id') &&
        Object.hasOwn(chart, 'specialty') &&
        Object.hasOwn(chart, 'chart')
    );
};

const isReviewChart = (chart: AnyChart): chart is ReviewChart => {
    return (
        Object.hasOwn(chart, 'type') &&
        Object.hasOwn(chart, 'chart') &&
        Object.hasOwn(chart, 'review')
    );
};

export const getChartId = (
    chart:
        | Chart
        | NewChart2Translate
        | FullChart2Summarise
        | FullChart2Review
        | ReviewChart
): string => {
    if (isReviewChart(chart)) {
        return getChartId(chart.chart);
    }

    if (isLanguageChart(chart)) {
        return `${chart.specialty}_${chart.case_id}_${chart.language}`.replaceAll(
            ' ',
            '_'
        );
    }

    return `${chart.specialty}_${chart.name}`.replaceAll(' ', '_');
};

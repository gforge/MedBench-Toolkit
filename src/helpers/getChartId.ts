import { FullChart2Summarise } from 'validators';

const isTranslationChart = (
    chart: Chart | FullChart2Summarise
): chart is FullChart2Summarise => {
    return (
        Object.hasOwn(chart, 'case_id') &&
        Object.hasOwn(chart, 'specialty') &&
        Object.hasOwn(chart, 'chart')
    );
};

export const getChartId = (chart: Chart | FullChart2Summarise) => {
    if (isTranslationChart(chart)) {
        return chart.case_id;
    }

    return `${chart.specialty}_${chart.name}`;
};

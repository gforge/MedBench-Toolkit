import { FullChart2Summarise } from 'validators';

import { NewChart2Translate } from '../features/charts2translate/reducers';

const isSummaryChart = (
    chart: Chart | FullChart2Summarise | NewChart2Translate
): chart is FullChart2Summarise => {
    return (
        Object.hasOwn(chart, 'case_id') &&
        Object.hasOwn(chart, 'specialty') &&
        Object.hasOwn(chart, 'chart')
    );
};

export const getChartId = (
    chart: Chart | NewChart2Translate | FullChart2Summarise
) => {
    if (isSummaryChart(chart)) {
        return `${chart.specialty}_${chart.case_id}_${chart.language}`.replaceAll(
            ' ',
            '_'
        );
    }

    return `${chart.specialty}_${chart.name}`.replaceAll(' ', '_');
};

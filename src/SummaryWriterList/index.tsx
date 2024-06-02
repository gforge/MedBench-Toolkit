import { Chart4SummaryList } from 'components';
import { selectCharts } from 'features';
import { getChartId } from 'helpers';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SummaryWriterHelp } from './Help';

export function SummaryWriterList() {
    const charts = useSelector(selectCharts);
    const navigate = useNavigate();
    const summarise = useCallback(
        ({ chartId }: { chartId: string }) => {
            const chart = charts.find((c) => getChartId(c) === chartId);
            if (!chart) {
                return;
            }

            navigate(`/summarise/${getChartId(chart)}`);
        },
        [charts, navigate]
    );

    return (
        <>
            <Chart4SummaryList charts={charts} summarise={summarise} />
            <br />
            <SummaryWriterHelp show={!charts.length} />
        </>
    );
}

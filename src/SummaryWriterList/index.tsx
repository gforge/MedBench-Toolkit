import { Chart4SummaryList } from 'components';
import { selectSummaryCharts } from 'features';
import { getChartId } from 'helpers';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SummaryWriterHelp } from './Help';

export function SummaryWriterList() {
    const { charts: chart4summary } = useSelector(selectSummaryCharts);
    const navigate = useNavigate();
    const summarise = useCallback(
        (id: string) => {
            const chart = chart4summary.find((c) => getChartId(c) === id);
            if (!chart) {
                return;
            }
            navigate(`/summarise/${getChartId(chart)}`);
        },
        [chart4summary, navigate]
    );

    return (
        <>
            <Chart4SummaryList charts={chart4summary} summarise={summarise} />
            <br />
            <SummaryWriterHelp show={!chart4summary.length} />
        </>
    );
}

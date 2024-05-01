import { Chart4SummaryList } from 'components';
import { charts4summaryActions, selectSummaryCharts } from 'features';
import { getChartId, loadCharts2Translate } from 'helpers';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SummaryWriterHelp } from './Help';

export function SummaryWriterList() {
    const chart4summary = useSelector(selectSummaryCharts);
    const dispatch = useDispatch();
    useEffect(() => {
        if (chart4summary.length > 0) {
            return;
        }

        const charts = loadCharts2Translate();
        if (charts) {
            dispatch(
                charts4summaryActions.initStore({
                    charts: Object.values(charts),
                })
            );
        }
    });

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
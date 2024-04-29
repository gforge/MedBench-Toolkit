import { TextareaAutosize } from '@mui/base';
import { ChartTabs } from 'components';
import { charts4summaryActions, selectSummaryChart } from 'features';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { ChartValue } from '../validators';

export function SummaryWriter() {
    const { id } = useParams<{ id: string }>();
    const chart4summary = useSelector(selectSummaryChart(id));
    const dispatch = useDispatch();
    const summarise = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (!id) return;
            dispatch(
                charts4summaryActions.summarise({
                    id: id,
                    text: e.target.value,
                })
            );
        },
        [dispatch, id]
    );
    const navigate = useNavigate();
    if (!chart4summary) {
        navigate('/summarise');
        return null;
    }

    const {
        Medications: medications,
        Lab: labValues = [],
        Chart: chart,
    } = chart4summary.chart.chart;

    return (
        <>
            <ChartTabs
                notes={chart.map(convertValueToNote)}
                medications={medications}
                labValues={labValues}
            />
            <TextareaAutosize onChange={summarise} />
        </>
    );
}

const convertValueToNote = (value: ChartValue): Note => ({
    header: {
        text: value.header,
        type: value.type,
        timestamp: value.timestamp,
    },
    text: value.text,
});

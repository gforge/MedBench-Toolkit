import { Stack, Typography } from '@mui/material';
import { ChartTabs } from 'components';
import { charts4summaryActions, selectSummaryChart } from 'features';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getNoteId } from '../helpers';
import { ChartValue } from '../validators';
import { ExportSummary } from './Export';
import { ResponsiveTextField } from './ResponsiveTextField';
import { BottomBox, FlexBox, TopBox } from './styles';

export function SummaryWriter() {
    const { id } = useParams<{ id: string }>();
    const chart4summary = useSelector((state) => selectSummaryChart(state, id));
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
        chart,
        medications,
        lab: labValues = [],
    } = chart4summary.chart.chart;

    return (
        <FlexBox>
            <TopBox>
                <ChartTabs
                    notes={chart.map(convertValueToNote)}
                    medications={medications}
                    labValues={labValues}
                />
            </TopBox>
            <BottomBox>
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="space-between"
                    sx={{ marginBottom: '10px' }}
                >
                    <Typography variant="h6">Summary</Typography>
                    <ExportSummary />
                </Stack>
                <ResponsiveTextField
                    onChange={summarise}
                    value={chart4summary.summary}
                    placeholder="Write your summary here..."
                />
            </BottomBox>
        </FlexBox>
    );
}

const convertValueToNote = ({
    type,
    author,
    date,
    time,
    content,
}: ChartValue): Note => {
    const baseHeader: Omit<Header, 'id'> = { author, type, date, time };

    return {
        header: {
            id: getNoteId({ header: baseHeader }),
            ...baseHeader,
        },
        content,
    };
};

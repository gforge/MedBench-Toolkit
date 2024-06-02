import { Stack, Typography } from '@mui/material';
import { ChartTabs, ResponsiveSummaryTextField } from 'components';
import {
    selectChart,
    selectSettings,
    selectUser,
    summariesActions,
    useSummary,
} from 'features';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { RootState } from 'store';

import { ExportSummary } from './Export';
import { SummaryInstructions } from './Instructions';
import { BottomBox, FlexBox, TopBox } from './styles';

const summaryId = 'Human';
export function SummaryWriter() {
    const { id: chartId } = useParams<{ id: string }>();
    const { texteditor: typeOfEditor } = useSelector(selectSettings);
    const user = useSelector(selectUser);

    const chart4summary = useSelector((state: RootState) =>
        selectChart(state, chartId)
    );
    const summary = useSummary({ chartId, summaryId });
    const dispatch = useDispatch();
    const summarise = useCallback(
        (text?: string) => {
            if (!chartId || !user) return;
            dispatch(
                summariesActions.summarise({
                    chartId,
                    summaryId,
                    text,
                    user,
                })
            );
        },
        [chartId, dispatch, user]
    );

    const navigate = useNavigate();
    if (!chart4summary) {
        navigate('/summarise');
        return null;
    }

    const { notes, medications, lab: labValues = [] } = chart4summary;

    return (
        <FlexBox>
            <TopBox>
                <ChartTabs
                    notes={notes}
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
                    <Stack direction="row" gap={2}>
                        <SummaryInstructions />
                        <ExportSummary summaryId={summaryId} />
                    </Stack>
                </Stack>
                <ResponsiveSummaryTextField
                    onChange={summarise}
                    value={summary?.text ?? ''}
                    placeholder="Write your summary here..."
                    typeOfEditor={typeOfEditor}
                />
            </BottomBox>
        </FlexBox>
    );
}

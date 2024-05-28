import { Paper, Stack, Typography } from '@mui/material';
import { ChartTabs } from 'components';
import { selectSummaryCharts } from 'features';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getNoteId } from '../helpers';
import { ChartValue } from '../validators';
import { ReviewInstructions } from './Instructions';
import { BottomBox, FlexBox, TopBox } from './styles';

export function ReviewSpecialty() {
    const { specialty, language } = useParams<{
        specialty: string;
        language: string;
    }>();

    const { charts: allCharts } = useSelector(selectSummaryCharts);
    const charts = allCharts.filter(
        (chart) => chart.specialty === specialty && chart.language === language
    );

    if (!specialty || !language) {
        return (
            <Paper sx={{ padding: '10px' }}>
                Invalid specialty. No {specialty} in {language} found.
            </Paper>
        );
    }

    if (!charts.length) {
        return (
            <Paper sx={{ padding: '10px' }}>
                No charts found for {specialty} in {language}.
            </Paper>
        );
    }

    const { chart, medications, lab: labValues = [] } = charts[0].chart;

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
                    <Typography variant="h6">Review summaries</Typography>
                    <Stack direction="row" gap={2}>
                        <ReviewInstructions />
                    </Stack>
                </Stack>
                <div>Review</div>
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

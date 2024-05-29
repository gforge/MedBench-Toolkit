import { Paper, Stack, Typography } from '@mui/material';
import { buildFakeNote, ChartTabs, MarkdownTypography } from 'components';
import { selectSummaryCharts } from 'features';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getNoteId } from '../helpers';
import { ChartValue } from '../validators';
import { ReviewInstructions } from './Instructions';
import { ReviewNavigator } from './Navigator';
import { ChartBox, FlexBox, ReviewBox } from './styles';

const useCharts2Review = () => {
    const { specialty, language } = useParams<{
        specialty: string;
        language: string;
    }>();
    const { charts: allCharts } = useSelector(selectSummaryCharts);
    return allCharts
        .filter(
            (chart) =>
                chart.specialty === specialty && chart.language === language
        )
        .map(({ chart }) => ({
            id: 'fakeId', // Add this line to make the id unique
            chart,
            summary: buildFakeNote().content,
        }));
};

export function ReviewSpecialty() {
    const { specialty, language } = useParams<{
        specialty: string;
        language: string;
    }>();

    const charts = useCharts2Review();
    const [no, setNo] = useState(0);

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

    const {
        chart: { chart, medications, lab: labValues = [] },
        summary,
    } = charts[no];

    return (
        <>
            <ReviewNavigator
                no={no}
                setNo={setNo}
                total={charts.length}
                specialty={specialty}
                language={language}
            />
            <FlexBox>
                <ChartBox>
                    <ChartTabs
                        notes={chart.map(convertValueToNote)}
                        medications={medications}
                        labValues={labValues}
                    />
                </ChartBox>
                <ReviewBox>
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
                    <MarkdownTypography content={summary} />
                    <div>Form</div>
                </ReviewBox>
            </FlexBox>
        </>
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

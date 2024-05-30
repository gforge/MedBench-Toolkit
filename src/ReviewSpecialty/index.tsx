import { Button, Paper, Stack, Typography } from '@mui/material';
import { buildFakeNote, ChartTabs, MarkdownTypography } from 'components';
import { selectUser, useCharts2Review } from 'features';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';

import { getNoteId } from '../helpers';
import { ChartValue } from '../validators';
import { EvaluationForm } from './Form';
import { ReviewInstructions } from './Instructions';
import { ReviewNavigator } from './Navigator';
import { ChartBox, FlexBox, ReviewBox } from './styles';

const useFakeCharts = () => {
    const { specialty, language } = useParams<{
        specialty: string;
        language: string;
    }>();
    const allCharts = useCharts2Review({ specialty, language });

    return allCharts.map(({ chart: { chart } }) => ({
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
    const user = useSelector(selectUser);
    const location = useLocation();

    const charts = useFakeCharts();
    const [no, setNo] = useState(0);

    if (!user) {
        // Get URI component - note that start path is #/review
        const redirect = encodeURIComponent(location.pathname);
        return (
            <Paper sx={{ padding: '10px' }}>
                <Typography variant="h6">
                    You need to be logged in to access this page.
                </Typography>
                <Link to={`/login?redirect=${redirect}`}>
                    <Button variant="contained" color="primary">
                        Login
                    </Button>
                </Link>
            </Paper>
        );
    }

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
                    <EvaluationForm />
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

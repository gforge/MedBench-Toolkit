import { buildFakeNote, ChartTabs, LoginPrompt } from 'components';
import { selectUser, useCharts2Review } from 'features';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { ReviewHeader } from './Header';
import { InvalidSpecialty } from './InvalidSpecialty';
import { ReviewNavigator } from './Navigator';
import { NoChartsFound } from './NoChartsFound';
import { ChartBox, FlexBox, ReviewBox } from './styles';
import { SummaryTabs } from './SummaryTabs';

const useFakeCharts = () => {
    const { specialty, language } = useParams<{
        specialty: string;
        language: string;
    }>();
    const allCharts = useCharts2Review({ specialty, language });

    return allCharts.map(({ chart }) => ({
        chart,
        summaries: ['AI', 'Human'].map((summaryId) => ({
            summary: {
                chartId: chart.id,
                summaryId,
                text: buildFakeNote().content,
                createdBy: 'AI',
                final: true,
            },
            review: undefined,
        })),
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
        const redirect = encodeURIComponent(location.pathname);
        return <LoginPrompt redirect={redirect} />;
    }

    if (!specialty || !language) {
        return <InvalidSpecialty specialty={specialty} language={language} />;
    }

    if (!charts.length) {
        return <NoChartsFound specialty={specialty} language={language} />;
    }

    const {
        chart: { notes, medications, lab },
        summaries,
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
                        notes={notes}
                        medications={medications}
                        labValues={lab}
                    />
                </ChartBox>
                <ReviewBox>
                    <ReviewHeader />
                    <SummaryTabs summaries={summaries} />
                </ReviewBox>
            </FlexBox>
        </>
    );
}

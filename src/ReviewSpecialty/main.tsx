import { buildFakeNote, LoginPrompt } from 'components';
import { selectReviews, selectUser, useCharts2Review } from 'features';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { InvalidSpecialty } from './InvalidSpecialty';
import { NoChartsFound } from './NoChartsFound';
import { ReviewChart } from './ReviewChart';
import { ReviewChart as ReviewChartType } from './types';
import { useNavigatoChartNo } from './useNavigatoChartNo';

const useFakeCharts = ({
    specialty,
    language,
}: {
    specialty?: string;
    language?: string;
}): ReviewChartType[] => {
    const allCharts = useCharts2Review({ specialty, language });
    const reviews = useSelector(selectReviews);
    const user = useSelector(selectUser);

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
            review: reviews.find(
                (r) =>
                    r.chartId === chart.id &&
                    r.summaryId === summaryId &&
                    r.userMainEmail === user?.userMainEmail
            ),
        })),
    }));
};

const useReviewNavigator = ({
    total,
    specialty,
    language,
}: {
    total: number;
    specialty?: string;
    language?: string;
}) => {
    const no = useNavigatoChartNo(total);
    const navigator = useNavigate();
    const navigateNext = useMemo(() => {
        if (no >= total - 1) {
            return undefined;
        }
        return () =>
            navigator(`/review/${specialty}/${language}/${no + 1 + 1}`);
    }, [no, total, navigator, specialty, language]);
    const navigateBack = useMemo(() => {
        if (no <= 0) {
            return undefined;
        }
        return () =>
            navigator(`/review/${specialty}/${language}/${no - 1 + 1}`);
    }, [language, navigator, no, specialty]);
    return { no, navigateNext, navigateBack, specialty, language };
};

export function ReviewSpecialty() {
    const user = useSelector(selectUser);

    const { specialty, language } = useParams<{
        specialty: string;
        language: string;
    }>();
    const charts = useFakeCharts({ specialty, language });
    const { no, navigateBack, navigateNext } = useReviewNavigator({
        total: charts.length,
        specialty,
        language,
    });

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

    return (
        <ReviewChart
            specialty={specialty}
            language={language}
            chart={charts[no]}
            user={user}
            no={no}
            navigateBack={navigateBack}
            navigateNext={navigateNext}
        />
    );
}

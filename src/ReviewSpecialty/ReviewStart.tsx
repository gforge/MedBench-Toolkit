import { buildFakeNote, LoginPrompt } from 'components';
import { selectReviews, selectUser, useCharts2Review } from 'features';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { InvalidSpecialty } from './InvalidSpecialty';
import { NoChartsFound } from './NoChartsFound';
import { ReviewChart as ReviewChartType } from './types';

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

export function ReviewStart() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    const { specialty, language } = useParams<{
        specialty: string;
        language: string;
    }>();
    const charts = useFakeCharts({ specialty, language });
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

    const firstNonReviewed = charts.findIndex((c) =>
        c.summaries.some((s) => !s.review)
    );
    const no = firstNonReviewed === -1 ? charts.length - 1 : firstNonReviewed;

    navigate(`/review/${specialty}/${language}/${no + 1}`, { replace: true });
    return <div>Redirecting...</div>;
}

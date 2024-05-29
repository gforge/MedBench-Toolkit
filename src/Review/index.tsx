import { ReviewStart } from 'components';
import { selectReviewCharts } from 'features';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ReviewHelp } from './Help';

export function Review() {
    const charts2review = useSelector(selectReviewCharts);
    const specialties2choosefrom = useMemo(() => {
        return charts2review.reduce(
            (acc, chart) => {
                const { specialty, language } = chart.chart;
                if (!acc[specialty]) {
                    acc[specialty] = [];
                }
                acc[specialty].push(language);
                // sort languages and remove duplicates
                acc[specialty] = Array.from(new Set(acc[specialty])).sort(
                    (a, b) => a.localeCompare(b)
                );
                return acc;
            },
            {} as Record<string, string[]>
        );
    }, [charts2review]);
    const navigate = useNavigate();
    const activateReview = useCallback(
        ({ specialty, language }: { specialty: string; language: string }) => {
            navigate(`/review/${specialty}/${language}`);
        },
        [navigate]
    );

    return (
        <>
            <ReviewStart
                specialties={specialties2choosefrom}
                activateReview={activateReview}
            />
            <br />
            <ReviewHelp show={!charts2review.length} />
        </>
    );
}

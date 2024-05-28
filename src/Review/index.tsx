import { ReviewStart } from 'components';
import { selectSummaryCharts } from 'features';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ReviewHelp } from './Help';

export function Review() {
    const { charts: chart4summary } = useSelector(selectSummaryCharts);
    const specialties2choosefrom = useMemo(() => {
        return chart4summary.reduce(
            (acc, chart) => {
                const { specialty, language } = chart;
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
    }, [chart4summary]);
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
            <ReviewHelp show={!chart4summary.length} />
        </>
    );
}

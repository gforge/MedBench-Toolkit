import { ReviewStart } from 'components';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCharts2Review } from '../features';
import { ReviewHelp } from './Help';

const useSpeicalties2ChooseFrom = () => {
    const charts2review = useCharts2Review();

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
    return { specialties2choosefrom, noCharts: charts2review.length };
};

export function Review() {
    const { specialties2choosefrom, noCharts } = useSpeicalties2ChooseFrom();
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
            <ReviewHelp show={!noCharts} />
        </>
    );
}

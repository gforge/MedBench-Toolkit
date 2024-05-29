import { selectUser } from 'features/user';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import type { RootState } from 'store';
import { FullChart2Review } from 'validators';

import type { Review } from '../slice';
import { selectReviewCharts } from './selectReviewCharts';

type Chart2Review = {
    chart: FullChart2Review;
    review: Review | undefined;
};

type Params = {
    caseId: string | undefined;
    specialty: string | undefined;
    language: string | undefined;
};

const selectReviewChart = createSelector(
    [selectReviewCharts, selectUser, (_, params: Params) => params],
    (charts, user, { caseId, specialty, language }): Chart2Review | null => {
        if (!caseId || !specialty || !language) return null;

        const chart = charts.find(
            (c) =>
                c.chart.case_id === caseId &&
                c.chart.specialty === specialty &&
                c.chart.language === language
        );
        if (!chart || !user) return null;

        const review = chart.reviews.find(
            (r) =>
                r.userMainEmail === user.userMainEmail &&
                r.version === chart.version
        );

        return {
            chart: chart.chart,
            review,
        };
    }
);

export const useChart2Review = ({ caseId, specialty, language }: Params) => {
    const params = useMemo(
        () => ({ caseId, specialty, language }),
        [caseId, language, specialty]
    );
    return useSelector((state: RootState) => selectReviewChart(state, params));
};

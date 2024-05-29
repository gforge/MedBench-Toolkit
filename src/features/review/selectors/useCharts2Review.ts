import { selectUser } from 'features';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import type { RootState } from 'store';
import type { FullChart2Review } from 'validators';

import type { Review } from '../slice';
import { selectReviewCharts } from './selectReviewCharts';

type Chart2Review = {
    chart: FullChart2Review;
    review: Review | undefined;
};

type Params = {
    specialty: string | undefined;
    language: string | undefined;
};

const selectCharts2Review = createSelector(
    [selectReviewCharts, selectUser, (_, params: Params) => params],
    (charts, user, { specialty, language }): Chart2Review[] => {
        if (!specialty || !language || !user) return [];

        return charts
            .filter(
                (c) =>
                    c.chart.specialty === specialty &&
                    c.chart.language === language
            )
            .map(({ chart, reviews }) => ({
                chart,
                review: reviews.find(
                    (r) => r.userMainEmail === user.userMainEmail
                ),
            }));
    }
);

export const useCharts2Review = ({ specialty, language }: Params) => {
    const params = useMemo(
        () => ({ specialty, language }),
        [specialty, language]
    );
    return useSelector((state: RootState) =>
        selectCharts2Review(state, params)
    );
};

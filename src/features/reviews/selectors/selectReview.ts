import { selectCharts } from 'features/charts';
import { selectUser } from 'features/user';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import type { RootState } from 'store';

import { Chart } from '../../../validators';
import type { Review } from '../types';
import { selectReviews } from './selectReviews';

type Chart2Review = {
    chart: Chart;
    review: Review | undefined;
};

type Params = {
    chartId?: string;
    summaryId?: string;
};

const selectReview = createSelector(
    [selectReviews, selectUser, selectCharts, (_, params: Params) => params],
    (reviews, user, charts, { chartId, summaryId }): Chart2Review | null => {
        if (!summaryId || !chartId || !user) return null;
        const { userMainEmail } = user;

        const review = reviews.find(
            (r) =>
                r.chartId === chartId &&
                r.summaryId === summaryId &&
                r.userMainEmail === userMainEmail
        );
        const chart = charts.find((c) => c.id === chartId);
        if (!chart) {
            console.error('Chart not found');
            return null;
        }

        return { chart, review };
    }
);

export const useReview = ({ chartId, summaryId }: Params) => {
    const params = useMemo(
        () => ({ chartId, summaryId }),
        [chartId, summaryId]
    );
    return useSelector((state: RootState) => selectReview(state, params));
};

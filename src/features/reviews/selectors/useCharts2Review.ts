import { selectCharts } from 'features/charts';
import { selectSummaries, Summary } from 'features/summaries';
import { selectUser } from 'features/user';
import { getChartId } from 'helpers';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import type { RootState } from 'store';
import type { Chart } from 'validators';

import type { Review } from '../types';
import { selectReviews } from './selectReviews';

type Chart2Review = {
    chart: Chart;
    reviewSummaries: {
        summary: Summary;
        review: Review | undefined;
    }[];
};

type Params = {
    specialty: string | undefined;
    language: string | undefined;
};

const selectCharts2Review = createSelector(
    [
        selectReviews,
        selectCharts,
        selectSummaries,
        selectUser,
        (_, params: Params) => params,
    ],
    (
        reviews,
        charts,
        summaries,
        user,
        { specialty, language }
    ): Chart2Review[] => {
        if (!specialty || !language || !user) return [];

        return charts
            .filter((c) => c.specialty === specialty && c.language === language)
            .reduce((acc, chart) => {
                acc.push({
                    chart,
                    reviewSummaries: summaries
                        // Filter summaries for the current chart that are final, i.e. not drafts
                        .filter(
                            (s) => s.chartId === getChartId(chart) && s.final
                        )
                        // Map summaries to include the review for the current user
                        .map((s) => {
                            const review = reviews.find(
                                (r) =>
                                    r.chartId === chart.id &&
                                    r.summaryId === s.summaryId &&
                                    r.userMainEmail === user.userMainEmail
                            );

                            return { summary: s, review };
                        }),
                });
                return acc;
            }, [] as Chart2Review[])
            .filter((c) => c.reviewSummaries.length > 0);
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

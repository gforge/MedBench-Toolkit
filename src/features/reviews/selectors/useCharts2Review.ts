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
    summaries: {
        summary: Summary;
        review: Review | undefined;
    }[];
};

interface FilteredChartsArgs {
    charts: Chart[];
    specialty?: string;
    language?: string;
}

const selectFilteredCharts = ({
    charts,
    specialty,
    language,
}: FilteredChartsArgs): Chart[] =>
    charts.filter(
        (chart) =>
            (!specialty || chart.specialty === specialty) &&
            (!language || chart.language === language)
    );

interface ReviewSearchArgs {
    reviews: Review[];
    chartId: string;
    summaryId: string;
    userEmail: string;
}

const findReviewForSummary = ({
    reviews,
    chartId,
    summaryId,
    userEmail,
}: ReviewSearchArgs): Review | undefined =>
    reviews.find(
        (review) =>
            review.chartId === chartId &&
            review.summaryId === summaryId &&
            review.userMainEmail === userEmail
    );

interface Params {
    specialty?: string;
    language?: string;
}

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
        allSummaries,
        user,
        { specialty, language }
    ): Chart2Review[] => {
        if (!user) return [];

        return selectFilteredCharts({ charts, specialty, language }).reduce(
            (acc, chart) => {
                const summaries = allSummaries
                    // Filter summaries for the current chart that are final, i.e. not drafts
                    .filter(
                        ({ chartId, final }) =>
                            chartId === getChartId(chart) && final
                    )
                    // Map summaries to include the review for the current user
                    .map((summary) => ({
                        summary,
                        review: findReviewForSummary({
                            reviews,
                            chartId: chart.id,
                            summaryId: summary.summaryId,
                            userEmail: user.userMainEmail,
                        }),
                    }));

                acc.push({
                    chart,
                    summaries,
                });
                return acc;
            },
            [] as Chart2Review[]
        );
        // Drop if there are no summaries
        // .filter((chart2Review) => chart2Review.summaries.length > 0);
    }
);

/**
 * Custom hook that retrieves charts for review based on the specified specialty and language.
 *
 * @param Params - { specialty, language } - Optional parameters for filtering the charts.
 * @returns An array of charts for review that include summaries and reviews.
 */
export const useCharts2Review = ({ specialty, language }: Params = {}) => {
    const params = useMemo(
        () => ({ specialty, language }),
        [specialty, language]
    );
    return useSelector((state: RootState) =>
        selectCharts2Review(state, params)
    );
};

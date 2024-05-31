import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getChartId } from 'helpers';
import { FullChart2Review } from 'validators';

import {
    convertRaw2Rating,
    isReviewVersion1,
    PartialRating,
    Rating,
    Review,
    ReviewChart,
} from './types';

interface ChartsState {
    charts: ReviewChart[];
    version: string;
}

const initialState: ChartsState = {
    charts: [],
    version: '1',
};

export const { reducer: charts2reviewReducer, actions: charts2reviewActions } =
    createSlice({
        name: 'charts2review',
        initialState,
        reducers: {
            initStore: (
                state,
                action: PayloadAction<{
                    charts: ReviewChart[];
                    version: string;
                }>
            ) => {
                state.charts = action.payload.charts;
                state.version = action.payload.version;
            },
            addCharts: (state, action: PayloadAction<FullChart2Review[]>) => {
                const newCharts = action.payload
                    .filter(
                        (chart) =>
                            !state.charts.some(
                                (chart4summary) =>
                                    getChartId(chart4summary.chart) ===
                                    getChartId(chart)
                            )
                    )
                    .map((chart) => ({
                        type: 'review' as const,
                        chart,
                        review: null,
                        version: state.version,
                    }));
                state.charts.push(...newCharts);
                if (newCharts.length !== action.payload.length) {
                    console.warn('Some summary charts were not added');
                }
            },
            review: (
                state,
                action: PayloadAction<{
                    chartId: Pick<
                        FullChart2Review,
                        'case_id' | 'specialty' | 'language' | 'summary_id'
                    >;
                    userMainEmail: string;
                    rating: Omit<Rating | PartialRating, 'completed'>;
                }>
            ) => {
                const {
                    chartId: {
                        case_id: cid,
                        specialty,
                        language,
                        summary_id: sid,
                    },
                    userMainEmail,
                    rating,
                } = action.payload;

                const chart = state.charts.find(
                    (c) =>
                        c.chart.case_id === cid &&
                        c.chart.specialty === specialty &&
                        c.chart.language === language &&
                        c.chart.summary_id === sid
                );

                if (!chart) {
                    console.error('Chart not found');
                    return;
                }

                const newReview: Review = {
                    userMainEmail,
                    rating: convertRaw2Rating(rating),
                    version: chart.version,
                };

                if (!isReviewVersion1(newReview)) {
                    console.error('Review version not supported');
                    return;
                }

                chart.review = newReview;
            },
        },
    });

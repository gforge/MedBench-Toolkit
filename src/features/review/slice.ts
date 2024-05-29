import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getChartId } from 'helpers';
import { FullChart2Review } from 'validators';
export interface Review {
    userMainEmail: string;
    comment: string; // Assumed to be a textual comment about the chart
    ratings: {
        diagnosis: number;
        medicalHistory: number;
        hospitalCourse: number;
        followUp: number;
        conciseness: number;
        completeness: number;
        language: number;
        clarity: number;
        hallucinations: number;
        overall: number;
    };
    version: '1';
}

const isVersion1 = (
    review: Omit<Review, 'version'> & { version: string }
): review is Review => {
    return review.version === '1';
};

export interface ReviewChart {
    chart: FullChart2Review;
    reviews: Review[];
    version: string;
}

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
                        chart,
                        reviews: [],
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
                        'case_id' | 'specialty' | 'language'
                    >;
                    review: Omit<Review, 'version'>;
                }>
            ) => {
                const chart = state.charts.find(
                    (c) =>
                        c.chart.case_id === action.payload.chartId.case_id &&
                        c.chart.specialty ===
                            action.payload.chartId.specialty &&
                        c.chart.language === action.payload.chartId.language
                );
                if (!chart) {
                    console.error('Chart not found');
                    return;
                }
                const newReview = {
                    ...action.payload.review,
                    version: chart.version,
                };
                if (!isVersion1(newReview)) {
                    console.error('Review version not supported');
                    return;
                }

                const existingReview = chart.reviews.findIndex(
                    (r) =>
                        r.userMainEmail === action.payload.review.userMainEmail
                );
                if (existingReview !== -1) {
                    chart.reviews[existingReview] = newReview;
                } else {
                    chart.reviews.push(newReview);
                }
            },
        },
    });

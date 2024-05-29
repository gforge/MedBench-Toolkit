import type { RootState } from 'store';

export const selectReviewCharts = (state: RootState) =>
    state.charts2review.charts;

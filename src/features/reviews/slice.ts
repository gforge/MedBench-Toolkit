import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { convertRaw2Rating, PartialRating, Rating, Review } from './types';

interface ChartsState {
    reviews: Review[];
    version: string;
}

const initialState: ChartsState = {
    reviews: [],
    version: '1',
};

export const { reducer: reviewsReducer, actions: reviewsActions } = createSlice(
    {
        name: 'reviews',
        initialState,
        reducers: {
            initStore: (
                state,
                action: PayloadAction<{
                    reviews: Review[];
                    version: string;
                }>
            ) => {
                state.reviews = action.payload.reviews;
                state.version = action.payload.version;
            },
            review: (
                state,
                action: PayloadAction<{
                    chartId: string;
                    summaryId: string;
                    userMainEmail: string;
                    rating: Omit<Rating | PartialRating, 'completed'>;
                }>
            ) => {
                const {
                    chartId,
                    summaryId,
                    userMainEmail,
                    rating: rawRating,
                } = action.payload;
                const rating = convertRaw2Rating(rawRating);

                const reviewIndex = state.reviews.findIndex(
                    (r) =>
                        r.chartId === chartId &&
                        r.summaryId === summaryId &&
                        r.userMainEmail === userMainEmail
                );
                if (reviewIndex !== -1) {
                    state.reviews[reviewIndex].rating = rating;
                    return;
                }

                const newReview: Review = {
                    chartId,
                    summaryId,
                    userMainEmail,
                    rating,
                    version: '1',
                };

                state.reviews.push(newReview);
            },
        },
    }
);

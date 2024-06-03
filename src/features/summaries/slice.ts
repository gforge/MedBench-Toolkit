import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { onlySelfOrAdmin, type User } from 'features/user';

export type Summary = {
    chartId: string;
    summaryId: string;
    text: string;
    createdBy: string;
    final: boolean;
};

interface ChartsState {
    summaries: Summary[];
    version: string;
}

const initialState: ChartsState = {
    summaries: [],
    version: '-1',
};

export const { reducer: summariesReducer, actions: summariesActions } =
    createSlice({
        name: 'summaries',
        initialState,
        reducers: {
            summarise: (
                state,
                action: PayloadAction<{
                    chartId: string;
                    summaryId: string;
                    text?: string;
                    user: User;
                }>
            ) => {
                const { chartId, summaryId, text, user } = action.payload;
                const summaryIndex = state.summaries.findIndex(
                    (s) => s.chartId === chartId && s.summaryId === summaryId
                );

                if (summaryIndex === -1) {
                    if (!text) {
                        console.warn('Cannot delete non-existing summary');
                        return;
                    }

                    state.summaries.push({
                        chartId,
                        summaryId,
                        text,
                        createdBy: user.userMainEmail,
                        final: false,
                    });
                    return;
                }

                if (!text) {
                    if (
                        onlySelfOrAdmin({
                            user,
                            createdBy: state.summaries[summaryIndex].createdBy,
                        })
                    ) {
                        console.warn('User not allowed to delete summary');
                        return;
                    }

                    state.summaries.splice(summaryIndex, 1);
                    return;
                }

                state.summaries[summaryIndex].text = text;
            },
        },
    });

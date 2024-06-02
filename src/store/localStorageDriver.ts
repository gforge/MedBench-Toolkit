import { rememberEnhancer, rememberReducer } from 'redux-remember';

import type { RootState } from '.';
import { migrateCharts } from './migrateCharts';
import { migrateSummaries } from './migrateSummaries';
import { reducers } from './reducers';

const rememberedKeys = ['charts', 'summaries', 'reviews'];

const isCharts = (state: unknown, key: string): state is RootState['charts'] =>
    key === 'charts';

const isSummaries = (
    state: unknown,
    key: string
): state is RootState['summaries'] => key === 'summaries';

const compressState = (state: unknown): string => JSON.stringify(state);
const decompressState = (state: string, key: string): unknown => {
    const parsedState = JSON.parse(state);
    if (isCharts(parsedState, key)) {
        return migrateCharts(parsedState);
    }

    if (isSummaries(parsedState, key)) {
        return migrateSummaries(parsedState);
    }

    return parsedState;
};

export const rememberReducerDriver = rememberReducer(reducers);
export const rememberEnhancerDriver = rememberEnhancer(
    window.localStorage,
    rememberedKeys,
    {
        serialize: compressState,
        unserialize: decompressState,
        persistDebounce: 1000,
    }
);

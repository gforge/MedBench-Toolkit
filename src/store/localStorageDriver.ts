import { rememberEnhancer, rememberReducer } from 'redux-remember';

import { migrateCharts } from './migrateCharts';
import { migrateSummaries } from './migrateSummaries';
import { reducers } from './reducers';

const rememberedKeys = ['charts', 'summaries', 'reviews'];

const compressState = (state: unknown): string => JSON.stringify(state);
const decompressState = (state: string, key: string): unknown => {
    const storedData = JSON.parse(state);
    if (key === 'charts') {
        return migrateCharts(storedData);
    }

    if (key === 'summaries') {
        return migrateSummaries(storedData);
    }

    return storedData;
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

// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { rememberEnhancer, rememberReducer } from 'redux-remember';

import {
    charts2reviewReducer,
    charts2translateReducer,
    charts4summaryReducer,
    settingsReducer,
    userReducer,
} from './features';

const reducers = {
    charts2translate: charts2translateReducer,
    charts4summary: charts4summaryReducer,
    charts2review: charts2reviewReducer,
    settings: settingsReducer,
    user: userReducer,
};

const rememberedKeys = ['charts2translate', 'charts4summary', 'charts2review'];

const reducer = rememberReducer(reducers);

const compressState = (state: unknown): string => JSON.stringify(state);
const decompressState = (state: string): unknown => JSON.parse(state);

export const store = configureStore({
    reducer,
    enhancers: (getDefaultEnhancers) =>
        getDefaultEnhancers().concat(
            rememberEnhancer(window.localStorage, rememberedKeys, {
                serialize: compressState,
                unserialize: decompressState,
                persistDebounce: 1000,
            })
        ),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: { warnAfter: 128 },
            serializableCheck: { warnAfter: 128 },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

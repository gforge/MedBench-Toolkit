// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { rememberEnhancer, rememberReducer } from 'redux-remember';

import { charts2translateReducer, charts4summaryReducer } from './features';

const reducers = {
    charts2translate: charts2translateReducer,
    charts4summary: charts4summaryReducer,
};

const rememberedKeys = ['charts2translate', 'charts4summary'];

const reducer = rememberReducer(reducers);

export const store = configureStore({
    reducer,
    enhancers: (getDefaultEnhancers) =>
        getDefaultEnhancers().concat(
            rememberEnhancer(window.localStorage, rememberedKeys)
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

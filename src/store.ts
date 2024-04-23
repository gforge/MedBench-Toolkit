// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { rememberEnhancer, rememberReducer } from 'redux-remember';

import { chartsReducer } from './features';

const reducers = {
    charts: chartsReducer,
};

const rememberedKeys = ['charts'];

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

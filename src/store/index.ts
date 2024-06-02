// app/store.ts
import { configureStore } from '@reduxjs/toolkit';

import {
    rememberEnhancerDriver,
    rememberReducerDriver,
} from './localStorageDriver';

export const store = configureStore({
    reducer: rememberReducerDriver,
    enhancers: (getDefaultEnhancers) =>
        getDefaultEnhancers().concat(rememberEnhancerDriver),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: { warnAfter: 128 },
            serializableCheck: { warnAfter: 128 },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

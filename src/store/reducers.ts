import {
    chartsReducer,
    reviewsReducer,
    settingsReducer,
    summariesReducer,
    userReducer,
} from 'features';

export const reducers = {
    charts: chartsReducer,
    summaries: summariesReducer,
    reviews: reviewsReducer,
    settings: settingsReducer,
    user: userReducer,
};

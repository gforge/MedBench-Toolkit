// features/charts/chartsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Settings {
    texteditor: 'react-md-editor' | 'basic';
}

const initialState: Settings = {
    texteditor: 'react-md-editor',
};

export const { reducer: settingsReducer, actions: settingsActions } =
    createSlice({
        name: 'settings',
        initialState,
        reducers: {
            setTextEditor: (
                state,
                action: PayloadAction<Settings['texteditor']>
            ) => {
                state.texteditor = action.payload;
            },
        },
    });

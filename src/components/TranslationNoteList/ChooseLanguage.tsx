import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
import { getChartId } from 'helpers';
import { useMemo, useState } from 'react';
import type { Chart } from 'validators';

import type { TranslateFn } from './types';

interface ChooseLanguageProps {
    chart?: Chart;
    cancel: () => void;
    translate: TranslateFn;
    existingLanguages: string[];
}

export const ChooseLanguage = ({
    chart,
    translate,
    cancel,
    existingLanguages,
}: ChooseLanguageProps) => {
    const [language, setLanguage] = useState<string | null>(null);

    const allLanguages = useMemo(() => {
        // Merge with the existing languages
        const merged = [
            ...existingLanguages,
            'Swedish',
            'Finnish',
            'Danish',
            'Spanish',
            'German',
        ];
        // Filtered out duplicates
        return Array.from(new Set(merged)).sort((a, b) => a.localeCompare(b));
    }, [existingLanguages]);

    return (
        <Dialog open={!!chart}>
            <DialogTitle>Choose a language</DialogTitle>
            <DialogContent>
                <Autocomplete
                    value={language}
                    id="language-select"
                    freeSolo
                    options={allLanguages}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Language"
                            helperText="Note that you can choose any language, not only the ones
                                        listed below. Those are only for making it easier to choose
                                        a language."
                        />
                    )}
                    onInputChange={(_event, newInputValue) => {
                        setLanguage(newInputValue);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={!language}
                    onClick={() => {
                        if (!language) return;
                        if (!chart) return;
                        // Translate the chart with the provided language code
                        translate({ id: getChartId(chart), language });
                        cancel();
                    }}
                >
                    Translate
                </Button>
                <Button onClick={cancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

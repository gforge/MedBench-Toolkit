import { Box, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TextCapture, TranslationNoteList } from '../components';
import { charts2translateActions, selectTranslationCharts } from '../features';
import { InitStore } from '../InitStore';
import { DumpTranslationCharts } from './DumpTranslationCharts';
import { TranslationsOverviewHelp } from './Help';

export function Translations() {
    const dispatch = useDispatch();
    const addChart = useCallback(
        ({
            name,
            specialty,
            notes,
        }: {
            name: string;
            specialty: string;
            notes: Note[];
        }) => {
            dispatch(
                charts2translateActions.addChart({
                    name,
                    specialty,
                    notes,
                })
            );
        },
        [dispatch]
    );
    const navigate = useNavigate();
    const translate = useCallback(
        ({ id, language }: { id: string; language: string }) => {
            navigate(`/translator/${id}/${language}`);
        },
        [navigate]
    );
    const uploadTranslation = useCallback(
        (args: { id: string; language: string; translation: Note[] }) => {
            dispatch(charts2translateActions.uploadTranslation(args));
        },
        [dispatch]
    );

    const deleteChart = useCallback(
        (args: { id: string; Language?: string }) => {
            dispatch(charts2translateActions.deleteChart(args));
        },
        [dispatch]
    );
    const setChartName = useCallback(
        ({ id, name }: { id: string; name: string }) => {
            dispatch(charts2translateActions.renameChart({ id, name }));
        },
        [dispatch]
    );
    const setChartSpecialty = useCallback(
        ({ id, specialty }: { id: string; specialty: string }) => {
            dispatch(charts2translateActions.renameChart({ id, specialty }));
        },
        [dispatch]
    );
    const charts = useSelector(selectTranslationCharts);

    return (
        <>
            <Box
                sx={{ maxWidth: '600px', margin: 'auto', marginBottom: '20px' }}
            >
                <Typography variant="h4">Translations</Typography>
                <Typography variant="body1">
                    Choose case and specialty that you want to translate. Note
                    that all data is saved locally in your browser, i.e. you
                    will either need to export &amp; upload the case or finish
                    the entire case on your computer.
                </Typography>
            </Box>
            <TranslationNoteList
                charts={charts}
                translate={translate}
                uploadTranslation={uploadTranslation}
                deleteChart={deleteChart}
                setChartName={setChartName}
                setChartSpecialty={setChartSpecialty}
            />
            <br />
            <Stack spacing={2}>
                <TextCapture addChart={addChart} charts={charts} />
                <DumpTranslationCharts />
                <InitStore />
            </Stack>
            <TranslationsOverviewHelp show={!charts.length} />
        </>
    );
}

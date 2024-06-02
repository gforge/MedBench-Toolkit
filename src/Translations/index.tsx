import { Box, Stack, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { Note } from 'validators';

import { TextCapture, TranslationNoteList } from '../components';
import { chartsActions, selectCharts, selectUser } from '../features';
import { InitStore } from '../InitStore';
import { DumpTranslationCharts } from './DumpTranslationCharts';
import { TranslationsOverviewHelp } from './Help';

export function Translations() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
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
            if (!user) {
                return;
            }

            dispatch(
                chartsActions.addChart({
                    createdBy: user.userMainEmail,
                    chart2translate: {
                        name,
                        specialty,
                        notes,
                    },
                })
            );
        },
        [dispatch, user]
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
            if (!user) {
                console.error('Must be logged in to upload translation');
                return;
            }

            dispatch(
                chartsActions.uploadTranslation({
                    ...args,
                    createdBy: user.userMainEmail,
                })
            );
        },
        [dispatch, user]
    );

    const deleteChart = useCallback(
        (args: { id: string; language?: string }) => {
            if (!user) {
                console.error('Must be logged in to delete chart');
                return;
            }
            dispatch(
                chartsActions.deleteChart({
                    ...args,
                    user,
                })
            );
        },
        [dispatch, user]
    );

    const setChartName = useCallback(
        ({ id, name }: { id: string; name: string }) => {
            dispatch(chartsActions.renameChart({ id, name }));
        },
        [dispatch]
    );

    const setChartSpecialty = useCallback(
        ({ id, specialty }: { id: string; specialty: string }) => {
            dispatch(chartsActions.renameChart({ id, specialty }));
        },
        [dispatch]
    );
    const charts = useSelector(selectCharts);

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

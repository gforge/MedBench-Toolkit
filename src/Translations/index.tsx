import { Stack } from '@mui/material';
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

import { BaseGrid } from 'components';
import { selectChart, selectUser } from 'features';
import { getChartId, useDownloadTranslation } from 'helpers';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import type { RootState } from 'store';
import { Chart } from 'validators';

import { useChartTranslations } from './useChartTranslations';

export function Translator() {
    const { chartId, language } = useParams<{
        chartId: string;
        language: string;
    }>();
    const user = useSelector(selectUser);

    const chart = useSelector<RootState, Chart | null>((state) =>
        selectChart(state, chartId)
    );
    const translatedChartId = useMemo(() => {
        if (!chart || !language) return undefined;
        return getChartId({
            specialty: chart.specialty,
            name: chart.name,
            language,
        });
    }, [chart, language]);

    const translatedChart = useSelector<RootState, Chart | null>((state) =>
        selectChart(state, translatedChartId)
    );

    const navigate = useNavigate();
    const translatedRawNotes = useMemo(() => {
        if (!chart || !language) return [];
        if (translatedChart) return translatedChart.notes;
        return chart.notes.map((n) => ({
            ...n,
            content: '',
        }));
    }, [chart, language, translatedChart]);

    const { updateNote, insertNote, deleteNote, reInsertDeletedNote } =
        useChartTranslations({
            chartId,
            originalChartId: chart?.id,
            translatedRawNotes,
            user,
        });

    const { downloadTranslatedChart } = useDownloadTranslation({
        chartId,
        language,
        translatedRawNotes,
    });

    if (!chart || !language) {
        return <Navigate to="/" />;
    }

    return (
        <BaseGrid
            originalNotes={{
                language: 'Original',
                notes: chart.notes,
            }}
            translatedNotes={{
                language: language,
                notes: translatedRawNotes,
                insertNote,
                updateNote,
                deleteNote,
            }}
            reInsertDeletedNote={reInsertDeletedNote}
            onExit={() => navigate('/')}
            onSubmit={downloadTranslatedChart}
        />
    );
}

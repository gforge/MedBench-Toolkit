import { BaseGrid } from 'components';
import { selectChart, selectUser } from 'features';
import { useDownloadTranslation } from 'helpers';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import type { RootState } from 'store';
import { Chart } from 'validators';

import { useChartTranslations } from './useChartTranslations';
import { useTranslationNotes } from './useTranslationNotes';

export function Translator() {
    const { chartId, language } = useParams<{
        chartId: string;
        language: string;
    }>();
    const user = useSelector(selectUser);

    const chart = useSelector<RootState, Chart | null>((state) =>
        selectChart(state, chartId)
    );
    const navigate = useNavigate();

    const { translatedRawNotes, translatedChartId } = useTranslationNotes({
        chart,
        language,
    });
    const { updateNote, insertNote, deleteNote, reInsertDeletedNote } =
        useChartTranslations({
            chartId: translatedChartId,
            originalChartId: chartId,
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

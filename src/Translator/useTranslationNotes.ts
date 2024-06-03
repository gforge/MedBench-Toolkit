import { selectChart } from 'features';
import { getChartId } from 'helpers';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import type { Chart } from 'validators';

interface Props {
    chart: Chart | null;
    language: string | undefined | null;
}

export const useTranslationNotes = ({ chart, language }: Props) => {
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

    const translatedRawNotes = useMemo(() => {
        if (!chart || !language) return [];
        if (translatedChart) return translatedChart.notes;
        return chart.notes.map((n) => ({
            ...n,
            content: '',
        }));
    }, [chart, language, translatedChart]);

    return {
        translatedRawNotes,
        translatedChartId,
    };
};

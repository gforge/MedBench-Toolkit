import type { Summary } from 'features';
import { Chart, chartValidator } from 'validators';

import type { RootState } from '.';

type OldChart2Summarise = {
    case_id: string;
    specialty: string;
    language: string;
    chart: Pick<Chart, 'medications' | 'lab'> & { chart: Chart['notes'] };
};

const convertOldSummary = (oldChart: OldChart2Summarise): Chart => {
    const { case_id, specialty, language, chart } = oldChart;
    return {
        id: case_id,
        name: '',
        specialty,
        language,
        notes: chart.chart,
        medications: chart.medications,
        lab: chart.lab,
    };
};

type OldCharts2Translate = {
    name: string;
    specialty: string;
    originalNotes: {
        header: {
            id: string;
            type: string;
            date: string;
            time: string;
            author: string;
        };
        content: string;
    }[];
    // Translations are stored in a Record where the key is the language code
    translations: Record<
        string,
        {
            header: {
                id: string;
                type: string;
                date: string;
                time: string;
                author: string;
            };
            content: string;
        }[]
    >;
};

const convertOldTranslate = (oldChart: OldCharts2Translate): Chart[] => {
    const { name, specialty, originalNotes, translations } = oldChart;
    return [
        {
            id: name,
            name,
            specialty,
            language: 'original',
            notes: originalNotes.map(({ header, content }) => ({
                ...header,
                content,
            })),
            medications: [],
            lab: [],
        },
        ...Object.entries(translations).map(([language, notes]) => ({
            name,
            specialty,
            language,
            notes: notes.map(({ header, content }) => ({
                ...header,
                content,
            })),
            medications: [],
            lab: [],
        })),
    ].map((chart) => chartValidator.validateSync(chart));
};

/**
 * Migrates stored data to the RootState['charts'] format.
 *
 * @param storedData - The stored data to be migrated.
 * @returns The migrated data in the RootState['charts'] format.
 */
export function migrateCharts(
    storedData: RootState['charts']
): RootState['charts'] {
    const oldChart2Summarize = JSON.parse(
        window.localStorage.getItem('charts4summary') ?? ''
    ) as {
        charts: OldChart2Summarise[];
        summary: Record<string, string>;
        version: string;
    } | null;
    const oldCharts2Translate = JSON.parse(
        window.localStorage.getItem('charts2translate') ?? ''
    ) as {
        charts: OldCharts2Translate[];
        version: string;
    } | null;

    if (!oldChart2Summarize && !oldCharts2Translate) {
        return storedData;
    }

    const oldCharts: Chart[] = (oldChart2Summarize?.charts ?? []).map(
        convertOldSummary
    );
    const oldTranslateCharts: Chart[] = (
        oldCharts2Translate?.charts ?? []
    ).flatMap(convertOldTranslate);
    const nonExistantCharts = [...oldCharts, ...oldTranslateCharts].filter(
        (chart) => !storedData.charts.some((c) => c.id === chart.id)
    );
    storedData.charts = [...storedData.charts, ...nonExistantCharts].map(
        (c) => ({ ...c, createdBy: '@@@migrated@@@' })
    );

    const summaries = Object.entries(oldChart2Summarize?.summary ?? {}).map(
        ([chartId, text]): Summary => ({
            chartId,
            summaryId: 'Human',
            text,
            createdBy: '@@@migrated@@@',
            final: false,
        })
    );
    window.localStorage.setItem('summaries2migrate', JSON.stringify(summaries));

    window.localStorage.removeItem('charts4summary');
    window.localStorage.removeItem('charts2translate');

    return storedData;
}

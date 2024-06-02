import type { Summary } from 'features';
import { Chart, chartValidator } from 'validators';

import type { RootState } from '.';
import {
    getLocalItemFromRemember,
    removeItemFromRemember,
    setLocalItemToRemember,
} from './getLocalItemFromRemember';

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
    const oldChart2Summarize = getLocalItemFromRemember<{
        charts: OldChart2Summarise[];
        summary: Record<string, string>;
        version: string;
    }>('charts4summary');
    const oldCharts2Translate = getLocalItemFromRemember<{
        charts: OldCharts2Translate[];
        version: string;
    }>('charts2translate');

    if (!oldChart2Summarize && !oldCharts2Translate) {
        console.warn('No original chart data found');
        return storedData;
    }

    console.log('Migrating charts...');
    const oldCharts: Chart[] = (oldChart2Summarize?.charts ?? []).map(
        convertOldSummary
    );
    console.log('...');
    const oldTranslateCharts: Chart[] = (
        oldCharts2Translate?.charts ?? []
    ).flatMap(convertOldTranslate);
    console.log('...2', storedData);
    const nonExistantCharts = [...oldCharts, ...oldTranslateCharts].filter(
        (chart) => !storedData.charts.some((c) => c.id === chart.id)
    );
    console.log('charts:', nonExistantCharts.length);

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
    setLocalItemToRemember('summaries2migrate', summaries);

    removeItemFromRemember('charts4summary');
    removeItemFromRemember('charts2translate');
    console.log('Migrated charts:', storedData.charts.length);

    return storedData;
}

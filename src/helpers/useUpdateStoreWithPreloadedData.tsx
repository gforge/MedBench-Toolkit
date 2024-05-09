import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChartValue, FullChart2Summarise } from 'validators';

import packageJson from '../../package.json'; // Adjust the path accordingly
import {
    charts2translateActions as trnsltActions,
    charts4summaryActions as smryActions,
    selectSummaryCharts,
    selectTranslationCharts,
} from '../features';
import {
    NewChart2Translate,
    NewTranslation,
} from '../features/charts2translate/reducers';
import { getChartId } from './getChartId';
import { getNoteId } from './getNoteId';
import { loadData } from './loadData';

export const useUpdateStoreWithPreloadedData = () => {
    const { charts: charts4summary, version } =
        useSelector(selectSummaryCharts);
    const charts2translate = useSelector(selectTranslationCharts);

    const dispatch = useDispatch();
    useEffect(() => {
        const charts = loadData();
        if (!charts) {
            console.warn('No original chart data found');
            return;
        }

        updateSummaryCharts({ dispatch, charts, version, charts4summary });
        updateTranslationCharts({
            dispatch,
            charts,
            charts2translate,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

const updateSummaryCharts = ({
    dispatch,
    charts,
    version,
    charts4summary,
}: {
    dispatch: ReturnType<typeof useDispatch>;
    charts: Record<string, FullChart2Summarise>;
    version: string;
    charts4summary: FullChart2Summarise[];
}) => {
    // Reset the store if the version has changed
    if (version !== packageJson.version) {
        dispatch(
            smryActions.initStore({
                charts: Object.values(charts),
                version: packageJson.version,
            })
        );
        return;
    }

    // Update the store with new charts if any have been added without changing the version
    const newCharts = Object.values(charts).filter(
        (chart) =>
            !charts4summary.some(
                (chart4summary) =>
                    getChartId(chart4summary) === getChartId(chart)
            )
    );
    if (newCharts.length === 0) {
        return;
    }
    dispatch(smryActions.addCharts(newCharts));
};

const updateTranslationCharts = ({
    dispatch,
    charts,
    charts2translate,
}: {
    dispatch: ReturnType<typeof useDispatch>;
    charts: Record<string, FullChart2Summarise>;
    charts2translate: Chart[];
}) => {
    // Update the store with new charts if any have been added without changing the version
    const newCharts = Object.values(charts).filter(
        (chart) =>
            !charts2translate.some(
                (charts2translate) =>
                    charts2translate.name === chart.case_id &&
                    charts2translate.specialty === chart.specialty &&
                    chart.language === 'original'
            )
    );

    if (newCharts.length === 0) {
        return;
    }

    const newOriginalCharts = newCharts
        .filter((chart) => chart.language === 'original')
        .map(
            ({
                case_id: name,
                specialty,
                chart: { chart },
            }): NewChart2Translate => ({
                name,
                specialty,
                notes: convertFullChartToNoteArray(chart),
            })
        );

    const additionalTranslations: NewTranslation[] = [];
    newCharts
        .filter((chart) => chart.language !== 'original')
        .forEach(({ case_id: name, specialty, language, chart: { chart } }) => {
            const chartIndex = newOriginalCharts.findIndex(
                (chart) => chart.name === name && chart.specialty === specialty
            );
            if (chartIndex === -1) {
                const existingTranslation = charts2translate.find(
                    (at) => at.name === name && at.specialty === specialty
                );
                if (!existingTranslation) {
                    console.warn(
                        `No original chart found for translation ${name} (${specialty})`
                    );
                    return;
                }
                // Only update if there is no translation for the language
                if (existingTranslation.translations[language]) {
                    return;
                }
                additionalTranslations.push({
                    id: getChartId(existingTranslation),
                    language,
                    translation: convertFullChartToNoteArray(chart),
                });
            } else {
                newOriginalCharts[chartIndex].translations = {
                    ...newOriginalCharts[chartIndex].translations,
                    [language]: convertFullChartToNoteArray(chart),
                };
            }
        });

    dispatch(trnsltActions.addCharts(newOriginalCharts));
    dispatch(trnsltActions.uploadTranslations(additionalTranslations));
};

const convertFullChartToNoteArray = (notes: ChartValue[]): Note[] =>
    notes.map(({ content: rawContent, type, date, time, author }) => {
        const baseHeader = { author, type, date, time };
        const content = rawContent.replace(/(\r\n|\n|\r)/gm, '\n\n');
        return {
            header: {
                id: getNoteId({ header: baseHeader }),
                ...baseHeader,
            },
            content,
        };
    });

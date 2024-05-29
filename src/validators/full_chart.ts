import * as yup from 'yup';

import { labSchema } from './json_lab';
import { medicationSchema } from './json_med';

export const chartSchema = yup
    .object()
    .shape({
        type: yup.string().required(),
        date: yup
            .string()
            .matches(/^\d{4}-\d{2}-\d{2}$/)
            .required(),
        time: yup
            .string()
            .matches(/^\d{2}[:.]\d{2}$/)
            .required(),
        author: yup.string().required(),
        content: yup.string().required(),
    })
    .required();
export type ChartValue = yup.InferType<typeof chartSchema>;

export const fullChartSchema = yup.object().shape({
    chart: yup.array().of(chartSchema).required(),
    medications: yup.array().of(medicationSchema).required(),
    lab: yup.array().of(labSchema),
});

export type FullChart2Summarise = {
    specialty: string;
    language: string;
    case_id: string;
    chart: yup.InferType<typeof fullChartSchema>;
};

/**
 * Represents a chart used for the review module.
 *
 * The chart will be reviewd by a specialist in a specific language.
 */
export type FullChart2Review = {
    specialty: string;
    language: string;
    case_id: string; // The id of the case
    summary_id: string; // The id of the summary, e.g. 'GPT-zero-shot', 'human-1', ...
    summary: string; // A markdown string summarising the chart
    chart: yup.InferType<typeof fullChartSchema>;
};

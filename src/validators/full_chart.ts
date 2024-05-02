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
        timestamp: yup.date().required(),
    })
    .required();
export type ChartValue = yup.InferType<typeof chartSchema>;

export const fullChartSchema = yup.object().shape({
    chart: yup.array().of(chartSchema).required(),
    medications: yup.array().of(medicationSchema).required(),
    lab: yup.array().of(labSchema),
});

export type FullChart2Summarise = {
    case_id: string;
    specialty: string;
    language: string;
    chart: yup.InferType<typeof fullChartSchema>;
};

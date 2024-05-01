import * as yup from 'yup';

import { labSchema } from './json_lab';
import { medicationSchema } from './json_med';

export const chartSchema = yup
    .object()
    .shape({
        text: yup.string().required(),
        header: yup.string().required(),
        type: yup.string().required(),
        year: yup
            .string()
            .matches(/^\d{4}-\d{2}-\d{2}$/)
            .required(),
        hour: yup
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
    Chart: yup.array().of(chartSchema).required(),
    Medications: yup.array().of(medicationSchema).required(),
    Lab: yup.array().of(labSchema),
});

export type FullChart2Summarise = {
    case_id: string;
    specialty: string;
    chart: yup.InferType<typeof fullChartSchema>;
};

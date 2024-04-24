import * as yup from 'yup';

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

export const medicationSchema = yup
    .object()
    .shape({
        Medication: yup.string().required(),
        'Way of adminstration': yup.string().required(),
        Strength: yup.string().required(), // Can be a mix, e.g. 12,5/50
        Unit: yup.string().required(),
        Date: yup.string().required(), // assuming a specific format or as integer representing Excel date
        'Times per day': yup.string(),
        parsed_date: yup
            .string()
            .matches(/^\d{4}-\d{2}-\d{2}$/)
            .required(),
        timestamp: yup.date().required(),
    })
    .required();

export const labSchema = yup
    .object()
    .shape({
        'Lab test': yup.string().required(),
        'Reference interval': yup.string().required(),
        Unit: yup.string().required(),
        Value: yup.number().required(),
        timestamp: yup.date().required(),
    })
    .required();

export type LabValue = yup.InferType<typeof labSchema>;

export const fullChartSchema = yup.object().shape({
    Chart: yup.array().of(chartSchema).required(),
    Medications: yup.array().of(medicationSchema).required(),
    Lab: yup.array().of(labSchema),
});

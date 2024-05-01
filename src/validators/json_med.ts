import * as yup from 'yup';

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

export type MedicationValue = yup.InferType<typeof medicationSchema>;

import * as yup from 'yup';

export const medicationSchema = yup
    .object()
    .shape({
        medication: yup.string().required(),
        wayOfAdminstration: yup.string().required(),
        strength: yup.string().required(), // Can be a mix, e.g. 12,5/50
        unit: yup.string().required(),
        date: yup.string().required(), // assuming a specific format or as integer representing Excel date
        timesPerDay: yup.string(),
        timestamp: yup.date().required(),
    })
    .required();

export type MedicationValue = yup.InferType<typeof medicationSchema>;

import * as yup from 'yup';

export const medicationSchema = yup
    .object()
    .shape({
        medication: yup.string().required(),
        wayOfAdministration: yup.string().required(),
        strength: yup.string().required(), // Can be a mix, e.g. 12,5/50
        unit: yup.string().required(),
        timesPerDay: yup.string(),
        date: yup
            .string()
            .matches(/^\d{4}-\d{2}-\d{2}$/)
            .required(),
    })
    .required();

export type MedicationValue = yup.InferType<typeof medicationSchema>;

export const medicationTimeSort = (
    { date: a }: MedicationValue,
    { date: b }: MedicationValue
) => {
    // Convert a and b from ISO date strings to Date objects
    const dateA = new Date(a);
    const dateB = new Date(b);
    // Compare the two dates
    if (dateA < dateB) {
        return -1;
    }
    if (dateA > dateB) {
        return 1;
    }
    return 0;
};

import * as yup from 'yup';

export const labSchema = yup
    .object()
    .shape({
        labTest: yup.string().required(),
        referenceInterval: yup.string().required(),
        unit: yup.string().required(),
        value: yup
            .mixed<string>()
            .transform((_value, originalValue): string => {
                if (typeof originalValue === 'number') {
                    return originalValue.toString();
                }
                return originalValue;
            })
            .required(),
        date: yup
            .string()
            .matches(/^\d{4}-\d{2}-\d{2}$/)
            .required(),
        time: yup
            .string()
            .matches(/^\d{2}[:.]\d{2}$/)
            .required(),
    })
    .required();

export const labValueTimeSort = (
    a: Pick<LabValue, 'date' | 'time'>,
    b: Pick<LabValue, 'date' | 'time'>
) => {
    // Convert a and b from ISO date strings to Date objects
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    // Compare the two dates
    if (dateA < dateB) {
        return -1;
    }
    if (dateA > dateB) {
        return 1;
    }
    return 0;
};

export type LabValue = yup.InferType<typeof labSchema>;

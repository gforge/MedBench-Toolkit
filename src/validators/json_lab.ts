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
        timestamp: yup.date().required(),
    })
    .required();

export type LabValue = yup.InferType<typeof labSchema>;

import * as yup from 'yup';

export const labSchema = yup
    .object()
    .shape({
        'Lab test': yup.string().required(),
        'Reference interval': yup.string().required(),
        Unit: yup.string().required(),
        Value: yup
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

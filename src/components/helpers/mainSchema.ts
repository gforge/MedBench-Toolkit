import * as yup from 'yup';

// Define the Header schema
export const headerSchema = yup.object().shape({
    id: yup.string().required(),
    type: yup.string().required(),
    date: yup
        .string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
        .required(),
    time: yup
        .string()
        .matches(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format')
        .required(),
    author: yup.string().required(),
});

const translatedNotesSchema = yup
    .array()
    .of(
        yup.object().shape({
            header: headerSchema,
            content: yup.string().default(''), // Default to empty string,
        })
    )
    .required();

export const chartSchema = yup.object().shape({
    name: yup.string().required(),
    specialty: yup.string().required(),
    originalNotes: yup
        .array()
        .of(
            yup.object().shape({
                header: headerSchema,
                content: yup.string().required(),
            })
        )
        .required(),
    translations: yup.lazy((obj) =>
        yup.object().shape(
            Object.keys(obj).reduce(
                (acc, key) => {
                    acc[key] = translatedNotesSchema; // Directly use notesSchema here
                    return acc;
                },
                {} as { [key: string]: typeof translatedNotesSchema }
            )
        )
    ),
});

export const chartsSchema = yup.array().of(chartSchema).required();

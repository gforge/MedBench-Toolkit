import { getNoteId } from 'helpers';
import * as yup from 'yup';

export const noteValidator = yup
    .object({
        // The type of the note, e.g. "Surgery note", "Daily progress note"
        type: yup.string().required(),
        // Date of the note in the format of YYYY-MM-DD
        date: yup
            .string()
            .matches(/^\d{4}-\d{2}-\d{2}$/)
            .required(),
        // Time of the note in the format of HH:MM
        time: yup
            .string()
            .matches(/^\d{2}[:.]\d{2}$/)
            .required(),
        // Author of the note, e.g. "Dr. John Doe", "Nurse Jane Doe"
        author: yup.string().required(),
        // Content of the note
        content: yup
            .string()
            .required()
            .transform((value: string) =>
                value.replace(/(\r\n|\n|\r)/gm, '\n\n')
            ),
        // The id is derived from key values
        id: yup.string().required(),
    })
    .transform((value) => {
        // Ensure value is an object and transform it to include the id if not present
        if (typeof value === 'object' && value !== null) {
            if (!value.id) {
                value.id = getNoteId(value);
            }
        }
        return value;
    });

export type Note = yup.InferType<typeof noteValidator>;

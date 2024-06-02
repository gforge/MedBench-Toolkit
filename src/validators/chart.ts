import * as yup from 'yup';

import { getChartId } from '../helpers';
import { labSchema as labValidator } from './lab';
import { medicationSchema as medicationValidator } from './med';
import { noteValidator } from './note';

export const chartValidator = yup
    .object()
    .shape({
        name: yup.string().required().label('Chart name, e.g. Case 1'),
        specialty: yup.string().required().label('Specialty, e.g. Cardiology'),
        language: yup
            .string()
            .required()
            .label(
                'Language, e.g. original, Swedish. The "original" language is basic English that the chart stems from.'
            ),
        notes: yup
            .array()
            .of(noteValidator)
            .required()
            .label(
                'Notes for the chart, e.g. admissino, progress, discharge notes'
            ),
        medications: yup.array().of(medicationValidator).default([]),
        lab: yup.array().of(labValidator).default([]),
        id: yup.string().required(),
    })
    .transform((value) => {
        if (typeof value === 'object' && value !== null) {
            if (!value.id) {
                value.id = getChartId(value);
            }
        }
        return value;
    });

export type Chart = yup.InferType<typeof chartValidator>;

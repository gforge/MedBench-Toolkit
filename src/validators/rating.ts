import * as yup from 'yup';

export const ratingValidator = yup.object().shape({
    diagnosis: yup
        .number()
        .integer('Diagnosis rating must be an integer')
        .min(1, 'Diagnosis rating must be at least 1')
        .max(4, 'Diagnosis rating must be at most 4')
        .required('Diagnosis rating is required'),
    medicalHistory: yup
        .number()
        .integer('Medical History rating must be an integer')
        .min(1, 'Medical History rating must be at least 1')
        .max(4, 'Medical History rating must be at most 4')
        .required('Medical History rating is required'),
    hospitalCourse: yup
        .number()
        .integer('Hospital Course rating must be an integer')
        .min(1, 'Hospital Course rating must be at least 1')
        .max(4, 'Hospital Course rating must be at most 4')
        .required('Hospital Course rating is required'),
    followUp: yup
        .number()
        .integer('Follow Up rating must be an integer')
        .min(1, 'Follow Up rating must be at least 1')
        .max(4, 'Follow Up rating must be at most 4')
        .required('Follow Up rating is required'),
    conciseness: yup
        .number()
        .integer('Conciseness rating must be an integer')
        .min(1, 'Conciseness rating must be at least 1')
        .max(4, 'Conciseness rating must be at most 4')
        .required('Conciseness rating is required'),
    completeness: yup
        .number()
        .integer('Completeness rating must be an integer')
        .min(1, 'Completeness rating must be at least 1')
        .max(4, 'Completeness rating must be at most 4')
        .required('Completeness rating is required'),
    language: yup
        .number()
        .integer('Language rating must be an integer')
        .min(1, 'Language rating must be at least 1')
        .max(4, 'Language rating must be at most 4')
        .required('Language rating is required'),
    clarity: yup
        .number()
        .integer('Clarity rating must be an integer')
        .min(1, 'Clarity rating must be at least 1')
        .max(4, 'Clarity rating must be at most 4')
        .required('Clarity rating is required'),
    hallucinations: yup
        .number()
        .integer('Hallucinations rating must be an integer')
        .min(0, 'Hallucinations rating must be at least 0')
        .max(3, 'Hallucinations rating must be at most 3')
        .required('Hallucinations rating is required'),
    hallucinationsComment: yup.string().notRequired(),
    overall: yup
        .number()
        .integer('Overall rating must be an integer')
        .min(1, 'Overall rating must be at least 1')
        .max(5, 'Overall rating must be at most 5')
        .required('Overall rating is required'),
    overallComment: yup.string().notRequired(),
});

export type Rating = yup.InferType<typeof ratingValidator>;

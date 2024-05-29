import { Typography } from '@mui/material';
import { RatingSection, RatingSectionProps } from 'components';

const medicalAccuracyRatings: Omit<RatingSectionProps, 'value'>[] = [
    {
        label: 'Diagnosis',
        help: 'Evaluate the accuracy of the diagnosis, ensuring no major factual errors or inconsistencies.',
        name: 'diagnosis-rating',
        options: [
            'Major factual errors (e.g., missing diagnosis, incorrect diagnosis)',
            'Moderately accurate with a few errors',
            'Mainly accurate with minor errors',
            'Completely accurate with no errors',
        ],
    },
    {
        label: 'Past medical history',
        help: 'Assess the completeness and accuracy of past medical, surgical, and mental health history.',
        name: 'past-medical-history-rating',
        options: [
            'Major factual errors',
            'Moderately accurate with a few errors',
            'Mainly accurate with minor errors',
            'Completely accurate with no errors',
        ],
    },
    {
        label: 'Hospital course',
        help: 'Review the recorded details of the hospital course for accuracy and completeness.',
        name: 'hospital-course-rating',
        options: [
            'Major factual errors',
            'Moderately accurate with a few errors',
            'Mainly accurate with minor errors',
            'Completely accurate with no errors',
        ],
    },
    {
        label: 'Planned follow-up',
        help: 'Check for any major factual errors in the planned follow-up.',
        name: 'planned-follow-up-rating',
        options: [
            'Major factual errors',
            'Moderately accurate with a few errors',
            'Mainly accurate with minor errors',
            'Completely accurate with no errors',
        ],
    },
];

export const MedicalAccuracy = () => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Medical Accuracy
            </Typography>
            {medicalAccuracyRatings.map((rating) => (
                <RatingSection key={rating.name} {...rating} value={null} />
            ))}
        </>
    );
};

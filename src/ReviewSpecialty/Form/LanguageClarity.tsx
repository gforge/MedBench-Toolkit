import { Typography } from '@mui/material';
import { RatingSection, RatingSectionProps } from 'components';

const languageClarityRatings: Omit<RatingSectionProps, 'value'>[] = [
    {
        label: 'Language',
        help: 'Ensure that the language used is clear and understandable to avoid miscommunication.',
        name: 'language-rating',
        options: [
            'Not understandable; several corrections needed',
            'Generally understandable; major corrections needed',
            'Generally understandable; minor corrections needed',
            'Completely understandable; no corrections needed',
        ],
    },
    {
        label: 'Clarity',
        help: 'Assess whether the information is presented logically and coherently.',
        name: 'clarity-rating',
        options: [
            'Very unclear',
            'Somewhat unclear',
            'Mostly clear',
            'Very clear',
        ],
    },
];

export const LanguageClarity = () => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Language and Clarity
            </Typography>
            {languageClarityRatings.map((rating) => (
                <RatingSection key={rating.name} {...rating} value={null} />
            ))}
        </>
    );
};

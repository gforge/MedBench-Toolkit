import { Typography } from '@mui/material';
import { RatingSection, RatingSectionProps } from 'components';

const concisenessCompletenessRatings: Omit<RatingSectionProps, 'value'>[] = [
    {
        label: 'Conciseness',
        help: 'Evaluate if the summaries are free from unnecessary details, yet include all critical information.',
        name: 'conciseness-rating',
        options: [
            'Very poorly summarised (the text is not understandable, several corrections are needed)',
            'Acceptably summarised (the text is generally understandable, major corrections are needed)',
            'Well summarised (the text is generally understandable, minor corrections are needed)',
            'Very well summarised (the text is completely understandable, no corrections are needed)',
        ],
    },
    {
        label: 'Completeness',
        help: 'Assess if the summaries include all necessary information relevant to patient care.',
        name: 'completeness-rating',
        options: [
            'The text is very poorly summarised',
            'The text is acceptably summarised',
            'The text is well summarised',
            'The text is very well summarised',
        ],
    },
];

export const ConcisenessCompleteness = () => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Conciseness and Completeness
            </Typography>
            {concisenessCompletenessRatings.map((rating) => (
                <RatingSection key={rating.name} {...rating} value={null} />
            ))}
        </>
    );
};

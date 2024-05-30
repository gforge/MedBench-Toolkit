import { RatingSectionGroup, RatingSectionProps } from 'components';

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
        <RatingSectionGroup
            title="Language and Clarity"
            ratings={languageClarityRatings.map((r) => ({ ...r, value: null }))}
        />
    );
};

import { RatingSectionGroup } from 'components';

const languageClarityRatings = [
    {
        label: 'Language',
        help: 'Ensure that the language used is clear and understandable to avoid miscommunication.',
        name: 'language',
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
        name: 'clarity',
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
            ratings={languageClarityRatings}
        />
    );
};

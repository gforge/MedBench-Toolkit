/**
 * Represents a mapping of specialties to the languages available for each specialty.
 * The keys are the specialties, and the values are arrays of languages available for each specialty.
 */
type Specialties = Record<string, string[]>;

export interface ReviewStartProps {
    specialties: Specialties;
    activateReview: (args: { specialty: string; language: string }) => void;
}

export interface Rating {
    // Medical accuracy
    diagnosis: number;
    medicalHistory: number;
    hospitalCourse: number;
    followUp: number;
    // Conciseness
    conciseness: number;
    completeness: number;
    // Language
    language: number;
    clarity: number;
    // Hallucinations
    hallucinations: number;
    hallucinationsComment: string;
    // Overall
    overall: number;
    comments: string;
    completed: true;
}

type Nullable<T> = { [P in keyof T]: T[P] | null };

// Partial ratings are when elements can be null
export type PartialRating = Omit<Nullable<Rating>, 'completed'> & {
    completed: false;
};

export type RawRating = Omit<Rating | PartialRating, 'completed'>;

function isPartialRating(ratings: RawRating): ratings is PartialRating {
    return (
        ratings.diagnosis === null ||
        ratings.medicalHistory === null ||
        ratings.hospitalCourse === null ||
        ratings.followUp === null ||
        ratings.conciseness === null ||
        ratings.completeness === null ||
        ratings.language === null ||
        ratings.clarity === null ||
        ratings.hallucinations === null ||
        ratings.hallucinationsComment === null ||
        ratings.overall === null ||
        ratings.comments === null
    );
}

export function convertRaw2Rating(rating: RawRating): Rating | PartialRating {
    if (isPartialRating(rating)) {
        return {
            ...rating,
            completed: false,
        } as PartialRating;
    }

    return {
        ...rating,
        completed: true,
    } as Rating;
}

export interface Review {
    chartId: string;
    summaryId: string;
    userMainEmail: string;
    rating: Rating | PartialRating;
    version: string;
}

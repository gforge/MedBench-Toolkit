import type { FullChart2Review } from 'validators';

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
    userMainEmail: string;
    rating: Rating | PartialRating;
    version: string;
}

export interface ReviewVersion1 extends Omit<Review, 'version'> {
    version: '1';
}

export const isReviewVersion1 = (
    review: Omit<Review, 'version'> & { version: string }
): review is ReviewVersion1 => {
    return review.version === '1';
};

export interface ReviewChart {
    type: 'review';
    chart: FullChart2Review;
    review: Review | null;
    version: string;
}

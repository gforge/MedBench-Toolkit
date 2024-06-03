import { Rating } from 'validators';

function isPartialRating(ratings: Rating) {
    return (
        !ratings.diagnosis ||
        !ratings.medicalHistory ||
        !ratings.hospitalCourse ||
        !ratings.followUp ||
        !ratings.conciseness ||
        !ratings.completeness ||
        !ratings.language ||
        !ratings.clarity ||
        !ratings.hallucinations ||
        !ratings.overall
    );
}

export function convertRaw2Rating(
    rating: Rating
): Rating & { completed: boolean } {
    if (isPartialRating(rating)) {
        return {
            ...rating,
            completed: false,
        };
    }

    return {
        ...rating,
        completed: true,
    };
}

export interface Review {
    chartId: string;
    summaryId: string;
    userMainEmail: string;
    rating: Rating & { completed: boolean };
    version: string;
}

import { Rating } from 'validators';

function isPartialRating(ratings: Rating) {
    return (
        ratings.diagnosis === undefined ||
        ratings.diagnosis === null ||
        ratings.medicalHistory === undefined ||
        ratings.medicalHistory === null ||
        ratings.hospitalCourse === undefined ||
        ratings.hospitalCourse === null ||
        ratings.followUp === undefined ||
        ratings.followUp === null ||
        ratings.conciseness === undefined ||
        ratings.conciseness === null ||
        ratings.completeness === undefined ||
        ratings.completeness === null ||
        ratings.language === undefined ||
        ratings.language === null ||
        ratings.clarity === undefined ||
        ratings.clarity === null ||
        ratings.hallucinations === undefined ||
        ratings.hallucinations === null ||
        ratings.overall === undefined ||
        ratings.overall === null
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

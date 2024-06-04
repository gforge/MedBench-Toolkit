import { type Review, type Summary } from 'features';
import { type Chart } from 'validators';

export type ReviewChart = {
    chart: Chart;
    summaries: {
        summary: Summary;
        review: Review | undefined;
    }[];
};

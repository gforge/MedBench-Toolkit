import { Box, TextField, Typography } from '@mui/material';
import { RatingSection, RatingSectionProps } from 'components/RatingSection';

const overallScoreProps: Omit<RatingSectionProps, 'value'> = {
    label: 'Overall Score',
    help: 'Rate the overall performance compared to your expectations and experience.',
    name: 'overall-score-rating',
    options: [
        'Unusable',
        'Subhuman',
        'On par with average',
        'On par with good colleagues',
        "Superhuman or excellent performance (e.g., better than any note I've encountered)",
    ],
};

export const OverallScore = () => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Overall Evaluation
            </Typography>
            <RatingSection {...overallScoreProps} value={null} />
            <Box sx={{ marginY: 2 }}>
                <TextField
                    fullWidth
                    label="Comments and reflections on the overall evaluation"
                    variant="outlined"
                    value={null}
                    multiline
                    rows={4}
                    margin="normal"
                />
            </Box>
        </>
    );
};

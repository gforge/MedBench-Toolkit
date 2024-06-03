import { Box, TextField, Typography } from '@mui/material';
import { RatingSection, RatingSectionProps } from 'components/RatingSection';
import { Controller, useFormContext } from 'react-hook-form';

const overallScoreProps: Omit<RatingSectionProps, 'control'> = {
    label: 'Overall Score',
    help: 'Rate the overall performance compared to your expectations and experience.',
    name: 'overall',
    options: [
        'Unusable',
        'Subhuman',
        'On par with average',
        'On par with good colleagues',
        "Superhuman or excellent performance (e.g., better than any note I've encountered)",
    ],
};

export const OverallScore = () => {
    const { control } = useFormContext();
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Overall Evaluation
            </Typography>
            <RatingSection {...overallScoreProps} />
            <Box sx={{ marginY: 2 }}>
                <Controller
                    name="overallComment"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Comments and reflections on the overall evaluation"
                            variant="outlined"
                            multiline
                            rows={4}
                            margin="normal"
                        />
                    )}
                />
            </Box>
        </>
    );
};

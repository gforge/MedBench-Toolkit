import { Paper, Typography } from '@mui/material';

export const ReviewHelp = ({ show }: { show: boolean }) => {
    if (!show) return null;

    return (
        <Paper sx={{ marginTop: '2em', padding: '1em', maxWidth: '600px' }}>
            <Typography variant="h5">Reviewer for charts</Typography>
            <Typography variant="body1">
                This tool is used to review and evaluate summaries for medical
                charts.
            </Typography>
        </Paper>
    );
};

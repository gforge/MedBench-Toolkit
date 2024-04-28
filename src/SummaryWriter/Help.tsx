import { Paper, Typography } from '@mui/material';

export const SummaryWriterHelp = ({ show }: { show: boolean }) => {
    if (!show) return null;

    return (
        <Paper sx={{ marginTop: '2em', padding: '1em', maxWidth: '600px' }}>
            <Typography variant="h5">Summary writer</Typography>
            <Typography variant="body1">
                This tool is used to write summaries of medical cases. It is
                based on the study protocol for the MedBench study. The goal is
                to write a structured summary of the case, following the
                protocol.
            </Typography>
        </Paper>
    );
};

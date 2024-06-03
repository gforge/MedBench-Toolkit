import { Paper, Typography } from '@mui/material';

interface NoChartsFoundProps {
    specialty: string;
    language: string;
}

export const NoChartsFound = ({ specialty, language }: NoChartsFoundProps) => (
    <Paper sx={{ padding: '10px' }}>
        <Typography>
            No charts found for {specialty} in {language}.
        </Typography>
    </Paper>
);

import { Paper, Typography } from '@mui/material';

interface InvalidSpecialtyProps {
    specialty: string | undefined;
    language: string | undefined;
}

export const InvalidSpecialty = ({
    specialty,
    language,
}: InvalidSpecialtyProps) => (
    <Paper sx={{ padding: '10px' }}>
        <Typography>
            Invalid specialty. No {specialty} in {language} found.
        </Typography>
    </Paper>
);

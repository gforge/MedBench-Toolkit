import { Box, Typography } from '@mui/material';
import type { Note } from 'validators';

export type HeaderDateProps = Pick<Note, 'date' | 'time'>;

export const HeaderDate = ({ date, time }: HeaderDateProps) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                textAlign: 'center',
            }}
        >
            <Typography color="text.secondary">
                {date} {time}
            </Typography>
        </Box>
    );
};

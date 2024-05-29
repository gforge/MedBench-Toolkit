import { Box, Button, Typography } from '@mui/material';

interface ReviewNavigatorProps {
    no: number;
    setNo: React.Dispatch<React.SetStateAction<number>>;
    total: number;
    specialty: string;
    language: string;
}

export const ReviewNavigator = ({
    no,
    setNo,
    total,
    specialty,
    language,
}: ReviewNavigatorProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px',
                height: '30px',
                margin: '5px',
                borderRadius: '8px',
                boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.12)',
            }}
        >
            <Button
                variant="outlined"
                onClick={() => setNo((no) => Math.max(no - 1, 0))}
                disabled={no === 0}
                sx={{ minWidth: '40px' }}
            >
                &larr;
            </Button>
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
                Case no {no} - {specialty} in {language}
            </Typography>
            <Button
                variant="outlined"
                onClick={() => setNo((no) => Math.min(no + 1, total - 1))}
                disabled={no === total - 1}
                sx={{ minWidth: '40px' }}
            >
                &rarr;
            </Button>
        </Box>
    );
};

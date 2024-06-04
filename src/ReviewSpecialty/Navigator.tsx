import { Box, Button, Tooltip, Typography } from '@mui/material';

export interface ReviewNavigatorProps {
    no: number;
    specialty: string;
    language: string;
    isDone: boolean;
    navigateNext: (() => void) | undefined;
    navigateBack: (() => void) | undefined;
}

export const ReviewNavigator = ({
    no,
    specialty,
    language,
    isDone,
    navigateNext,
    navigateBack,
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
                onClick={navigateBack}
                disabled={!navigateBack}
                sx={{ minWidth: '40px' }}
            >
                &larr;
            </Button>
            <Tooltip
                title={`Specialty: ${specialty} Language: ${language === 'original' ? 'Original' : language}`}
            >
                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        textAlign: 'center',
                        color: isDone ? '#00421e' : undefined,
                    }}
                >
                    Case no {no + 1}
                    {isDone ? ' (Done)' : ''}
                </Typography>
            </Tooltip>
            <Button
                variant="outlined"
                onClick={navigateNext}
                disabled={!navigateNext}
                sx={{ minWidth: '40px' }}
            >
                &rarr;
            </Button>
        </Box>
    );
};

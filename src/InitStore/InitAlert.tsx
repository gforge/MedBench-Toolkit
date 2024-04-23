import { Alert, Snackbar } from '@mui/material';

export const InitAlert = ({
    error,
    setError,
}: {
    error: string | null;
    setError: (s: string | null) => void;
}) => (
    <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
        <Alert
            onClose={() => setError(null)}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
        >
            There are erros in the provided file:
            <pre>{error}</pre>
        </Alert>
    </Snackbar>
);

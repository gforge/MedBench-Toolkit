import { Alert, Snackbar } from '@mui/material';

export const UploadAlert = ({
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
            There are erros in the translation file:
            <pre>{error}</pre>
        </Alert>
    </Snackbar>
);

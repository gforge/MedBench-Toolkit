import { Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface LoginPromptProps {
    redirect: string;
}

export const LoginPrompt = ({ redirect }: LoginPromptProps) => (
    <Paper sx={{ padding: '10px' }}>
        <Typography variant="h6">
            You need to be logged in to access this page.
        </Typography>
        <Link to={`/login?redirect=${redirect}`}>
            <Button variant="contained" color="primary">
                Login
            </Button>
        </Link>
    </Paper>
);

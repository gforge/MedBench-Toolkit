import {
    Button,
    ButtonGroup,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { selectUser, userActions } from 'features';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector(selectUser);
    const redirectTo =
        new URLSearchParams(location.search).get('redirect') ?? '/';

    const login = useCallback(async () => {
        setError(null);
        try {
            await dispatch(userActions.login({ email, password }));
        } catch (error) {
            setError(
                error instanceof Error ? error.message : 'An error occurred'
            );
        }
    }, [dispatch, email, password]);

    const signup = useCallback(() => {
        navigate(`/signup?redirect=${redirectTo}`);
    }, [navigate, redirectTo]);

    if (user) {
        // Go to the redirect path if it exists
        return <Navigate to={redirectTo} />;
    }

    return (
        <form onSubmit={login}>
            <Stack
                direction="column"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{
                    padding: '30px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    width: 'fit-content',
                    margin: 'auto',
                }}
            >
                <Typography variant="h6">Login</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <ButtonGroup>
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        disabled={!email || !password}
                    >
                        Login
                    </Button>
                    <Button
                        onClick={signup}
                        variant="contained"
                        color="primary"
                    >
                        Signup
                    </Button>
                </ButtonGroup>
            </Stack>
        </form>
    );
}

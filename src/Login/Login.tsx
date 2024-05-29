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
import { useNavigate } from 'react-router-dom';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const login = useCallback(() => {
        dispatch(userActions.login({ email, password }));
        navigate('/');
    }, [dispatch, email, navigate, password]);

    if (user) {
        navigate('/');
        return null;
    }

    return (
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
                <Button onClick={login} color="success" variant="contained">
                    Login
                </Button>
                <Button
                    onClick={() => {
                        // Include the redirect path in the URL
                        navigate(
                            `/signup?redirect=${encodeURIComponent(window.location.pathname)}`
                        );
                    }}
                    variant="contained"
                    color="primary"
                >
                    Signup
                </Button>
            </ButtonGroup>
        </Stack>
    );
}

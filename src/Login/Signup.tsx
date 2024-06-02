import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { User, userActions } from 'features';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const [user, setUser] = useState<Omit<User, 'type'>>({
        userMainEmail: '',
        firstName: '',
        middleName: '',
        lastName: '',
        orcid: '',
        otherEmails: [],
        experienceLevel: undefined,
        password: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleEmailListChange = (index: number, value: string) => {
        const updatedEmails = [...user.otherEmails];
        updatedEmails[index] = value;
        setUser({ ...user, otherEmails: updatedEmails });
    };

    const addEmailField = () => {
        setUser({ ...user, otherEmails: [...user.otherEmails, ''] });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(user);
        dispatch(userActions.signup(user));

        // Add actual submission logic here
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack
                direction="column"
                gap={2}
                justifyContent="center"
                alignItems="center"
                sx={{
                    maxWidth: '800px',
                    margin: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    padding: '30px',
                }}
            >
                <Typography variant="h6">Signup</Typography>
                <TextField
                    label="Main Email"
                    variant="outlined"
                    name="userMainEmail"
                    value={user.userMainEmail}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <Stack direction="row" gap={2} sx={{ width: '100%' }}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        required
                        sx={{ flexGrow: 1 }}
                    />
                    <TextField
                        label="Middle Name"
                        variant="outlined"
                        name="middleName"
                        value={user.middleName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                        sx={{ flexGrow: 1 }}
                    />
                </Stack>
                <TextField
                    label="ORCID"
                    variant="outlined"
                    name="orcid"
                    value={user.orcid}
                    onChange={handleChange}
                    fullWidth
                />
                {user.otherEmails.map((email, index) => (
                    <TextField
                        key={index}
                        label={`Other Email ${index + 1}`}
                        variant="outlined"
                        value={email}
                        onChange={(e) =>
                            handleEmailListChange(index, e.target.value)
                        }
                        fullWidth
                    />
                ))}
                <Button
                    onClick={addEmailField}
                    variant="contained"
                    color="secondary"
                >
                    Add Another Email
                </Button>
                <FormControl component="fieldset" fullWidth margin="normal">
                    <FormLabel component="legend">Experience Level</FormLabel>
                    <RadioGroup
                        row
                        name="experienceLevel"
                        value={user.experienceLevel ?? null}
                        onChange={handleChange}
                    >
                        <FormControlLabel
                            value="resident"
                            control={<Radio />}
                            label="Resident"
                        />
                        <FormControlLabel
                            value="junior"
                            control={<Radio />}
                            label="Junior attending (<5 years)"
                        />
                        <FormControlLabel
                            value="senior"
                            control={<Radio />}
                            label="Senior attending (>5 years)"
                        />
                    </RadioGroup>
                </FormControl>
                <Box sx={{ mt: 2 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        disabled={
                            !user.userMainEmail ||
                            !user.password ||
                            !user.firstName ||
                            !user.lastName ||
                            !user.experienceLevel
                        }
                    >
                        Submit
                    </Button>
                </Box>
            </Stack>
        </form>
    );
};

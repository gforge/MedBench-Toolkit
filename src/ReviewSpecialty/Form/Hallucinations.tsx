import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

export const Hallucinations = () => {
    const [hallucinationCount, setHallucinationCount] = useState(-1);
    const [details, setDetails] = useState('');

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Hallucinations
            </Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel id="hallucination-count-label">
                    Number of hallucinations
                </InputLabel>
                <Select
                    labelId="hallucination-count-label"
                    id="hallucination-count"
                    value={hallucinationCount}
                    label="Number of hallucinations"
                    onChange={({ target: { value } }) => {
                        if (typeof value !== 'number')
                            return setHallucinationCount(-1);

                        setHallucinationCount(value);
                    }}
                >
                    <MenuItem value={0}>None</MenuItem>
                    <MenuItem value={1}>1-2 minor inaccuracies</MenuItem>
                    <MenuItem value={2}>3-4 moderate inaccuracies</MenuItem>
                    <MenuItem value={3}>
                        More than 4 significant inaccuracies
                    </MenuItem>
                </Select>
            </FormControl>
            {hallucinationCount !== 0 && (
                <Box sx={{ marginY: 2 }}>
                    <TextField
                        fullWidth
                        label="Exemplify which hallucinations you found"
                        variant="outlined"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        multiline
                        rows={4}
                        margin="normal"
                    />
                </Box>
            )}
        </>
    );
};

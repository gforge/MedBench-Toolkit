import {
    Box,
    Collapse,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export const Hallucinations = () => {
    const { control, watch } = useFormContext();
    const hallucinationCount = watch('hallucinations', -1); // Watching the value of hallucinations field

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Hallucinations
            </Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel id="hallucination-count-label">
                    Number of hallucinations
                </InputLabel>
                <Controller
                    name="hallucinations"
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                        <Select
                            {...field}
                            labelId="hallucination-count-label"
                            id="hallucination-count"
                            label="Number of hallucinations"
                            value={field.value === null ? '' : field.value}
                            onChange={(event) => {
                                field.onChange(event.target.value);
                            }}
                        >
                            <MenuItem value={0}>None</MenuItem>
                            <MenuItem value={1}>
                                1-2 minor inaccuracies
                            </MenuItem>
                            <MenuItem value={2}>
                                3-4 moderate inaccuracies
                            </MenuItem>
                            <MenuItem value={3}>
                                More than 4 significant inaccuracies
                            </MenuItem>
                        </Select>
                    )}
                />
            </FormControl>
            <Collapse in={hallucinationCount > 0}>
                <Box sx={{ marginY: 2 }}>
                    <Controller
                        name="hallucinationsComment"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Exemplify which hallucinations you found"
                                variant="outlined"
                                multiline
                                rows={4}
                                margin="normal"
                            />
                        )}
                    />
                </Box>
            </Collapse>
        </>
    );
};

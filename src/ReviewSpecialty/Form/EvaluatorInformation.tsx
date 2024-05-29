import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material';

export const EvaluatorInformation = () => {
    return (
        <>
            <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
            />
            <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Experience Level</FormLabel>
                <RadioGroup row>
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
        </>
    );
};

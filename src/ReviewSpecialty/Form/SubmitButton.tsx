import { Button, Tooltip } from '@mui/material';

interface SubmitButtonProps {
    errors: string[];
    isValid: boolean;
}

export const SubmitButton = ({ errors, isValid }: SubmitButtonProps) => (
    <Tooltip
        title={
            !isValid && errors.length > 0 ? (
                <ul>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            ) : (
                ''
            )
        }
        placement="top"
        arrow
    >
        <span>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={!isValid}
            >
                Submit Evaluation
            </Button>
        </span>
    </Tooltip>
);

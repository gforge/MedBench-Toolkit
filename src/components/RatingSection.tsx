import {
    Box,
    Rating,
    RatingProps,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material';
import { useState } from 'react';

export type RatingSectionProps = {
    label: string; // Label for the rating
    help: string; // Help text for the rating
    options: string[];
    value: number | null;
} & Pick<RatingProps, 'name' | 'onChange'>;

export const RatingSection = ({
    label,
    help,
    options,
    value,
    ...props
}: RatingSectionProps) => {
    const [hover, setHover] = useState(-1);
    const focus = hover !== -1 ? hover : value;

    return (
        <Box sx={{ marginY: 2 }}>
            <Tooltip title={help} placement="right">
                <Typography component="legend">{label}</Typography>
            </Tooltip>
            <Stack direction="row">
                <Rating
                    {...props}
                    max={options.length}
                    onChangeActive={(_, newHover) => {
                        setHover(newHover);
                    }}
                    getLabelText={(value) => `${value}: ${label}`}
                />
                {focus !== null && (
                    <Box sx={{ ml: 2 }}>{options[focus - 1]}</Box>
                )}
            </Stack>
        </Box>
    );
};

import { Box, Rating, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';

export type RatingSectionProps = {
    label: string; // Label for the rating
    help: string; // Help text for the rating
    name: string; // Unique name for the Rating component
    options: string[];
    value: number | null;
};

export const RatingSection = ({
    label,
    help,
    name,
    options,
    value,
}: RatingSectionProps) => {
    const [hover, setHover] = useState(-1);
    const focus = hover !== -1 ? hover : value;

    return (
        <Box sx={{ marginY: 2 }}>
            <Tooltip title={help} placement="right">
                <Typography component="legend">{label}</Typography>
            </Tooltip>
            <Rating
                name={name}
                max={options.length}
                onChangeActive={(_, newHover) => {
                    setHover(newHover);
                }}
                getLabelText={(value) => `${value}: ${label}`}
            />
            {focus !== null && <Box sx={{ ml: 2 }}>{options[focus]}</Box>}
        </Box>
    );
};

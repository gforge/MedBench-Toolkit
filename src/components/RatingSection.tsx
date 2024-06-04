import { Box, Rating, Stack, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export type RatingSectionProps = {
    label: string; // Label for the rating
    help: string; // Help text for the rating
    options: string[];
    name: string;
};

export const RatingSection = ({
    label,
    help,
    options,
    name,
}: RatingSectionProps) => {
    const [hover, setHover] = useState(-1);
    const { control } = useFormContext();

    return (
        <Box sx={{ marginY: 2 }} onMouseLeave={() => setHover(-1)}>
            <Tooltip title={help} placement="right">
                <Typography component="legend">{label}</Typography>
            </Tooltip>
            <Stack direction="row">
                <Controller
                    name={name}
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                        <Rating
                            {...field}
                            max={options.length}
                            onChange={(_, newValue) => field.onChange(newValue)}
                            onChangeActive={(_, newHover) => {
                                setHover(newHover);
                            }}
                            getLabelText={(value) => `${value}: ${label}`}
                        />
                    )}
                />
                {hover !== -1 && <Box sx={{ ml: 2 }}>{options[hover - 1]}</Box>}
            </Stack>
        </Box>
    );
};

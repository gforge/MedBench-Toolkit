import { Info } from '@mui/icons-material';
import { Button, Stack, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';

import { EvaluationInstructionDialog } from './EvaluationInstructionDialog';

export const ReviewHeader = () => {
    const [open, setOpen] = useState(false);
    return (
        <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            sx={{ marginBottom: '10px' }}
        >
            <Typography variant="h6">Review summaries</Typography>
            <Tooltip title="Instructions for evaluating fictional medical charts">
                <span>
                    <Button
                        startIcon={<Info />}
                        variant={open ? 'contained' : 'outlined'}
                        size="small"
                        onClick={() => setOpen(true)}
                    >
                        Info
                    </Button>
                </span>
            </Tooltip>
            <EvaluationInstructionDialog open={open} setOpen={setOpen} />
        </Stack>
    );
};

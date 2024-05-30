import { Box, Button } from '@mui/material';

import { ConcisenessCompleteness } from './ConcisenessCompleteness';
import { Hallucinations } from './Hallucinations';
import { LanguageClarity } from './LanguageClarity';
import { MedicalAccuracy } from './MedicalAccuracy';
import { OverallScore } from './OverallScore';

export const EvaluationForm = () => {
    return (
        <Box
            component="form"
            sx={{
                padding: 2,
                maxWidth: 800,
                alignContent: 'start',
                borderTop: '1px dashed #e0e0e0',
                mt: 2,
            }}
        >
            <MedicalAccuracy />
            <ConcisenessCompleteness />
            <LanguageClarity />
            <Hallucinations />
            <OverallScore />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Submit Evaluation
            </Button>
        </Box>
    );
};

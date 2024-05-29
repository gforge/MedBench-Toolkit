import { Box, Button } from '@mui/material';

import { ConcisenessCompleteness } from './ConcisenessCompleteness';
import { EvaluatorInformation } from './EvaluatorInformation';
import { Hallucinations } from './Hallucinations';
import { LanguageClarity } from './LanguageClarity';
import { MedicalAccuracy } from './MedicalAccuracy';
import { OverallScore } from './OverallScore';

export const EvaluationForm = () => {
    return (
        <Box component="form" sx={{ padding: 2, maxWidth: 800, mx: 'auto' }}>
            <EvaluatorInformation />
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

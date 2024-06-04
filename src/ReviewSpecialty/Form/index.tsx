import { Box } from '@mui/material';
import { type Review } from 'features';
import { FormProvider } from 'react-hook-form';
import { type Rating } from 'validators';

import { ConcisenessCompleteness } from './ConcisenessCompleteness';
import { Hallucinations } from './Hallucinations';
import { LanguageClarity } from './LanguageClarity';
import { MedicalAccuracy } from './MedicalAccuracy';
import { OverallScore } from './OverallScore';
import { SubmitButton } from './SubmitButton';
import { useEvaluationForm } from './useEvaluationForm';

interface EvaluationFormProps {
    review: Review | undefined;
    onSubmit: (rating: Omit<Rating, 'completed'> & { partial?: true }) => void;
}

export const EvaluationForm = ({ review, onSubmit }: EvaluationFormProps) => {
    const { methods, errors, isValid, trigger } = useEvaluationForm(
        review?.rating
    );

    return (
        <Box
            sx={{
                padding: 2,
                maxWidth: 800,
                alignContent: 'start',
                borderTop: '1px dashed #e0e0e0',
                mt: 2,
            }}
        >
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    onChange={() => {
                        onSubmit({ ...methods.getValues(), partial: true });
                        trigger();
                    }}
                >
                    <MedicalAccuracy />
                    <ConcisenessCompleteness />
                    <LanguageClarity />
                    <Hallucinations />
                    <OverallScore />
                    <SubmitButton errors={errors} isValid={isValid} />
                </form>
            </FormProvider>
        </Box>
    );
};

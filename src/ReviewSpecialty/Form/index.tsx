import { Box } from '@mui/material';
import { type Review, reviewsActions, type User } from 'features';
import { FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { type Rating } from 'validators';

import { ConcisenessCompleteness } from './ConcisenessCompleteness';
import { Hallucinations } from './Hallucinations';
import { LanguageClarity } from './LanguageClarity';
import { MedicalAccuracy } from './MedicalAccuracy';
import { OverallScore } from './OverallScore';
import { SubmitButton } from './SubmitButton';
import { useEvaluationForm } from './useEvaluationForm';

interface EvaluationFormProps {
    chartId: string;
    summaryId: string;
    user: User;
    review: Review | undefined;
}

export const EvaluationForm = ({
    chartId,
    summaryId,
    user,
    review,
}: EvaluationFormProps) => {
    const dispatch = useDispatch();
    const { methods, errors, isValid, trigger } = useEvaluationForm(
        review?.rating
    );

    const onSubmit = (rating: Omit<Rating, 'completed'>) => {
        dispatch(
            reviewsActions.review({
                chartId,
                summaryId,
                userMainEmail: user.userMainEmail,
                rating,
            })
        );
    };

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
                        onSubmit(methods.getValues());
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

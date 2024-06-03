import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { type Rating, ratingValidator } from 'validators';

export const useEvaluationForm = (defaultValues: Rating | undefined) => {
    const [errors, setErrors] = useState<string[]>([]);
    const methods = useForm<Omit<Rating, 'completed'>>({
        defaultValues,
        resolver: yupResolver(ratingValidator),
        mode: 'onChange',
    });
    const { formState, trigger } = methods;

    useEffect(() => {
        const newErrors = Object.values(formState.errors)
            .map((error) => error?.message || '')
            .filter((e): e is string => !!e);
        setErrors(newErrors);
    }, [formState.errors]);

    useEffect(() => {
        trigger();
    }, [trigger]);

    return { methods, errors, isValid: formState.isValid, trigger };
};

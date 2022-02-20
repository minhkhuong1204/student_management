import { Box, Button, CircularProgress } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/FormFields';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Alert } from '@material-ui/lab';

const schema = yup.object({
    name: yup.string().required(),
    age: yup
        .number()
        .positive('Please enter a positive number')
        .integer('Please enter an integer')
        .required('Please enter age!')
        .min(18, 'Min is 18')
        .max(60, 'Max is 60')
        .typeError('Please enter a valid number'),
    mark: yup
        .number()
        .positive('Please enter a positive number')
        .max(10, 'Max value is 10')
        .required('Please enter mark!')
        .typeError('Please enter a valid number'),
    gender: yup.string().oneOf(['male', 'female'],'Please select either male or female.')
        .required('Please select gender.'),
    city: yup.string().required('Please select a city.')
}).required();

export interface StudentFormProps {
    initialValues?: Student,
    onSubmit?: (formValues: Student) => void;

}

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
    const cityOptions = useAppSelector(selectCityOptions);
    const [ error, setError] = useState('');


    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<Student>({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    });

    const handleFormSubmit = async (formValues: Student) => {
        try {
            setError('')
            await onSubmit?.(formValues);
        } catch (error: any) {
            setError(error?.message);
        }

    }

    return (
        <Box maxWidth={400}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <InputField name="name" control={control} label="Full Name" />
                <RadioGroupField name="gender" control={control} label="Gender" options={[
                    { label: 'Male', value: 'male' },
                    { label: 'Female', value: 'female' }
                ]} />

                <InputField name="age" control={control} label="Age" type="number" />
                <InputField name="mark" control={control} label="Mark" type="number" />

                {Array.isArray(cityOptions) && cityOptions.length > 0 &&
                    <SelectField name="city" control={control} label="City" options={cityOptions} />
                }
                {error && <Alert severity='error'>{error}</Alert>}

                <Box mt={3}>
                    <Button type='submit' variant='contained' color='primary' disabled={isSubmitting}>
                        {isSubmitting && <CircularProgress size={16} />} &nbsp;Save
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

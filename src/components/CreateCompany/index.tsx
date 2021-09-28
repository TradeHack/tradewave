import React, { FC } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import TextInput from '@/components/common/Inputs/TextInput';
import * as Yup from 'yup';
import * as Styled from './styles';
import { Box, Button, CircularProgress } from '@material-ui/core';
import countriesList from '../../data/countries.json';
import DropDown from '@/components/common/Inputs/DropDown';
import { createCompany } from '@/utils/createCompany';
import { useMoralis } from 'react-moralis';
import Moralis from 'moralis';
import router from 'next/router';
export interface FormValues {
  companyName: string;
  street: string;
  zip: string;
  city: string;
  vat: string;
  country: string;
}

const CreateCompany: FC = () => {
  const { user } = useMoralis();
  return (
    <Styled.Container>
      <Styled.Title>Add Your Company</Styled.Title>
      <Styled.Card>
        <Formik
          initialValues={
            {
              companyName: '',
              street: '',
              zip: '',
              city: '',
              vat: '',
              country: '',
            } as FormValues
          }
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onSubmit={async (
            values: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>
          ) => {
            await createCompany(values, user as Moralis.User);
            setSubmitting(false);
            router.push('/');
          }}
          validationSchema={Yup.object().shape({
            companyName: Yup.string().required('Required'),
            street: Yup.string().required('Required'),
            zip: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            vat: Yup.string().required('Required'),
            country: Yup.string().required('Required'),
          })}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput name='companyName' label='Company Name' isRequired />
              <TextInput name='street' label='Street' isRequired />
              <Box display='flex' justifyContent='space-between'>
                <TextInput width='25%' name='zip' label='Zip code' isRequired />
                <TextInput width='65%' name='city' label='City' isRequired />
              </Box>
              <DropDown
                required
                name='country'
                label='Country'
                items={countriesList.map((country) => ({
                  label: country.name,
                  value: country.name,
                }))}
              />
              <TextInput name='vat' label='VAT number' isRequired />
              <Box marginTop={4} display='flex' justifyContent='center'>
                <Button
                  disabled={isSubmitting}
                  type='submit'
                  color='primary'
                  variant='contained'
                >
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Styled.Card>
    </Styled.Container>
  );
};

export default CreateCompany;

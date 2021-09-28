import React, { FC } from 'react';
import { Form, Formik } from 'formik';
import TextInput from '@/components/common/Inputs/TextInput';
import * as Yup from 'yup';
import * as Styled from './styles';
import { Box } from '@material-ui/core';
import countriesList from '../../data/countries.json';
import DropDown from '@/components/common/Inputs/DropDown';

interface FormValues {
  companyName: string;
  street: string;
  zip: string;
  city: string;
  vat: string;
  country: string;
}

const CreateCompany: FC = () => {
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
          onSubmit={() => {}}
          validationSchema={Yup.object().shape({
            companyName: Yup.string().required('Required'),
            street: Yup.string().required('Required'),
            zip: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            vat: Yup.string().required('Required'),
            country: Yup.string().required('Required'),
          })}
        >
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
          </Form>
        </Formik>
      </Styled.Card>
    </Styled.Container>
  );
};

export default CreateCompany;

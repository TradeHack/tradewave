import React, { FC } from 'react';
import { Form, Formik } from 'formik';
import TextInput from '@/components/common/Inputs/TextInput';
import * as Yup from 'yup';

interface FormValues {
  companyName: string;
}

const CreateCompany: FC = () => {
  return (
    <div>
      <Formik
        initialValues={{ companyName: '' } as FormValues}
        onSubmit={() => {}}
        validationSchema={Yup.object().shape({
          companyName: Yup.string().required('Required'),
        })}
      >
        <Form>
          <TextInput name='companyName' label='Company Name' isRequired />
        </Form>
      </Formik>
    </div>
  );
};

export default CreateCompany;

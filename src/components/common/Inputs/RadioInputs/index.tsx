import React, { FC, ReactNode } from 'react';
import { Form, Formik } from 'formik';
import { RadioGroup, FormControl } from '@material-ui/core';
import * as Styled from './styles';

interface RadioInputsProps {
  radioButtons?: ReactNode;
  title: string;
  initialValue: string;
}

const RadioInputs: FC<RadioInputsProps> = ({
  radioButtons,
  title,
  initialValue,
}) => {
  const name = 'selectedOption';

  return (
    <Formik
      initialValues={{
        selectedOption: initialValue,
      }}
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <FormControl component='fieldset'>
            <Styled.Title>{title}</Styled.Title>
            <RadioGroup
              name={name}
              value={values.selectedOption.toString()}
              onChange={(event) => {
                setFieldValue(name, event.currentTarget.value);
              }}
            >
              {radioButtons}
            </RadioGroup>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default RadioInputs;

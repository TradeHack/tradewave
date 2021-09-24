import React, { FC } from 'react';
import { ErrorMessage, Field } from 'formik';
import { Typography, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import * as Styled from './styles';
interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  isRequired: boolean;
  width?: string;
}

const FormikField: FC<TextInputProps> = ({
  name,
  label,
  placeholder = '',
  isRequired,
  width,
}) => {
  return (
    <Styled.Container width={width}>
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <Typography style={{ fontWeight: 500 }}>{label}</Typography>
        </Grid>
        <Grid item>
          <Field
            required={isRequired}
            autoComplete='off'
            placeholder={placeholder}
            as={TextField}
            name={name}
            fullWidth
            type={'text'}
          />
          <div>
            <ErrorMessage component={Styled.Error} name={name} />
          </div>
        </Grid>
      </Grid>
    </Styled.Container>
  );
};

export default FormikField;

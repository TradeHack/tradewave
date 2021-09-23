import React, { FC } from 'react';
import { ErrorMessage, Field } from 'formik';
import { Typography, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

interface TextInputProps {
  name: string;
  className?: string;
  label: string;
  placeholder?: string;
  isRequired: boolean;
}

const StyledError = styled.div`
  color: red;
`;

const FormikField: FC<TextInputProps> = ({
  name,
  label,
  placeholder = '',
  isRequired,
}) => {
  return (
    <div>
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
            <ErrorMessage component={StyledError} name={name} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormikField;

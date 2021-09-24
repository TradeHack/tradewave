import React, { FC, ReactNode } from 'react';
import { Field, ErrorMessage, FieldInputProps } from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

interface FormikSelectItem {
  label?: string;
  value: string | number;
}

interface DropDownProps {
  name: string;
  className?: string;
  items: FormikSelectItem[];
  label: string;
  required: boolean;
}

interface MaterialUISelectFieldProps extends FieldInputProps<string> {
  errorString?: string;
  children: ReactNode;
  required: boolean;
}

const MaterialUISelectField: FC<MaterialUISelectFieldProps> = ({
  errorString,
  children,
  value,
  name,
  onChange,
  onBlur,
}) => {
  return (
    <FormControl variant='filled' fullWidth>
      <Select
        disableUnderline
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      >
        {children}
      </Select>
      <FormHelperText style={{ color: 'red' }}>{errorString}</FormHelperText>
    </FormControl>
  );
};

const FormikSelect: FC<DropDownProps> = ({
  name,
  items,
  label,
  required = false,
}) => {
  return (
    <div>
      <Grid container direction='column' spacing={1}>
        <Grid item>
          <Typography style={{ fontWeight: 500 }}>{label}</Typography>
        </Grid>
        <Grid item>
          <Field
            name={name}
            as={MaterialUISelectField}
            label={label}
            errorString={<ErrorMessage name={name} /> || ''}
            required={required}
          >
            {items.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Field>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormikSelect;

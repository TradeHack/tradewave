import React from 'react';
import {
  Button,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography
} from '@material-ui/core';
import { useStyles, StyledDiv, StyledFormControl } from './styles';

function getSteps() {
  return ['Trade details', 'Route details', 'Summary'];
}

function getStepContent(
  stepIndex: number,
  forwarder: string,
  handleChangeForwarder: (value: string) => void,
  handleChangeCurrency: (value: string) => void,
  tradePartner: string,
  handleChangeTradePartner: (value: string) => void,
  values: string,
  setValues: string,
  amount: string
) {
  switch (stepIndex) {
    case 0:
      // Trade partner, amount/currency, order reference
      return (
        <div>
          <StyledFormControl variant="outlined">
            <InputLabel id="simple-select-outlined-label">
              Trade Partner
            </InputLabel>
            <Select
              labelId="simple-select-outlined-label"
              id="simple-select-outlined"
              value={tradePartner}
              onChange={(event) => handleChangeTradePartner('tradePartner')}
              label="Trade Partner"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'Apple Industries'}>Apple Industries</MenuItem>
              <MenuItem value={'Banana Importers'}>Banana Importers</MenuItem>
              <MenuItem value={'Nokia'}>Nokia</MenuItem>
            </Select>
          </StyledFormControl>
          <StyledFormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={values?.amount}
              onChange={(event) => handleChangeCurrency('amount')}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={60}
            />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="outlined-basic"
              label="Order reference"
              variant="outlined"
            />
          </StyledFormControl>{' '}
        </div>
      );
    case 1:
      // FF, origin, destination, inco terms

      return (
        <div>
          <StyledFormControl variant="outlined">
            <InputLabel id="simple-select-outlined-label">
              Freight Forwarder
            </InputLabel>
            <Select
              labelId="simple-select-outlined-label"
              id="simple-select-outlined"
              value={forwarder}
              onChange={(event) => handleChangeForwarder('forwarder')}
              label="Freight Forwarder"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'DHL'}>DHL</MenuItem>
              <MenuItem value={'Kuehne + Nagel'}>Kuehne + Nagel</MenuItem>
              <MenuItem value={'Panalpina'}>Panalpina</MenuItem>
            </Select>
          </StyledFormControl>
          <StyledFormControl>
            <TextField id="outlined-basic" label="Origin" variant="outlined" />
          </StyledFormControl>
          <StyledFormControl>
            <TextField
              id="outlined-basic"
              label="Destination"
              variant="outlined"
            />
          </StyledFormControl>
        </div>
      );
    case 2:
      // Confirmation

      return (
        <div>
          {/* <Summary /> */}
          'This is the bit I really care about!'
        </div>
      );

    default:
      return 'Unknown stepIndex';
  }
}

export default function StyledStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [tradePartner, setTradePartner] = React.useState('');

  const handleChangeTradePartner = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTradePartner(event.target.value as string);
  };

  // TODO should this be number instead?
  interface State {
    amount: string;
  }

  const [values, setValues] = React.useState<State>({
    amount: '',
  });

  const handleChangeCurrency =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const [forwarder, setForwarder] = React.useState('');

  const handleChangeForwarder = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setForwarder(event.target.value as string);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep, forwarder, handleChangeForwarder, tradePartner, handleChangeTradePartner())}
            </Typography>
            <StyledDiv>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Submit draft' : 'Next'}
              </Button>
            </StyledDiv>
          </div>
        )}
      </div>
    </div>
  );
}

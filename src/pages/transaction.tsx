import React from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
  Card,
  Box,
  CardActions,
  Button,
  CardContent,
  Typography,
} from '@material-ui/core';
import Layout from '@/components/layout';

const Transaction = () => {
  return (
    <Layout>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography style={{ fontSize: '42px', fontWeight: 'bold' }}>
          Create a Transaction
        </Typography>
        <Card
          style={{
            width: '500px',
            height: '380px',
            position: 'relative',
            marginTop: '30px',
          }}
        >
          <Box mb={3} ml={2} mt={3}>
            <CardContent>
              <FormControl component="fieldset">
                <FormLabel
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: '26px',
                  }}
                  component="legend"
                >
                  What would you like to do?
                </FormLabel>
                <Box mt={3}>
                  <RadioGroup defaultValue="request" name="payment-type">
                    <FormControlLabel
                      value="request"
                      control={<Radio />}
                      label="Request a payment"
                    />
                    <FormControlLabel
                      value="make"
                      control={<Radio />}
                      label="Make a payment"
                    />
                  </RadioGroup>
                </Box>
              </FormControl>
            </CardContent>
          </Box>
          <CardActions
            style={{
              paddingLeft: '60px',
              paddingRight: '60px',
              paddingBottom: '40px',
              width: '100%',
              position: 'absolute',
              bottom: '0',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              style={{ background: '#9BA8BD', width: '135px', height: '36px' }}
            >
              Back
            </Button>
            <Button
              style={{ background: '#08C792', width: '135px', height: '36px' }}
            >
              Next
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Layout>
  );
};

export default Transaction;

import React from 'react';
import { Button, Grid } from '@material-ui/core';
// import Card from '../card';
import TorusContext from '../torus/context'

import { StyledGrid } from './styles';

import SimpleCard from "../card";

export default function Balances() {
    return (
        <TorusContext.Consumer>
            {value => (
                <StyledGrid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <SimpleCard
                            name="Available funds"
                            value={`${value.currentBalance} USD`}
                            tooltip="Your current balance available for new transactions"
                        />
                        <Button size="small">How to add or withdraw funds</Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <SimpleCard
                            name="Expected payments"
                            value="10,430 USD"
                            tooltip="The sum of all payments outstanding directed towards your account sum of all payments outstanding directed towards your accountst"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <SimpleCard
                            name="Locked funds"
                            value="3,450 USD"
                            tooltip="The sum of all payments locked on contracts with your trade partners"
                        />
                    </Grid>
                </StyledGrid>
            )}
        </TorusContext.Consumer>
    );
}

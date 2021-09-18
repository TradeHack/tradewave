import React from 'react';
import { CardContent, Tooltip, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import { StyledTitle, StyledCard } from './styles';

export default function SimpleCard(props) {
  return (
    <StyledCard>
      <CardContent>
        <StyledTitle color="textSecondary" gutterBottom>
          {props.name}
          <Tooltip title={props.tooltip} placement="top" arrow>
            <InfoIcon fontSize="small" />
          </Tooltip>
        </StyledTitle>

        <Typography variant="h5" component="h2">
          {props.value}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}

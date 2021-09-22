import React from 'react';
import { CardContent, Tooltip, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

import { StyledTitle, StyledCard } from './styles';

interface SimpleCardProps {
  value: string;
  tooltip: string;
  name: string;
}

const SimpleCard = ({ name, tooltip, value }) => {
  return (
    <StyledCard>
      <CardContent>
        <StyledTitle color="textSecondary" gutterBottom>
          {name}
          <Tooltip title={tooltip} placement="top" arrow>
            <InfoIcon fontSize="small" />
          </Tooltip>
        </StyledTitle>

        <Typography variant="h5" component="h2">
          {value}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default SimpleCard;

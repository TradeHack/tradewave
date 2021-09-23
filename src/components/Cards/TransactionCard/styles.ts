import { Card as MuiCard, Typography } from '@material-ui/core';
import styled from 'styled-components';

export const Title = styled(Typography)`
  font-size: 42px;
  font-weight: bold;
`;

export const Card = styled(MuiCard)`
  width: 500px;
  height: 380px;
  position: relative;
  margin-top: 30px;
`;

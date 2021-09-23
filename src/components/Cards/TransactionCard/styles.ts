import { Card as MuiCard, Typography, CardActions } from '@material-ui/core';
import styled from 'styled-components';

export const Title = styled(Typography)`
  font-size: 42px;
  font-weight: bold;
`;

export const Card = styled(MuiCard)`
  width: 500px;
  height: 420px;
  position: relative;
  margin-top: 30px;
`;

export const Actions = styled(CardActions)`
  && {
    padding: 40px 40px 10px 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
  }
`;

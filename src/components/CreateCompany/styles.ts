import { Card as MuiCard, Typography } from '@material-ui/core';
import styled from 'styled-components';

export const Card = styled(MuiCard)`
  && {
    width: 600px;
    padding: 30px;
    margin: auto;
  }
`;

export const Title = styled(Typography)`
  && {
    text-align: center;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    font-size: 42px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

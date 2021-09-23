import { Card, Typography } from '@material-ui/core';
import styled from 'styled-components';

export const StyledTitle = styled(Typography)`
  font-size: 14;
  margin-bottom: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

export const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  min-width: 200px;
`;

import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface CenterProps {
  children: ReactNode;
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const RadioInputs: FC<CenterProps> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default RadioInputs;

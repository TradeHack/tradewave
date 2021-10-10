import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  min-height: 100vh;
`;

const StyledLeftContainer = styled.div`
  width: 40%;
  background-color: #c4c4c4;
`;

const StyledRightContainer = styled.div`
  width: 60%;
  padding-top: 80px;
  padding-left: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

interface SplitPaneProps {
  rightChildren: ReactNode;
}

const SplitPane: FC<SplitPaneProps> = ({ rightChildren }) => {
  return (
    <StyledDiv>
      <StyledLeftContainer/>
      <StyledRightContainer>{rightChildren}</StyledRightContainer>
    </StyledDiv>
  );
};

export default SplitPane;

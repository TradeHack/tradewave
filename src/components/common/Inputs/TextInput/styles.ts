import styled from 'styled-components';

type ContainerProps = {
  width?: string;
};

export const Container = styled.div<ContainerProps>`
  width: ${({ width }) => width};
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Error = styled.div`
  color: red;
`;

import React, { FC, ReactNode } from 'react';
import { StyledDiv } from './styles';
import Navbar from '../navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = (props) => (
  <>
    <Navbar />
    <StyledDiv>{props.children}</StyledDiv>
  </>
);

export default Layout;

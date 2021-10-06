import React, { FC, ReactNode } from 'react';
import { StyledDiv } from './styles';
import Navbar from '../navbar';

interface LayoutProps {
  children: ReactNode;
  showLinks?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, showLinks }) => (
  <>
    <Navbar showLinks={showLinks} />
    <StyledDiv>{children}</StyledDiv>
  </>
);

export default Layout;

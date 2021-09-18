import React from 'react'
import {StyledDiv} from "./styles";
import Navbar from "../navbar";

const Layout = (props: any) => (
    <>
        <Navbar/>
        <StyledDiv>
            {props.children}
        </StyledDiv>
    </>
)

export default Layout

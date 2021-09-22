import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core';
import App from 'next/app';

import theme from '../styles/theme';
import GlobalStyle from '../styles/global';
import { MuiDefaultTheme } from '../styles/theme';
import TorusContext from '../components/torus/context';
import TorusWrapper from '../components/torus/auth';

const MyApp = (props: any) => {
  const { Component, pageProps, router } = props;
  return (
    <MuiThemeProvider theme={MuiDefaultTheme}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <TorusWrapper>
          <TorusContext.Consumer>
            {(value) => {
              return <Component {...pageProps} router={router} torus={value} />;
            }}
          </TorusContext.Consumer>
        </TorusWrapper>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

// MyApp.getInitialProps = async (appContext) => {
//   const appProps = await App.getInitialProps(appContext);
//     if (typeof window === "undefined" && appContext.ctx.res.writeHead) {
//         if (!appContext.ctx.req.cookies.jwt && appContext.router.pathname !== '/login' && appContext.router.pathname !== '/auth') {
//             appContext.ctx.res.writeHead(302, { Location: "/login" });
//             appContext.ctx.res.end();
//         }
//     }

//   return { ...appProps }
// }

export default MyApp;

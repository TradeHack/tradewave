import React from 'react';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core';
import theme, { MuiDefaultTheme } from '../styles/theme';
import GlobalStyle from '../styles/global';


import { MoralisProvider } from 'react-moralis';

const appId = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID as string;
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL as string;

const MyApp = (props: any) => {
  const { Component, pageProps, router } = props;
  return (
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <MuiThemeProvider theme={MuiDefaultTheme}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
            <Component {...pageProps} router={router} />
        </ThemeProvider>
      </MuiThemeProvider>
    </MoralisProvider>
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

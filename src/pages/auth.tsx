import React from 'react';
import TorusSdk, { RedirectResult } from '@toruslabs/torus-direct-web-sdk';
import { withRouter } from 'next/router';
import { LinearProgress } from '@material-ui/core';
import axios from 'axios';
import cookie from 'js-cookie';

interface IState {
  loginDetails?: RedirectResult | null;
}

interface IProps {}

class RedirectAuth extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loginDetails: null,
    };
  }

  async componentDidMount() {
    const torusdirectsdk = new TorusSdk({
      baseUrl: window.location.origin,
      redirectPathName: '/api/google/redirect',
      enableLogging: true,
      uxMode: 'redirect',
      network: 'testnet',
    });
    const loginDetails = await torusdirectsdk.getRedirectResult();
    this.setState({
      loginDetails,
    });
    const user = await axios.post('http://localhost:3001/api/auth/login', {
      token: loginDetails?.hashParameters?.id_token,
    });
    const { token } = user?.data;
    cookie.set('jwt', token);
  }

  render() {
    const { loginDetails } = this.state;
    if (loginDetails) {
      this.props.router.push('/');
    }
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LinearProgress />
      </div>
    );
  }
}

export default withRouter(RedirectAuth);

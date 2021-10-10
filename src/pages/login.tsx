import React from 'react';
import SplitPane from '@/components/common/Containers/SplitPane';
import { Button } from '@material-ui/core';
import { useMoralis } from 'react-moralis';
import { useRouter } from 'next/router';
import { userHasCompany } from '@/utils/userHasCompany';

const Login = () => {
  const { authenticate, isAuthenticated, isAuthenticating, user } =
    useMoralis();
  const router = useRouter();
  const handleSignIn = async () => {
    try {
      await authenticate({chainId: 4});
      if (isAuthenticated && user) {
        if (user.attributes.ethAddress === process.env.NEXT_PUBLIC_LOGISTICS_PARTNER_ADDRESS) {
          router.push('/logistics')
        } else if (await userHasCompany(user)) {
          router.push('/');
        } else {
          router.push('/create-company');
        }
      }
    } catch (error: any) {
      alert(`Error ${error.code} ${error.message}`);
    }
  };
  const renderRight = () => {
    return (
      <>
        <img src='/static/images/tradewave-logo.svg' />
        <Button
          disabled={isAuthenticating}
          variant='contained'
          color='primary'
          onClick={handleSignIn}
          style={{ marginTop: 100 }}
        >
          Login with metamask
        </Button>
      </>
    );
  };
  return (
    <div>
      <SplitPane rightChildren={renderRight()} />
    </div>
  );
};

export default Login;

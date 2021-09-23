import React from 'react';
import SplitPane from '@/components/common/Containers/SplitPane';
import { Button } from '@material-ui/core';
import { useMoralis } from 'react-moralis';
import { useRouter } from 'next/router';

const SignIn = () => {
  const { authenticate, isAuthenticated, isAuthenticating } = useMoralis();
  const router = useRouter();
  const handleSignIn = async () => {
    try {
      await authenticate();
      if (isAuthenticated) router.push('/');
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

export default SignIn;

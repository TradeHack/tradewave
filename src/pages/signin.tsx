import React from 'react';
import SplitPane from '@/components/common/Containers/SplitPane';
import { Button } from '@material-ui/core';
import { useMoralis } from 'react-moralis';
import { useRouter } from 'next/router';

const SignIn = () => {
  const { authenticate, isAuthenticated } = useMoralis();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      await authenticate();
      if (isAuthenticated) router.push('/');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  const renderRight = () => {
    return (
      <>
        <img src='/static/images/tradewave-logo.svg' />
        <Button
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

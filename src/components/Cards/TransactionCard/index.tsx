import React, { FC, ReactNode } from 'react';
import { Box, Button, CardContent } from '@material-ui/core';
import * as Styled from './styles';
import Link from 'next/link';

interface TransactionCardProps {
  children: ReactNode;
  onBack?: () => void;
  onNext: () => void;
  isCancelable?: boolean;
  isDisabled?: boolean;
}

const TransactionCard: FC<TransactionCardProps> = ({
  children,
  onBack,
  onNext,
  isCancelable = false,
  isDisabled = false,
}) => {
  const renderCancel = () => (
    <Link href='/' passHref>
      <Button
        style={{ background: '#9BA8BD', width: '135px', height: '36px' }}
        component='a'
      >
        Cancel
      </Button>
    </Link>
  );
  return (
    <Styled.Card>
      <CardContent>{children}</CardContent>
      <Styled.Actions>
        {isCancelable ? (
          renderCancel()
        ) : (
          <Button
            onClick={onBack}
            style={{ background: '#9BA8BD', width: '135px', height: '36px' }}
          >
            Back
          </Button>
        )}
        <Button
          disabled={isDisabled}
          type='submit'
          onClick={onNext}
          style={{ background: '#08C792', width: '135px', height: '36px' }}
        >
          Next
        </Button>
      </Styled.Actions>
    </Styled.Card>
  );
};

export default TransactionCard;

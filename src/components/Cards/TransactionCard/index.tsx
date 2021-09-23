import React, { FC, ReactNode } from 'react';
import { Box, Button, CardContent } from '@material-ui/core';
import * as Styled from './styles';

interface TransactionCardProps {
  children: ReactNode;
  onBack: (e: any) => void;
  onNext: (e: any) => void;
}

const TransactionCard: FC<TransactionCardProps> = ({
  children,
  onBack,
  onNext,
}) => {
  return (
    <Styled.Card>
      <CardContent>{children}</CardContent>
      <Styled.Actions>
        <Button
          onClick={onBack}
          style={{ background: '#9BA8BD', width: '135px', height: '36px' }}
        >
          Back
        </Button>
        <Button
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

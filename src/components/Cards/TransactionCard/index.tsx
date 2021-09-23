import React, { FC, ReactNode } from 'react';
import { Box, CardActions, Button, CardContent } from '@material-ui/core';
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
      <Box mb={3} ml={2} mt={3}>
        <CardContent>{children}</CardContent>
      </Box>
      <Styled.Actions
      // style={{
      //   paddingLeft: '60px',
      //   paddingRight: '60px',
      //   paddingBottom: '40px',
      //   width: '100%',
      //   position: 'absolute',
      //   bottom: '0',
      //   display: 'flex',
      //   justifyContent: 'space-between',
      // }}
      >
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

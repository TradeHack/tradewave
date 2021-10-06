import React from 'react';
import {
  Box, Button,
  Modal,
  Typography,
} from '@material-ui/core';
import { style, useStyles } from '@/components/notification/styles';


interface NotificationProps {
  isOpen: boolean
  handleClose: () => void
  isRequest: boolean
}

export const Notification = (props: NotificationProps) => {
  const classes = useStyles();
  return (
    <Modal
      open={props.isOpen}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" className={classes.title}>
          {props.isRequest ? 'Payment Request' : 'Payment Complete'}
        </Typography>
        <Typography className={classes.text}>
          {props.isRequest ? `Company XYZ requests 100 RAI for ABC goods` : `Company XYZ has successfully completed a payment of 100 RAI for ABC goods`}
        </Typography>
        <Box position='right' className={classes.buttons}>
          <Button color='primary'>
            View
          </Button>
          <Button color='primary' onClick={props.handleClose}>
            Dismiss
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

import React from 'react';
import {
  Box, Button,
  Modal,
  Typography,
} from '@material-ui/core';
import { style } from '@/components/notification/styles';


interface NotificationProps {
  isOpen: boolean
  handleClose: () => void
}

export const Notification = (props: NotificationProps) => {
  return (
    <Modal
      open={props.isOpen}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Payment Request
        </Typography>
        <Typography>
          {`Company XYZ requests 100 RAI for ABC goods`}
        </Typography>
        <Box position='right'>
          <Button color='inherit'>
            View
          </Button>
          <Button color='inherit' onClick={props.handleClose}>
            Dismiss
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

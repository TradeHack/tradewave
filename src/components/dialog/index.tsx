import React, { FC, useEffect, ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

interface IModal {
  dialogText?: string;
  confirmAction?: () => void;
  isOpen?: boolean;
  closeAction?: () => void;
  actions?: any;
  defaultButton?: string;
  children?: any;
}

const ResponsiveDialog: FC<IModal> = ({
  dialogText,
  confirmAction = () => {},
  closeAction = () => {},
  isOpen,
  actions,
  defaultButton,
  children,
}) => {
  const [open, setOpen] = React.useState(false);
  console.log(isOpen);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    if (typeof isOpen !== 'undefined') {
      setOpen(isOpen);
    }
  }, [isOpen]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    closeAction();
  };
  return (
    <div>
      {defaultButton ? (
        <Button onClick={handleClickOpen}>{defaultButton}</Button>
      ) : (
        <Button
          variant='outlined'
          color='primary'
          startIcon={<DeleteIcon />}
          onClick={handleClickOpen}
        >
          Delete
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          {'Delete transaction?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogText
              ? dialogText
              : `This will remove the transaction for both you and your trade
            partner.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {actions ? (
            <>{children}</>
          ) : (
            <div>
              <Button autoFocus onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                  confirmAction();
                }}
                color='primary'
                autoFocus
              >
                Confirm
              </Button>
            </div>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ResponsiveDialog;

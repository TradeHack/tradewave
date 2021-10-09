import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, Grid, Modal, Paper, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring'; // web.cjs is required for IE 11 support
import styled from 'styled-components';
import ResponsiveDialog from '@/components/dialog';

// TODO Add props to pull details for selected tx

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
);

export const StyledPaper = styled(Paper)`
  max-width: 1000px;
  margin: auto;
  padding: 24px;
`;

export const StyledGrid = styled(Grid)`
  padding-top: 24px;
  padding-bottom: 24px;
  max-width: 480px;
`;

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => void;
  onExited?: () => void;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

export default function SpringModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type='button' onClick={handleOpen}>
        Open modal
      </button>
      <Modal
        aria-labelledby='spring-modal-title'
        aria-describedby='spring-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <StyledPaper>
            <Typography variant='h6' component='h2' gutterBottom>
              Transaction details
            </Typography>
            {/*TODO replace w props*/}
            <Typography variant='subtitle1'>Contract No. {'xxx'}</Typography>

            <StyledGrid
              container
              direction='row'
              justifyContent='space-between'
              alignItems='flex-start'
              spacing={2}
            >
              <Grid item xs={12} sm={6}>
                {'Order reference'}
              </Grid>
              <Grid item xs={12} sm={6}>
                {'FJR031Y7'}
              </Grid>

              <Grid item xs={12} sm={6}>
                {'Amount'}
              </Grid>
              <Grid item xs={12} sm={6}>
                {'USD 50,305'}
              </Grid>

              <Grid item xs={12} sm={6}>
                {'Trade Partner'}
              </Grid>
              <Grid item xs={12} sm={6}>
                {'Banana Industries'}
              </Grid>

              <Grid item xs={12} sm={6}>
                {'Freight Forwarder'}
              </Grid>
              <Grid item xs={12} sm={6}>
                {'DB Schenker'}
              </Grid>

              <Grid item xs={12} sm={6}>
                {'Freight Forwarder Reference'}
              </Grid>
              <Grid item xs={12} sm={6}>
                {'7657373828764'}
              </Grid>

              <Grid item xs={12} sm={6}>
                {'Origin'}
              </Grid>
              <Grid item xs={12} sm={6}>
                {'Sweden'}
              </Grid>

              <Grid item xs={12} sm={6}>
                {'Destination'}
              </Grid>
              <Grid item xs={12} sm={6}>
                {'Brazil'}
              </Grid>

              <Grid item xs={12} sm={6}>
                {'INCOTERMS 2021'}
              </Grid>
              <Grid item xs={12} sm={6}>
                {'DDP'}
              </Grid>

              <Grid item xs={12} sm={6}>
                {'Date Created'}
              </Grid>
              <Grid item xs={12} sm={6}>
                {'6 October 2021'}
              </Grid>
            </StyledGrid>

            <ResponsiveDialog />
          </StyledPaper>
        </Fade>
      </Modal>
    </div>
  );
}

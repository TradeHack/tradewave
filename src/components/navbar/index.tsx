import React, { FC, ReactNode } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
} from '@material-ui/core';
import cookie from 'js-cookie';

import { useStyles } from './styles';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Notification } from '../notification'

interface INavbar {
  showLinks?: boolean;
}

const Navbar: FC<INavbar> = ({ showLinks = true }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isInboundNotificationOpen, setIsInboundNotificationOpen] = React.useState(false);
  const [isOutboundNotificationOpen, setIsOutboundNotificationOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setIsInboundNotificationOpen(false);
    setIsOutboundNotificationOpen(false);
  };

  return (
      <div className={classes.root}>
        <AppBar position='static' className={classes.header}>
          <Toolbar className={classes.toolbar}>
            <Link href='/'>
              <a>
                <img
                  src='/static/images/tradewave-logo-white.svg'
                  className={classes.logo}
                  alt='tradewave'
                />
              </a>
            </Link>
            {showLinks && (
              <Box position='right'>
                <Link href='/request-payment'>
                  <Button color='inherit'>Request a payment</Button>
                </Link>
                <Link href='/outbound-requests'>
                  <Button color='inherit'>Outbound Requests</Button>
                </Link>
                <Link href='/inbound-requests'>
                  <Button color='inherit'>inbound Requests</Button>
                </Link>
                <Button>
                  <Avatar
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={handleMenu}
                    color='inherit'
                    //src={userInfo?.profileImage}
                  >

                  </Avatar>
                  <Menu
                    id='menu-appbar'
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem
                      onClick={() => {
                        cookie.remove('jwt');
                        router.push('/login');
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </div>

  );
};

export default Navbar

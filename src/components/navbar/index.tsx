import React from 'react';
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
import TorusContext from 'components/torus/context';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function MenuAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TorusContext.Consumer>
      {(value) => {
        const { userInfo } = value;
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
                <Box position='right'>
                  <Link href='/transaction'>
                    <a>
                      <Button color='inherit'>New transaction</Button>
                    </a>
                  </Link>
                  <Button>
                    <Avatar
                      aria-label='account of current user'
                      aria-controls='menu-appbar'
                      aria-haspopup='true'
                      onClick={handleMenu}
                      color='inherit'
                      src={userInfo?.profileImage}
                    >
                      {userInfo?.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
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
              </Toolbar>
            </AppBar>
          </div>
        );
      }}
    </TorusContext.Consumer>
  );
}

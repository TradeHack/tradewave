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
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function MenuAppBar() {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

  );
};

export default Navbar;

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    }
  }));

const Header = () => {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <AppBar>
                <Typography variant="h6" className={classes.title}>
                    Memory Game
                </Typography>
            </AppBar>
        </Container>
    );
};

export default Header;
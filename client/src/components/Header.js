import React from 'react';
import { makeStyles, AppBar, Typography, Container } from '@material-ui/core';

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
                    Pictures from Pexels.com
                </Typography>
            </AppBar>
        </Container>
    );
};

export default Header;
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import MemoryCard from './MemoryCard';

const useStyles = makeStyles((theme) => ({
    grid: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    card: {
        padding: theme.spacing(1),
        textAlign: 'center',
    }
}));

const Row = (props) => {
    const classes = useStyles();
    const rowData = props.pictures;
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    //console.log(rowData);
    return (
        <Container>
            <Grid className={classes.grid} container direction="row" spacing={2} style={{height: screenHeight/6*4}}>
                {
                    rowData.map((pic, index) => {
                        return (
                                <MemoryCard  className={classes.card} url={pic.src.tiny} key={index} />
                        );
                    })
                }
            </Grid>
        </Container>
    );
};

export default Row;
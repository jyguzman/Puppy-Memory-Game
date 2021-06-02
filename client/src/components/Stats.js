import React from 'react';
import { Container, Grid } from '@material-ui/core';

const Stats = (props) => {
    return (
        <Container>
            <Grid item container className="gameStats" justify="flex-start" alignItems="stretch" style={{height: window.innerHeight/6}}>
                <Grid item xs={6}><span className="title">{props.timer}</span></Grid>
                <Grid item xs={2}><span></span></Grid>
                <Grid item xs={3}><span className="stat">Flips: {props.flipCount}</span></Grid>
            </Grid>
        </Container>
    );
};

export default Stats;
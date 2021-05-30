import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Board from './Board';

const Game = (props) => {
    return (
        <Container maxWidth="lg">
          <Grid  item container direction="column" justify="flex-start" alignItems="center">
            <Board height={props.height}/>
          </Grid>
        </Container>
    );
};

export default Game;
import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid } from '@material-ui/core';
import Header from './components/Header';
import Game from './components/Game';
import axios from 'axios';

function App() {
  return (
    <Container className="App" maxWidth="lg">
      <Header />
      <Game height={window.innerHeight}/>
    </Container>
  );
}

export default App;

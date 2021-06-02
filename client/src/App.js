import './App.css';
import { Container } from '@material-ui/core';
import Header from './components/Header';
import Game from './components/Game';

function App() {
  return (
    <Container className="App" maxWidth="lg">
      <Header />
      <Game height={window.innerHeight}/>
    </Container>
  );
}

export default App;

import React, { useEffect, useState, useRef } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import MemoryCard from './MemoryCard';
import Stats from './Stats';
import GameEnd from './GameEnd';
import axios from 'axios';

const swap = (array, i, j) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  
  const shuffle = array => {
    for(let i = array.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i+1));
  
        swap(array, j, i)
    }
  };

const useStyles = makeStyles((theme) => ({
    grid: {
        display: "flex",
        justifyContent: "center",
        margin: "0 auto",
        flexWrap: "wrap",
        paddingTop: "20px"
    },
    
}));

const Board = (props) => {
    const classes = useStyles();
    const [cards, setCards] = useState([]);
    let timeout = useRef(null);
    const [flipCount, setFlipCount] = useState(0);
    const [flippedCards, setFlippedCards] = useState([]);
    const [solvedCards, setSolvedCards] = useState({});
    const [disableBoard, setDisableBoard] = useState(false);
    const [showGameEnd, setShowGameEnd] = useState(false);

    const getImages = () => {
        axios.get("/images")
        .then(res => {
            const photos = res.data.images;
            shuffle(photos);
            let cards = [];
            for(let i = 0; i < 8; i++) {
                const card = {
                    img: photos[i].src.original,
                };

                const match = {
                    img: photos[i].src.original,
                };

                cards.push(card);
                cards.push(match);
            }
            shuffle(cards);
          setCards(cards);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        getImages();
    }, []);

    const enableCards = () => {
        setDisableBoard(false);
    };

    const disableCards = () => {
        setDisableBoard(true);
    };
    const onCardClick = (index) => {
        console.log(cards.length);
        if (flippedCards.length == 1) {
            setFlippedCards(prev => [...prev, index]);
            disableCards();
        } else {
            clearTimeout(timeout.current);
            setFlippedCards([index]);
        }
        setFlipCount(flipCount + 1);
    };

    const isFlipped = (index) => {
        return flippedCards.includes(index);
    }

    const checkMatch = () => {
        const [firstIdx, secondIdx] = flippedCards;
        enableCards();
        if (cards[firstIdx].img === cards[secondIdx].img) {
            setSolvedCards((prev) => ({ ...prev, [cards[firstIdx].img]: true }));
            setFlippedCards([]);
            return;
        }

        timeout.current = setTimeout(() => {
            setFlippedCards([])
        }, 500);
    };

    const isSolved = (card) => {
        return Boolean(solvedCards[card.img]);
    }

    const checkGameEnd = () => {
        if (Object.keys(solvedCards).length === 8) {
            setShowGameEnd(true);
            return true;
        }
        return false;
    }

    useEffect(() => {
        checkGameEnd();
    }, [solvedCards]);

    const restartGame = () => {
        getImages();
        setSolvedCards([]);
        setFlippedCards([]);
        setFlipCount(0);
        shuffle(cards);
        enableCards();
        setShowGameEnd(false);
    };

    useEffect(() => {
        let timeout = null;
        if (flippedCards.length == 2) {
            checkMatch();
            timeout = setTimeout(checkMatch, 300);
        }
        return () => { clearTimeout(timeout); }
    }, [flippedCards]);

    return (
        <Container className={classes.grid}>
            <Stats flipCount={flipCount}/>
            <Grid item container spacing={2} style={{height: props.height/6*4}}>
                {   
                    cards.map((card, index) => {
                        return (
                            <MemoryCard 
                                onClick={onCardClick}
                                id={card.id} 
                                index={index}
                                key={index}
                                img={card.img} 
                                cards={cards}
                                isDisabled={disableBoard}
                                solved={isSolved(card)}
                                isFlipped={isFlipped(index)}/>
                        )
                    })
                }
            </Grid>
            <GameEnd open={showGameEnd} flipCount={flipCount} restartGame={restartGame} />
        </Container>
    );

};

export default Board;
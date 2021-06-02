import React, { useEffect, useState, useRef } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import MemoryCard from './MemoryCard';
import axios from 'axios';

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
    const [cards, setCards] = useState(props.cards);
    let timeout = useRef(null);
    
    const [flipCount, setFlipCount] = useState(0);
    const [flippedCards, setFlippedCards] = useState([]);
    const [solvedCards, setSolvedCards] = useState([]);
    const [disableBoard, setDisableBoard] = useState(false);

    const getImages = () => {
        axios.get("/images")
        .then(res => {
          setCards(res.data.images);
        }).catch(err => console.log(err));
    }

    const enableCards = () => {
        setDisableBoard(false);
    };

    const disableCards = () => {
        setDisableBoard(true);
    };

    const onCardClick = (index) => {
        if (flippedCards.length == 1) {
            setFlippedCards(prev => [...prev, index]);
            disableCards();
        } else {
            clearTimeout(timeout.current);
            setFlippedCards([index]);
        }
        setFlipCount(flipCount++);
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

    const restartGame = () => {
        setSolvedCards([]);
        setFlippedCards([]);
        setFlipCount(0);
        shuffle(cards);
        setCards(cards);
        enableCards();
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
        </Container>
    );

};

export default Board;
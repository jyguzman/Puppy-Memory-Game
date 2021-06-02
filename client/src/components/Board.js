import React, { useEffect, useState, useRef } from 'react';
import { makeStyles, Container, Grid, Box } from '@material-ui/core';
import MemoryCard from './MemoryCard';
import Stats from './Stats';
import GameEnd from './GameEnd';
import Options from './Options';
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

    const formatTime = (time) => {
        const seconds = time%60;
        const minutes = Math.floor(time/60);

        let result = "";
        
        if (minutes < 10)
            result += "0";
        result += minutes + ":";

        if (seconds < 10)
            result += "0";
        result += seconds;

        let timeInWords = "";

        if (minutes === 0)
            timeInWords = seconds + " seconds";
        else if (minutes === 1)
            timeInWords = "1 minute, " + seconds + " seconds";
        else timeInWords = minutes + " minutes, " + seconds + " seconds";

        return [result, timeInWords];
    
  }

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
    const [images, setImages] = useState([]);

    const [cards, setCards] = useState([]);
    let timeout = useRef(null);
    let timer = null;

    const [time, setTime] = useState(0);
    const [difficulty, setDifficulty] = useState("easy");
    const [inGame, setInGame] = useState(false);
    const [flipCount, setFlipCount] = useState(0);
    const [flippedCards, setFlippedCards] = useState([]);
    const [solvedCards, setSolvedCards] = useState({});
    const [disableBoard, setDisableBoard] = useState(false);
    const [showGameEnd, setShowGameEnd] = useState(false);

    const getCards = () => {
        axios.get("/images")
        .then(res => {
            const photos = res.data.images;
            shuffle(photos);
            let cards = [];
            let num_cards = 0;
            if(difficulty === "easy")
                num_cards = 6;
            else if (difficulty === "medium")
                num_cards = 8;
            else num_cards = 12;
            for(let i = 0; i < num_cards; i++) {
                const card = {
                    img: photos[i].images,
                };

                const match = {
                    img: photos[i].images,
                };

                cards.push(card);
                cards.push(match);
            }
            shuffle(cards);
            setCards(cards);
        }).catch(err => console.log(err));
    }

    /*
    const getCards = () => {
        axios.get("/images")
        .then(res => {
            const photos = res.data.images;
            shuffle(photos);
            let cards = [];
            let num_cards = 0;
            if(difficulty === "easy")
                num_cards = 6;
            else if (difficulty === "medium")
                num_cards = 8;
            else num_cards = 12;
            for(let i = 0; i < num_cards; i++) {
                const card = {
                    img: photos[i].src.original,
                    photographer: photos[i].photographer,
                };

                const match = {
                    img: photos[i].src.original,
                    photographer: photos[i].photographer,
                };

                cards.push(card);
                cards.push(match);
            }
            shuffle(cards);
            setCards(cards);
        }).catch(err => console.log(err));
    }
    */

    useEffect(() => {
        getCards();
    }, [difficulty]);

    useEffect(() => {
        if (inGame && !showGameEnd)
            timer = setTimeout(() => {
                setTime(time + 1);
            }, 1000);
    });

    const disableOptions = () => {
        setInGame(true);
    }

    const enableCards = () => {
        setDisableBoard(false);
    };

    const disableCards = () => {
        setDisableBoard(true);
    };
    const onCardClick = (index) => {
        setInGame(true);
        if (flippedCards.length === 1) {
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
        let numToCheck = 6;
        if (difficulty === "medium")
            numToCheck = 8;
        if (difficulty === "hard")
            numToCheck = 12;
        if (Object.keys(solvedCards).length === numToCheck) {
            timer = null;
            setShowGameEnd(true);
            setInGame(false);
            return true;
        }
        return false;
    }

    useEffect(() => {
        checkGameEnd();
    }, [solvedCards]);

    const restartGame = () => {
        getCards();
        setSolvedCards([]);
        setFlippedCards([]);
        setFlipCount(0);
        setTime(0);
        shuffle(cards);
        enableCards();
        setShowGameEnd(false);
    };

    const changeDifficulty = (event) => {
        setDifficulty(event.target.value);
    }

    useEffect(() => {
        let timeout = null;
        if (flippedCards.length === 2) {
            checkMatch();
            timeout = setTimeout(checkMatch, 300);
        }
        return () => { clearTimeout(timeout); }
    }, [flippedCards]);

    return (
        <Container className={classes.grid}>
            <Stats time={formatTime(time)[0]} flipCount={flipCount}/>
            <Box display={disableBoard ? "hidden" : "initial"}>
                <Options inGame={inGame} difficulty={difficulty} changeDifficulty={changeDifficulty}/>
            </Box>
            <Grid item container spacing={2} style={{height: props.height/6*4}}>
                {   
                    cards.map((card, index) => {
                        return (
                            <MemoryCard 
                                onClick={onCardClick}
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
            <GameEnd difficulty={difficulty} open={showGameEnd} flipCount={flipCount} time={formatTime(time)[1]} restartGame={restartGame}/>
        </Container>
    );

};

export default Board;
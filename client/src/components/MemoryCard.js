import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import ReactCardFlip from 'react-card-flip';

const MemoryCard = (props) => {
    const img = props.img;
    const backImg = "paw.png";
    const crop = "?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=150&w=150";
    const solved = props.solved;
    const isFlipped = props.isFlipped;
    const isDisabled = props.isDisabled;

    const flipCard = () => {
        !isDisabled && !isFlipped && !solved && props.onClick(props.index);
    }

    return (
        <Grid item xs={4} sm={3} md={3} xl={3}>
            <Card className={solved ? "c solved" : "c"} onClick={flipCard}>
                <ReactCardFlip isFlipped={solved ? true : isFlipped} flipDirection="horizontal">
                    <CardMedia
                        component="img"
                        image={backImg}
                    />
                    <CardMedia
                        component="img"
                        image={img+crop}

                    />
                </ReactCardFlip>
            </Card>
        </Grid>
    );
};

/*

*/
export default MemoryCard;
import { Container, Dialog, DialogActions, DialogContent,
  DialogContentText, Button, DialogTitle } from "@material-ui/core";
  
const GameEnd = (props) => {
    return (
        <Container>
            <Dialog
                open={props.open}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"You've won!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You completed {props.difficulty} mode in {props.flipCount} moves and 
                            in {props.time}!

                            Click "Restart" to play again.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.restartGame} color="primary">
                            Restart
                        </Button>
                    </DialogActions>
            </Dialog>
        </Container>
    );
};

export default GameEnd;
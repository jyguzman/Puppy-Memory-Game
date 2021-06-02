import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    options: {
        paddingBottom: "35px",
    },
}));

const Options = (props)  => {
  const classes = useStyles();

  return (
    <Container>
      <FormControl component="fieldset" className={classes.options}>
        <RadioGroup row aria-label="gender" name="gender1" value={props.difficulty} onChange={props.changeDifficulty}>
          <FormControlLabel disabled={props.inGame} value="easy" control={<Radio />} label="Easy - 6 Puppies" />
          <FormControlLabel disabled={props.inGame} value="medium" control={<Radio />} label="Medium - 8 Puppies" />
          <FormControlLabel disabled={props.inGame} value="hard" control={<Radio />} label="Hard - 12 Puppies" />
        </RadioGroup>
      </FormControl>
    </Container>
  );
}

export default Options;
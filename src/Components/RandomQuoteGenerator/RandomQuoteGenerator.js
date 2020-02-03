import React, { useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import quotesList from '../../quotes';

// Utility

const randNumGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getNewQuote = () => {
  const newQuoteIndex = randNumGenerator(0, quotesList.length);
  const newQuote = quotesList[newQuoteIndex];
  if (newQuote.author === null) {
    newQuote.author = 'Unknown Author';
  }
  return newQuote;
};

// Redux:

const NEW = 'NEW';

const newQuote = () => {
  return {
    type: NEW,
  };
};

const quoteReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW:
      return getNewQuote();
    default:
      return state;
  }
};

const store = createStore(quoteReducer);

// React:

function Presentation(props) {
  const { getNewQuote } = props;

  useEffect(() => {
    getNewQuote();
  }, [getNewQuote]);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Paper id="quote-box">
          <Typography id="text" variant="body1" gutterBottom>
            {props.quote.text}
          </Typography>
          <Typography id="author" variant="body1" gutterBottom>
            {props.quote.author}
          </Typography>
          <Button
            id="new-quote"
            onClick={props.getNewQuote}
            variant="contained"
            color="primary"
          >
            New Quote
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

const mapStateToProps = state => {
  return { quote: state };
};

const mapDispatchToProps = dispatch => {
  return {
    getNewQuote: () => {
      dispatch(newQuote());
    },
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(Presentation);

function RandomQuoteGenerator() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default RandomQuoteGenerator;

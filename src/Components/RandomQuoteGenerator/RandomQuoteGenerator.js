import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TwitterIcon from '@material-ui/icons/Twitter';
import quotesList from '../../quotes';
import './RandomQuoteGenerator.css';

// CSS

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100%',
  },
  mainWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  text: {
    color: 'white',
    fontSize: '2.5rem',
    lineHeight: '5rem',
    fontFamily: "'Roboto Condensed', sans-serif",
  },
  author: {
    color: 'white',
    fontSize: '2rem',
    textTransform: 'uppercase',
    fontFamily: `'Bebas Neue', cursive`,
  },
  quoteWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  actionWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: '200px',
    width: '100%',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
}));

const ColorButton = withStyles(() => ({
  root: {
    fontFamily: "'Roboto Condensed', sans-serif",
    color: 'white',
    backgroundColor: 'transparent',
    border: '3px solid white',
    fontSize: 16,
    '&:hover': {},
  },
}))(Button);

// Utility

const randNumGenerator = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

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
  const classes = useStyles();
  const {
    getNewQuote,
    quote: { text, author },
  } = props;

  useEffect(() => {
    getNewQuote();
  }, [getNewQuote]);

  const quotedSharing = `"${text}" - ${author}`;
  return (
    <Container id="quote-box" maxWidth="sm" className={classes.mainWrapper}>
      <Box my={4} className={classes.quoteWrapper}>
        <Typography
          id="text"
          variant="body1"
          className={classes.text}
          gutterBottom
        >
          {text}
        </Typography>
        <Typography
          id="author"
          variant="body1"
          className={classes.author}
          gutterBottom
        >
          {author}
        </Typography>
      </Box>
      <Box my={4} className={classes.actionWrapper}>
        <ColorButton
          id="tweet-quote"
          target="_blank"
          href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
            quotedSharing,
          )}`}
        >
          <TwitterIcon />
          Tweet
        </ColorButton>
        {/* <ColorButton id="tweet-quote">
          <Link href="#" onClick={preventDefault} color="inherit">
            <TwitterIcon />
            Tweet
          </Link>
        </ColorButton> */}
        <ColorButton id="new-quote" onClick={getNewQuote}>
          New Quote
        </ColorButton>
      </Box>
    </Container>
  );
}

const mapStateToProps = state => {
  return { quote: state };
};

const mapDispatchToProps = { getNewQuote: newQuote };

/* const mapDispatchToProps = dispatch => {
  return {
    getNewQuote: () => {
      dispatch(newQuote());
    },
  };
};
 */

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(Presentation);

function RandomQuoteGenerator() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

Presentation.propTypes = {
  getNewQuote: PropTypes.func.isRequired,
  quote: PropTypes.shape({
    text: PropTypes.string,
    author: PropTypes.string,
  }).isRequired,
};

export default RandomQuoteGenerator;

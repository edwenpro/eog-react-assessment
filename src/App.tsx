import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from './components/Wrapper';
import MetricsCardsContainer from './components/MetricsCardsContainer';
import ChartsContainer from './components/ChartsContainer';
import { makeStyles } from '@material-ui/core/styles';
import MetricsSelect from './Features/Metrics/MetricsSelect';

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});
const useStyles = makeStyles({
  MetricsContainer: {
    width: "100%",
    display: "flex"
  },
});
const App = () => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Wrapper>
          <div className={classes.MetricsContainer}>
            <MetricsCardsContainer />
            <MetricsSelect />
          </div>
          <ChartsContainer />
        </Wrapper>
      </Provider>
    </MuiThemeProvider>
  )
};

export default App;

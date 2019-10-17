// global
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// routes
import Routes from './routes';
// store
import { store } from './store';

function init() {
  const root = document.querySelector('.application-content');
  const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiInputBase: {
        root: {
          fontSize: '1.75rem',
          margin: '0 0.5rem'
        }
      },
    }
  });

  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          {Routes}
        </Router>
      </ThemeProvider>
    </Provider>,
    root
  );
}

init();

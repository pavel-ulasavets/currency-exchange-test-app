// global
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// routes
import Routes from './routes';
import rootReducer from './store/reducer';

function init() {
  const root = document.querySelector('.application-content');

  ReactDOM.render(
    <Provider store={createStore(rootReducer)}>
      <Router>
        {Routes}
      </Router>
    </Provider>,
    root
  );
}

init();

// global
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
// routes
import Routes from './routes';

function init() {
  const root = document.querySelector('.application-content');

  ReactDOM.render(
    <Router>
      {Routes}
    </Router>,
    root
  );
}

init();

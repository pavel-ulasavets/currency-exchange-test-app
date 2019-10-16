import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// components
import Home from 'components/Home';
import Exchange from 'components/Exchange';

export default (
  <React.Fragment>
    <Route path="/">
      {
        true ? /* permantent redirect while /exchange is the only screen */ // eslint-disable-line
          <Redirect
            to={{
              pathname: "/exchange"
            }}
          /> :
          <Home />
      }
    </Route>
    <Route path="/exchange">
      <Exchange />
    </Route>
  </React.Fragment>
);

import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'views/App';
import Items from 'views/Items';
import NotFound from 'views/NotFound';

const publicPath = '/';

export const routeCodes = {
  ITEMS: publicPath,
  ABOUT: `${ publicPath }about`,
};

export default class Routes extends Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path={ publicPath } component={ App }>
          <IndexRoute component={ Items } />
          <Route path={ routeCodes.ITEMS } component={ Items } />

          <Route path='*' component={ NotFound } />
        </Route>
      </Router>
    );
  }
}

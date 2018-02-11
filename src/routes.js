import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Posts from './containers/Posts';
import Post from './containers/Post';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={ App }>
      <IndexRoute component={ Posts } />
      <Route path="/:story" component={Posts}/>
      <Route path="/post/:itemId" component={Post}/>
    </Route>
  </Router>
);

export default Routes;
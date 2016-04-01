import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { init } from './store';
import NumUpdater from './components/NumUpdater';

init(() => {
  ReactDOM.render(
    <Router>
      <Route path="/" component={NumUpdater} />
    </Router>,
  document.getElementById('app'));
});

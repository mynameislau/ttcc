import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { init } from './store';
import Home from './routes/Home';
import About from './components/About';
import NoMatch from './components/NoMatch';

init(() => {
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={Home}>
        <Route path="about" component={About} />
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>,
    document.getElementById('app'));
});

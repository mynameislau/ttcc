import React from 'react';
// import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { updateServerState, setMainUser } from '../common/actions/actions';
import Home from './routes/Home';
import About from './components/About';
import NoMatch from './components/NoMatch';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
// import { SOCKET_IO_PORT } from './config';
import io from 'socket.io-client';

import groupsReducer from '../common/reducers/groupsReducer';
import UIReducer from '../common/reducers/UIReducer';

const local = `${location.protocol}//${location.hostname}:5000`;
const socket = location.hostname === 'localhost' ? io(local) : io();
// `${location.protocol}//${location.hostname}:${SOCKET_IO_PORT}`);

const remoteMiddleware = store => next => action => {
  console.log('client action', action.type, action);
  if (action.remote) {
    socket.emit('clientAction', action);
  }

  return next(action);
};

const store = createStore(
  combineReducers({
    groups: groupsReducer,
    routing: routerReducer,
    UI: UIReducer
  }),
  {},
  compose(
    // applyMiddleware(thunk),
    applyMiddleware(remoteMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

import { checkNotifications } from './notifications';
store.subscribe(() => checkNotifications(store.getState()));

socket.on('serverStateChanged', state =>
  store.dispatch(updateServerState(state))
);

socket.on('userSuccessfullyCreated', userID => {
  console.log('user is', userID);
  store.dispatch(setMainUser(userID));
});

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Home} />
      <Route path="foo" component={About} />
      <Route path="bar" component={NoMatch} />
    </Router>
  </Provider>,
  document.getElementById('app')
);
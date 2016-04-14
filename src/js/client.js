import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { CREATE_USER } from './actions';
import Home from './routes/Home';
import About from './components/About';
import NoMatch from './components/NoMatch';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import mainReducer from './reducers/mainReducer';

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    main: mainReducer,
    routing: routerReducer
  }),
  {},
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

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

store.dispatch({ type: CREATE_USER });

// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import invariant from 'redux-immutable-state-invariant';
// import reducer from '../reducers';

// export default function configureStore(initialState) {
//   const store = createStore(reducer, initialState, compose(
//     applyMiddleware(invariant(), thunk),
//     window.devToolsExtension ? window.devToolsExtension() : f => f
//   ));

//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextReducer = require('../reducers');
//       store.replaceReducer(nextReducer);
//     });
//   }

//   return store;
// }

// import { createStore } from 'redux';
// import rootReducer from '../reducers';

// export default function configureStore(initialState) {
//   const store = createStore(rootReducer, initialState,
//     window.devToolsExtension ? window.devToolsExtension() : undefined
//   );

//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextReducer = require('../reducers');
//       store.replaceReducer(nextReducer);
//     });
//   }

//   return store;
// }
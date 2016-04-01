import { createStore } from 'redux';
import Immutable from 'immutable';

const reducer = (state = Immutable.Map({ num: 0 }), action) => {
  switch (action.type) {
  case 'INCREMENT':
    return state.set('num', state.get('num') + 1);
  case 'DECREMENT':
    return state.set('num', state.get('num') - 1);
  default:
    return state;
  }
};

export const store = createStore(reducer);

export const init = render => {
  store.subscribe(render);
  store.dispatch({ type: 'default' });
};

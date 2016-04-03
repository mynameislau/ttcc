import { createStore } from 'redux';
import Immutable from 'immutable';

export const ADD_RESTAURANT = 'ADD_RESTAURANT';
export const ADD_USER_TO_RESTAURANT = 'ADD_USER_TO_RESTAURANT';

const defaultState = Immutable.Map({
  restaurants: Immutable.Map(),
  user: 'toto'
});

const removeUserFromState = (state, userName) =>
  state.update('restaurants', restaurants =>
    restaurants.map(restaurant =>
      restaurant.update('users', users =>
        users.filter(user => userName !== user)
      )
    )
  )

const reducer = (state = defaultState, action) => {
  switch (action.type) {
  case ADD_RESTAURANT:
    if (!state.get('restaurants').get(action.name)) {
      const newRestaurant = Immutable.Map({ name: action.name, users: Immutable.List() });
      const newRestaurants = Immutable.Map().set(action.name, newRestaurant);
      const newState = state.mergeIn(['restaurants'], newRestaurants);
      return newState;
    }
    return state;
  case ADD_USER_TO_RESTAURANT:
    const newState = removeUserFromState(state, state.get('user'));
    return newState.updateIn(['restaurants', action.name, 'users'], users => users.push(state.get('user')));
  default:
    return state;
  }
};

export const store = createStore(reducer);

export const init = render => {
  store.subscribe(render);
  store.dispatch({ type: 'default' });
};

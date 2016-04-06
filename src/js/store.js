import { createStore } from 'redux';
import Immutable from 'immutable';

export const REMOVE_USER_FROM_RESTAURANT = 'REMOVE_USER_FROM_RESTAURANT';
export const ADD_RESTAURANT = 'ADD_RESTAURANT';
export const ADD_USER_TO_RESTAURANT = 'ADD_USER_TO_RESTAURANT';

const defaultState = Immutable.Map({
  restaurants: Immutable.Map(),
  user: 'toto'
});

const removeUserFromRestaurant = (state, userName) =>
  state.update('restaurants', restaurants =>
    restaurants.map(restaurant =>
      restaurant.update('users', users =>
        users.filter(user => userName !== user)
      )
    )
  );


const addRestaurant = (state, restaurantName) => {
  if (!state.get('restaurants').get(restaurantName)) {
    const newRestaurant = Immutable.Map({ name: restaurantName, users: Immutable.List() });
    const newRestaurants = Immutable.Map().set(restaurantName, newRestaurant);
    const newState = state.mergeIn(['restaurants'], newRestaurants);
    return newState;
  }
  return state;
};

const addUserToRestaurant = (state, restaurantName, user) => {
  const newState = removeUserFromRestaurant(state, state.get('user'));
  console.log(restaurantName, user);
  return newState.updateIn(['restaurants', restaurantName, 'users'], users => users.push(user));
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

  case ADD_RESTAURANT:
    return addRestaurant(state, action.name);

  case REMOVE_USER_FROM_RESTAURANT:
    return removeUserFromRestaurant(state, state.get('user'));

  case ADD_USER_TO_RESTAURANT:
    console.log('adding once');
    return addUserToRestaurant(state, action.name, state.get('user'));

  default:
    return state;
  }
};

export const store = createStore(reducer);

export const init = render => {
  store.subscribe(render);
  store.dispatch({ type: 'default' });
};

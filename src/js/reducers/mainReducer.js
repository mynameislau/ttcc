import Immutable from 'immutable';

import { getMainUser } from '../helpers';

import {
  REMOVE_USER_FROM_RESTAURANT,
  ADD_RESTAURANT,
  ADD_USER_TO_RESTAURANT,
  CREATE_USER,
  SET_USERNAME
} from '../actions';

const defaultState = Immutable.Map({
  restaurants: Immutable.Map(),
  mainUserID: null,
  userList: Immutable.List()
});

const removeUserFromAllRestaurants = (state, userID) =>
  state.update('restaurants', restaurants =>
    restaurants.map(restaurant =>
      restaurant.update('users', users =>
        users.filter(user => user !== userID)
      )
    )
  );

const removeUserFromRestaurant = (state, restaurantName, userID) =>
  state.updateIn(['restaurants', restaurantName, 'users'], users => users.filter(user => user !== userID));

const createUser = (state) => {
  const newUser = Immutable.Map({
    username: 'anonymous',
    userID: state.get('userList').size
  });
  const newState = state.update('userList', userList => userList.push(newUser));
  return newState.set('mainUserID', newUser.get('userID'));
};

const setUsername = (state, userID, username) => {
  console.log('ouiii', username);
  return state.updateIn(['userList', userID, 'username'], () => username);
};

const addRestaurant = (state, restaurantName) => {
  if (!state.get('restaurants').get(restaurantName)) {
    const newRestaurant = Immutable.Map({ name: restaurantName, users: Immutable.List() });
    const newRestaurants = Immutable.Map().set(restaurantName, newRestaurant);
    const newState = state.mergeIn(['restaurants'], newRestaurants);
    return newState;
  }
  return state;
};

const addUserToRestaurant = (state, restaurantName, userID) => {
  const newState = removeUserFromAllRestaurants(state, userID);
  console.log(restaurantName, userID);
  return newState.updateIn(['restaurants', restaurantName, 'users'], users => users.push(userID));
};

export default (state = defaultState, action) => {
  switch (action.type) {

  case CREATE_USER:
    return createUser(state);

  case SET_USERNAME:
    return setUsername(state, state.get('mainUserID'), action.username);

  case ADD_RESTAURANT:
    return addRestaurant(state, action.restaurantName);

  case REMOVE_USER_FROM_RESTAURANT:
    return removeUserFromRestaurant(state, action.restaurantName, state.get('mainUserID'));

  case ADD_USER_TO_RESTAURANT:
    return addUserToRestaurant(state, action.restaurantName, state.get('mainUserID'));

  default:
    return state;
  }
};

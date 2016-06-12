import Immutable from 'immutable';

import {
  REMOVE_USER_FROM_RESTAURANT,
  ADD_RESTAURANT,
  ADD_USER_TO_RESTAURANT,
  SET_USERNAME
} from '../actions';

import {
  CREATE_USER,
  DELETE_USER
} from '../serverActions';

const defaultState = Immutable.Map({
  restaurants: Immutable.Map(),
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
  state.updateIn(['restaurants', restaurantName, 'users'], users =>
    users.filter(user => user !== userID)
  );

const createUser = (state) => {
  const newUser = Immutable.Map({
    username: 'anonymous',
    registered: false,
    userID: state.get('userList').size
  });

  return state.update('userList', userList => userList.push(newUser));
};

const deleteUser = (state, userID) =>
  state.update('userList', userList =>
    userList.filter(user =>
      user.get('userID') !== userID
    )
  )
  .update('restaurants', restaurants =>
    restaurants.map(restaurant =>
      restaurant.update('users', users =>
        users.filter(restaurantUserID => userID !== restaurantUserID)
      )
    )
  );

const setUsername = (state, userID, username) => {
  return state.update('userList', userList => {
    return userList.map(userListEntry => {
      if (userListEntry.get('userID') === userID) {
        return userListEntry.set('username', username)
        .set('registered', true);
      }
      else {
        return userListEntry;
      }
    });
  });
};

const addUserToRestaurant = (state, restaurantName, userID) => {
  const newState = removeUserFromAllRestaurants(state, userID);

  console.log(restaurantName, userID);

  return newState.updateIn(['restaurants', restaurantName, 'users'], users =>
    users.push(parseInt(userID))
  );
};

const addRestaurant = (state, restaurantName, creatorID) => {
  if (!state.get('restaurants').get(restaurantName)) {
    const newRestaurant = Immutable.Map({ name: restaurantName, users: Immutable.List() });
    const newRestaurants = Immutable.Map().set(restaurantName, newRestaurant);
    const newState = state.mergeIn(['restaurants'], newRestaurants);

    return addUserToRestaurant(newState, restaurantName, creatorID);
  }

  return state;
};


export default (state = defaultState, action) => {
  switch (action.type) {

  case CREATE_USER:
    return createUser(state);

  case DELETE_USER:
    return deleteUser(state, action.userID);

  case SET_USERNAME:
    return setUsername(state, action.userID, action.username);

  case ADD_RESTAURANT:
    return addRestaurant(state, action.restaurantName, action.creatorID);

  case REMOVE_USER_FROM_RESTAURANT:
    return removeUserFromRestaurant(state, action.restaurantName, action.userID);

  case ADD_USER_TO_RESTAURANT:
    return addUserToRestaurant(state, action.restaurantName, action.userID);

  default:
    return state;

  }
};

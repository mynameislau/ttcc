import {
  isLogged,
  getUserRestaurant,
  getRestaurantUsersDiff
} from '../common/helpers';


let oldState = null;

export const checkNotifications = newState => {
  oldState = oldState ? oldState : newState;

  const mainUserID = oldState.groups.get('mainUserID');
  const mainUserIsLogged = isLogged(mainUserID, oldState.groups.get('userList'));
  const mainUserOldRestaurant = getUserRestaurant(mainUserID, oldState.groups.get('restaurants'));
  const mainUserNewRestaurant = getUserRestaurant(mainUserID, newState.groups.get('restaurants'));

  if (mainUserIsLogged && mainUserOldRestaurant && mainUserNewRestaurant) {
    const diff = getRestaurantUsersDiff(mainUserOldRestaurant, mainUserNewRestaurant);

    const message = diff.removedUsers.map(userID =>
      `userID ${userID} disappeared !`
    )
    .concat(diff.addedUsers.map(userID =>
      `userID ${userID} is new !`
    ))
    .join('\n');

    console.log(message ? message : 'nothing changed !');
  }

  oldState = newState;
};
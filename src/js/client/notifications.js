import {
  isLogged,
  getUserRestaurant,
  getUser,
  getRestaurantUsersDiff
} from '../common/helpers';

const Notification = window.Notification;

let permissionGranted = false;

const checkForPermission = () => {
  console.log(Notification.permission);
  if (Notification)
  {
    if (Notification.permission !== 'denied' && Notification.permission !== 'granted') {
      Notification.requestPermission(permission => {
        permissionGranted = permission === 'granted';
      });
    }
    else if (Notification.permission === 'granted') {
      permissionGranted = true;
    }
  }
};

const notify = (message) => {
  console.log('notifying', message);
  const notif = new Notification(message);

  window.setTimeout(notif.close.bind(notif), 5000);
};

let oldState = null;

checkForPermission();

export const checkNotifications = newState => {
  oldState = oldState ? oldState : newState;
  console.log('permission', permissionGranted);

  if (permissionGranted) {
    const mainUserID = oldState.groups.get('mainUserID');
    const mainUserIsLogged = isLogged(mainUserID, oldState.groups.get('userList'));
    const mainUserOldRestaurant = getUserRestaurant(mainUserID, oldState.groups.get('restaurants'));
    const mainUserNewRestaurant = getUserRestaurant(mainUserID, newState.groups.get('restaurants'));

    console.log(mainUserIsLogged, mainUserOldRestaurant, mainUserNewRestaurant);

    if (mainUserIsLogged && mainUserOldRestaurant && mainUserNewRestaurant) {
      const diff = getRestaurantUsersDiff(mainUserOldRestaurant, mainUserNewRestaurant);

      const message = diff.removedUsers.map(userID =>
        `${getUser(userID, oldState.groups.get('userList')).get('username')} a quitté le groupe !`
      )
      .concat(diff.addedUsers.map(userID =>
        `${getUser(userID, oldState.groups.get('userList')).get('username')} a rejoint le groupe !`
      ))
      .join('\n');

      notify(message ? message : 'nothing changed !');
    }
  }

  oldState = newState;
};
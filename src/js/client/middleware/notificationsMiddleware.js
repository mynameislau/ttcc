const Notification = window.Notification;

let permissionGranted = false;

if (Notification) {
  if (Notification.permission === 'granted') {
    permissionGranted = true;
  }
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(permission => {
      permissionGranted = permission === 'granted';
    });
  }
}

export default store => next => action => {
  console.log('notifying', action.type, action);
  if (action.notification) {
    const notif = new Notification(action.notification.title, action.notification);

    window.setTimeout(notif.close, 5000);
  }

  return next(action);
};


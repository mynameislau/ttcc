import Server from 'socket.io';
import { createStore, applyMiddleware, compose } from 'redux';
import serverReducer from '../common/reducers/serverReducer';
import { createUser, deleteUser } from '../common/actions/serverActions';
import { SOCKET_IO_PORT } from '../common/config';
import { logAction, logStateChange } from '../common/logging';

console.log(SOCKET_IO_PORT);

export const startSocketServer = () => new Promise((resolve, reject) => {
  const io = new Server().attach(SOCKET_IO_PORT);

  const emitMiddleware = store => next => action => {
    if (action.emit) {
      // io.emit('stateChanged', store.getSt);
    }

    return next(action);
  };

  const loggingMiddleware = store => next => action => {
    logAction(action);

    return next(action);
  };

  const store = createStore(serverReducer, undefined, compose(
    applyMiddleware(emitMiddleware),
    applyMiddleware(loggingMiddleware)
  ));


  store.subscribe(() => {
    logStateChange(store.getState());
    io.emit('serverStateChanged', store.getState());
  });


  io.on('connection', socket => {
    console.log('new user connecting');
    store.dispatch(createUser());
    const userList = store.getState().get('userList');
    const newUserID = userList.get(userList.size - 1).get('userID');

    socket.emit('userSuccessfullyCreated', newUserID);
    // io.emit('stateChanged', store.getState());

    socket.on('clientAction', action => {
      console.log('action with side effects sent from client', action);
      store.dispatch(action);
    });

    socket.on('disconnect', () => {
      console.log('disconnecting socket');
      store.dispatch(deleteUser(newUserID));
    });
  });

  resolve();
});

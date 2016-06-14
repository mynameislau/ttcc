import SocketIO from 'socket.io';
import { createStore, applyMiddleware, compose } from 'redux';
import serverReducer from '../common/reducers/serverReducer';
import { createUser, deleteUser } from '../common/actions/serverActions';
import { logAction, logStateChange } from '../common/logging';
import { getNewUniqueID } from '../common/helpers';

export const startSocketServer = (server) => {
  const io = new SocketIO(server);


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
    const userList = store.getState().get('userList');
    const newUserID = getNewUniqueID(userList);

    store.dispatch(createUser(newUserID));

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
};

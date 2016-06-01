import Server from 'socket.io';
import { createStore, applyMiddleware } from 'redux';
import serverReducer from './reducers/serverReducer';
import { createUser, deleteUser } from './serverActions';

const io = new Server().attach(8090);

const emitMiddleware = store => next => action => {
  if (action.emit)
  {
    //io.emit('stateChanged', store.getSt);
  }
  return next(action);
};


const store = createStore(serverReducer, undefined, applyMiddleware(emitMiddleware));

io.on('connection', socket => {
  console.log('connection');
  // io.emit('state', store.getState());
  store.dispatch(createUser());
  const userList = store.getState().get('userList');
  const newUser = userList.get(userList.size - 1);
  socket.emit('connected', newUser);
  io.emit('stateChanged', store.getState());

  socket.on('action', action => {
    console.log('action', action);
    store.dispatch(action);
  });

  socket.on('disconnect', () => {
    store.dispatch(deleteUser(newUser.get('userID')));
  });
});

store.subscribe(() => {
  console.log('state changed !!!!');
  io.emit('stateChanged', store.getState());
});


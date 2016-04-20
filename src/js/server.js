import Server from 'socket.io';
import { createStore } from 'redux';
import serverReducer from './reducers/serverReducer';

const io = new Server().attach(8090);

const users = [];

// Add the reducer to your store on the `routing` key
const store = createStore(serverReducer);

io.on('connection', socket => {
  console.log('connection');
  users.push(users.length);
  io.emit('state', store.getState());

  socket.on('action', action => {
    console.log('action', action);
    store.dispatch(action);
  });
});

store.subscribe(() => {
  io.emit('state', store.getState());
});


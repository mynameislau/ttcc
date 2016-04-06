import React from 'react';
import User from './User';
import { REMOVE_USER_FROM_RESTAURANT, ADD_USER_TO_RESTAURANT, store } from '../store.js';

const usersList = restaurant =>
  restaurant.get('users')
  .map(item =>
    <li key={item}><User user={item} /></li>
  );

export default ({ restaurant }) =>
  <div>
    <span>{restaurant.get('name')}</span>
    <button onClick={() => store.dispatch({ type: ADD_USER_TO_RESTAURANT, name: restaurant.get('name') })}>Plus</button>
    <button onClick={() => store.dispatch({ type: REMOVE_USER_FROM_RESTAURANT })}>Minus</button>
    <ul>{usersList(restaurant)}</ul>
  </div>;

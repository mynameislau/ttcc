import React from 'react';
import User from './User';

export default ({ restaurant, add, remove, userList }) =>
  <div>
    <span>{restaurant.get('name')}</span>
    <button onClick={() => add(restaurant.get('name'))}>Plus</button>
    <button onClick={() => remove(restaurant.get('name'))}>Minus</button>
    <ul>
      {restaurant.get('users').map(userID => {
        const user = userList.get(userID);
        return <li key={user.get('userID')}><User username={user.get('username')} /></li>;
      }
      )}
  </ul>
  </div>;

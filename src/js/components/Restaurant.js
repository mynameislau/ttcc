import React from 'react';
import User from './User';

const add = false ? <button class="btn btn--full" onClick={() => add(restaurant.get('name'), userID)}>Se rajouter</button> : null;
const remove = false ? <button class="btn btn--full" onClick={() => remove(restaurant.get('name'), userID)}>Annuler</button> : null;

export default ({ restaurant, add, remove, userList, userID }) =>
  <div className="restaurant">
    <span className="card__title">{restaurant.get('name')}</span>
    <ul>
      {restaurant.get('users').map(userID => {
        const user = userList.get(userID);
        return <li key={user.get('userID')}><User username={user.get('username')} /></li>;
      }
      )}
    </ul>
    {add}
    {remove}
  </div>;

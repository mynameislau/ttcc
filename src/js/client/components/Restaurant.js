import React from 'react';
import User from './User';
import { reduceUserListToUser } from '../../common/helpers.js';

export default ({ restaurant, addUser, removeUser, userList, userID, deleteRestaurant }) =>
  <div className="restaurant">
    <span className="card__title">
      {restaurant.get('name')}
    </span>
    <ul className="restaurant__user-list">
      {restaurant.get('users').map(currUserID => {
        const user = reduceUserListToUser(userList, currUserID);

        return <li key={user.get('userID')}><User username={user.get('username')} /></li>;
      }
      )}
    </ul>
    { restaurant.get('users').size ? <div className="card__number">{restaurant.get('users').size}</div> : '' }
    { deleteRestaurant ? <button className="delete-btn card__delete" onClick={() => deleteRestaurant(restaurant.get('name'))}>X</button> : null }
    { addUser ? <button className="btn btn--full" onClick={() => addUser(restaurant.get('name'), userID)}>Se rajouter</button> : null }
    { removeUser ? <button className="btn btn--full btn--cancel" onClick={() => removeUser(restaurant.get('name'), userID)}>Quitter</button> : null}
  </div>;

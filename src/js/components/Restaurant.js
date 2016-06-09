import React from 'react';
import User from './User';

export default ({ restaurant, add, remove, userList, userID }) =>
  <div className="restaurant">
    <span className="card__title">{restaurant.get('name')}</span>
    <ul className="restaurant__user-list">
      {restaurant.get('users').map(currUserID => {
        const user = userList.get(currUserID);
        return <li key={user.get('userID')}><User username={user.get('username')} /></li>;
      }
      )}
    </ul>
    {add ? <button className="btn btn--full" onClick={() => add(restaurant.get('name'), userID)}>Se rajouter</button> : null}
    {remove ? <button className="btn btn--full btn--cancel" onClick={() => remove(restaurant.get('name'), userID)}>Annuler</button> : null}
  </div>;

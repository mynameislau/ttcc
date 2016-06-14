import React from 'react';
import User from './User';

export default ({ userList }) =>
<ul>
  {userList.filter(user => user.get('registered') === true).map(user =>
    <li key={user.get('userID')}>
      <User username={user.get('username')} />
    </li>
  )}
</ul>;

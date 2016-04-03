import React from 'react';
import AddRestaurant from '../components/AddRestaurant';
import { store } from '../store';
import Immutable from 'immutable';

const usersList = restaurant => Immutable.Seq(restaurant.get('users'))
  .map(item =>
    <li key={item}>{item}</li>
  );

const restaurantList = () => store.getState().get('restaurants')
  .valueSeq()
  .map(item =>
    <li key={item.get('name')}>
      {item.get('name')}
      <ul>
        {usersList(item)}
      </ul>
    </li>
    );

export default () => <div>
  <AddRestaurant />
  <ul>{restaurantList()}</ul>
</div>;

import React from 'react';
import AddRestaurant from '../components/AddRestaurant';
import { store } from '../store';
import Restaurant from '../components/Restaurant';

const restaurantList = () => store.getState().get('restaurants')
  .valueSeq()
  .map(item =>
    <li key={item.get('name')}>
      <Restaurant restaurant={item} />
    </li>
    );

export default () => <div>
  <AddRestaurant />
  <ul>{restaurantList()}</ul>
</div>;

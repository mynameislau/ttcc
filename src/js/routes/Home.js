import React from 'react';
import { connect } from 'react-redux';
import AddRestaurant from '../containers/AddRestaurant';
import Restaurant from '../components/Restaurant';
import User from '../components/User';
import NameForm from '../containers/NameForm';
import { getMainUsername } from '../helpers';
import { addUserToRestaurant, removeUserFromRestaurant } from '../actions';

const mapStateToProps = state => ({
  mainUsername: getMainUsername(state.main),
  restaurantList: state.main.get('restaurants').valueSeq(),
  userList: state.main.get('userList')
});

const mapDispatchToProps = dispatch => ({
  add: (name) => dispatch(addUserToRestaurant(name)),
  remove: (name) => dispatch(removeUserFromRestaurant(name))
});

const component = ({ mainUsername, restaurantList, userList, add, remove }) =>
  <div>
    <User username={mainUsername} />
    <NameForm />
    <AddRestaurant />
    <ul>
      {restaurantList.map(restaurant =>
        <li key={restaurant.get('name')}>
          <Restaurant restaurant={restaurant} userList={userList} add={add} remove={remove} />
        </li>
      )}
    </ul>
  </div>;

export default connect(mapStateToProps, mapDispatchToProps)(component);

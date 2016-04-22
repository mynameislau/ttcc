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
  mainUserID: state.main.get('mainUserID'),
  restaurantList: state.main.get('restaurants').valueSeq(),
  userList: state.main.get('userList')
});

const mapDispatchToProps = dispatch => ({
  add: (name, userID) => dispatch(addUserToRestaurant(name, userID)),
  remove: (name, userID) => dispatch(removeUserFromRestaurant(name, userID))
});

const component = ({ mainUsername, restaurantList, userList, add, remove, mainUserID }) =>
  <div>
    <User username={mainUsername} />
    <NameForm />
    <AddRestaurant />
    <ul>
    {userList.filter(user => user.get('registered') === true).map(user =>
      <li key={user.get('userID')}>
        <User username={user.get('username')} />
      </li>
    )}
    </ul>
    <ul>
      {restaurantList.map(restaurant =>
        <li key={restaurant.get('name')}>
          <Restaurant restaurant={restaurant} userID={mainUserID} userList={userList} add={add} remove={remove} />
        </li>
      )}
    </ul>
  </div>;

export default connect(mapStateToProps, mapDispatchToProps)(component);

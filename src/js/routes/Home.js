import React from 'react';
import { connect } from 'react-redux';
import AddRestaurant from '../containers/AddRestaurant';
import Restaurant from '../components/Restaurant';
import UserList from '../components/UserList';
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
    <div className="header">
      <User username={mainUsername} />
      <NameForm />
    </div>
    <AddRestaurant />
    <section>
      <h1>Restaurants</h1>
      <ul className="restaurant-list">
        {restaurantList.map(restaurant =>
          <li key={restaurant.get('name')}>
            <Restaurant restaurant={restaurant} userID={mainUserID} userList={userList} add={add} remove={remove} />
          </li>
        )}
      </ul>
    </section>
    <section>
      <h1>Utilisateurs</h1>
      <UserList userList={userList} />
    </section>
  </div>;

export default connect(mapStateToProps, mapDispatchToProps)(component);

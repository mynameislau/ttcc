import React from 'react';
import { connect } from 'react-redux';
import AddRestaurant from '../containers/AddRestaurant';
import Restaurant from '../components/Restaurant';
import UserList from '../components/UserList';
import User from '../components/User';
import NameForm from '../containers/NameForm';
import { getMainUsername, isInRestaurant, isLogged } from '../helpers';
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
    <div className="global-layer">
      <NameForm />
    </div>
    <div className="header">
      <svg className="header__user-icon" role="presentation" title="" width="1.5em" height="1.5em">
        <use xlinkHref="assets/map.svg#user" />
      </svg>
      <User username={mainUsername} />
      <NameForm />
    </div>
    <section>
      <h1>Restaurants</h1>
      <ul className="restaurant-list card__list">
        { isLogged(mainUserID, userList) ? <li className="card card--ghost" key="add-restaurant"><AddRestaurant /></li> : null }
        {restaurantList.map(restaurant =>
          <li className="card" key={restaurant.get('name')}>
            <Restaurant
              restaurant={restaurant}
              userID={mainUserID}
              userList={userList}
              add={isLogged(mainUserID, userList) && !isInRestaurant(restaurant, mainUserID) ? add : null}
              remove={ isInRestaurant(restaurant, mainUserID) ? remove : null }
            />
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

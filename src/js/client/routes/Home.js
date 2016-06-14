import React from 'react';
import { connect } from 'react-redux';
import AddRestaurant from '../containers/AddRestaurant';
import Restaurant from '../components/Restaurant';
import UserList from '../components/UserList';
import User from '../components/User';
import NameForm from '../containers/NameForm';
import NameFormModal from '../containers/NameFormModal';
import { getMainUsername, isInRestaurant, isLogged, isRestaurantEmpty } from '../../common/helpers';
import { addUserToRestaurant, removeUserFromRestaurant, deleteRestaurant } from '../../common/actions/actions';

const mapStateToProps = state => ({
  mainUsername: getMainUsername(state.groups),
  mainUserID: state.groups.get('mainUserID'),
  restaurantList: state.groups.get('restaurants').valueSeq(),
  userList: state.groups.get('userList')
});

const mapDispatchToProps = dispatch => ({
  addUser: (name, userID) => dispatch(addUserToRestaurant(name, userID)),
  removeUser: (name, userID) => dispatch(removeUserFromRestaurant(name, userID)),
  deleteRestaurant: (restaurantName) => dispatch(deleteRestaurant(restaurantName))
});

const component = ({ mainUsername, restaurantList, userList, addUser, removeUser, mainUserID, deleteRestaurant }) =>
  <div>
    <NameFormModal />
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
              deleteRestaurant={ isLogged(mainUserID, userList) && isRestaurantEmpty(restaurant) ? deleteRestaurant : null }
              addUser={ isLogged(mainUserID, userList) && !isInRestaurant(restaurant, mainUserID) ? addUser : null }
              removeUser={ isInRestaurant(restaurant, mainUserID) ? removeUser : null }
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

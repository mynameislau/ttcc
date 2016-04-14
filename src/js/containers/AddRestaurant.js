import React from 'react';
import { connect } from 'react-redux';
import { ADD_RESTAURANT, ADD_USER_TO_RESTAURANT } from '../actions';
import { restaurantExists } from '../helpers';
// import Button from './Button';
// import $ from '../vendors/bliss';


const mapStateToProps = state => ({
  restaurants: state.main.get('restaurants')
});

const mapDispatchToProps = dispatch => ({
  check: (event, restaurants) => {
    event.preventDefault();

    const nameInput = document.forms.addRestaurant.elements.name;
    const restaurantName = nameInput.value;

    nameInput.setCustomValidity('');

    if (nameInput.validity.valueMissing) {
      nameInput.setCustomValidity('Entrez un nom de restaurant');
    }

    if (restaurantExists(restaurantName, restaurants)) {
      nameInput.setCustomValidity('Le nom existe déja');
    }

    if (event.target.checkValidity()) {
      dispatch({ type: ADD_RESTAURANT, name: restaurantName });
      dispatch({ type: ADD_USER_TO_RESTAURANT, name: restaurantName });
    }
  }
});

const component = ({ restaurants, check }) =>
  <form name="addRestaurant" noValidate onSubmit={ (event) => check(event, restaurants) }>
    <input name="name" type="text" required />
    <input type="submit" value="Ajout" />
  </form>;

export default connect(mapStateToProps, mapDispatchToProps)(component);

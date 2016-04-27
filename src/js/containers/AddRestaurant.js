import React from 'react';
import { connect } from 'react-redux';
import { addRestaurant, addUserToRestaurant } from '../actions';
import { restaurantExists } from '../helpers';
// import Button from './Button';
// import $ from '../vendors/bliss';


const mapStateToProps = state => ({
  restaurants: state.main.get('restaurants'),
  mainUserID: state.main.get('mainUserID')
});

const mapDispatchToProps = dispatch => ({
  check: (event, restaurants, mainUserID) => {
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
      dispatch(addRestaurant(restaurantName, mainUserID));
    }
  }
});

const component = ({ restaurants, check, mainUserID }) => {
  return <form class="add-restaurant" name="addRestaurant" noValidate onSubmit={ (event) => check(event, restaurants, mainUserID) }>
    <label className="txt-input__label" for="add-restaurant">Ajouter un restaurant</label>
    <input className="txt-input" id="add-restaurant" name="name" type="text" required />
    <input className="submit-btn" type="submit" value="Ajout" />
  </form>
};

export default connect(mapStateToProps, mapDispatchToProps)(component);

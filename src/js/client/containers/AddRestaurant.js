import React from 'react';
import { connect } from 'react-redux';
import { addRestaurant, addUserToRestaurant } from '../../common/actions/actions';
import { restaurantExists } from '../../common/helpers';
// import Button from './Button';
// import $ from '../vendors/bliss';


const mapStateToProps = state => ({
  restaurants: state.groups.get('restaurants'),
  mainUserID: state.groups.get('mainUserID')
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
    <label className="txt-input__label add-restaurant__label" for="add-restaurant">Ajouter une proposition</label>
    <input className="txt-input add-restaurant__input" id="add-restaurant" name="name" type="text" required />
    <input className="btn add-restaurant__btn" type="submit" value="Ajout" />
  </form>
};

export default connect(mapStateToProps, mapDispatchToProps)(component);

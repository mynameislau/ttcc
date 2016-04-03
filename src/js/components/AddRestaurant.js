import React from 'react';
import { store, ADD_RESTAURANT, ADD_USER_TO_RESTAURANT } from '../store';
// import Button from './Button';
// import $ from '../vendors/bliss';

const check = function (event) {
  event.preventDefault();
  const nameInput = document.forms.addRestaurant.elements.name;
  const restaurantName = nameInput.value;

  nameInput.setCustomValidity('');

  if (nameInput.validity.valueMissing) {
    nameInput.setCustomValidity('Entrez un nom de restaurant');
  }

  if (store.getState().get('restaurants').get(restaurantName)) {
    nameInput.setCustomValidity('Le nom existe déja');
  }

  if (event.target.checkValidity()) {
    store.dispatch({ type: ADD_RESTAURANT, name: restaurantName });
    store.dispatch({ type: ADD_USER_TO_RESTAURANT, name: restaurantName });
  }
};

export default () =>
  <form name="addRestaurant" noValidate onSubmit={check}>
    <input name="name" type="text" required />
    <input type="submit" value="Ajout" />
  </form>;

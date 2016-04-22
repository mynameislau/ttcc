import React from 'react';
import { connect } from 'react-redux';
import { setUsername } from '../actions';
import { userExists } from '../helpers';

const mapStateToProps = state => ({
  userList: state.main.get('userList'),
  mainUserID: state.main.get('mainUserID')
});

const mapDispatchToProps = dispatch => ({
  check: (event, userList, mainUserID) => {
    event.preventDefault();

    const nameInput = document.forms.setUsername.elements.name;
    const username = nameInput.value;

    nameInput.setCustomValidity('');

    if (nameInput.validity.valueMissing) {
      nameInput.setCustomValidity('Entrez un nom d\'utilisateur');
    }

    if (userExists(username, userList)) {
      nameInput.setCustomValidity('Le nom existe déja');
    }

    if (event.target.checkValidity()) {
      dispatch(setUsername(username, mainUserID));
    }
  }
});

const component = ({check, userList, mainUserID}) =>
  <form name="setUsername" noValidate onSubmit={(event) => check(event, userList, mainUserID)}>
    <label for="change-name">Changer le nom</label>
    <input id="change-name" name="name" type="text" required />
    <input type="submit" value="Ajout" />
  </form>;

export default connect(mapStateToProps, mapDispatchToProps)(component);
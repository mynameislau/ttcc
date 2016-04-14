import React from 'react';
import { connect } from 'react-redux';
import { SET_USERNAME } from '../actions';
import { userExists } from '../helpers';

const mapStateToProps = state => ({
  userList: state.main.get('userList')
});

const mapDispatchToProps = dispatch => ({
  check: (event, userList) => {
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
      dispatch({ type: SET_USERNAME, username: username });
    }
  }
});

const component = ({check, userList}) =>
  <form name="setUsername" noValidate onSubmit={(event) => check(event, userList)}>
    <input name="name" type="text" required />
    <input type="submit" value="Ajout" />
  </form>;

export default connect(mapStateToProps, mapDispatchToProps)(component);

import React from 'react';
import { connect } from 'react-redux';
import { setUsername } from '../actions';
import { checkForm, checkName } from '../form/form-validation';
import { isLogged } from '../helpers';

const mapStateToProps = state => ({
  userList: state.groups.get('userList'),
  mainUserID: state.groups.get('mainUserID')
});

const mapDispatchToProps = dispatch => ({
  check: (event, userList, mainUserID) => {
    const form = event.target;

    console.log(event, event.target);
    checkForm(event, [checkName(form.elements.name, userList)]).then(() => {
      console.log('2', event, event.target);
      dispatch(setUsername(form.elements.name.value, mainUserID));
    });
  }
});

const getLabel = (prompt, mainUserID, userList) => {
  const defaultLabel = isLogged(mainUserID, userList) ? 'Changer de nom' : 'Se logger';

  return prompt ? prompt : defaultLabel;
};

const component = ({ check, userList, mainUserID, prompt }) =>
  <form
  className="name-form"
  data-registered={ isLogged(mainUserID, userList) ? 'true' : 'false' }
  name="setUsername"
  noValidate
  onSubmit={(event) => check(event, userList, mainUserID)}>
    <label htmlFor="change-name">{getLabel(prompt, mainUserID, userList)}</label>
    <input id="change-name" name="name" type="text" required />
    <input className="btn" type="submit" value="OK" />
  </form>;

export default connect(mapStateToProps, mapDispatchToProps)(component);

import React from 'react';
import { connect } from 'react-redux';
import { setUsername } from '../actions';
import { checkForm, checkName } from '../form/form-validation';
import { isLogged } from '../helpers';

const mapStateToProps = state => ({
  userList: state.main.get('userList'),
  mainUserID: state.main.get('mainUserID')
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

const component = ({check, userList, mainUserID}) =>
  <form className="name-form" data-registered={isLogged(mainUserID, userList) ? 'true' : 'false' } name="setUsername" noValidate onSubmit={(event) => check(event, userList, mainUserID)}>
    <label htmlFor="change-name">Changer le nom</label>
    <input id="change-name" name="name" type="text" required />
    <input className="btn" type="submit" value="OK" />
  </form>;

export default connect(mapStateToProps, mapDispatchToProps)(component);

import React from 'react';
import { connect } from 'react-redux';
import { toggleUsernameModal } from '../../common/actions/UIActions';
import Modal from '../components/Modal';
import NameForm from './NameForm';
import { isLogged } from '../../common/helpers';

const mapStateToProps = state => ({
  hidden: state.UI.get('namePromptState') === 'hidden' ||
    isLogged(state.groups.get('mainUserID'), state.groups.get('userList'))
  // userList: state.groups.get('userList'),
  // mainUserID: state.groups.get('mainUserID')
});

const mapDispatchToProps = dispatch => ({
  close: (event) => {
    dispatch(toggleUsernameModal('hidden'));
  }
});

const component = ({ hidden, close }) =>
  <Modal hidden={hidden} close={close}>
    <div>
      <NameForm prompt="Entrez votre nom" />
      <div>
        <button onClick={close} class="btn btn--link-like">Non je m'en fous je veux juste regarder</button>
      </div>
    </div>
  </Modal>;

export default connect(mapStateToProps, mapDispatchToProps)(component);

import Immutable from 'immutable';
import {
  TOGGLE_USERNAME_MODAL
} from '../actions/UIActions';

const defaultState = Immutable.Map({
  namePromptState: 'visible'
});

const setNamePromptState = (state, modalState) =>
  state.set('namePromptState', modalState);

export default (state = defaultState, action) => {
  switch (action.type) {

  case TOGGLE_USERNAME_MODAL:
    return setNamePromptState(state, action.modalState);

  default:
    return state;

  }
};
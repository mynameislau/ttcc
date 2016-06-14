import { userExists } from '../../common/helpers';

export const checkForm = (event, checks) => new Promise((resolve, reject) => {
  event.preventDefault();
  const form = event.target;
  Promise.all(checks).then(() => {
    if (form.checkValidity()) {
      resolve();
    }
    else {
      reject();
    }
  }, () => reject());
});

export const checkName = (nameInput, userList) => new Promise((resolve, reject) => {
  const username = nameInput.value;

  nameInput.setCustomValidity('');

  if (nameInput.validity.valueMissing) {
    nameInput.setCustomValidity('Entrez un nom d\'utilisateur');
  }

  if (userExists(username, userList)) {
    nameInput.setCustomValidity('Le nom existe déja');
  }

  resolve();
});

export const CREATE_USER = 'CREATE_USER';
export const DELETE_USER = 'DELETE_USER';

export const deleteUser = userID => ({
  type: DELETE_USER,
  userID: userID
});

export const createUser = userID => ({
  type: CREATE_USER,
  userID: userID
});

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getUsers } from '@actions/users';
import { updateUsersList } from '@store/usersStore';

import UsersList from '@components/UsersList/UsersList';

const App = () => {
  const dispatch = useDispatch();

  const getUsersList = async () => {
    try {
      const users = await getUsers();
      dispatch(updateUsersList(users));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUsersList();
  }, [])

  return <UsersList />;
}

export default App;

import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersStore';

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;

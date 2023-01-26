import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUsersList: (state, action) => ([...action.payload])
  },
});

export const { updateUsersList } = usersSlice.actions;
export default usersSlice.reducer;

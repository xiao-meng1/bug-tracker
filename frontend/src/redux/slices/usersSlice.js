import { createSlice } from '@reduxjs/toolkit';

import fetchUsers from '../thunks/fetchUsers';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: {},
    errors: [],
    isIdle: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isIdle = false;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isIdle = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const newEntities = {};

        action.payload.forEach((user) => {
          newEntities[user.id] = user;
        });
        state.entities = newEntities;
        state.isIdle = true;
      });
  },
});

export const selectUsers = (state) => state.users.entities;
export const selectUsersErrors = (state) => state.users.errors;
export const selectUsersIsIdle = (state) => state.users.isIdle;

export default usersSlice.reducer;

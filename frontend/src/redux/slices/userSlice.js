import { createSlice } from '@reduxjs/toolkit';

import fetchUserFromLogin from '../thunks/fetchUserFromLogin';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    jwt: '',
    info: {},
    errors: [],
    isIdle: true,
  },
  reducers: {
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.jwt = '';
      state.info = {};
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFromLogin.pending, (state) => {
        state.isIdle = false;
      })
      .addCase(fetchUserFromLogin.rejected, (state, action) => {
        const { errors } = action.payload;

        state.errors = errors;
        state.isIdle = true;
      })
      .addCase(fetchUserFromLogin.fulfilled, (state, action) => {
        const { token, user } = action.payload;

        state.isLoggedIn = true;
        state.jwt = token;
        state.info = user;
        state.errors = [];
        state.isIdle = true;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export const selectUserIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserJwt = (state) => state.user.jwt;
export const selectUserInfo = (state) => state.user.info;
export const selectUserErrors = (state) => state.user.errors;
export const selectUserIsIdle = (state) => state.user.isIdle;

export default userSlice.reducer;

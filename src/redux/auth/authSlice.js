import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';

const logInFulfilled = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
};
const logOutFulfilled = (state, action) => {
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoggedIn = false;
};
const refreshUserFulfilled = (state, action) => {
  state.user = action.payload;
  state.isLoggedIn = true;
  state.isRefreshing = false;
};
const refreshUserPending = (state) => {
  state.isRefreshing = true;
};
const refreshUserRejected = (state) => {
  state.isRefreshing = false;
};

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(register.fulfilled, logInFulfilled)
      .addCase(logIn.fulfilled, logInFulfilled)
      .addCase(logOut.fulfilled, logOutFulfilled)
      .addCase(refreshUser.pending, refreshUserPending)
      .addCase(refreshUser.fulfilled, refreshUserFulfilled)
      .addCase(refreshUser.rejected, refreshUserRejected),
});

export const authReducer = authSlice.reducer;

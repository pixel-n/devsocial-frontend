import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.currentUser = action.payload.user;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('currentUser', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.currentUser = null;
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
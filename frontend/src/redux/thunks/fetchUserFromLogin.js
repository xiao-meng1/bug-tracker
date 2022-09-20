import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk(
  'users/fetchUserFromLogin',
  async (loginInfo, { rejectWithValue }) => {
    const { username, password } = loginInfo;
    const uri = `${process.env.REACT_APP_BACKEND_ORIGIN}/sessions/login`;

    try {
      const response = await axios.post(uri, {
        username,
        password,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

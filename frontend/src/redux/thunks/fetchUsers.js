import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk('users/fetchUsers', async (jwt) => {
  const uri = `${process.env.REACT_APP_BACKEND_ORIGIN}/users`;
  const config = {
    headers: { Authorization: `Bearer ${jwt}` },
  };

  const response = await axios.get(uri, config);

  return response.data;
});

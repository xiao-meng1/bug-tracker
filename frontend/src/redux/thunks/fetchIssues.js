import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export default createAsyncThunk('issues/fetchIssues', async (jwt) => {
  const uri = `${process.env.REACT_APP_BACKEND_ORIGIN}/issues`;
  const config = {
    headers: { Authorization: `Bearer ${jwt}` },
  };

  const response = await axios.get(uri, config);

  return response.data;
});

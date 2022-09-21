import { createSlice } from '@reduxjs/toolkit';

import fetchIssues from '../thunks/fetchIssues';

export const issuesSlice = createSlice({
  name: 'issues',
  initialState: {
    entities: {},
    errors: [],
    isIdle: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.isIdle = false;
      })
      .addCase(fetchIssues.rejected, (state) => {
        state.isIdle = true;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        const newEntities = {};

        action.payload.forEach((issue) => {
          newEntities[issue.id] = issue;
        });
        state.entities = newEntities;
        state.isIdle = true;
      });
  },
});

export const selectIssues = (state) => state.issues.entities;
export const selectIssuesErrors = (state) => state.issues.errors;
export const selectIssuesIsIdle = (state) => state.issues.isIdle;

export default issuesSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import issuesReducer from './slices/issuesSlice';
import usersReducer from './slices/usersSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    issues: issuesReducer,
    users: usersReducer,
  },
});

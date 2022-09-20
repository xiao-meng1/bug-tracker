import React from 'react';
import { useSelector } from 'react-redux';

import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import { selectUserIsLoggedIn } from '../redux/slices/userSlice';

export default function Home() {
  const useIsLoggedIn = useSelector(selectUserIsLoggedIn);

  return useIsLoggedIn ? <Dashboard /> : <Login />;
}

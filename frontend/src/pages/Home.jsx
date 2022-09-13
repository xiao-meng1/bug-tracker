import React from 'react';

import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
// import styles from '../styles/home.module.css';

// Check if cookie if cookie in state, if yes then render Dashboard, if no then render login.
export default function Home() {
  const userInState = false;

  return userInState ? <Dashboard /> : <Login />;
}

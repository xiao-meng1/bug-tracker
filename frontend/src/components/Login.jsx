import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import fetchUserFromLogin from '../redux/thunks/fetchUserFromLogin';
import { selectUserErrors } from '../redux/slices/userSlice';
import jiraLogo from '../assets/images/mark-gradient-white-jira-software.svg';
import styles from '../styles/login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const userErrors = useSelector(selectUserErrors);
  const dispatch = useDispatch();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUserFromLogin({ username, password }));
  };

  const handleGuestLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(
      fetchUserFromLogin({ username: 'GuestUser1', password: 'GuestUser1' })
    );
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={jiraLogo} alt="logo" />
        <h1>Bug Tracker</h1>
      </header>
      <main className={styles.main}>
        <h2 className={styles.subheader}>Log in to your account</h2>
        <section className={styles.container}>
          <form action="" onSubmit={handleLoginSubmit}>
            <div className={styles.input_container}>
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                placeholder="Enter Username"
                required
              />
              <p className={styles.error_message}>
                {userErrors.reduce(
                  (prev, error) =>
                    'username' in error ? error.username : prev,
                  ''
                )}
              </p>
            </div>
            <div className={styles.input_container}>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Enter Password"
                required
              />
              <p className={styles.error_message}>
                {userErrors.reduce(
                  (prev, error) =>
                    'password' in error ? error.password : prev,
                  ''
                )}
              </p>{' '}
            </div>
            <button type="submit">Continue</button>
          </form>
          <p className={styles.or}>OR</p>
          <button
            type="button"
            className={styles.guest_login}
            onClick={handleGuestLoginSubmit}
          >
            Log in as a guest
          </button>
        </section>
        <Link to="/sign-up" className={styles.signup}>
          Sign up for an account
        </Link>
      </main>
    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import jiraLogo from '../assets/images/mark-gradient-white-jira-software.svg';
import styles from '../styles/login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={jiraLogo} alt="logo" />
        <h1>Bug Tracker</h1>
      </header>
      <main className={styles.main}>
        <h2 className={styles.subheader}>Log in to your account</h2>
        <section className={styles.container}>
          <form action="">
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              placeholder="Enter Username"
              required
            />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter Password"
              required
            />
            <button type="submit">Continue</button>
          </form>
          <p>OR</p>
          <button type="button" className={styles.guest_login}>
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

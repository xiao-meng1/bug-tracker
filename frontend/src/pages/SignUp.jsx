import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import jiraLogo from '../assets/images/mark-gradient-white-jira-software.svg';
import styles from '../styles/signup.module.css';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={jiraLogo} alt="logo" />
        <h1>Bug Tracker</h1>
      </header>
      <main className={styles.main}>
        <h2 className={styles.subheader}>Create a new account</h2>
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
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
            <input
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type="password"
              placeholder="Confirm Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must match the password field"
              required
            />
            <button type="submit">Create account</button>
          </form>
        </section>
        <Link to="/" className={styles.signup}>
          Log into your account
        </Link>
      </main>
    </div>
  );
}

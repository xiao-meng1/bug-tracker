import React from 'react';
import { Link } from 'react-router-dom';

import jiraLogo from '../assets/images/mark-gradient-white-jira-software.svg';
import styles from '../styles/login.module.css';

export default function Login() {
  return (
    <>
      <header className={styles.header}>
        <img src={jiraLogo} alt="logo" />
        <h1>Bug Tracker</h1>
      </header>
      <main className={styles.main}>
        <h2 className={styles.subheader}>Log in to your account</h2>
        <section className={styles.container}>
          <form action="">
            <input type="text" placeholder="Enter Username" required />
            <input type="password" placeholder="Enter Password" required />
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
    </>
  );
}

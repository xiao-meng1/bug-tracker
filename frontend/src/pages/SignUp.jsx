import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import jiraLogo from '../assets/images/mark-gradient-white-jira-software.svg';
import styles from '../styles/signup.module.css';

export default function SignUp() {
  const [accountCreated, setAccountCreated] = useState(false);
  const [signUpErrors, setSignUpErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      setSignUpErrors([
        ...signUpErrors,
        { confirmPassword: 'Does not match password' },
      ]);

      return;
    }

    const uri = `${process.env.REACT_APP_BACKEND_ORIGIN}/users`;

    try {
      await axios.post(uri, {
        username,
        password,
        firstName,
        lastName,
      });
      setAccountCreated(true);
    } catch (err) {
      setSignUpErrors(err.response.data.errors);
    }
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={jiraLogo} alt="logo" />
        <h1>Bug Tracker</h1>
      </header>
      <main className={styles.main}>
        <h2 className={styles.subheader}>
          {accountCreated ? 'Account created' : 'Create a new account'}
        </h2>
        {accountCreated ? null : (
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
                  pattern="[a-zA-Z0-9]+"
                  title="Must only contain letters and numbers"
                  required
                />
                <p className={styles.error_message}>
                  {signUpErrors.reduce(
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
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  required
                />
                <p className={styles.error_message}>
                  {signUpErrors.reduce(
                    (prev, error) =>
                      'password' in error ? error.password : prev,
                    ''
                  )}
                </p>
              </div>
              <div className={styles.input_container}>
                <input
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  type="password"
                  placeholder="Confirm Password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  required
                />
                <p className={styles.error_message}>
                  {signUpErrors.reduce(
                    (prev, error) =>
                      'confirmPassword' in error ? error.confirmPassword : prev,
                    ''
                  )}
                </p>
              </div>
              <div className={styles.input_container}>
                <input
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter First Name"
                  pattern="[a-zA-Z0-9]+"
                  title="Must only contain letters"
                  required
                />
                <p className={styles.error_message}>
                  {signUpErrors.reduce(
                    (prev, error) =>
                      'firstName' in error ? error.firstName : prev,
                    ''
                  )}
                </p>
              </div>
              <div className={styles.input_container}>
                <input
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter Last Name"
                  pattern="[a-zA-Z0-9]+"
                  title="Must only contain letters"
                  required
                />
                <p className={styles.error_message}>
                  {signUpErrors.reduce(
                    (prev, error) =>
                      'lastName' in error ? error.lastName : prev,
                    ''
                  )}
                </p>
              </div>
              <button type="submit">Create account</button>
            </form>
          </section>
        )}
        <Link to="/" className={styles.signup}>
          Log into your account
        </Link>
      </main>
    </div>
  );
}

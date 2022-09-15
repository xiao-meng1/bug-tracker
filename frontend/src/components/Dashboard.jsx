import React from 'react';

import IssueCard from './IssueCard';
import jiraLogo from '../assets/images/mark-gradient-white-jira-software.svg';
import addIcon from '../assets/images/add_white_24dp.svg';
import logoutIcon from '../assets/images/logout_white_24dp.svg';
import styles from '../styles/dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={styles.app}>
      <nav className={styles.navbar}>
        <div className={styles.top}>
          <div className={styles.left_icon_container}>
            <img className={styles.jira_logo} src={jiraLogo} alt="logo" />
          </div>
          <button type="button">
            <div className={styles.left_icon_container}>
              <img src={addIcon} alt="add icon" />
            </div>
            <p>CREATE ISSUE</p>
          </button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left_icon_container}>
            <div className={styles.user_icon}>XM</div>
          </div>
          <button type="button">
            <div className={styles.left_icon_container}>
              <img src={logoutIcon} alt="logout icon" />
            </div>
            <p>LOG OUT</p>
          </button>
        </div>
      </nav>
      <section className={styles.content}>
        <header>
          <p>Projects / Example Project</p>
          <h1>Board</h1>
        </header>
        <main>
          <section className={styles.filters}>
            <div className={styles.icon_container}>
              <div className={styles.user_icon}>JW</div>
              <div className={styles.user_icon}>WP</div>
              <div className={styles.user_icon}>XM</div>
            </div>
            <button type="button">Only My Issues</button>
          </section>
          <section className={styles.column_container}>
            <div className={styles.column}>
              <h3>TO DO 5</h3>
              <IssueCard
                summary="Summary asdfads asd ad fasd asdfddsfasdfasdfdasasdf"
                type="bug"
                assignees={[
                  { initials: 'XM', iconColor: '#45a85f' },
                  { initials: 'JW', iconColor: '#45a85f' },
                  { initials: 'WP', iconColor: '#45a85f' },
                ]}
              />
              <IssueCard
                summary="Summary asdfads asd ad fasd asdfddsfasdfasdfdasasdf"
                type="story"
                assignees={[
                  { initials: 'XM', iconColor: '#45a85f' },
                  { initials: 'JW', iconColor: '#45a85f' },
                  { initials: 'WP', iconColor: '#45a85f' },
                ]}
              />
            </div>
            <div className={styles.column}>
              <h3>IN PROGRESS 3</h3>
              <IssueCard
                summary="Summary asdfads asd ad fasd asdfddsfasdfasdfdasasdf"
                type="task"
                assignees={[
                  { initials: 'XM', iconColor: '#45a85f' },
                  { initials: 'JW', iconColor: '#45a85f' },
                  { initials: 'WP', iconColor: '#45a85f' },
                ]}
              />
            </div>
            <div className={styles.column}>
              <h3>IN REVIEW 1</h3>
            </div>
            <div className={styles.column}>
              <h3>DONE 8</h3>
            </div>
          </section>
        </main>
      </section>
    </div>
  );
}

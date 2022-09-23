import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UpdateIssuePopup from './UpdateIssuePopup';
import CreateIssuePopup from './CreateIssuePopup';
import IssueCard from './IssueCard';
import {
  logoutUser,
  selectUserInfo,
  selectUserJwt,
} from '../redux/slices/userSlice';
import { selectIssues } from '../redux/slices/issuesSlice';
import { selectUsers } from '../redux/slices/usersSlice';
import fetchIssues from '../redux/thunks/fetchIssues';
import fetchUsers from '../redux/thunks/fetchUsers';
import jiraLogo from '../assets/images/mark-gradient-white-jira-software.svg';
import addIcon from '../assets/images/add_white_24dp.svg';
import logoutIcon from '../assets/images/logout_white_24dp.svg';
import styles from '../styles/dashboard.module.css';

export default function Dashboard() {
  const userInfo = useSelector(selectUserInfo);
  const userJwt = useSelector(selectUserJwt);
  const issues = useSelector(selectIssues);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const [onlyMyIssues, setOnlyMyIssues] = useState(false);
  const [filteredIssues, setFilteredIssues] = useState({});
  const [createIssuePopupIsActive, setCreateIssuePopupIsActive] =
    useState(false);
  const [updateIssuePopupIsActive, setUpdateIssuePopupIsActive] =
    useState(false);
  const [activeIssueId, setActiveIssueId] = useState(null);
  const issueStatusValues = ['To Do', 'In Progress', 'In Review', 'Done'];

  const toggleCreateIssuePopupIsActive = () => {
    setCreateIssuePopupIsActive(!createIssuePopupIsActive);
  };

  const toggleUpdateIssuePopupIsActive = () => {
    setUpdateIssuePopupIsActive(!updateIssuePopupIsActive);
  };

  useEffect(() => {
    dispatch(fetchUsers(userJwt));
    dispatch(fetchIssues(userJwt));
  }, []);

  useEffect(() => {
    let newFilteredIssues = {};

    if (onlyMyIssues) {
      Object.values(issues)
        .filter((issue) =>
          issue.assignedTo.some((user) => user.id === userInfo.id)
        )
        .forEach((issue) => {
          newFilteredIssues[issue.id] = issue;
        });
    } else {
      newFilteredIssues = issues;
    }

    setFilteredIssues(newFilteredIssues);
  }, [issues, onlyMyIssues]);

  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <nav className={styles.navbar}>
          <div className={styles.top}>
            <div className={styles.left_icon_container}>
              <img className={styles.jira_logo} src={jiraLogo} alt="logo" />
            </div>
            <button type="button" onClick={toggleCreateIssuePopupIsActive}>
              <div className={styles.left_icon_container}>
                <img src={addIcon} alt="add icon" />
              </div>
              <p>CREATE ISSUE</p>
            </button>
          </div>
          <div className={styles.bottom}>
            <div className={styles.left_icon_container}>
              <div
                className={styles.user_icon}
                style={{ backgroundColor: userInfo.iconColorHex }}
              >
                {`${userInfo.firstName.slice(0, 1)}${userInfo.lastName.slice(
                  0,
                  1
                )}`}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                dispatch(logoutUser());
              }}
            >
              <div className={styles.left_icon_container}>
                <img src={logoutIcon} alt="logout icon" />
              </div>
              <p>LOG OUT</p>
            </button>
          </div>
        </nav>
      </div>
      <section className={styles.content}>
        <header>
          <p>Projects / Example Project</p>
          <h1>Board</h1>
        </header>
        <main>
          <section className={styles.filters}>
            <div className={styles.icon_container}>
              {!users
                ? null
                : Object.values(users).map((user) => (
                    <div
                      key={user.id}
                      className={styles.user_icon}
                      style={{ backgroundColor: user.iconColorHex }}
                    >
                      {`${user.firstName.slice(0, 1)}${user.lastName.slice(
                        0,
                        1
                      )}`}
                    </div>
                  ))}
            </div>
            <button
              type="button"
              className={onlyMyIssues ? styles.active : null}
              onClick={() => {
                setOnlyMyIssues(!onlyMyIssues);
              }}
            >
              Only My Issues
            </button>
          </section>
          <section className={styles.column_container}>
            {issueStatusValues.map((statusValue) => (
              <div key={statusValue} className={styles.column}>
                <h3>{`${statusValue.toUpperCase()} ${
                  Object.values(filteredIssues).filter(
                    (issue) => issue.status === statusValue
                  ).length
                }`}</h3>
                {!filteredIssues
                  ? null
                  : Object.values(filteredIssues)
                      .filter((issue) => issue.status === statusValue)
                      .map((issue) => (
                        <IssueCard
                          key={issue.id}
                          summary={issue.summary}
                          type={issue.type}
                          assignees={issue.assignedTo.map((user) => ({
                            id: user.id,
                            initials: `${users[user.id].firstName.slice(
                              0,
                              1
                            )}${users[user.id].lastName.slice(0, 1)}`,
                            iconColor: users[user.id].iconColorHex,
                          }))}
                          onClickHandler={() => {
                            setActiveIssueId(issue.id);
                            toggleUpdateIssuePopupIsActive();
                          }}
                        />
                      ))}
              </div>
            ))}
          </section>
        </main>
      </section>
      {createIssuePopupIsActive ? (
        <CreateIssuePopup unmountPopup={toggleCreateIssuePopupIsActive} />
      ) : null}
      {updateIssuePopupIsActive ? (
        <UpdateIssuePopup
          unmountPopup={toggleUpdateIssuePopupIsActive}
          issueId={activeIssueId}
        />
      ) : null}
    </div>
  );
}

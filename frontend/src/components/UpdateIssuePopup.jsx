import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Story16Icon from '@atlaskit/icon-object/glyph/story/16';
import Bug16Icon from '@atlaskit/icon-object/glyph/bug/16';
import Task16Icon from '@atlaskit/icon-object/glyph/task/16';

import { selectIssues } from '../redux/slices/issuesSlice';
import { selectUsers } from '../redux/slices/usersSlice';
import { selectUserJwt } from '../redux/slices/userSlice';
import fetchUsers from '../redux/thunks/fetchUsers';
import fetchIssues from '../redux/thunks/fetchIssues';
import clearIcon from '../assets/images/clear_black_24dp.svg';
import deleteIcon from '../assets/images/delete_black_24dp.svg';
import styles from '../styles/updateIssuePopup.module.css';

export default function UpdateIssuePopup(props) {
  const { unmountPopup, issueId } = props;
  const issues = useSelector(selectIssues);
  const users = useSelector(selectUsers);
  const userJwt = useSelector(selectUserJwt);
  const [summary, setSummary] = useState(issues[issueId].summary);
  const [description, setDescription] = useState(issues[issueId].description);
  const [status, setStatus] = useState(issues[issueId].status);
  const [assignedTo, setAssignedTo] = useState(
    issues[issueId].assignedTo.map((user) => user.id)
  );
  const [type, setType] = useState(issues[issueId].type);
  const dispatch = useDispatch();

  const handleUpdateIssueClick = async (e) => {
    e.preventDefault();

    const uri = `${process.env.REACT_APP_BACKEND_ORIGIN}/issues/${issueId}`;
    const data = {
      summary,
      description,
      type,
      status,
      assignedTo,
    };
    const config = {
      headers: { Authorization: `Bearer ${userJwt}` },
    };

    await axios.put(uri, data, config);
    dispatch(fetchUsers(userJwt));
    dispatch(fetchIssues(userJwt));
    unmountPopup();
  };

  const renderType = () => {
    switch (type) {
      case 'Story':
        return (
          <>
            <Story16Icon label="story icon" />
            STORY
          </>
        );
      case 'Task':
        return (
          <>
            <Task16Icon label="task icon" />
            TASK
          </>
        );
      case 'Bug':
        return (
          <>
            <Bug16Icon label="bug icon" />
            BUG
          </>
        );
      default:
        return <div />;
    }
  };

  return (
    <>
      <button
        className={styles.overlay}
        type="button"
        aria-label="overlay"
        onClick={unmountPopup}
      />
      <div className={styles.popup}>
        <div className={styles.header}>
          <div className={styles.left}>{renderType()}</div>
          <div className={styles.right}>
            <button type="button">
              <img src={deleteIcon} alt="delete" />
            </button>
            <button type="button" onClick={unmountPopup}>
              <img src={clearIcon} alt="delete" />
            </button>
          </div>
        </div>
        <form action="" onSubmit={handleUpdateIssueClick}>
          <div className={styles.body}>
            <div className={styles.left}>
              <input
                className={styles.summary}
                type="text"
                value={summary}
                onChange={(e) => {
                  setSummary(e.target.value);
                }}
                placeholder="Enter Summary"
                required
              />
              <textarea
                className={styles.description}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Enter Description"
                rows="10"
                required
              />
            </div>
            <div className={styles.right}>
              <label className={styles.label} htmlFor="type">
                TYPE
                <select
                  name="type"
                  className={styles.field}
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  required
                >
                  <option value="Story">Story</option>
                  <option value="Bug">Bug</option>
                  <option value="Task">Task</option>
                </select>
              </label>
              <label className={styles.label} htmlFor="status">
                STATUS
                <select
                  name="status"
                  className={styles.field}
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  required
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="In Review">In Review</option>
                  <option value="Done">Done</option>
                </select>
              </label>
              <label className={styles.label} htmlFor="assigned to">
                ASSIGNED TO
                <select
                  name="assigned to"
                  className={styles.field}
                  multiple
                  value={assignedTo}
                  onChange={() => {}}
                >
                  {Object.values(users).map((user) => (
                    <option
                      key={user.id}
                      value={user.id}
                      onClick={(e) => {
                        if (assignedTo.includes(Number(e.target.value))) {
                          setAssignedTo(
                            assignedTo.filter(
                              (assignedToUser) =>
                                assignedToUser !== Number(e.target.value)
                            )
                          );
                        } else {
                          setAssignedTo([
                            ...assignedTo,
                            Number(e.target.value),
                          ]);
                        }
                      }}
                    >{`${user.firstName} ${user.lastName}`}</option>
                  ))}
                </select>
              </label>
              <div className={styles.label}>
                REPORTER
                <p className={styles.field}>{`${
                  users[issues[issueId].reportedById].firstName
                } ${users[issues[issueId].reportedById].lastName}`}</p>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <button type="submit">Update Issue</button>
          </div>
        </form>
      </div>
    </>
  );
}

UpdateIssuePopup.defaultProps = {
  unmountPopup: () => {},
  issueId: null,
};

UpdateIssuePopup.propTypes = {
  unmountPopup: PropTypes.func,
  issueId: PropTypes.number,
};

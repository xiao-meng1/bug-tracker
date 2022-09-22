import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Story16Icon from '@atlaskit/icon-object/glyph/story/16';
import Bug16Icon from '@atlaskit/icon-object/glyph/bug/16';
import Task16Icon from '@atlaskit/icon-object/glyph/task/16';
import clearIcon from '../assets/images/clear_black_24dp.svg';

import { selectUserInfo, selectUserJwt } from '../redux/slices/userSlice';
import { selectUsers } from '../redux/slices/usersSlice';
import fetchIssues from '../redux/thunks/fetchIssues';
import fetchUsers from '../redux/thunks/fetchUsers';
import styles from '../styles/createIssuePopup.module.css';

export default function CreateIssuePopup(props) {
  const { unmountPopup } = props;
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Story');
  const [status, setStatus] = useState('To Do');
  const [assignedTo, setAssignedTo] = useState([]);
  const userJwt = useSelector(selectUserJwt);
  const userInfo = useSelector(selectUserInfo);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  const handleCreateIssueClick = async (e) => {
    e.preventDefault();

    const uri = `${process.env.REACT_APP_BACKEND_ORIGIN}/issues`;
    const data = {
      summary,
      description,
      type,
      status,
      assignedTo,
      reportedBy: userInfo.id,
    };
    const config = {
      headers: { Authorization: `Bearer ${userJwt}` },
    };

    await axios.post(uri, data, config);
    dispatch(fetchUsers(userJwt));
    dispatch(fetchIssues(userJwt));
    unmountPopup();
  };

  const renderType = () => {
    switch (type) {
      case 'Story':
        return (
          <div className={styles.left}>
            <Story16Icon label="story icon" />
            STORY
          </div>
        );
      case 'Task':
        return (
          <div className={styles.left}>
            <Task16Icon label="task icon" />
            TASK
          </div>
        );
      case 'Bug':
        return (
          <div className={styles.left}>
            <Bug16Icon label="bug icon" />
            BUG
          </div>
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
          {renderType()}
          <div className={styles.right}>
            <button type="button" onClick={unmountPopup}>
              <img src={clearIcon} alt="close" />
            </button>
          </div>
        </div>
        <form action="" onSubmit={handleCreateIssueClick}>
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
                        if (assignedTo.includes(e.target.value)) {
                          setAssignedTo(
                            assignedTo.filter(
                              (assignedToUser) =>
                                assignedToUser !== e.target.value
                            )
                          );
                        } else {
                          setAssignedTo([...assignedTo, e.target.value]);
                        }
                      }}
                    >{`${user.firstName} ${user.lastName}`}</option>
                  ))}
                </select>
              </label>
              <div className={styles.label}>
                REPORTER
                <p
                  className={styles.field}
                >{`${userInfo.firstName} ${userInfo.lastName}`}</p>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <button type="submit">Create Issue</button>
          </div>
        </form>
      </div>
    </>
  );
}

CreateIssuePopup.defaultProps = {
  unmountPopup: () => {},
};

CreateIssuePopup.propTypes = {
  unmountPopup: PropTypes.func,
};

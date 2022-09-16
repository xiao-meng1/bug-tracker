import React, { useState } from 'react';

import Story16Icon from '@atlaskit/icon-object/glyph/story/16';
import Bug16Icon from '@atlaskit/icon-object/glyph/bug/16';
import Task16Icon from '@atlaskit/icon-object/glyph/task/16';
import clearIcon from '../assets/images/clear_black_24dp.svg';
import deleteIcon from '../assets/images/delete_black_24dp.svg';
import styles from '../styles/updateIssuePopup.module.css';

export default function UpdateIssuePopup() {
  const [summary, setSummary] = useState('Sample Summary');
  const [description, setDescription] = useState('Lorum ipsum description');
  const [status, setStatus] = useState('Done');
  const [assignees, setAssignees] = useState([]);
  const [type, setType] = useState('task');

  const renderType = () => {
    switch (type) {
      case 'story':
        return (
          <>
            <Story16Icon label="story icon" />
            STORY
          </>
        );
      case 'task':
        return (
          <>
            <Task16Icon label="task icon" />
            TASK
          </>
        );
      case 'bug':
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
      <button className={styles.overlay} type="button" aria-label="overlay" />
      <div className={styles.popup}>
        <div className={styles.header}>
          <div className={styles.left}>{renderType()}</div>
          <div className={styles.right}>
            <button type="button">
              <img src={deleteIcon} alt="delete" />
            </button>
            <button type="button">
              <img src={clearIcon} alt="delete" />
            </button>
          </div>
        </div>
        <form>
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
                  <option value="story">Story</option>
                  <option value="bug">Bug</option>
                  <option value="task">Task</option>
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
              <label className={styles.label} htmlFor="assignees">
                ASSIGNEES
                <select
                  name="assignees"
                  className={styles.field}
                  multiple
                  value={assignees}
                  onClick={(e) => {
                    if (assignees.includes(e.target.value)) {
                      setAssignees(
                        assignees.filter((user) => user !== e.target.value)
                      );
                    } else {
                      setAssignees([...assignees, e.target.value]);
                    }
                  }}
                >
                  <option value="FName LName">FName LName</option>
                  <option value="FName1 LName1">FName1 LName1</option>
                  <option value="FName2 LName2">FName2 LName2</option>
                </select>
              </label>
              <div className={styles.label}>
                REPORTER
                <p className={styles.field}>FName LName</p>
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

import React, { useState } from 'react';

import Story16Icon from '@atlaskit/icon-object/glyph/story/16';
import Bug16Icon from '@atlaskit/icon-object/glyph/bug/16';
import Task16Icon from '@atlaskit/icon-object/glyph/task/16';
import clearIcon from '../assets/images/clear_black_24dp.svg';
import styles from '../styles/createIssuePopup.module.css';

export default function CreateIssuePopup() {
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Done');
  const [assignees, setAssignees] = useState([]);
  const [type, setType] = useState('story');

  const renderType = () => {
    switch (type) {
      case 'story':
        return (
          <div className={styles.left}>
            <Story16Icon label="story icon" />
            STORY
          </div>
        );
      case 'task':
        return (
          <div className={styles.left}>
            <Task16Icon label="task icon" />
            TASK
          </div>
        );
      case 'bug':
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
      <button className={styles.overlay} type="button" aria-label="overlay" />
      <div className={styles.popup}>
        <div className={styles.header}>
          {renderType()}
          <div className={styles.right}>
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
            <button type="submit">Create Issue</button>
          </div>
        </form>
      </div>
    </>
  );
}

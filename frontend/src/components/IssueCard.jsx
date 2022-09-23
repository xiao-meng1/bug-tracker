import React from 'react';
import PropTypes from 'prop-types';
import Story16Icon from '@atlaskit/icon-object/glyph/story/16';
import Bug16Icon from '@atlaskit/icon-object/glyph/bug/16';
import Task16Icon from '@atlaskit/icon-object/glyph/task/16';

import styles from '../styles/issueCard.module.css';

function IssueCard(props) {
  const { summary, type, assignees, onClickHandler } = props;

  const renderTypeIcon = () => {
    switch (type) {
      case 'Story':
        return <Story16Icon label="story icon" />;
      case 'Task':
        return <Task16Icon label="task icon" />;
      case 'Bug':
        return <Bug16Icon label="bug icon" />;
      default:
        return <div />;
    }
  };

  return (
    <button type="button" className={styles.card} onClick={onClickHandler}>
      <p className={styles.summary}>{summary}</p>
      <div className={styles.bottom}>
        {renderTypeIcon()}
        <div className={styles.user_icon_container}>
          {assignees.map((user) => (
            <div
              key={user.id}
              className={styles.user_icon}
              style={{ backgroundColor: user.iconColor }}
            >
              {user.initials}
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}

IssueCard.defaultProps = {
  summary: '',
  type: '',
  assignees: [],
  onClickHandler: () => {},
};

IssueCard.propTypes = {
  summary: PropTypes.string,
  type: PropTypes.string,
  assignees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      initials: PropTypes.string,
      iconColor: PropTypes.string,
    })
  ),
  onClickHandler: PropTypes.func,
};

export default IssueCard;

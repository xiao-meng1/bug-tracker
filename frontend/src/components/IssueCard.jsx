import React from 'react';
import PropTypes from 'prop-types';

import Story16Icon from '@atlaskit/icon-object/glyph/story/16';
import Bug16Icon from '@atlaskit/icon-object/glyph/bug/16';
import Task16Icon from '@atlaskit/icon-object/glyph/task/16';
import styles from '../styles/issueCard.module.css';

function IssueCard(props) {
  const { summary, type, assignees } = props;

  const renderTypeIcon = () => {
    switch (type) {
      case 'story':
        return <Story16Icon label="story icon" />;
      case 'task':
        return <Task16Icon label="task icon" />;
      case 'bug':
        return <Bug16Icon label="bug icon" />;
      default:
        return <div />;
    }
  };

  return (
    <div className={styles.card}>
      <p className={styles.summary}>{summary}</p>
      <div className={styles.bottom}>
        {renderTypeIcon()}
        <div className={styles.user_icon_container}>
          {assignees.map((user) => (
            <div
              className={styles.user_icon}
              style={{ backgroundColor: user.iconColor }}
            >
              {user.initials}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

IssueCard.defaultProps = {
  summary: '',
  type: '',
  assignees: [],
};

IssueCard.propTypes = {
  summary: PropTypes.string,
  type: PropTypes.string,
  assignees: PropTypes.arrayOf(
    PropTypes.shape({
      initials: PropTypes.string,
      iconColor: PropTypes.string,
    })
  ),
};

export default IssueCard;

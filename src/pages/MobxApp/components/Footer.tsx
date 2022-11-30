import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useTodoContext } from '../TodoContext';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '@/constants';

const Footer = () => {
  const { activeCount, completedCount, status, changeStatus, clearCompleted } =
    useTodoContext();
  const itemWord = activeCount === 1 ? 'item' : 'items';

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {[ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS].map((filter) => (
          <li key={filter}>
            <a
              className={classnames({ selected: status === filter })}
              style={{ cursor: 'pointer' }}
              onClick={() => changeStatus(filter)}
            >
              {filter}
            </a>
          </li>
        ))}
      </ul>
      {!!completedCount && (
        <button className="clear-completed" onClick={() => clearCompleted()}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default observer(Footer);

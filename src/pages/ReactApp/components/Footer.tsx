import React, { FC } from 'react';
import classnames from 'classnames';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../../../constants';

type FooterProps = {
  status: string;
  changeStatus: (status: string) => void;
  clearCompleted: () => void;
  addTodosAsync: () => void;
  completedCount: number;
  activeCount: number;
};

const Footer: FC<FooterProps> = ({
  status,
  changeStatus,
  clearCompleted,
  addTodosAsync,
  completedCount,
  activeCount,
}) => {
  const itemWord = activeCount === 1 ? 'item' : 'items';

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
      <button
        style={{
          position: 'absolute',
          left: '110px',
          border: '1px solid #f00',
          borderRadius: '4px',
          zIndex: 2,
        }}
        onClick={() => {
          addTodosAsync();
        }}
      >
        refresh
      </button>
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

export default Footer;

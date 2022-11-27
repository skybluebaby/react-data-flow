import React from 'react';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectTodosActiveCount,
  selectTodosCompletedCount,
  clearCompleted,
  selectStatus,
  changeStatus,
  InitialState,
  addTodosAsync,
} from '../features/todoList/todoListSlice';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../../../constants';

const Footer = () => {
  const dispatch = useAppDispatch();
  const activeCount = useAppSelector(selectTodosActiveCount);
  const completedCount = useAppSelector(selectTodosCompletedCount);
  const status = useAppSelector(selectStatus);
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
          dispatch(addTodosAsync());
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
              onClick={() =>
                dispatch(changeStatus(filter as InitialState['status']))
              }
            >
              {filter}
            </a>
          </li>
        ))}
      </ul>
      {!!completedCount && (
        <button
          className="clear-completed"
          onClick={() => dispatch(clearCompleted())}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;

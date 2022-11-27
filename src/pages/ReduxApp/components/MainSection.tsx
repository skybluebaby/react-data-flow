import React from 'react';
import Footer from './Footer';
import TodoList from './TodoList';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectTodosCount,
  selectTodosCompletedCount,
  toggleAllTodos,
  selectRequestStatus,
} from '../features/todoList/todoListSlice';
import { TEMP_STYLE } from '../../../constants';

const MainSection = () => {
  const dispatch = useAppDispatch();
  const todosCount = useAppSelector(selectTodosCount);
  const completedCount = useAppSelector(selectTodosCompletedCount);
  const requestStatus = useAppSelector(selectRequestStatus);

  const renderTodoList = () => {
    if (requestStatus === 'loading') {
      return <div style={TEMP_STYLE}>loading...</div>;
    } else if (requestStatus === 'failed') {
      return <div style={{ ...TEMP_STYLE, color: 'red' }}>error</div>;
    } else {
      return <TodoList />;
    }
  };

  return (
    <section className="main">
      {!!todosCount && (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todosCount}
            readOnly
          />
          <label onClick={() => dispatch(toggleAllTodos())} />
        </span>
      )}
      {renderTodoList()}
      {!!todosCount && <Footer />}
    </section>
  );
};

export default MainSection;

import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Footer from './Footer';
import TodoList from './TodoList';
import { useTodoContext } from '../TodoContext';
import { TEMP_STYLE } from '../../../constants';

const MainSection = () => {
  const {
    todoList,
    completedCount,
    requestStatus,
    toggleAllTodos,
    fetchTodos,
  } = useTodoContext();
  const todosCount = todoList.length;

  const renderTodoList = () => {
    if (requestStatus === 'loading') {
      return <div style={TEMP_STYLE}>loading...</div>;
    } else if (requestStatus === 'failed') {
      return <div style={{ ...TEMP_STYLE, color: 'red' }}>error</div>;
    } else {
      return <TodoList />;
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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
          <label onClick={() => toggleAllTodos()} />
        </span>
      )}
      {renderTodoList()}
      {!!todosCount && <Footer />}
    </section>
  );
};

export default observer(MainSection);

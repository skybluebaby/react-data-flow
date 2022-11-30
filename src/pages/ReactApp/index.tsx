import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import { fetchTodoList } from '@/api/todoListAPI';
import {
  ALL_TODOS,
  ACTIVE_TODOS,
  COMPLETED_TODOS,
  TEMP_STYLE,
} from '@/constants';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function ReactApp() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(ALL_TODOS);
  const [requestStatus, setRequestStatus] = useState('idle');

  useEffect(() => {
    if (status === ALL_TODOS) {
      setFilteredTodos(todoList);
    } else if (status === ACTIVE_TODOS) {
      setFilteredTodos(todoList.filter((todo) => !todo.completed));
    } else if (status === COMPLETED_TODOS) {
      setFilteredTodos(todoList.filter((todo) => todo.completed));
    }
  }, [todoList, status]);

  const changeStatus = (status: string) => {
    setStatus(status);
  };

  const addTodo = (text: string) => {
    setTodoList((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ]);
  };

  // 批量修改已完成
  const toggleAllTodos = () => {
    const todoItem = todoList.some((todo) => !todo.completed);
    setTodoList((prev) =>
      prev.map((item) => ({ ...item, completed: !!todoItem }))
    );
  };

  const deleteTodo = (id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, text: string) => {
    setTodoList((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const completeTodo = (id: number) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodoList((prev) => prev.filter((todo) => !todo.completed));
  };

  const addTodosAsync = async () => {
    setRequestStatus('loading');
    try {
      const res = await fetchTodoList();
      setTodoList(res.data);
      setRequestStatus('idle');
    } catch (error) {
      setRequestStatus('failed');
    }
  };

  const renderTodoList = () => {
    if (requestStatus === 'loading') {
      return <div style={TEMP_STYLE}>loading...</div>;
    } else if (requestStatus === 'failed') {
      return <div style={{ ...TEMP_STYLE, color: 'red' }}>error</div>;
    } else {
      return (
        <TodoList
          filteredTodos={filteredTodos}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
        />
      );
    }
  };

  const completedCount = todoList.filter((todo) => todo.completed).length;
  const activeCount = todoList.filter((todo) => !todo.completed).length;
  const todosCount = todoList.length;

  return (
    <>
      <Header addTodo={addTodo} />
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
        {!!todosCount && (
          <Footer
            completedCount={completedCount}
            activeCount={activeCount}
            status={status}
            changeStatus={changeStatus}
            clearCompleted={clearCompleted}
            addTodosAsync={addTodosAsync}
          />
        )}
      </section>
    </>
  );
}

export default ReactApp;

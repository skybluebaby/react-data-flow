import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Section from './components/Section';
import Footer from './components/Footer';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../../constants';

export type Todo = {
  id: number;
  name: string;
  completed: boolean;
};

function ReactApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [renderList, setRenderList] = useState<Todo[]>([]);
  const [currentChoice, setCurrentChoice] = useState(ALL_TODOS);
  const [activeCount, setActiveCount] = useState(0);
  const [hasCompletedTodo, setHasCompletedTodo] = useState(false);

  useEffect(() => {
    if (currentChoice === ALL_TODOS) {
      setRenderList(todos);
    } else if (currentChoice === ACTIVE_TODOS) {
      setRenderList(todos.filter((item) => !item.completed));
    } else if (currentChoice === COMPLETED_TODOS) {
      setRenderList(todos.filter((item) => item.completed));
    }
  }, [todos, currentChoice]);

  useEffect(() => {
    const activeList = todos.filter((item) => !item.completed);
    const hasCompleted = todos.find((item) => item.completed);
    if (hasCompleted) {
      setHasCompletedTodo(true);
    } else {
      setHasCompletedTodo(false);
    }
    setActiveCount(activeList.length);
  }, [todos]);

  const addTodo = (name: string) => {
    setTodos((prev) => [...prev, { id: Date.now(), name, completed: false }]);
  };

  // 批量修改已完成
  const batchChangeTodoCompleted = () => {
    const hasNoCompleted = todos.find((item) => !item.completed);
    setTodos((prev) =>
      prev.map((item) => ({ ...item, completed: !!hasNoCompleted }))
    );
  };

  const deleteTodo = (id: number) => {
    const deleteIndex = todos.findIndex((item) => item.id === id);
    setTodos((prev) => prev.slice(deleteIndex, deleteIndex + 1));
  };

  const changeName = (id: number, name: string) => {
    setTodos((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name,
          };
        }
        return item;
      })
    );
  };

  const changeCompleted = (id: number) => {
    setTodos((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  const clearCompletedTodo = () => {
    const noCompletedTodo = todos.filter((item) => !item.completed);
    setTodos(noCompletedTodo);
  };

  return (
    <>
      <Header
        todos={todos}
        addTodo={addTodo}
        batchChangeTodoCompleted={batchChangeTodoCompleted}
      ></Header>
      <Section
        renderList={renderList}
        deleteTodo={deleteTodo}
        changeName={changeName}
        changeCompleted={changeCompleted}
      ></Section>
      <Footer
        activeCount={activeCount}
        currentChoice={currentChoice}
        changeCurrentChoice={setCurrentChoice}
        hasCompletedTodo={hasCompletedTodo}
        clearCompletedTodo={clearCompletedTodo}
      ></Footer>
    </>
  );
}

export default ReactApp;

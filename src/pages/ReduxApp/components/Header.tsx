import React from 'react';
import TodoTextInput from '../../../components/TodoTextInput';
import { useAppDispatch } from '../store/hooks';
import { addTodo } from '../features/todoList/todoListSlice';

const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={(text) => {
          if (text.length !== 0) {
            dispatch(addTodo(text));
          }
        }}
        placeholder="What needs to be done?"
      />
    </header>
  );
};

export default Header;

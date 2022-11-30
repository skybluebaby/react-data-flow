import React from 'react';
import { observer } from 'mobx-react-lite';
import TodoTextInput from 'components/TodoTextInput';
import { useTodoContext } from '../TodoContext';

const Header = () => {
  const { addTodo } = useTodoContext();

  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={(text) => {
          if (text.length !== 0) {
            addTodo(text);
          }
        }}
        placeholder="What needs to be done?"
      />
    </header>
  );
};

export default observer(Header);

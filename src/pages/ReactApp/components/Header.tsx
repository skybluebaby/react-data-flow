import React, { FC } from 'react';
import TodoTextInput from 'components/TodoTextInput';

type HeaderProps = {
  addTodo: (text: string) => void;
};

const Header: FC<HeaderProps> = ({ addTodo }) => {
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

export default Header;

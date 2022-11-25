import React, { useState } from 'react';
import { Todo } from '../../index';
import { ENTER_KEY } from '../../../../constants';
import './index.css';

type HeaderProps = {
  todos: Todo[];
  batchChangeTodoCompleted: () => void;
  addTodo: (name: string) => void;
};

function Header({ todos, batchChangeTodoCompleted, addTodo }: HeaderProps) {
  const [value, setValue] = useState('');
  const isAllCompleted = todos.every((item) => item.completed);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === ENTER_KEY && value.trim() !== '') {
      addTodo(value.trim());
      setValue('');
    }
  };

  return (
    <header className="header">
      <div className="arrow-wrapper">
        <div
          className={`arrow ${isAllCompleted ? 'arrow-completed' : ''}`}
          onClick={() => batchChangeTodoCompleted()}
        />
      </div>
      <div className="input-wrapper">
        <input
          placeholder="What needs to be done?"
          className="header-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
        />
      </div>
    </header>
  );
}

export default Header;

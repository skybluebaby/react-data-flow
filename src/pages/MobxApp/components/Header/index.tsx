import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useTodoContext } from '../../TodoStore';
import { ENTER_KEY } from '../../../../constants';
import './index.css';

function Header() {
  const [value, setValue] = useState('');
  const { addTodo, isAllCompleted, batchChangeTodoCompleted } =
    useTodoContext();

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

export default observer(Header);

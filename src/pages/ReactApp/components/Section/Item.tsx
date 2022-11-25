import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { ENTER_KEY, ESCAPE_KEY } from '../../../../constants';
import { Todo } from '../../index';
import './index.css';

type ItemProps = {
  todo: Todo;
  deleteTodo: (id: number) => void;
  changeName: (id: number, name: string) => void;
  changeCompleted: (id: number) => void;
};

function Item({ todo, deleteTodo, changeName, changeCompleted }: ItemProps) {
  const { name, completed, id } = todo || {};
  const [showInput, setShowInput] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [inputValue, setInputValue] = useState(name);

  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onBlur = () => {
    if (inputValue === '') {
      setInputValue(name);
    } else {
      changeName(id, inputValue);
    }
    setShowInput(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === ENTER_KEY) {
      onBlur();
    } else if (e.keyCode === ESCAPE_KEY) {
      setShowInput(false);
      setInputValue(name);
    }
  };

  useEffect(() => {
    if (showInput) {
      inputRef.current?.focus();
    }
  }, [showInput]);

  return (
    <div className="todo">
      <div className="check-box">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => {
            changeCompleted(id);
          }}
        />
      </div>
      {showInput ? (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={onChange}
          className="item-wrapper"
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
      ) : (
        <div
          className="item-wrapper"
          onMouseEnter={() => setShowDeleteIcon(true)}
          onMouseLeave={() => setShowDeleteIcon(false)}
        >
          <div
            className={`todo-item ${completed ? 'todo-item-completed' : ''}`}
            onDoubleClick={() => setShowInput(true)}
          >
            {todo.name}
          </div>
          <div className="todo-delete-wrapper">
            {showDeleteIcon && (
              <div className="todo-delete" onClick={() => deleteTodo(id)}>
                x
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default observer(Item);

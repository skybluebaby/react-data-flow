import React, { FC, useState } from 'react';
import classnames from 'classnames';
import TodoTextInput from '@/components/TodoTextInput';
import {
  Todo,
  editTodo,
  deleteTodo,
  completeTodo,
} from '../features/todoList/todoListSlice';
import { useAppDispatch } from '../store/hooks';

type TodoItemProps = {
  todo: Todo;
};

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleSave = (id: number, text: string) => {
    if (text.length === 0) {
      dispatch(deleteTodo(id));
    } else {
      dispatch(editTodo({ id, text }));
    }
    setEditing(false);
  };

  return (
    <li
      className={classnames({
        completed: todo.completed,
        editing: editing,
      })}
    >
      {editing ? (
        <TodoTextInput
          text={todo.text}
          editing={editing}
          onSave={(text) => handleSave(todo.id, text)}
        />
      ) : (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(completeTodo(todo.id))}
          />
          <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
          <button
            className="destroy"
            onClick={() => dispatch(deleteTodo(todo.id))}
          />
        </div>
      )}
    </li>
  );
};

export default TodoItem;

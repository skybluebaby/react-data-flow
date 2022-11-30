import React, { FC, useState } from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import TodoTextInput from 'components/TodoTextInput';
import { Todo } from '../TodoStore';
import { useTodoContext } from '../TodoContext';

type TodoItemProps = {
  todo: Todo;
};

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const [editing, setEditing] = useState(false);
  const { deleteTodo } = useTodoContext();

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleSave = (id: number, text: string) => {
    if (text.length === 0) {
      deleteTodo(id);
    } else {
      todo.editText(text);
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
            onChange={() => todo.completeTodo()}
          />
          <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
          <button className="destroy" onClick={() => deleteTodo(todo.id)} />
        </div>
      )}
    </li>
  );
};

export default observer(TodoItem);

import React from 'react';
import { observer } from 'mobx-react-lite';
import TodoItem from './TodoItem';
import { useTodoContext } from '../TodoContext';

const TodoList = () => {
  const { filteredTodos } = useTodoContext();
  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default observer(TodoList);

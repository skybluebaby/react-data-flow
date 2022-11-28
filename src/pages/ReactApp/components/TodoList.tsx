import React, { FC } from 'react';
import TodoItem, { type TodoItemProps } from './TodoItem';
import { Todo } from '../';

interface TodoList extends Omit<TodoItemProps, 'todo'> {
  filteredTodos: Todo[];
}

const TodoList: FC<TodoList> = ({ filteredTodos, ...rest }) => {
  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} {...rest} />
      ))}
    </ul>
  );
};

export default TodoList;

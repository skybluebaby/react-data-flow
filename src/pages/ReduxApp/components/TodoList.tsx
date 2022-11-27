import React from 'react';
import TodoItem from './TodoItem';
import { useAppSelector } from '../store/hooks';
import { selectFilteredList } from '../features/todoList/todoListSlice';

const TodoList = () => {
  const filteredTodos = useAppSelector(selectFilteredList);
  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;

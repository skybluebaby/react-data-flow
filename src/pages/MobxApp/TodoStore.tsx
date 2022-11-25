import React, { useContext } from 'react';
import { makeAutoObservable } from 'mobx';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../../constants';

export class Todo {
  id: number;
  name: string;
  completed: boolean;
  constructor(name: string, completed: boolean) {
    makeAutoObservable(this);
    this.id = Date.now();
    this.name = name;
    this.completed = completed;
  }

  changeName = (name: string) => {
    this.name = name;
  };

  changeCompleted = () => {
    this.completed = !this.completed;
  };
}

export class TodoStore {
  todos: Todo[];
  currentChoice: string;
  constructor() {
    makeAutoObservable(this);
    this.todos = [];
    this.currentChoice = ALL_TODOS;
  }

  // 渲染的list
  get renderList() {
    if (this.currentChoice === ALL_TODOS) {
      return this.todos;
    } else if (this.currentChoice === ACTIVE_TODOS) {
      return this.activeList;
    } else if (this.currentChoice === COMPLETED_TODOS) {
      return this.completedList;
    } else {
      return [];
    }
  }

  get completedList() {
    return this.todos.filter((item) => item.completed);
  }

  get activeList() {
    return this.todos.filter((item) => !item.completed);
  }

  get activeCount() {
    return this.activeList.length;
  }

  get isAllCompleted() {
    return this.todos.every((item) => item.completed);
  }

  get hasCompletedTodo() {
    return this.todos.find((item) => item.completed);
  }

  changeCurrentChoice = (choice: string) => {
    this.currentChoice = choice;
  };

  addTodo = (name: string) => {
    this.todos.push(new Todo(name, false));
  };

  deleteTodo = (id: number) => {
    const deleteIndex = this.todos.findIndex((item) => item.id === id);
    this.todos.splice(deleteIndex, 1);
  };

  // 清空所有已完成的todo
  clearCompletedTodo = () => {
    this.todos = this.todos.filter((item) => !item.completed);
  };

  // 批量改变是否已完成
  batchChangeTodoCompleted = () => {
    const hasNoCompleted = this.todos.find((item) => !item.completed);
    this.todos.forEach((item) => (item.completed = !!hasNoCompleted));
  };
}

const TodoStoreContext = React.createContext<TodoStore>(
  null as unknown as TodoStore
);

export const useTodoContext = () => useContext(TodoStoreContext);

type Props = {
  children: React.ReactNode;
};

export default function TodoStoreProvide({ children }: Props) {
  const store = React.useRef(new TodoStore());

  return (
    <TodoStoreContext.Provider value={store.current}>
      {children}
    </TodoStoreContext.Provider>
  );
}

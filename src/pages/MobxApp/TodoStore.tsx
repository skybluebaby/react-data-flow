import { makeAutoObservable, runInAction } from 'mobx';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../../constants';
import { fetchTodoList } from './api/todoListAPI';

export type TodoType = Pick<Todo, 'id' | 'text' | 'completed'>;

export class Todo {
  id: number;
  text: string;
  completed: boolean;
  constructor({ id, text, completed }: TodoType) {
    makeAutoObservable(this);
    this.id = id;
    this.text = text;
    this.completed = completed;
  }

  editText = (text: string) => {
    this.text = text;
  };

  completeTodo = () => {
    this.completed = !this.completed;
  };
}
class TodoListStore {
  todoList: Todo[];
  status: string;
  requestStatus: 'idle' | 'loading' | 'failed';
  todoUnipueId: number;
  constructor() {
    makeAutoObservable(this);
    this.todoList = [];
    this.status = ALL_TODOS;
    this.requestStatus = 'idle';
    this.todoUnipueId = -1;
  }

  get activeList() {
    return this.todoList.filter((item) => !item.completed);
  }

  get activeCount() {
    return this.activeList.length;
  }

  get completedList() {
    return this.todoList.filter((item) => item.completed);
  }

  get completedCount() {
    return this.completedList.length;
  }

  // 渲染的list
  get filteredTodos() {
    switch (this.status) {
      case ALL_TODOS:
        return this.todoList;
      case ACTIVE_TODOS:
        return this.activeList;
      case COMPLETED_TODOS:
        return this.completedList;
      default:
        return [];
    }
  }

  changeStatus = (status: string) => {
    this.status = status;
  };

  addTodo = (text: string) => {
    this.todoList.push(
      new Todo({ id: ++this.todoUnipueId, text, completed: false })
    );
  };

  deleteTodo = (id: number) => {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
  };

  // 清空所有已完成的todo
  clearCompleted = () => {
    this.todoList = this.todoList.filter((item) => !item.completed);
  };

  toggleAllTodos = () => {
    const hasNoCompleted = this.todoList.some((todo) => !todo.completed);
    this.todoList.forEach((item) => (item.completed = hasNoCompleted));
  };

  fetchTodos = async () => {
    this.requestStatus = 'loading';
    try {
      const { data } = await fetchTodoList();
      runInAction(() => {
        this.requestStatus = 'idle';
        data.forEach((todo) => {
          this.todoList.push(
            new Todo({
              id: ++this.todoUnipueId,
              text: todo.text,
              completed: todo.completed,
            })
          );
        });
      });
    } catch (error) {
      runInAction(() => {
        this.requestStatus = 'failed';
      });
    }
  };
}

export default TodoListStore;

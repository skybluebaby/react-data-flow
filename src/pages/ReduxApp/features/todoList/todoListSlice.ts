import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchTodoList } from './todoListAPI';
import {
  ALL_TODOS,
  ACTIVE_TODOS,
  COMPLETED_TODOS,
} from '../../../../constants';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type InitialState = {
  todoList: Todo[];
  status: 'all' | 'active' | 'completed';
  requestStatus: 'idle' | 'loading' | 'failed';
};

const initialState: InitialState = {
  todoList: [],
  status: ALL_TODOS,
  requestStatus: 'idle',
};

// 异步请求
export const addTodosAsync = createAsyncThunk(
  'todoList/fetchTodoList',
  async () => {
    const response = await fetchTodoList();
    return response.data;
  }
);

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  // “reducers”字段允许我们定义reducers并生成相关action
  reducers: {
    changeStatus: (state, action: PayloadAction<InitialState['status']>) => {
      state.status = action.payload;
    },
    addTodo: (state, action: PayloadAction<string>) => {
      state.todoList.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    editTodo: (state, action: PayloadAction<Pick<Todo, 'id' | 'text'>>) => {
      const { id, text } = action.payload;
      const todo = state.todoList.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );
    },
    completeTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todoList.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    toggleAllTodos: (state) => {
      const todoItem = state.todoList.some((todo) => !todo.completed);
      state.todoList.forEach((todo) => {
        todo.completed = !!todoItem;
      });
    },
    clearCompleted: (state) => {
      state.todoList = state.todoList.filter((todo) => !todo.completed);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodosAsync.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(addTodosAsync.fulfilled, (state, action) => {
        state.requestStatus = 'idle';
        state.todoList = action.payload;
      })
      .addCase(addTodosAsync.rejected, (state) => {
        state.requestStatus = 'failed';
      });
  },
});

export const {
  changeStatus,
  addTodo,
  editTodo,
  deleteTodo,
  completeTodo,
  toggleAllTodos,
  clearCompleted,
} = todoListSlice.actions;

export const selectFilteredList = (state: RootState) => {
  const { todoList, status } = state.todoList;
  switch (status) {
    case ACTIVE_TODOS:
      return todoList.filter((todo) => !todo.completed);
    case COMPLETED_TODOS:
      return todoList.filter((todo) => todo.completed);
    default:
      return todoList;
  }
};

export const selectTodosCount = (state: RootState) => {
  const { todoList } = state.todoList;
  return todoList.length;
};

export const selectTodosCompletedCount = (state: RootState) => {
  const { todoList } = state.todoList;
  return todoList.reduce((count, todo) => {
    if (todo.completed) {
      count++;
    }
    return count;
  }, 0);
};

export const selectTodosActiveCount = (state: RootState) => {
  const { todoList } = state.todoList;
  return todoList.reduce((count, todo) => {
    if (!todo.completed) {
      count++;
    }
    return count;
  }, 0);
};

export const selectStatus = (state: RootState) => state.todoList.status;

export const selectRequestStatus = (state: RootState) =>
  state.todoList.requestStatus;

// 可用于传值条件判断是否更新数据
// export const func =
//   (data: any): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = getState();
//     if (currentValue === ?) {
//       dispatch(action);
//     }
//   };

export default todoListSlice.reducer;

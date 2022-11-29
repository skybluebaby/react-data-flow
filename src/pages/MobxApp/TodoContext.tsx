import React, { useContext } from 'react';
import TodoStore from './TodoStore';

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

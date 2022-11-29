// A mock function to mimic making an async request for data
import { Todo } from '../TodoStore';

type ResponseType = { data: Pick<Todo, 'text' | 'completed'>[] };

export function fetchTodoList() {
  return new Promise<ResponseType>((resolve) =>
    setTimeout(() => {
      resolve({
        data: [
          { text: '吃饭', completed: false },
          { text: '睡觉', completed: true },
          { text: '打豆豆', completed: false },
        ],
      });
    }, 1000)
  );
}

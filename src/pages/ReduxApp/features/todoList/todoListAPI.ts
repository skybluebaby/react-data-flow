// A mock function to mimic making an async request for data
import { Todo } from './todoListSlice';
export function fetchTodoList() {
  return new Promise<{ data: Todo[] }>((resolve, reject) =>
    setTimeout(() => {
      const random = Math.random();
      if (random < 0.5) {
        reject(new Error('请求出错'));
      } else {
        resolve({
          data: [
            { id: 1, text: '吃饭', completed: false },
            { id: 2, text: '睡觉', completed: true },
            { id: 3, text: '打豆豆', completed: false },
          ],
        });
      }
    }, 1000)
  );
}

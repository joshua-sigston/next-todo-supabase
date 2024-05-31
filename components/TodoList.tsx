import { Todo } from '@/types/custom';
import { TodoForm } from './TodoForm';
import { TodoItem } from './TodoItem';

export function TodoList({ todos }: { todos: Array<Todo> }) {
  return (
    <>
      <TodoForm />
      <div className="w-full flex flex-col gap-4">
        {todos?.map((todo) => {
          return <TodoItem todo={todo} key={todo.id} />;
        })}
      </div>
    </>
  );
}

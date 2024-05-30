import { TodoForm } from './TodoForm';
import { TodoItem } from './TodoItem';

export function TodoList({ todos }: { todos: Array<string> }) {
  return (
    <>
      <TodoForm />
      <div className="w-full flex flex-col gap-4">
        {todos?.map((todo) => {
          return <TodoItem todo={todo} key={todo} />;
        })}
      </div>
    </>
  );
}

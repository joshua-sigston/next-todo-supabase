'use client';
import { Todo } from '@/types/custom';
import { TodoForm } from './TodoForm';
import { TodoItem } from './TodoItem';
import { stat } from 'fs';
import { useOptimistic } from 'react';

export type Action = 'delete' | 'create' | 'update';

export function todoReducer(
  state: Array<Todo>,
  { action, todo }: { action: Action; todo: Todo },
) {
  switch (action) {
    case 'delete':
      return state.filter(({ id }) => id !== todo.id);
    case 'update':
      return state.map((t) => (t.id === todo.id ? todo : t));
    case 'create':
      return [todo, ...state];
    default:
      return state;
  }
}

export type todoOptomisticUpdate = (action: {
  action: Action;
  todo: Todo;
}) => void;

export function TodoList({ todos }: { todos: Array<Todo> }) {
  const [optimisticTodos, todoOptomisticUpdate] = useOptimistic(
    todos,
    todoReducer,
  );
  return (
    <>
      <TodoForm optomisticUpdate={todoOptomisticUpdate} />
      <div className="w-full flex flex-col gap-4">
        {optimisticTodos?.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              optomisticUpdate={todoOptomisticUpdate}
            />
          );
        })}
      </div>
    </>
  );
}

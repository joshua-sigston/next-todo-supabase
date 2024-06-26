'use client';
import { addTodo } from '@/app/todos/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { todoOptomisticUpdate } from './TodoList';
import { Todo } from '@/types/custom';

function FormContent() {
  const { pending } = useFormStatus();
  return (
    <>
      <Textarea
        minLength={4}
        name="todo"
        required
        placeholder="Add a new todo"
      />
      <Button type="submit" size="icon" className="min-w-10" disabled={pending}>
        <Send className="h-5 w-5" />
        <span className="sr-only">Submit Todo</span>
      </Button>
    </>
  );
}

export function TodoForm({
  optomisticUpdate,
}: {
  optomisticUpdate: todoOptomisticUpdate;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Card>
      <CardContent className="p-3">
        <form
          ref={formRef}
          action={async (data) => {
            const newTodo: Todo = {
              id: -1,
              inserted_at: '',
              user_id: '',
              task: data.get('todo') as string,
              is_complete: false,
            };
            optomisticUpdate({ action: 'create', todo: newTodo });
            await addTodo(data);
            formRef.current?.reset();
          }}
          className="flex gap-4"
        >
          <FormContent />
        </form>
      </CardContent>
    </Card>
  );
}

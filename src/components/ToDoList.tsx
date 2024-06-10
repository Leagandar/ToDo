import { FC } from "react";

interface ToDoListProps {
  todos: { id: number; text: string; completed: boolean }[];
  toggleTodo: (id: number) => void;
}

const ToDoList: FC<ToDoListProps> = ({ todos, toggleTodo }) => {
  return (
    <ul className="list-none p-0">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex  items-center p-2 border-b"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="mr-4"
          />
          <span className={`${todo.completed ? "line-through" : ""}`}>
            {todo.text}
          </span>
        </li>
      ))}
    </ul>
  );
};

export { ToDoList };

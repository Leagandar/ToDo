import { FC, FormEvent, useState } from "react";

interface ToDoInputProps {
  addTodo: (text: string) => void;
}

const ToDoInput: FC<ToDoInputProps> = ({ addTodo }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      return;
    }

    addTodo(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What needs to be done?"
        className="border rounded p-2 w-full"
      />
    </form>
  );
};

export { ToDoInput };

import { FC, useState } from "react";
import { ToDoInput, ToDoList } from "./components";

interface ToDo {
  id: number;
  text: string;
  completed: boolean;
}

type filter = "all" | "active" | "completed";

const App: FC = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [filter, setFilter] = useState<filter>("all");

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return !todo.completed;
    } else {
      return todo.completed;
    }
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">todos</h1>
      <ToDoInput addTodo={addTodo} />
      <ToDoList todos={filteredTodos} toggleTodo={toggleTodo} />
      <div className="flex justify-between mt-4">
        <span>{todos.filter((todo) => !todo.completed).length} items left</span>
        <div>
          <button
            onClick={() => setFilter("all")}
            className={`mr-2 ${filter === "all" && "font-bold"}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`mr-2 ${filter === "active" && "font-bold"}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`${filter === "completed" && "font-bold"}`}
          >
            Completed
          </button>
        </div>
        <button onClick={clearCompleted} className="ml-4 text-red-600">
          Clear completed
        </button>
      </div>
    </div>
  );
};

export default App;

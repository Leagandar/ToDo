import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

test("renders ToDo app", () => {
  render(<App />);

  const headingElement = screen.getByText(/todos/i);

  expect(headingElement).toBeInTheDocument();
});

test("adds a new todo", () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText(/what needs to be done/i);
  fireEvent.change(inputElement, { target: { value: "New Task" } });
  fireEvent.submit(inputElement);
  const todoElement = screen.getByText(/New Task/i);

  expect(todoElement).toBeInTheDocument();
});

test("toggles todo completion", () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText(/what needs to be done/i);
  fireEvent.change(inputElement, { target: { value: "New Task" } });
  fireEvent.submit(inputElement);

  const checkboxElement = screen.getByRole("checkbox");
  fireEvent.click(checkboxElement);
  const todoElement = screen.getByText(/New Task/i);

  expect(todoElement).toHaveClass("line-through");
});

test("filters active todo items", () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText(/what needs to be done/i);
  fireEvent.change(inputElement, { target: { value: "Task 1" } });
  fireEvent.submit(inputElement);
  fireEvent.change(inputElement, { target: { value: "Task 2" } });
  fireEvent.submit(inputElement);

  const checkboxes = screen.getAllByRole("checkbox");
  fireEvent.click(checkboxes[0])

  const activeFilterButton = screen.getByText(/active/i);
  fireEvent.click(activeFilterButton);
  
  expect(screen.queryByText(/Task 1/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
});

test("clears completed todos", () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText(/what needs to be done/i);
  fireEvent.change(inputElement, { target: { value: "Task 1" } });
  fireEvent.submit(inputElement);
  fireEvent.change(inputElement, { target: { value: "Task 2" } });
  fireEvent.submit(inputElement);

  const checkboxes = screen.getAllByRole("checkbox");
  fireEvent.click(checkboxes[0]);

  const clearButton = screen.getByText(/clear completed/i);
  fireEvent.click(clearButton);

  expect(screen.queryByText(/Task 1/i)).not.toBeInTheDocument();
  expect(screen.getByText(/Task 2/i)).toBeInTheDocument();
});

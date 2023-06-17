import TodoApp from "../pages/index";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe('TodoApp', () => {
  test('renders the TodoApp component', () => {
    render(<TodoApp />);
  });

  test('adds a new todo', () => {
    render(<TodoApp />);

    const inputElement = screen.getByPlaceholderText('Add a new todo');
    const addButtonElement = screen.getByText('Add Task');

    // Enter a todo item in the input field
    fireEvent.change(inputElement, { target: { value: 'Buy groceries' } });
    expect(inputElement.value).toBe('Buy groceries');

    // Click the Add Task button
    fireEvent.click(addButtonElement);

    // Verify that the todo item is added
    const todoItemElement = screen.getByText('Buy groceries');
    expect(todoItemElement).toBeInTheDocument();
  });

  test('deletes a todo', () => {
    render(<TodoApp />);

    const inputElement = screen.getByPlaceholderText('Add a new todo');
    const addButtonElement = screen.getByText('Add Task');

    // Enter a todo item in the input field
    fireEvent.change(inputElement, { target: { value: 'Buy groceries' } });

    // Click the Add Task button
    fireEvent.click(addButtonElement);

    // Verify that the todo item is added
    const todoItemElement = screen.getByText('Buy groceries');
    expect(todoItemElement).toBeInTheDocument();

    // Click the Remove button
    const removeButtonElement = screen.getByText('Remove');
    fireEvent.click(removeButtonElement);

    // Verify that the todo item is removed
    expect(todoItemElement).not.toBeInTheDocument();
  });

  test('marks a todo as completed', () => {
    render(<TodoApp />);

    const inputElement = screen.getByPlaceholderText('Add a new todo');
    const addButtonElement = screen.getByText('Add Task');

    // Enter a todo item in the input field
    fireEvent.change(inputElement, { target: { value: 'Buy groceries' } });

    // Click the Add Task button
    fireEvent.click(addButtonElement);

    // Verify that the todo item is added
    const todoItemElement = screen.getByText('Buy groceries');
    expect(todoItemElement).toBeInTheDocument();

    // Click the todo item to mark it as completed
    fireEvent.click(todoItemElement);
  });
});
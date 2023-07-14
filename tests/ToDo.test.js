import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import TodoApp from "../component/ToDo";

describe('ToDo component', () => {
  test('renders the component', () => {
    render(<TodoApp session={{ user: { name: 'Bishrul Haq', email: 'bishrul@test.com' } }} />);
  });

  test('adds a new todo', () => {
    render(<TodoApp session={{ user: { name: 'Bishrul Haq', email: 'bishrul@test.com' } }} />);

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
    render(<TodoApp session={{ user: { name: 'Bishrul Haq', email: 'bishrul@test.com' } }} />);

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
    render(<TodoApp session={{ user: { name: 'Bishrul Haq', email: 'bishrul@test.com' } }} />);

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
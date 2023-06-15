import { useState } from "react";
import toDoLogo from '../public/todo.png';
import Image from 'next/image';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!input) return;
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const markTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <Image class="w-8 h-8 mr-2" src={toDoLogo.src} alt="ToDo Application" height={48} width={48} />
            ToDo App
          </a>
          <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 mb-2">
            <form onSubmit={addTodo}>
              <div>
                <label for="text" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Add your Task 😎</label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Add a new todo"
                  name="text"
                  id="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:text-green-600"
                  required />
              </div>
              <button type="submit" className="w-full mt-5 g-white bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-center">
                Add Task
              </button>
            </form>
          </div>

          {todos.map((todo) => (
            <div key={todo.id} className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 mb-2">
              <div className="flex flex-col md:flex-row items-center justify-center p-4">
                <div className="md:w-3/4">
                  <p onClick={() => markTodo(todo.id)} className={`${todo.done ? 'line-through' : ''}`}>{todo.text}</p>
                </div>
                <div className="md:w-1/4 flex flex-col justify-center items-center">
                  {todo.done ? (
                    <button className="text-white font-bold py-2 px-4" disabled>
                      Completed
                    </button>
                  ) : (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteTodo(todo.id)}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TodoApp;
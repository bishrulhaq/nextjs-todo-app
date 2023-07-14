import Link from 'next/link'
import { useState } from "react";
import { getSession, signOut, useSession } from "next-auth/react"
import toDoLogo from '../public/todo.png';
import Image from 'next/image';
import DarkModeSwitcher from '../component/DarkModeSwitcher'

export default function TodoApp() {

  const { data: session } = useSession()

  return (
    <div>
      {session ? ToDo({ session }) : SessionExpired()}
      <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">Todo Application.</span>
      </footer>
    </div>
  )
}

const ToDo = ({ session }) => {

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

  const handleSignOut = () => {
    signOut();
  }

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-white">ToDo.</span>

          <div className="flex md:order-2">
            <DarkModeSwitcher />
            <button className="g-white bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-center ml-2" onClick={handleSignOut}>
              Sign Out
            </button>
            <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <Image className="w-8 h-8 mr-2" src={toDoLogo.src} alt="ToDo Application" height={48} width={48} />
            ToDo App
          </a>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 mb-2">
            <h1 className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900 dark:text-white pb-3">Hello, {session.user.name ?? session.user.email}</h1>
            <form onSubmit={addTodo}>
              <div>
                <label className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Add your Task 😎</label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Add a new todo"
                  name="text"
                  id="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:text-green-600"
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
                <div className="md:w-3/4 text-gray-900 dark:text-white">
                  <p onClick={() => markTodo(todo.id)} className={`${todo.done ? 'line-through' : ''}`}>{todo.text}</p>
                </div>
                <div className="md:w-1/4 flex flex-col justify-center items-center">
                  {todo.done ? (
                    <button className="font-bold py-2 px-4 text-gray-900 dark:text-white" disabled>
                      Completed
                    </button>
                  ) : (
                    <button className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded text-gray-900 dark:text-white" onClick={() => deleteTodo(todo.id)}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">Todo Application.</span>
      </footer>
    </div>
  )
}

const SessionExpired = () => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 mb-2">
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <Image className="w-8 h-8 mr-2" src={toDoLogo.src} alt="ToDo Application" height={48} width={48} />
            ToDo App
          </div>
          <p className='mx-auto text-gray-400 mb-5'>
            Session Expired
          </p>
          <div className='flex justify-center'>
            <Link href={'/login'} className="bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  mr-2 mb-2 text-black">Sign In</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps({ req }) {
  try {
    const session = await getSession({ req });

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return {
      props: { session },
    };
  } catch (error) {
    console.error(error);
  }
}
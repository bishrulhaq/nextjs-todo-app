import Link from 'next/link'
import { getSession, useSession, signOut } from "next-auth/react"
import toDoLogo from '../public/todo.png';
import Image from 'next/image';
import ToDo from '../component/ToDo'

export default function TodoApp() {

  const { data: session } = useSession()

  function handleSignOut() {
    signOut()
  }

  return (
    <div>
      {session ? <ToDo session={session} handleSignOut={handleSignOut} /> : sessionExpired()}
    </div>
  )
}

function sessionExpired() {
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
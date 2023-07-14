import Image from 'next/image'
import { signIn } from "next-auth/react"
import toDoLogo from '../public/todo.png';
import { getSession } from "next-auth/react"


export default function Login() {

    async function handleGoogleSignin() {
        signIn('google', { callbackUrl: process.env.APP_URL })
    }


    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 mb-2">
                    <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <Image className="w-8 h-8 mr-2" src={toDoLogo.src} alt="ToDo Application" height={48} width={48} />
                        ToDo App
                    </div>

                    <p className="mx-auto text-gray-400 mb-5">
                        Stay organized and keep track of your tasks with our easy-to-use Todo App. Whether you are managing personal projects, work assignments, or daily chores, our app has got you covered.
                    </p>

                    <button type="button" onClick={handleGoogleSignin} className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2">
                        <Image src={"/assets/google.svg"} alt="google" width="20" height={20} className="w-4 h-4 mr-2"></Image>
                        Sign in with Google
                    </button>
                </div>
            </div>
        </section>
    )
}

export async function getServerSideProps({ req }) {
    const session = await getSession({ req })

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: { session }
    }
}
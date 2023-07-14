import '@/styles/globals.css'
import { ThemeProvider } from "next-themes"
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps }) {

  return <SessionProvider session={pageProps.session}>
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  </SessionProvider>
}
import {SessionProvider} from 'next-auth/react'
import type {AppProps} from 'next/app'
import 'bootswatch/dist/pulse/bootstrap.min.css'
import './../../styles/globals.css'

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({Component, pageProps}: AppProps) {
    return (
        <SessionProvider session={pageProps.session}
                         refetchInterval={0}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}

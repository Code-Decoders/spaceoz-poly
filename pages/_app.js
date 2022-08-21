import Main from '../components/Layout'
import '../styles/globals.css'
import { MoralisProvider } from "react-moralis"
import React from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID} serverUrl={process.env.NEXT_PUBLIC_MORALIS_DAPP_URL}>
      <Main>
        <Component {...pageProps} />
      </Main>
    </MoralisProvider>
  )
}

export default MyApp

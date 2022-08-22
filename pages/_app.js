import Main from '../components/Layout'
import '../styles/globals.css'
import { MoralisProvider } from "react-moralis"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const InventoryAddress = '0xf48bf6cea2c2e9033193dd8d2254f4f944c41de3'
export const SpacePolyTokenAddress = '0xbe1b7d3c99f480648443c0f6f542336e9eede3d9'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID} serverUrl={process.env.NEXT_PUBLIC_MORALIS_DAPP_URL}>
      <Main>
        <Component {...pageProps} />
      </Main>
      <ToastContainer />
    </MoralisProvider>
  )
}

export default MyApp

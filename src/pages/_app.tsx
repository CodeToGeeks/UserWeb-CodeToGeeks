import React from 'react'
import type { AppProps } from 'next/app'
import Layout from '@components/layout/Layout'
import Toast from '@components/ui/Toast'
import '../common/styles/globals.css'

import { Provider } from 'react-redux'
import { store } from '../store/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <>
          <Toast />
          <Component {...pageProps} />
        </>
      </Layout>
    </Provider>
  )
}

export default MyApp

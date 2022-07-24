import React from 'react'
import type { AppProps } from 'next/app'
import Layout from '@components/layout/Layout'
import AuthProvider from '@components/authProvider/AuthProvider'
import Toast from '@components/ui/Toast'
import '../common/styles/globals.css'

import { Provider } from 'react-redux'
import { store, ReduxWrapper } from '../store/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <AuthProvider>
          <>
            <Toast />
            <Component {...pageProps} />
          </>
        </AuthProvider>
      </Layout>
    </Provider>
  )
}

export default ReduxWrapper.withRedux(MyApp)

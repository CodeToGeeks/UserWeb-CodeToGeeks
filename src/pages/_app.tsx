import React from 'react'
import type { AppProps } from 'next/app'
import Layout from '@components/layout/Layout'
import AuthProvider from '@components/authProvider/AuthProvider'
import Toast from '@components/ui/Toast'
import '../common/styles/globals.css'
import GoogleAnalytics from '@components/GoogleAnalytic/GoogleAnalytic'
import { Provider } from 'react-redux'
import { store } from '../store/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <AuthProvider>
          <>
            <Toast />
            <GoogleAnalytics
              measurementId={process.env.APP_Google_Analytics_ID as string}
            />
            <Component {...pageProps} />
          </>
        </AuthProvider>
      </Layout>
    </Provider>
  )
}

export default MyApp

import React from 'react'
import type { NextPage } from 'next'
import HomePage, {
  getServerSideProps as homeGetServerSideProps,
} from '@modules/home'

const Home: NextPage = () => {
  return <HomePage />
}
export const getServerSideProps = homeGetServerSideProps

export default Home

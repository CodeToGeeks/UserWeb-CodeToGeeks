import React from 'react'
import type { NextPage } from 'next'
import HomePage, { getStaticProps as homeGetStaticProps } from '@modules/home'

const Home: NextPage = () => {
  return <HomePage />
}

export const getStaticProps = homeGetStaticProps

export default Home

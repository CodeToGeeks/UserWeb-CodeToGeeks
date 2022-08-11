import React from 'react'
import type { NextPage } from 'next'
import PostDetails, {
  getStaticPaths as postGetStaticPaths,
  getStaticProps as postGetStaticProps,
} from '@modules/post'

const Post: NextPage = () => {
  return <PostDetails />
}

export const getStaticPaths = postGetStaticPaths
export const getStaticProps = postGetStaticProps

export default Post

import React from 'react'
import type { NextPage } from 'next'
import PostDetails from '@modules/post'
import axios from 'axios'
import { Post } from '@models/Post.model'

const Post: NextPage = ({ post }: any) => {
  return <PostDetails post={post} />
}
export async function getStaticPaths() {
  try {
    const res = await axios.get('http://13.37.123.41/api/v1/sys/post/slugs')

    const slugs = res.data.payload.posts.map((post: Post) => ({
      params: { slug: post.slug },
    }))
    return {
      paths: slugs,
      fallback: 'blocking',
    }
  } catch (err) {
    console.log(err)
  }
}

export async function getStaticProps({ params }: any) {
  try {
    const response = await axios.get(
      `http://13.37.123.41/api/v1/post/${params.slug}`,
    )
    return {
      props: {
        post: response.data.post,
      },
      revalidate: 60,
    }
  } catch (err) {
    console.log(err)
  }
}

export default Post

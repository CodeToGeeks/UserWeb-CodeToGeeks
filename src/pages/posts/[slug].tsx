import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import PostDetails from '@modules/post'
import { useRouter } from 'next/router'
import axios from 'axios'

const Post: NextPage = ({ post }: any) => {
  const router = useRouter()
  let slug = router.query.slug

  useEffect(() => {
    slug = router.query.slug
  }, [router.isReady])

  return <PostDetails post={post} />
}
export async function getStaticPaths() {
  try {
    const res = await axios.get('http://13.37.123.41/api/v1/sys/post/slugs')

    const slugs = res.data.payload.posts.map((post: any) => ({
      params: { slug: post.slug },
    }))
    return {
      paths: slugs,
      fallback: true,
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
    }
  } catch (err) {
    console.log(err)
  }
}

export default Post

import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import PostDetails from '@modules/post'

const Post: NextPage = () => {
  const router = useRouter()
  const slug = router.query.slug
  return <PostDetails slug={slug} />
}

export default Post

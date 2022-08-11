import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import PostDetails from '@modules/post'

const Post: NextPage = () => {
  const router = useRouter()
  let slug = router.query.slug

  useEffect(() => {
    slug = router.query.slug
  }, [router.isReady])

  return <PostDetails slug={slug} />
}

export default Post

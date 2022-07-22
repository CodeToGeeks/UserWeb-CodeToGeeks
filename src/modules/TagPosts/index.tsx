import React, { useEffect, useState } from 'react'
import { withRouter, NextRouter } from 'next/router'
import PostsList from '@modules/home/components/PostsList'
import Community from '@modules/home/components/Community'
import PopularTags from '@modules/home/components/PopularTags'
import SEO from '@components/SEO/SEO'

import styles from '@modules/home/styles/index.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { resetPosts, getPostsByTagId, postsSelector } from '@store/posts'

const TagPosts = ({ router }: { router: NextRouter }) => {
  const [pageNumber, setPageNumber] = useState(1)
  const dispatch = useAppDispatch()
  const { posts, totalPostsCount } = useAppSelector(postsSelector)
  const { _id } = router.query
  useEffect(() => {
    dispatch(resetPosts())
  }, [_id])

  useEffect(() => {
    dispatch(
      getPostsByTagId({
        query: { pageSize: 3, pageNumber },
        tagId: `${_id}`,
      }),
    )
  }, [pageNumber, _id])
  return (
    <>
      <SEO title="Code To Geeks | Tags" />
      <div className={styles.container}>
        <main className={styles.main}>
          <div style={{ alignSelf: 'flex-start' }}>
            <Community />
            <PopularTags />
          </div>
          <PostsList
            posts={posts}
            setPageNumber={setPageNumber}
            totalPostsCount={totalPostsCount}
          />
        </main>
      </div>
    </>
  )
}

export default withRouter(TagPosts)

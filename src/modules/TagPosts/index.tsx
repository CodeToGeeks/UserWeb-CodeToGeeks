import React, { useEffect, useState } from 'react'
import { withRouter, NextRouter } from 'next/router'
import PostsList from '@modules/home/components/PostsList'
import Community from '@modules/home/components/Community'
import PopularTags from '@modules/home/components/PopularTags'
import styles from '@modules/home/styles/index.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  getTags,
  resetPosts,
  getPostsByTagId,
  postsSelector,
} from '@store/posts'

const TagPosts = ({ router }: { router: NextRouter }) => {
  const [pageNumber, setPageNumber] = useState(1)
  const dispatch = useAppDispatch()
  const { posts, tags, totalPostsCount } = useAppSelector(postsSelector)
  const { _id } = router.query
  useEffect(() => {
    dispatch(resetPosts())
    if (!tags.length) dispatch(getTags())
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
  )
}

export default withRouter(TagPosts)

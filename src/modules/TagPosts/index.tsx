import React, { useEffect, useState } from 'react'
import { withRouter, NextRouter } from 'next/router'
import PostsList from '@modules/home/components/PostsList'
import Community from '@modules/home/components/Community'
import PopularTags from '@modules/home/components/PopularTags'
import SEO from '@components/SEO/SEO'

import styles from '@modules/home/styles/index.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  resetPosts,
  getPostsByTagId,
  postsSelector,
  incrementPageNumber,
  getTags,
} from '@store/posts'
import TagHeader from './components/TagHeader'
import { Tag } from '@models/Tag.model'

const TagPosts = ({ router }: { router: NextRouter }) => {
  const [tag, setTag] = useState({} as Tag)
  const dispatch = useAppDispatch()
  const { posts, totalPostsCount, tags, pageNumber } =
    useAppSelector(postsSelector)
  const { _id } = router.query
  useEffect(() => {
    dispatch(resetPosts())
    return () => {
      dispatch(resetPosts())
    }
  }, [_id])

  useEffect(() => {
    dispatch(
      getPostsByTagId({
        query: { pageNumber },
        tagId: `${_id}`,
      }),
    )
  }, [pageNumber, _id])

  useEffect(() => {
    if (!tags || !tags.length) dispatch(getTags())
  }, [])

  useEffect(() => {
    const tag = getCurrentTag()
    if (tag) setTag(tag)
  }, [tags, _id])

  const getCurrentTag = () => tags.find((tag: Tag) => tag._id === _id)

  return (
    <>
      <SEO title="Code To Geeks | Tags" />
      <div className={styles.container}>
        <TagHeader tag={tag} />
        <main className={styles.main}>
          <div style={{ alignSelf: 'flex-start' }}>
            <Community />
            <PopularTags />
          </div>
          <PostsList
            posts={posts}
            incrementPageNumber={() => dispatch(incrementPageNumber())}
            totalPostsCount={totalPostsCount}
          />
        </main>
      </div>
    </>
  )
}

export default withRouter(TagPosts)

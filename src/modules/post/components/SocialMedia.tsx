import React from 'react'
import styles from '../styles/SocialMedia.module.scss'
import { useAppSelector } from '@store/hooks'
import { postsSelector } from '@store/posts'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  LinkedinIcon,
  FacebookIcon,
  TwitterIcon,
} from 'react-share'

const baseLink = `https://codetogeeks.com`

const windowWidth = 1200
const windowHeight = 630

const iconsColor = '#a3a3a3'
const bgStyle = {
  backgroundColor: '#fff',
  fill: iconsColor,
  width: '42px',
  height: '42px',
  x: '11.5',
  y: '11.5',
}
const twitterBgStyle = {
  fill: 'transparent',
  width: '44px',
  height: '44px',
}

// NOTE:
//   Handling page meta data will make the page image appear on share

const SocialMedia = () => {
  const { post } = useAppSelector(postsSelector)
  const commonProps = {
    url: `${baseLink}/${post?.slug}`,
    title: post?.title,
    windowWidth: windowWidth,
    windowHeight: windowHeight,
  }

  return (
    <div className={styles.socialMediaContainer}>
      <TwitterShareButton {...commonProps} hashtags={['CODE_TO_GEEKS']}>
        <TwitterIcon
          size={55}
          bgStyle={twitterBgStyle}
          iconFillColor={iconsColor}
        />
      </TwitterShareButton>

      <FacebookShareButton
        {...commonProps}
        quote={post?.title}
        hashtag={'#CODE_TO_GEEKS'}
      >
        <FacebookIcon size={40} bgStyle={bgStyle} borderRadius={22} />
      </FacebookShareButton>

      <LinkedinShareButton
        {...commonProps}
        summary={post?.excerpt}
        source={'Code To Geeks'}
      >
        <LinkedinIcon size={40} bgStyle={bgStyle} borderRadius={10} />
      </LinkedinShareButton>
    </div>
  )
}
export default SocialMedia

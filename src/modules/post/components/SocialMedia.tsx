import React from 'react'
import Image from 'next/image'
import styles from '../styles/SocialMedia.module.scss'
import { useAppSelector } from '@store/hooks'
import { postsSelector } from '@store/posts'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'
import CopyToClipboard from 'react-copy-to-clipboard'

const baseLink = `https://codetogeeks.com`

const windowWidth = 1200
const windowHeight = 630

const linkedinImage = '/assets/post/linkedin.svg'
const twitterImage = '/assets/post/twitter.svg'
const facebookImage = '/assets/post/facebook.svg'
const linkImage = '/assets/post/link.svg'
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
        <Image src={twitterImage} width="24" height="24" />
      </TwitterShareButton>
      <FacebookShareButton
        {...commonProps}
        quote={post?.title}
        hashtag={'#CODE_TO_GEEKS'}
      >
        <Image src={facebookImage} width="24" height="24" />
      </FacebookShareButton>
      <LinkedinShareButton
        {...commonProps}
        summary={post?.excerpt}
        source={'Code To Geeks'}
      >
        <Image src={linkedinImage} width="24" height="24" />
      </LinkedinShareButton>
      <CopyToClipboard text={`${commonProps.url}`}>
        <button className={styles.copyBtn}>
          <Image
            src={linkImage}
            alt="copy to clipboard icon"
            width={'22'}
            height={'22'}
          />
        </button>
      </CopyToClipboard>
    </div>
  )
}
export default SocialMedia

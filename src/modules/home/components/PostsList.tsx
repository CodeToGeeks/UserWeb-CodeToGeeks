import React from 'react'
import PostCard from './PostCard'
import styles from '../styles/PostsList.module.scss'
import { Post } from '@models/Post.model'

const POSTS: { total: number; posts: Post[] } = {
  total: 2,
  posts: [
    {
      _id: '623d16a6d1f0b8883acfb79f',
      title: 'How to convert an array to an object in JavaScript',
      author: {
        _id: '623d1517ff303a4ce59d75bd',
        name: 'Ahmed Ali',
        profile_image:
          'https://image.shutterstock.com/image-vector/check-back-soon-hand-lettering-600w-1379832464.jpg',
      },
      slug: '',
      tags: [
        {
          _id: '623d1621d1f0b8883acfb78d',
          name: 'javaScript',
          color: '#FFC300',
        },
      ],
      created_at: new Date('2022-03-25T01:11:02.856Z'),
    },
    {
      _id: '6248d2b29195b4d1b8f88f83',
      title: 'Hello from the other side',
      author: {
        _id: '623d1517ff303a4ce59d75bd',
        name: 'Ahmed Ali',
        profile_image:
          'https://image.shutterstock.com/image-vector/check-back-soon-hand-lettering-600w-1379832464.jpg',
      },
      slug: '',
      tags: [
        {
          _id: '6248d0fe9195b4d1b8f88f57',
          name: 'CSS',
          color: '#3492eb',
        },
        {
          _id: '6248d1349195b4d1b8f88f5d',
          name: 'HTML',
          color: '#34ebd3',
        },
        {
          _id: '623d1621d1f0b8883acfb78d',
          name: 'javaScript',
          color: '#FFC300',
        },
      ],
      created_at: new Date('2022-04-02T22:48:18.340Z'),
    },
    {
      _id: '623d16a6d1f0b8883acfb79d',
      title: 'How to convert an array to an object in JavaScript',
      author: {
        _id: '623d1517ff303a4ce59d75bd',
        name: 'Ahmed Ali',
        profile_image:
          'https://image.shutterstock.com/image-vector/check-back-soon-hand-lettering-600w-1379832464.jpg',
      },
      slug: '',
      tags: [
        {
          _id: '623d1621d1f0b8883acfb78d',
          name: 'javaScript',
          color: '#FFC300',
        },
      ],
      created_at: new Date('2022-03-25T01:11:02.856Z'),
    },
    {
      _id: '6248d2b29195b4d1b8f88f8f',
      title: 'Hello from the other side',
      author: {
        _id: '623d1517ff303a4ce59d75bd',
        name: 'Ahmed Ali',
        profile_image:
          'https://image.shutterstock.com/image-vector/check-back-soon-hand-lettering-600w-1379832464.jpg',
      },
      slug: '',
      tags: [
        {
          _id: '6248d0fe9195b4d1b8f88f57',
          name: 'CSS',
          color: '#3492eb',
        },
        {
          _id: '6248d1349195b4d1b8f88f5d',
          name: 'HTML',
          color: '#34ebd3',
        },
        {
          _id: '623d1621d1f0b8883acfb78d',
          name: 'javaScript',
          color: '#FFC300',
        },
      ],
      created_at: new Date('2022-04-02T22:48:18.340Z'),
    },
    {
      _id: '623d16a6d1f0b8883acfb79g',
      title: 'How to convert an array to an object in JavaScript',
      author: {
        _id: '623d1517ff303a4ce59d75bd',
        name: 'Ahmed Ali',
        profile_image:
          'https://image.shutterstock.com/image-vector/check-back-soon-hand-lettering-600w-1379832464.jpg',
      },
      slug: '',
      tags: [
        {
          _id: '623d1621d1f0b8883acfb78d',
          name: 'javaScript',
          color: '#FFC300',
        },
      ],
      created_at: new Date('2022-03-25T01:11:02.856Z'),
    },
    {
      _id: '6248d2b29195b4d1b8f88f8h',
      title: 'Hello from the other side',
      author: {
        _id: '623d1517ff303a4ce59d75bd',
        name: 'Ahmed Ali',
        profile_image:
          'https://image.shutterstock.com/image-vector/check-back-soon-hand-lettering-600w-1379832464.jpg',
      },
      slug: '',
      tags: [
        {
          _id: '6248d0fe9195b4d1b8f88f57',
          name: 'CSS',
          color: '#3492eb',
        },
        {
          _id: '6248d1349195b4d1b8f88f5d',
          name: 'HTML',
          color: '#34ebd3',
        },
        {
          _id: '623d1621d1f0b8883acfb78d',
          name: 'javaScript',
          color: '#FFC300',
        },
      ],
      created_at: new Date('2022-04-02T22:48:18.340Z'),
    },
    {
      _id: '623d16a6d1f0b8883acfb79i',
      title: 'How to convert an array to an object in JavaScript',
      author: {
        _id: '623d1517ff303a4ce59d75bd',
        name: 'Ahmed Ali',
        profile_image:
          'https://image.shutterstock.com/image-vector/check-back-soon-hand-lettering-600w-1379832464.jpg',
      },
      slug: '',
      tags: [
        {
          _id: '623d1621d1f0b8883acfb78d',
          name: 'javaScript',
          color: '#FFC300',
        },
      ],
      created_at: new Date('2022-03-25T01:11:02.856Z'),
    },
    {
      _id: '6248d2b29195b4d1b8f88f8j',
      title: 'Hello from the other side',
      author: {
        _id: '623d1517ff303a4ce59d75bd',
        name: 'Ahmed Ali',
        profile_image:
          'https://image.shutterstock.com/image-vector/check-back-soon-hand-lettering-600w-1379832464.jpg',
      },
      slug: '',
      tags: [
        {
          _id: '6248d0fe9195b4d1b8f88f57',
          name: 'CSS',
          color: '#3492eb',
        },
        {
          _id: '6248d1349195b4d1b8f88f5d',
          name: 'HTML',
          color: '#34ebd3',
        },
        {
          _id: '623d1621d1f0b8883acfb78d',
          name: 'javaScript',
          color: '#FFC300',
        },
      ],
      created_at: new Date('2022-04-02T22:48:18.340Z'),
    },
  ],
}

const PostsList = () => {
  return (
    <div className={styles.list}>
      {POSTS.posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}

export default PostsList

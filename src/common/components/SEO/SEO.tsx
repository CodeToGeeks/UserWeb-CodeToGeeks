import React from 'react'
import Head from 'next/head'

type SEOProps = {
  description?: string
  title?: string
  image?: string
  keywords?: string
  url?: string
  children?: JSX.Element
}

const WEBSITE_NAME = 'Code To Geeks'
const WEBSITE_URL = 'https://codetogeeks.com'
const WEBSITE_DESCRIPTION = 'Code To Geeks is a blog for developers and coders'
// const WEBSITE_IMAGE = 'https://codetogeeks.com/static/images/logo.png'
const WEBSITE_KEYWORDS =
  'HTML, Python, CSS, SQL, JavaScript, How to, PHP, Java, C, C++, C#, Bootstrap, Colors, MySQL, Icons, Node.js, React, Angular, R, AI, Git, Data Science, Code Game, Programming, Web Development, Learning, Learn to code'

const SEO = ({
  title = `${WEBSITE_NAME} | Home`,
  description = WEBSITE_DESCRIPTION,
  keywords = WEBSITE_KEYWORDS,
  url = WEBSITE_URL,
  image,
  children,
}: SEOProps) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <title> {title}</title>
      <meta name="description" content={description} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {image && <meta itemProp="image" content={image} />}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={WEBSITE_NAME} />
      {image && <meta property="og:" content={image} />}
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={WEBSITE_NAME} />

      {children}
    </Head>
  )
}

export default SEO

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type AppProps = {
  width?: string
  height?: string
  styles?: string
}

const Logo = (props: AppProps) => {
  const { styles, ...imageProps } = props
  return (
    <div className={styles || ''}>
      <Link href="/">
        <a>
          <Image
            src="/assets/logo.svg"
            alt="Code To Geeks"
            width="100"
            height="80"
            priority
            {...imageProps}
          />
        </a>
      </Link>
    </div>
  )
}

export default Logo

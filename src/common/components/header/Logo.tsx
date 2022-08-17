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
        <Image
          src="/assets/logo.png"
          alt="Code To Geeks"
          width="100"
          height="80"
          priority
          {...imageProps}
        />
      </Link>
    </div>
  )
}

export default Logo

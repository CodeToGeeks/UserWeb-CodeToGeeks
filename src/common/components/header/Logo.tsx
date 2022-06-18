import React from 'react'
import Image from 'next/image'

type AppProps = {
  width?: string
  height?: string
  styles?: string
}

const Logo = (props: AppProps) => {
  const { styles, ...imageProps } = props
  return (
    <div className={styles || ''}>
      <Image
        src="/assets/logo/favicon.png"
        alt="Code To Geeks"
        width="80"
        height="60"
        {...imageProps}
      />
    </div>
  )
}

export default Logo
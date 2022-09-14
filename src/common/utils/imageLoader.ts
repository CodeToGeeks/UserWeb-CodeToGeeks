type S3LoaderPayload = {
  src: string
  width?: number
  quality?: number
}

export const S3Loader = ({ src, width, quality }: S3LoaderPayload) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

// export const S3Loader = ({ src }: any) => {
//   return src
// }

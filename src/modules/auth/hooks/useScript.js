import { useEffect } from 'react'

const useScript = (url, onload) => {
  useEffect(() => {
    if (document.head.getElementsByClassName('googleAuthScript').length)
      return () => {}
    document.head.getElementsByTagNameNS
    const script = document.createElement('script')

    script.className = 'googleAuthScript'
    script.src = url
    script.onload = onload

    document.head.appendChild(script)

    return () => {}
  }, [url, onload])
}

export default useScript

import { useEffect } from 'react'

const useScript = (url, onload, flag) => {
  useEffect(() => {
    let getScript = document.head.getElementsByClassName('googleAuthScript')
    if (getScript.length > 0) {
      if (flag) onload()

      return () => {}
    }
    const script = document.createElement('script')

    script.className = 'googleAuthScript'
    script.src = url
    script.defer = true
    script.async = true
    script.onload = onload

    document.head.appendChild(script)

    return () => {}
  }, [url, onload])
}

export default useScript

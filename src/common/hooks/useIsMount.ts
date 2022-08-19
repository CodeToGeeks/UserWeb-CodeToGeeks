import { useRef, useEffect } from 'react'

// Usage: skip the 1st use effect render when component is mounted
export const useIsMount = () => {
  const isMountRef = useRef(true)
  useEffect(() => {
    isMountRef.current = false
  }, [])
  return isMountRef.current
}

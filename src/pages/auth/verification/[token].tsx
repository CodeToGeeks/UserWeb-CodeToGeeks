import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import ConfirmAccount from '@modules/auth/pages/EmailVerification'

const Verification: NextPage = () => {
  const router = useRouter()
  let token = router.query.token

  useEffect(() => {
    token = router.query.token
  }, [router.isReady])

  return <ConfirmAccount token={token} />
}
export default Verification

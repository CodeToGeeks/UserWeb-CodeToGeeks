import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import EmailVerification from '@modules/auth/pages/EmailVerification'

const VerificationPage: NextPage = () => {
  const router = useRouter()
  let token = router.query.token

  useEffect(() => {
    token = router.query.token
  }, [router.isReady])

  return <EmailVerification token={token} />
}
export default VerificationPage

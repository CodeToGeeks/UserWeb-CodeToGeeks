import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import ConfirmAccount from '@modules/auth/pages/EmailVerification'

<<<<<<< HEAD
const VerificationPage: NextPage = () => {
=======
const Verification: NextPage = () => {
>>>>>>> 1c7cf10105bc8e5af6a27d5e6d114f9759f00a3e
  const router = useRouter()
  let token = router.query.token

  useEffect(() => {
    token = router.query.token
  }, [router.isReady])

  return <ConfirmAccount token={token} />
}
<<<<<<< HEAD
export default VerificationPage
=======
export default Verification
>>>>>>> 1c7cf10105bc8e5af6a27d5e6d114f9759f00a3e

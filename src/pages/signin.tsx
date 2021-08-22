import { useEffect } from 'react'
import SignInForm from 'components/SignInForm/SignInForm'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'

const SignIn = () => {
  const [user] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/')
  }, [])

  return (
    <>
      <SignInForm />
    </>
  )
}

export default SignIn

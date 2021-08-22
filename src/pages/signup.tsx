import { useEffect } from 'react'
import SignUpForm from 'components/SignUpForm/SignUpForm'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'

const SignUpPage = () => {
  const [user] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    console.log(user)
    if (user) router.push('/')
  }, [])

  return (
    <>
      <SignUpForm />
    </>
  )
}

export default SignUpPage

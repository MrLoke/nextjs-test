import { useContext, useEffect } from 'react'
import SignInForm from 'components/SignInForm/SignInForm'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'

const SignIn = () => {
  const [user] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/')
  }, [])

  return (
    <Container>
      <SignInForm />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export default SignIn

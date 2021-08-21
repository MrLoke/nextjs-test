import { useContext, useEffect } from 'react'
import SignUpForm from 'components/SignUpForm/SignUpForm'
import { useRouter } from 'next/router'
import styled from 'styled-components'
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
    <Container>
      <SignUpForm />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export default SignUpPage

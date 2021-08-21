import { useContext, useEffect } from 'react'
import Head from 'next/head'
// import Sidebar from 'components/Sidebar/Sidebar'
// import UserProfile from 'components/UserProfile/UserProfile'
import { useRouter } from 'next/router'
import CircularProgress from '@material-ui/core/CircularProgress'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import SignInForm from 'components/SignInForm/SignInForm'
import styled from 'styled-components'

export default function Home() {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()
  const matches = useMediaQuery('(min-width:600px)')

  if (loading) {
    return (
      <Container>
        <CircularProgress color='primary' />
      </Container>
    )
  }
  if (!user) return <SignInForm />

  return (
    <>
      <Head>
        <title>Messanger</title>
      </Head>
      <div>siema</div>
      <button
        onClick={() => {
          router.push('/signin')
          auth.signOut()
        }}>
        logout
      </button>
      <div>{user?.displayName}</div>
      <div>{user?.email}</div>
      <img src={user?.photoURL || ''} alt='' />
      {/* {matches ? (
        <Sidebar>
          <></>
        </Sidebar>
      ) : (
        <Sidebar>
          <UserProfile />
        </Sidebar>
      )} */}
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

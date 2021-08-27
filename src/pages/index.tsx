import { useEffect } from 'react'
import Head from 'next/head'
import Sidebar from 'components/Sidebar/Sidebar'
import Profile from 'components/Profile/Profile'
import ChatHeader from 'components/ChatHeader/ChatHeader'
import ProfileBar from 'components/ProfileBar/ProfileBar'
import SearchBar from 'components/SearchBar/SearchBar'
import CircularProgress from '@material-ui/core/CircularProgress'
import SignInForm from 'components/SignInForm/SignInForm'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../../firebase'
import styled from 'styled-components'

export default function Home() {
  const [user, loading] = useAuthState(auth)
  const matches = useMediaQuery('(min-width:600px)')
  console.log(user)

  // if (!user || !user.email) return
  // const usersChatRef = db
  //   .collection('chats')
  //   .where('users', 'array-contains', user?.email)

  // const [chatSnapshot] = useCollection(usersChatRef)
  // console.log(chatSnapshot)

  useEffect(() => {
    const ifLogged = () => {
      if (loading) {
        return (
          <LoadingContainer>
            <CircularProgress color='primary' />
          </LoadingContainer>
        )
      }
      if (!user) return <SignInForm />
    }
    ifLogged()
  }, [])

  return (
    <>
      <Head>
        <title>Messanger</title>
      </Head>
      {matches ? (
        <Container>
          <SidebarContainer>
            <ProfileBar />
            <SearchBar />
            <Sidebar />
          </SidebarContainer>
          <ProfileContainer>
            {/* <ChatHeader userName={['siema']} /> */}
            <Profile />
          </ProfileContainer>
        </Container>
      ) : (
        <Container>
          <SidebarContainer>
            <ProfileBar />
            <SearchBar />
            <Sidebar />
          </SidebarContainer>
        </Container>
      )}
    </>
  )
}

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Container = styled.div`
  display: flex;
  height: 100vh;
`

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  @media (min-width: 600px) {
    flex: 0.25;
  }
`

const ProfileContainer = styled.div`
  display: none;
  @media (min-width: 600px) {
    display: flex;
    flex-direction: column;
    flex: 0.75;
  }
`

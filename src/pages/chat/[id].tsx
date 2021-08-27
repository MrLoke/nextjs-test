import Head from 'next/head'
import Sidebar from 'components/Sidebar/Sidebar'
import ProfileBar from 'components/ProfileBar/ProfileBar'
import SearchBar from 'components/SearchBar/SearchBar'
import ChatHeader from 'components/ChatHeader/ChatHeader'
import ChatScreen from 'components/ChatScreen/ChatScreen'
import UserChatProfile from 'components/UserChatProfile/UserChatProfile'
import FormMessage from 'components/FormMessage/FormMessage'
import getRecipientEmail from 'utils/getRecipientEmail'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../../firebase'
import {
  Container,
  SidebarContainer,
  ChatContainer,
  ProfileContainer,
} from './ChatStyled'
import { IChat, IMessages } from 'interfaces'

const Chat = ({ chat, messages }: { chat: IChat; messages: IMessages }) => {
  const [user] = useAuthState(auth)
  console.log('chat:', chat, 'messages:', messages)

  return (
    <>
      <Head>
        <title>Messanger | {getRecipientEmail(chat.data.users, user)}</title>
      </Head>
      <Container>
        <SidebarContainer>
          <ProfileBar />
          <SearchBar />
          <Sidebar />
        </SidebarContainer>
        <ChatContainer>
          <ChatHeader chat={chat} userName={chat.data.users} />
          <ChatScreen chat={chat} messages={messages} />
          <FormMessage />
        </ChatContainer>
        <ProfileContainer>
          <UserChatProfile />
          <div>user chat profile</div>
        </ProfileContainer>
      </Container>
    </>
  )
}

export async function getServerSideProps(ctx: any) {
  const ref = db.collection('chats').doc(ctx.query.id)

  // Prep messages on the server
  const messagesRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get()

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.data.timestamp.toDate().getTime(),
    }))

  // Prep the chats
  const chatRes = await ref.get()
  const chat = {
    id: chatRes.id,
    data: chatRes.data(),
    // ...chatRes.data(),
  }
  console.log(chat, messages)
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  }
}

export default Chat

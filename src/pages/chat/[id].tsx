import { useContext } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
// import Sidebar from 'components/Sidebar/Sidebar'
// import ChatScreen from 'components/ChatScreen/ChatScreen'
// import ChatHeader from 'components/ChatHeader/ChatHeader'
import getRecipientEmail from 'utils/getRecipientEmail'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../../firebase'
import { db } from '../../../firebase'
import useMediaQuery from '@material-ui/core/useMediaQuery'

interface IChat {
  chat: Object
  messages: Object
}

const Chat = ({ chat, messages }: IChat) => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const matches = useMediaQuery('(min-width:600px)')
  const { id } = router.query
  console.log(chat, messages)

  return (
    <>
      <Head>
        {/* <title>Messanger | {getRecipientEmail(chat.data.users, user)}</title> */}
      </Head>
      {/* <Sidebar>
        <>
          <ChatHeader userName={chat.data.users} />
          <p>Post: {getRecipientEmail(chat.data.users, user)}</p>
          <ChatScreen chat={chat} messages={messages} />
        </>
      </Sidebar> */}
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

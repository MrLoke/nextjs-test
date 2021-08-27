import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import Message from 'components/Message/Message'
import { IChat, IMessages } from 'interfaces'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from '../../../firebase'
import { Container, MessageContainer } from './ChatScreenStyled'

const ChatScreen = ({
  chat,
  messages,
}: {
  chat: IChat
  messages: IMessages
}) => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const [messageSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  )

  const showMessages = () => {
    if (messageSnapshot) {
      return messageSnapshot?.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ))
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ))
    }
  }

  return (
    <Container>
      <Typography variant='h2'></Typography>
      <MessageContainer>{showMessages()}</MessageContainer>
    </Container>
  )
}

export default ChatScreen

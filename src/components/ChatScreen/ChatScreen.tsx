import { Container } from './ChatScreenStyled'

interface IChat {
  chat: Object
  messages: Object
}

const ChatScreen = ({ chat, messages }: IChat) => {
  return (
    <Container>
      <div></div>
    </Container>
  )
}

export default ChatScreen

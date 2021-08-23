import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useCollection } from 'react-firebase-hooks/firestore'
import getRecipientEmail from 'utils/getRecipientEmail'
import { auth, db } from '../../../firebase'
import { Container } from './ChatStyled'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

interface IChat {
  id: string
  users: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inline: {
      display: 'inline',
    },
  })
)

const Chat = ({ id, users }: IChat) => {
  const [user] = useAuthState(auth)
  const router = useRouter()
  const classes = useStyles()

  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', getRecipientEmail(users, user))
  )

  const enterChat = () => {
    router.push(`/chat/${id}`)
  }

  const recipient = recipientSnapshot?.docs[0]?.data()
  const recipientEmail = getRecipientEmail(users, user)

  return (
    <Container>
      <ListItem alignItems='flex-start' onClick={enterChat}>
        <ListItemAvatar>
          {recipient ? (
            <Avatar src={recipient?.photoURL} />
          ) : (
            <Avatar src={recipientEmail[0]} />
          )}
        </ListItemAvatar>
        <ListItemText
          primary={recipient?.displayName}
          secondary={
            <>
              <Typography
                component='span'
                variant='body2'
                className={classes.inline}
                color='textPrimary'>
                {recipientEmail}
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </>
          }
        />
      </ListItem>
      <Divider variant='inset' component='li' />
    </Container>
  )
}

export default Chat

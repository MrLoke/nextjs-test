import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Avatar from '@material-ui/core/Avatar'
import VideocamIcon from '@material-ui/icons/Videocam'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CallIcon from '@material-ui/icons/Call'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import getRecipientEmail from 'utils/getRecipientEmail'
import { useCollection } from 'react-firebase-hooks/firestore'
import { IChat } from 'interfaces'
import { auth, db } from '../../../firebase'
import { useStyles } from './ChatHeaderStyled'

interface IHeader {
  userName: string[]
}

const ChatHeader = ({ chat, userName }: { chat: IChat; userName: IHeader }) => {
  const [user] = useAuthState(auth)
  const classes = useStyles()
  const router = useRouter()
  const [recipientSnapshot] = useCollection(
    db
      .collection('user')
      .where('email', '==', getRecipientEmail(chat.data.users, user))
  )

  const recipient = recipientSnapshot?.docs[0].data()
  const recipientEmail = getRecipientEmail(chat.data.users, user)

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          <IconButton
            onClick={() => router.back()}
            color='inherit'
            edge='start'>
            <ArrowBackIcon fontSize='medium' />
          </IconButton>
          {recipient ? (
            <Avatar src={recipient?.photoURL} alt='' />
          ) : (
            <Avatar src={recipientEmail[0]} alt='' />
          )}
          <Typography className={classes.title} variant='h6'>
            {getRecipientEmail(userName, user)}
          </Typography>
          <IconButton color='inherit' edge='start'>
            <VideocamIcon fontSize='medium' />
          </IconButton>
          <IconButton color='inherit' edge='start'>
            <CallIcon fontSize='medium' />
          </IconButton>
          <IconButton color='inherit' edge='start'>
            <MoreVertIcon fontSize='medium' />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default ChatHeader

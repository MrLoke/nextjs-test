import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import VideocamIcon from '@material-ui/icons/Videocam'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CallIcon from '@material-ui/icons/Call'
import getRecipientEmail from 'utils/getRecipientEmail'
import { auth } from '../../../firebase'
import { useStyles } from './ChatHeaderStyled'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

interface IHeader {
  userName: string[]
}

const ChatHeader = ({ userName }: IHeader) => {
  const [user] = useAuthState(auth)
  const classes = useStyles()
  const router = useRouter()

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            onClick={() => router.back()}
            color='inherit'
            edge='start'>
            <ArrowBackIcon fontSize='medium' />
          </IconButton>
          <Typography className={classes.title} variant='h6' noWrap>
            {getRecipientEmail(userName, user)}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
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

import { useRouter } from 'next/router'
import { auth } from '../../../firebase'
import Avatar from '@material-ui/core/Avatar'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import {
  StyledToolbar,
  UserInfo,
  Actions,
  DisplayName,
} from './ProfileBarStyled'
import { useAuthState } from 'react-firebase-hooks/auth'

const ProfileBar = () => {
  const [user] = useAuthState(auth)
  const router = useRouter()

  const signOut = async () => {
    await auth.signOut()
    router.push('/signin')
  }

  return (
    <AppBar position='static'>
      <StyledToolbar>
        <UserInfo>
          <Avatar src={user?.photoURL || ''} alt={`${user?.photoURL} avatar`} />
          <DisplayName>{user?.displayName}</DisplayName>
        </UserInfo>
        <Actions>
          <IconButton color='inherit' edge='start' onClick={signOut}>
            <ExitToAppIcon fontSize='medium' />
          </IconButton>
          <IconButton color='inherit' edge='start'>
            <MoreVertIcon fontSize='medium' />
          </IconButton>
        </Actions>
      </StyledToolbar>
    </AppBar>
  )
}

export default ProfileBar

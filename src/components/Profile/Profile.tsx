import { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import PersonIcon from '@material-ui/icons/Person'
import EmailIcon from '@material-ui/icons/Email'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { auth } from '../../../firebase'
import {
  Container,
  UserInfo,
  Avatar,
  DisplayName,
  EditProfile,
} from './ProfileStyled'

const UserProfile = () => {
  const [user] = useAuthState(auth)

  return (
    <Container>
      <UserInfo>
        <Avatar src={user?.photoURL || ''} alt={`${user?.photoURL} avatar`} />
        <DisplayName>
          <EmailIcon fontSize='large' /> {user?.email}
        </DisplayName>
        <DisplayName>
          <PersonIcon fontSize='large' /> {user?.displayName}
        </DisplayName>
      </UserInfo>
      <EditProfile>
        <IconButton color='inherit' edge='start'>
          <EditIcon fontSize='large' /> Edit profile
        </IconButton>
        <IconButton color='inherit' edge='start'>
          <DeleteForeverIcon fontSize='large' />
        </IconButton>
      </EditProfile>
    </Container>
  )
}

export default UserProfile
